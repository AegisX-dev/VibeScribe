import React, { useState } from 'react';

// Import the GeneratedPost type
interface GeneratedPost {
  platform: string;
  content: string;
  humanLikenessScore: number;
}

// Props interface
interface ContentCardProps {
  post: GeneratedPost;
}

export default function ContentCard({ post }: ContentCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(post.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-200">
      {/* Platform Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-bold text-gray-800 capitalize">
          {post.platform}
        </h3>
        <button
          onClick={handleCopy}
          className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
            copied
              ? 'bg-green-500 text-white'
              : 'bg-purple-600 text-white hover:bg-purple-700'
          }`}
        >
          {copied ? '✓ Copied!' : '📋 Copy'}
        </button>
      </div>

      {/* Content Body */}
      <div className="mb-4">
        <p
          className="text-gray-700 leading-relaxed"
          style={{ whiteSpace: 'pre-wrap' }}
        >
          {post.content}
        </p>
      </div>

      {/* Human Likeness Score */}
      <div className="pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <span className="text-sm font-semibold text-gray-600">
            Human Likeness Score
          </span>
          <div className="flex items-center">
            <div className="w-48 bg-gray-200 rounded-full h-2.5 mr-3">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-600 h-2.5 rounded-full transition-all duration-500"
                style={{ width: `${post.humanLikenessScore}%` }}
              ></div>
            </div>
            <span className="text-lg font-bold text-purple-600">
              {post.humanLikenessScore}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
