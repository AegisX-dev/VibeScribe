import React from 'react';
import ContentCard from './ContentCard';

// Import the GeneratedPost type
interface GeneratedPost {
  platform: string;
  content?: string;
  caption?: string;
  script?: string;
  humanLikenessScore: number;
}

// Props interface
interface OutputSectionProps {
  isLoading: boolean;
  error: string;
  generatedContent: GeneratedPost[];
}

export default function OutputSection({
  isLoading,
  error,
  generatedContent,
}: OutputSectionProps) {
  return (
    <div className="glass-effect rounded-2xl shadow-xl p-6 md:p-8 border-2 border-gray-700 hover:shadow-2xl transition-all duration-300">
      <div className="flex items-center gap-3 mb-6">
        <span className="text-3xl">📱</span>
        <h2 className="text-2xl md:text-3xl font-bold text-gray-100">
          Generated Content
        </h2>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className="space-y-6 animate-fade-in">
          <div className="flex flex-col items-center justify-center py-8">
            <div className="relative">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-t-4 border-purple-600 mb-4"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-purple-300 opacity-20"></div>
            </div>
            <p className="text-lg text-gray-200 font-semibold mb-1">
              ✨ Crafting your content...
            </p>
            <p className="text-sm text-gray-400">
              Our AI is working its magic
            </p>
            <div className="mt-4 flex gap-2">
              <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
              <div className="w-2 h-2 bg-pink-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>

          {/* Loading Skeleton Cards */}
          <div className="space-y-6 mt-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700 rounded-xl p-6 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Platform header skeleton */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-700 rounded-lg"></div>
                    <div className="h-6 bg-gray-700 rounded w-24"></div>
                  </div>
                  <div className="w-16 h-8 bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Content skeleton */}
                <div className="space-y-3 mb-4">
                  <div className="h-4 bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-700 rounded w-5/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-4/6"></div>
                  <div className="h-4 bg-gray-700 rounded w-3/6"></div>
                </div>

                {/* Button skeleton */}
                <div className="flex justify-end">
                  <div className="w-24 h-10 bg-gray-700 rounded-lg"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-gradient-to-r from-red-900/20 to-pink-900/20 border-2 border-red-800 rounded-xl p-6 animate-slide-in-up">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <div className="w-12 h-12 bg-red-900/50 rounded-full flex items-center justify-center">
                <svg
                  className="h-6 w-6 text-red-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <div className="ml-4 flex-1">
              <h3 className="text-lg font-bold text-red-300 mb-1">
                Oops! Something went wrong
              </h3>
              <p className="text-sm text-red-400">{error}</p>
              <p className="text-xs text-red-500 mt-2">Please try again or adjust your inputs.</p>
            </div>
          </div>
        </div>
      )}

      {/* Generated Content */}
      {!isLoading && !error && generatedContent.length > 0 && (
        <div className="space-y-6 animate-slide-in-up">
          <div className="flex items-center justify-between mb-2">
            <p className="text-sm text-gray-400">
              Generated <span className="font-bold text-purple-400">{generatedContent.length}</span> platform-specific posts
            </p>
          </div>
          {generatedContent.map((post, index) => (
            <ContentCard key={`${post.platform}-${index}`} post={post} index={index} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && generatedContent.length === 0 && (
        <div className="text-center py-16 animate-fade-in">
          <div className="text-7xl mb-6 animate-bounce">✨</div>
          <p className="text-xl text-gray-200 font-semibold mb-2">
            Ready to create amazing content?
          </p>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            Fill in your brain dump, choose a tone, and click &quot;Generate Content&quot; to get started with AI-powered social media posts
          </p>
          <div className="mt-8 flex items-center justify-center gap-4 text-xs text-gray-500">
            <div className="flex items-center gap-1">
              <span>📝</span>
              <span>Write</span>
            </div>
            <div className="w-8 h-px bg-gray-600"></div>
            <div className="flex items-center gap-1">
              <span>🎯</span>
              <span>Select</span>
            </div>
            <div className="w-8 h-px bg-gray-600"></div>
            <div className="flex items-center gap-1">
              <span>✨</span>
              <span>Generate</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

