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
          details: 'OPENROUTER_API_KEY environment variable is missing. Please add it to your Vercel environment variables.'
        },
        { status: 500 }
      );
    }

    // Read the request body - now includes optional userProfile and selectedPlatforms
    let rawText, brandVoice, selectedTone, selectedPlatforms, userProfile;
    
    try {
      const body = await request.json();
      ({ rawText, brandVoice, selectedTone, selectedPlatforms, userProfile } = body);
    } catch (parseError) {
      console.error('Failed to parse request body:', parseError);
      return NextResponse.json(
        { 
          error: 'Invalid request body',
          details: 'The request body must be valid JSON'
        },
        { status: 400 }
      );
    }

    // Validate required fields
    if (!rawText) {
      return NextResponse.json(
        { error: 'Raw text is required' },
        { status: 400 }
      );
    }

    // Default to all platforms if none selected
    const platforms = selectedPlatforms && selectedPlatforms.length > 0 
      ? selectedPlatforms 
      : ['Instagram', 'Twitter', 'LinkedIn'];

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

    // Build platform-specific guidelines
    const platformCount = platforms.length;
    const totalPosts = platformCount * 3;
    const platformList = platforms.join(', ');

    // Construct the system and user prompts
    const systemPrompt = `You are VibeScribe, an expert social media strategist who creates authentic, human-like content. Your task is to transform user input into platform-specific posts.

Platform-Specific Guidelines:
- Instagram: Generate BOTH a caption AND a video script for each variation. Caption: Use 3-5 hashtags (max 30 allowed). Character limit: 2,200. Place hashtags in caption for search visibility. Script: Short, engaging video script (30-60 seconds) with hook, main content, and CTA.
- X (Twitter): Use 1-2 hashtags per post. Character limit: 280 (longer posts truncate in feed). Integrate hashtags inline or at end of tweet.
- LinkedIn: Use 2-5 hashtags per post. Character limit: 3,000 ("see more" appears around 210-220 characters on desktop). Place hashtags at bottom; they count toward limit.
- Facebook: Use 1-3 hashtags. Character limit: 63,206 (but optimal is 40-80 characters for better engagement). Casual and engaging tone.
- TikTok: Short video script format. Include hook, main content, and CTA. Keep under 150 words for voiceover. Trending hashtags work well.
- YouTube: Video description format. Include intro, main description, timestamps if needed, and call-to-action. SEO-friendly keywords.

Instructions:
1. Generate 3 UNIQUE variations for EACH of these platforms: ${platformList} - total of ${totalPosts} posts.
2. Each variation must be DISTINCTLY different in structure, opening, and approach. Do NOT simply rephrase the same pattern.
3. Format the content appropriately for each platform following the guidelines above.
4. **IMPORTANT FOR INSTAGRAM**: For Instagram posts, you MUST include BOTH a "caption" and a "script" field in the response object. The caption is the text that goes with the post, and the script is for a video/reel.
5. Ensure authenticity and diversity:
   - Vary sentence structure (questions, statements, exclamations, fragments)
   - Mix opening hooks (questions, facts, stories, bold statements, emojis, statistics)
   - Use conversational language, contractions, and natural flow
   - Avoid generic phrases like "Are you ready?", "Let's dive in", "Stay tuned", "Don't miss out"
   - Include personality quirks: em dashes, ellipses, rhetorical questions, casual asides
   - NO robotic patterns or formulaic templates
6. Variation strategies to use across the 3 versions per platform:
   - Version 1: Story-driven or narrative approach
   - Version 2: Data/insight-led or educational angle
   - Version 3: Conversational/question-based or provocative stance
7. Return ONLY a valid JSON object with a single key "posts". This key should contain an array of objects. Do not include any markdown formatting like \`\`\`json or any other text outside of the JSON object.
8. For Instagram posts, use this structure: { "platform": "Instagram", "version": version number (1, 2, or 3), "caption": "The caption text...", "script": "The video script...", "humanLikenessScore": a number from 1 to 100, "approach": "brief description of the approach used" }. For all other platforms, use: { "platform": "Platform Name", "version": version number (1, 2, or 3), "content": "The generated post content...", "humanLikenessScore": a number from 1 to 100, "approach": "brief description of the approach used" }.`;

    // Construct user prompt with optional personalization
    const userPrompt = `Transform this into ${totalPosts} diverse, human-sounding social media posts (3 variations each for ${platformList}):

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
        max_tokens: 8000, // Increased significantly to accommodate multiple platforms with Instagram caption+script
      }),
    });

    if (!response.ok) {
      let errorData;
      try {
        errorData = await response.json();
      } catch {
        errorData = { error: 'Failed to parse error response' };
      }
      console.error('OpenRouter API error:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      
      // Provide more specific error messages
      if (response.status === 401) {
        throw new Error('Authentication failed. Please check your OPENROUTER_API_KEY.');
      } else if (response.status === 429) {
        throw new Error('Rate limit exceeded. Please try again later.');
      } else if (response.status === 402) {
        throw new Error('Insufficient credits in OpenRouter account.');
      }
      
      throw new Error(`OpenRouter API error: ${response.status} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();
    
    // Validate the response structure
    if (!data.choices || !Array.isArray(data.choices) || data.choices.length === 0) {
      console.error('Invalid API response structure:', data);
      throw new Error('Invalid response from AI service - no choices returned');
    }
    
    const text = data.choices[0]?.message?.content || '';
    
    if (!text) {
      console.error('Empty content from AI response:', data);
      throw new Error('AI service returned empty content');
    }
    
    // Check if the response was truncated
    const finishReason = data.choices[0]?.finish_reason;
    if (finishReason === 'length') {
      console.warn('Warning: AI response was truncated due to max_tokens limit');
      throw new Error('Response was truncated. Try selecting fewer platforms or simplifying your input.');
    }

    // Parse the JSON response
    // Clean up any markdown formatting that might be present
    let cleanedText = text.trim();
    if (cleanedText.startsWith('```json')) {
      cleanedText = cleanedText.replace(/```json\n?/, '').replace(/\n?```$/, '');
    } else if (cleanedText.startsWith('```')) {
      cleanedText = cleanedText.replace(/```\n?/, '').replace(/\n?```$/, '');
    }

    // Only remove control characters that are definitely problematic
    // Keep actual newlines in the JSON structure - JSON.parse can handle them
    cleanedText = cleanedText
      .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F\u007F]/g, ''); // Remove control chars except \n and \r

    let parsedContent;
    try {
      parsedContent = JSON.parse(cleanedText);
    } catch (parseError) {
      // If parsing still fails, try to fix common issues
      console.error('Initial JSON parse failed, attempting fixes...');
      console.error('Problematic text (first 2000 chars):', cleanedText.substring(0, 2000));
      console.error('Problematic text (last 500 chars):', cleanedText.substring(cleanedText.length - 500));
      console.error('Parse error:', parseError);
      
      // Check if the JSON appears to be truncated
      const hasPosts = cleanedText.includes('"posts"');
      const hasClosingArray = cleanedText.includes('}]');
      const endsWithBrace = cleanedText.trim().endsWith('}');
      
      if (!hasPosts) {
        throw new Error('Invalid response format - missing posts data.');
      }
      
      if (!hasClosingArray || !endsWithBrace) {
        console.error('JSON appears truncated - missing closing brackets');
        throw new Error('AI response appears to be incomplete. Try selecting fewer platforms or reducing input length.');
      }
      
      // Try to fix unescaped newlines within string values
      // This regex-based approach is risky but may help with edge cases
      try {
        // Escape unescaped newlines within strings
        let fixedText = cleanedText;
        
        // Replace literal newlines within string values (between quotes) with \n
        fixedText = fixedText.replace(/"((?:[^"\\]|\\.)*)"/g, (match: string) => {
          return match
            .replace(/\n/g, '\\n')
            .replace(/\r/g, '')
            .replace(/\t/g, '\\t');
        });
        
        parsedContent = JSON.parse(fixedText);
      } catch (secondError) {
        console.error('Second parse attempt failed:', secondError);
        throw new Error('Unable to parse AI response. The response format may be invalid.');
      }
    }

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
    
    // Determine appropriate status code
    let statusCode = 500;
    let errorMessage = 'Failed to generate content';
    const errorDetails = error instanceof Error ? error.message : 'Unknown error';
    
    // Check for specific error types
    if (error instanceof Error) {
      if (error.message.includes('Authentication failed') || error.message.includes('API key')) {
        statusCode = 500;
        errorMessage = 'Configuration Error';
      } else if (error.message.includes('Rate limit')) {
        statusCode = 429;
        errorMessage = 'Rate Limit Exceeded';
      } else if (error.message.includes('Insufficient credits')) {
        statusCode = 402;
        errorMessage = 'Payment Required';
      } else if (error.message.includes('truncated')) {
        statusCode = 413;
        errorMessage = 'Content Too Large';
      }
    }
    
    return NextResponse.json(
      { 
        error: errorMessage,
        details: errorDetails,
        timestamp: new Date().toISOString()
      },
      { status: statusCode }
    );
  }
}
