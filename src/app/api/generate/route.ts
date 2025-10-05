import { NextRequest, NextResponse } from 'next/server';

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

    // Read the request body
    const { rawText, brandVoice, selectedTone } = await request.json();

    // Validate required fields
    if (!rawText) {
      return NextResponse.json(
        { error: 'Raw text is required' },
        { status: 400 }
      );
    }

    // Construct the system and user prompts
    const systemPrompt = `You are VibeScribe, an expert social media strategist who creates authentic, human-like content. Your task is to transform user input into platform-specific posts.

Instructions:
1. Generate content for Instagram, LinkedIn, and Twitter/X.
2. Format the content appropriately for each platform (hashtags for IG, threads for X, professional tone for LinkedIn).
3. Ensure the output sounds natural and avoids robotic phrasing.
4. Return ONLY a valid JSON object with a single key "posts". This key should contain an array of objects. Do not include any markdown formatting like \`\`\`json or any other text outside of the JSON object.
5. Each object in the array must have this exact structure: { "platform": "Platform Name", "content": "The generated post content...", "humanLikenessScore": a number from 1 to 100 }.`;

    const userPrompt = `Please transform this into social media posts:

Raw Text: "${rawText}"
Desired Tone: "${selectedTone}"
Brand Voice: "${brandVoice}"`;

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
        temperature: 0.7,
        max_tokens: 2000,
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
