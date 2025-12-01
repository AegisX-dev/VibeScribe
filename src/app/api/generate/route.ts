import { NextRequest, NextResponse } from 'next/server';
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from '@google/generative-ai';
import { UserProfile } from '@/lib/types';

// Initialize Gemini client
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY || '');

// JSON schema example for AI output
const jsonOutputSchema = `{
  "posts": [
    {
      "platform": "string",
      "content": "string",
      "humanLikenessScore": number
    }
  ]
}`;

// Helper function to build system prompt
function buildSystemPrompt(
  profile: UserProfile | null,
  tone: string,
  styleExample: string | null,
  platforms: string[]
): string {
  let prompt = `You are VibeScribe, an expert AI content partner specializing in generating authentic, human-like social media posts. Your mission is to transform user input into engaging, platform-specific content that feels natural and genuine.

You MUST return your response ONLY in the following JSON format:
${jsonOutputSchema}

`;

  // Add Persona Profile section if profile exists
  if (profile) {
    prompt += `🎯 PERSONA PROFILE:
Use the following information to personalize and contextualize the content:
`;
    if (profile.full_name) prompt += `- Full Name: ${profile.full_name}\n`;
    if (profile.role) prompt += `- Role/Title: ${profile.role}\n`;
    if (profile.project_name) prompt += `- Project Name: ${profile.project_name}\n`;
    if (profile.project_description) prompt += `- Project Description: ${profile.project_description}\n`;
    if (profile.target_audience) prompt += `- Target Audience: ${profile.target_audience}\n`;
    if (profile.style_keywords) prompt += `- Style Keywords: ${profile.style_keywords}\n`;
    if (profile.instagram_username) prompt += `- Instagram: ${profile.instagram_username}\n`;
    if (profile.twitter_username) prompt += `- Twitter/X: ${profile.twitter_username}\n`;
    if (profile.linkedin_username) prompt += `- LinkedIn: ${profile.linkedin_username}\n`;
    prompt += `\nIncorporate these details naturally to make the content feel authentically authored by this person.\n\n`;
  }

  // Add Style Mimicking section if styleExample exists
  if (styleExample) {
    prompt += `🎨 STYLE MIMICKING:
CRITICAL INSTRUCTION: Analyze and mimic the writing style, tone, vocabulary, sentence structure, and personality from the following Source of Truth text. This is the user's authentic voice - replicate it precisely.

Source of Truth:
"""
${styleExample}
"""

Match the cadence, word choice, formatting preferences, and overall vibe of this text in your generated posts.

`;
  }

  // Add tone instruction
  prompt += `📝 TONE: ${tone}\n\n`;

  // Final instructions
  prompt += `Now, analyze the user's "brain dump" below and generate 3 distinct posts for each of the following platforms: ${platforms.join(', ')}. Each post should:
- Be tailored to the platform's format and audience
- Feel authentic and human-written
- Include a humanLikenessScore (1-100) indicating how natural it sounds
- Follow the JSON format specified above

Generate diverse, engaging content that captures the user's intent while maintaining their unique voice.`;

  return prompt;
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    if (!process.env.GOOGLE_API_KEY) {
      console.error('GOOGLE_API_KEY is not set in environment variables');
      return NextResponse.json(
        { 
          error: 'API key not configured',
          details: 'GOOGLE_API_KEY environment variable is missing.'
        },
        { status: 500 }
      );
    }

    // Parse request body
    const body = await request.json();
    const { rawText, selectedTone, userProfile, selectedPlatforms } = body;

    // Validate required fields
    if (!rawText) {
      return NextResponse.json(
        { error: 'Raw text is required' },
        { status: 400 }
      );
    }
    if (!selectedPlatforms || selectedPlatforms.length === 0) {
      return NextResponse.json(
        { error: 'At least one platform must be selected' },
        { status: 400 }
      );
    }

    // Initialize styleExample
    let styleExample: string | null = null;

    // Fetch and process source URL if provided
    if (userProfile?.source_url) {
      try {
        const response = await fetch(userProfile.source_url);
        const html = await response.text();
        
        // Simple HTML stripping regex
        const stripped = html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        
        // Truncate to 2000 characters
        styleExample = stripped.substring(0, 2000);
      } catch (error) {
        console.warn('Failed to fetch source URL:', error);
        // Continue without styleExample
      }
    }

    // Build the system prompt
    const systemPrompt = buildSystemPrompt(
      userProfile || null,
      selectedTone || 'professional',
      styleExample,
      selectedPlatforms
    );

    // Get the generative model
    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.5-flash',
      generationConfig: {
        responseMimeType: 'application/json'
      },
      safetySettings: [
        {
          category: HarmCategory.HARM_CATEGORY_HARASSMENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
        {
          category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
          threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
        },
      ],
    });

    // Start chat with system prompt
    const chat = model.startChat({
      history: [
        {
          role: 'user',
          parts: [{ text: systemPrompt }],
        },
        {
          role: 'model',
          parts: [{ text: 'OK' }],
        },
      ],
    });

    // Send the user's raw text
    const result = await chat.sendMessage(rawText);
    const responseText = result.response.text();

    // Parse and return the JSON response
    const parsedContent = JSON.parse(responseText);
    
    return NextResponse.json(parsedContent, { status: 200 });

  } catch (error) {
    console.error('Error generating content:', error);
    
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        details: errorMessage,
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    );
  }
}
