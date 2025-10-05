import { NextRequest, NextResponse } from 'next/server';

// Type definition for user profile
interface UserProfile {
  id: string;
  full_name: string | null;
  instagram_username: string | null;
  twitter_username: string | null;
  linkedin_username: string | null;
  other_details: string | null;
}

export async function POST(request: NextRequest) {
  try {
    // Check if API key is configured
    const apiKey = process.env.OPENROUTER_API_KEY;
    if (!apiKey) {
      console.error('OPENROUTER_API_KEY is not set in environment variables');
      return NextResponse.json(
        { 
          error: 'API key not configured',
          details: 'OPENROUTER_API_KEY environment variable is missing'
        },
        { status: 500 }
      );
    }

    // Read the request body - now includes optional userProfile
    const { rawText, brandVoice, selectedTone, userProfile } = await request.json();

    // Validate required fields
    if (!rawText) {
      return NextResponse.json(
        { error: 'Raw text is required' },
        { status: 400 }
      );
    }

    // Create personalization preamble if user profile exists
    let personalizationPreamble = '';
    
    if (userProfile && (
      userProfile.full_name || 
      userProfile.instagram_username || 
      userProfile.twitter_username || 
      userProfile.linkedin_username || 
      userProfile.other_details
    )) {
      // Build personalization string with available user data
      const personalDetails: string[] = [];
      
      if (userProfile.full_name) {
        personalDetails.push(`Author Name: ${userProfile.full_name}`);
      }
      
      if (userProfile.instagram_username) {
        personalDetails.push(`Instagram: ${userProfile.instagram_username}`);
      }
      
      if (userProfile.twitter_username) {
        personalDetails.push(`Twitter/X: ${userProfile.twitter_username}`);
      }
      
      if (userProfile.linkedin_username) {
        personalDetails.push(`LinkedIn: ${userProfile.linkedin_username}`);
      }
      
      if (userProfile.other_details) {
        personalDetails.push(`Additional Context: ${userProfile.other_details}`);
      }
      
      personalizationPreamble = `\n\n🎯 PERSONALIZATION CONTEXT:\nThis content is being created for a specific user. Use these details to make the content more authentic and personalized:\n${personalDetails.join('\n')}\n\nImportant: Incorporate this information naturally where relevant. For platform-specific posts, you may reference their handles or personal context when appropriate. Make the content feel genuinely authored by this person.\n`;
    }

    // Construct the system and user prompts
    const systemPrompt = `You are VibeScribe, an expert social media strategist who creates authentic, human-like content. Your task is to transform user input into platform-specific posts.

Platform-Specific Guidelines:
- Instagram: Use 3-5 hashtags (max 30 allowed). Character limit: 2,200. Place hashtags in caption for search visibility.
- X (Twitter): Use 1-2 hashtags per post. Character limit: 280 (longer posts truncate in feed). Integrate hashtags inline or at end of tweet.
- LinkedIn: Use 2-5 hashtags per post. Character limit: 3,000 ("see more" appears around 210-220 characters on desktop). Place hashtags at bottom; they count toward limit.

Instructions:
1. Generate 3 UNIQUE variations for EACH platform (Instagram, LinkedIn, and Twitter/X) - total of 9 posts.
2. Each variation must be DISTINCTLY different in structure, opening, and approach. Do NOT simply rephrase the same pattern.
3. Format the content appropriately for each platform following the guidelines above.
4. Ensure authenticity and diversity:
   - Vary sentence structure (questions, statements, exclamations, fragments)
   - Mix opening hooks (questions, facts, stories, bold statements, emojis, statistics)
   - Use conversational language, contractions, and natural flow
   - Avoid generic phrases like "Are you ready?", "Let's dive in", "Stay tuned", "Don't miss out"
   - Include personality quirks: em dashes, ellipses, rhetorical questions, casual asides
   - NO robotic patterns or formulaic templates
5. Variation strategies to use across the 3 versions per platform:
   - Version 1: Story-driven or narrative approach
   - Version 2: Data/insight-led or educational angle
   - Version 3: Conversational/question-based or provocative stance
6. Return ONLY a valid JSON object with a single key "posts". This key should contain an array of objects. Do not include any markdown formatting like \`\`\`json or any other text outside of the JSON object.
7. Each object in the array must have this exact structure: { "platform": "Platform Name", "version": version number (1, 2, or 3), "content": "The generated post content...", "humanLikenessScore": a number from 1 to 100, "approach": "brief description of the approach used" }.`;

    // Construct user prompt with optional personalization
    const userPrompt = `Transform this into 9 diverse, human-sounding social media posts (3 variations each for Instagram, LinkedIn, and X):

Raw Text: "${rawText}"
Desired Tone: "${selectedTone}"
Brand Voice: "${brandVoice}"${personalizationPreamble}

Remember: Each of the 3 versions per platform should feel like it came from different creative angles. Avoid repetitive patterns!`;

    // Call OpenRouter API with DeepSeek R1
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
        'X-Title': 'VibeScribe',
      },
      body: JSON.stringify({
        model: 'deepseek/deepseek-r1',
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: userPrompt
          }
        ],
        temperature: 0.85, // Increased for more creative diversity and less repetition
        max_tokens: 4000, // Increased to accommodate 9 posts (3 per platform)
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenRouter API error:', errorData);
      throw new Error(`OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    const text = data.choices[0]?.message?.content || '';

    // Parse the JSON response
    // Clean up any markdown formatting that might be present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    const parsedContent = JSON.parse(cleanedText);

    // Return the parsed content
    return NextResponse.json(parsedContent, { status: 200 });

  } catch (error) {
    console.error('Error generating content:', error);
    
    // Log more details for debugging
    if (error instanceof Error) {
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);
      console.error('Error stack:', error.stack);
    }
    
    return NextResponse.json(
      { 
        error: 'Failed to generate content',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
