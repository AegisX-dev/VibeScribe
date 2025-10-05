'use client';

import { useState, useEffect } from 'react';
import InputSection from './components/InputSection';
import ConfigSection from './components/ConfigSection';
import OutputSection from './components/OutputSection';
import PersonalizationBox from './components/PersonalizationBox';

// Type definition for generated posts
interface GeneratedPost {
  platform: string;
  content?: string;
  caption?: string;
  script?: string;
  humanLikenessScore: number;
}

// Type definition for user profile
interface UserProfile {
  id: string;
  full_name: string | null;
  instagram_username: string | null;
  twitter_username: string | null;
  linkedin_username: string | null;
  other_details: string | null;
}

export default function Home() {
  // State management
  const [rawText, setRawText] = useState<string>('');
  const [brandVoice, setBrandVoice] = useState<string>('');
  const [selectedTone, setSelectedTone] = useState<string>('');
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['Instagram', 'Twitter', 'LinkedIn']);
  const [generatedContent, setGeneratedContent] = useState<GeneratedPost[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  // Fetch user profile data on component mount
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        // Get user ID from localStorage
        const userId = localStorage.getItem('vibescribe_user_id');
        
        if (!userId) {
          // No user ID, check localStorage for cached profile
          const storedProfile = localStorage.getItem('vibescribe_user_profile');
          if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            setUserProfile({
              id: 'local-user',
              full_name: profileData.full_name || null,
              instagram_username: profileData.instagram_username || null,
              twitter_username: profileData.twitter_username || null,
              linkedin_username: profileData.linkedin_username || null,
              other_details: profileData.other_details || null,
            });
          }
          return;
        }

        // Fetch from Supabase
        const response = await fetch(`/api/profile?id=${userId}`);
        
        if (response.ok) {
          const data = await response.json();
          if (data.profile) {
            setUserProfile(data.profile);
          }
        }
      } catch (error) {
        console.error('Error fetching user profile:', error);
        // Fallback to localStorage
        try {
          const storedProfile = localStorage.getItem('vibescribe_user_profile');
          if (storedProfile) {
            const profileData = JSON.parse(storedProfile);
            setUserProfile({
              id: 'local-user',
              full_name: profileData.full_name || null,
              instagram_username: profileData.instagram_username || null,
              twitter_username: profileData.twitter_username || null,
              linkedin_username: profileData.linkedin_username || null,
              other_details: profileData.other_details || null,
            });
          }
        } catch (err) {
          console.error('Error loading from localStorage:', err);
        }
      }
    };

    fetchUserProfile();
  }, []);

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

    if (selectedPlatforms.length === 0) {
      setError('Please select at least one platform');
      return;
    }

    try {
      setIsLoading(true);
      
      // Call the API endpoint with optional user profile data
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rawText,
          brandVoice,
          selectedTone,
          selectedPlatforms, // Include selected platforms
          userProfile, // Include user profile (will be null for guest users)
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
    <main className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-4 md:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        {/* Enhanced Header */}
        <div className="text-center mb-12 animate-slide-in-up">
          <div className="inline-block mb-4">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-2">
              <span className="gradient-text" style={{ fontFamily: "'Poppins', sans-serif" }}>
                VibeScribe
              </span>
            </h1>
            <div className="h-1.5 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-600 rounded-full"></div>
          </div>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto font-medium">
            Transform your thoughts into engaging social media content with AI-powered creativity ✨
          </p>
          <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span>Instant Generation</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              <span>Multi-Platform</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">✨</span>
              <span>AI-Powered</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Main content */}
          <div className="lg:col-span-2 space-y-6">
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
              selectedPlatforms={selectedPlatforms}
              setSelectedPlatforms={setSelectedPlatforms}
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

          {/* Right column - Personalization Box */}
          <div className="lg:col-span-1">
            <PersonalizationBox className="sticky top-8" />
          </div>
        </div>
      </div>
    </main>
  );
}
