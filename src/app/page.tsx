'use client';

import { useState } from 'react';
import InputSection from './components/InputSection';
import ConfigSection from './components/ConfigSection';
import OutputSection from './components/OutputSection';

// Type definition for generated posts
interface GeneratedPost {
  platform: string;
  content: string;
  humanLikenessScore: number;
}

export default function Home() {
  // State management
  const [rawText, setRawText] = useState<string>('');
  const [brandVoice, setBrandVoice] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<string>('');
  const [generatedContent, setGeneratedContent] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  // Handler function to be filled in later
  const handleSubmit = async () => {
    // Reset error state
    setError('');
    
    // Validate inputs
    if (!rawText.trim()) {
      setError('Please enter some text in the Brain Dump section');
      return;
    }

    if (!selectedTone) {
      setError('Please select a tone');
      return;
    }

    try {
      setIsLoading(true);
      
      // Call the API endpoint
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawText,
          brandVoice,
          selectedTone,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to generate content');
      }

      const data = await response.json();
      
      // Update the generated content state
      setGeneratedContent(data.posts || []);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
          VibeScribe
        </h1>

        <div className="space-y-6">
          {/* InputSection component */}
          <InputSection
            rawText={rawText}
            setRawText={setRawText}
            brandVoice={brandVoice}
            setBrandVoice={setBrandVoice}
          />
          
          {/* ConfigSection component */}
          <ConfigSection
            selectedTone={selectedTone}
            setSelectedTone={setSelectedTone}
            handleSubmit={handleSubmit}
            isLoading={isLoading}
          />
          
          {/* OutputSection component */}
          <OutputSection
            isLoading={isLoading}
            error={error}
            generatedContent={generatedContent}
          />
        </div>
      </div>
    </main>
  );
}
