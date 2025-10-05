import React from 'react';
import ContentCard from './ContentCard';

// Import the GeneratedPost type
interface GeneratedPost {
  platform: string;
  content: string;
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
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Generated Content
      </h2>

      {/* Loading State */}
      {isLoading && (
        <div className="flex flex-col items-center justify-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4"></div>
          <p className="text-lg text-gray-600 font-medium">
            Generating your content...
          </p>
          <p className="text-sm text-gray-500 mt-2">
            This may take a few moments
          </p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <div className="flex items-start">
            <div className="flex-shrink-0">
              <svg
                className="h-6 w-6 text-red-600"
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
            <div className="ml-3">
              <h3 className="text-sm font-semibold text-red-800">
                Error generating content
              </h3>
              <p className="text-sm text-red-700 mt-1">{error}</p>
            </div>
          </div>
        </div>
      )}

      {/* Generated Content */}
      {!isLoading && !error && generatedContent.length > 0 && (
        <div className="space-y-6">
          {generatedContent.map((post, index) => (
            <ContentCard key={`${post.platform}-${index}`} post={post} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && generatedContent.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">✨</div>
          <p className="text-lg text-gray-600 font-medium">
            No content generated yet
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Fill in your brain dump and click "Generate Content" to get started
          </p>
        </div>
      )}
    </div>
  );
}
