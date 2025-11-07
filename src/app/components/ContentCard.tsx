import React, { useState } from 'react';
import { FaInstagram, FaTwitter, FaLinkedin, FaFacebook, FaMusic, FaYoutube, FaMobileAlt, FaBullseye, FaCopy, FaShareAlt } from 'react-icons/fa';

// Import the GeneratedPost type
interface GeneratedPost {
  platform: string;
  content?: string;
  caption?: string;
  script?: string;
  humanLikenessScore: number;
}

// Props interface
interface ContentCardProps {
  post: GeneratedPost;
  index?: number;
}

// Platform icons mapping (using React Icons components)
const platformIconComponents: { [key: string]: React.ComponentType<{ className?: string }> } = {
  instagram: FaInstagram,
  twitter: FaTwitter,
  linkedin: FaLinkedin,
  facebook: FaFacebook,
  tiktok: FaMusic,
  youtube: FaYoutube,
};

// Platform colors mapping
const platformColors: { [key: string]: { gradient: string; border: string } } = {
  instagram: { gradient: 'from-purple-500 to-pink-500', border: 'border-pink-300' },
  twitter: { gradient: 'from-blue-400 to-blue-600', border: 'border-blue-300' },
  linkedin: { gradient: 'from-blue-600 to-blue-800', border: 'border-blue-400' },
  facebook: { gradient: 'from-blue-500 to-indigo-600', border: 'border-blue-300' },
  tiktok: { gradient: 'from-black to-gray-800', border: 'border-gray-400' },
  youtube: { gradient: 'from-red-500 to-red-700', border: 'border-red-300' },
};

export default function ContentCard({ post, index = 0 }: ContentCardProps) {
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [canShare, setCanShare] = useState(false);
  const [activeTab, setActiveTab] = useState<'caption' | 'script'>('caption'); // For Instagram

  React.useEffect(() => {
    setCanShare(typeof navigator !== 'undefined' && !!navigator.share);
  }, []);

  const platformKey = post.platform.toLowerCase();
  const IconComponent = platformIconComponents[platformKey] || FaMobileAlt;
  const colors = platformColors[platformKey] || { gradient: 'from-purple-600 to-blue-600', border: 'border-purple-300' };

  // Check if this is an Instagram post with caption and script
  const isInstagram = post.platform.toLowerCase() === 'instagram';
  const hasInstagramFormat = isInstagram && post.caption && post.script;

  // Get the content to display
  const getContentToDisplay = () => {
    if (hasInstagramFormat) {
      return activeTab === 'caption' ? post.caption! : post.script!;
    }
    return post.content || '';
  };

  const currentContent = getContentToDisplay();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${post.platform} Post`,
          text: currentContent,
        });
      } catch (err) {
        console.log('Share cancelled or failed:', err);
      }
    } else {
      handleCopy();
    }
  };

  const contentLength = currentContent.length;
  const shouldTruncate = contentLength > 300;
  const displayContent = shouldTruncate && !expanded 
    ? currentContent.slice(0, 300) + '...' 
    : currentContent;

  return (
    <div 
      className={`bg-[var(--content)] rounded-2xl shadow-lg p-6 border border-[var(--border)] hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.01] animate-slide-in-up`}
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Platform Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors.gradient} flex items-center justify-center shadow-lg`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[var(--text-primary)] capitalize">
              {post.platform}
            </h3>
            <p className="text-xs text-[var(--text-secondary)]">{contentLength} characters</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-300 ${
              copied
                ? 'bg-green-500 text-white scale-105'
                : 'bg-[var(--accent)] text-white hover:opacity-90 hover:scale-105 shadow-md'
            }`}
            title="Copy to clipboard"
          >
            {copied ? (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Copied
              </span>
            ) : (
              <span className="flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                Copy
              </span>
            )}
          </button>
          {canShare && (
            <button
              onClick={handleShare}
              className="p-2 rounded-lg bg-[var(--background)] hover:opacity-80 transition-all duration-200 hover:scale-105 border border-[var(--border)]"
              title="Share"
            >
              <svg className="w-5 h-5 text-[var(--text-primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Content Body */}
      <div className="mb-6">
        {/* Instagram Tab Switcher */}
        {hasInstagramFormat && (
          <div className="flex gap-2 mb-4">
            <button
              onClick={() => setActiveTab('caption')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'caption'
                  ? 'bg-[var(--accent)] text-white shadow-lg scale-105'
                  : 'bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              📝 Caption
            </button>
            <button
              onClick={() => setActiveTab('script')}
              className={`flex-1 py-2 px-4 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'script'
                  ? 'bg-[var(--accent)] text-white shadow-lg scale-105'
                  : 'bg-[var(--background)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border)]'
              }`}
            >
              🎬 Script
            </button>
          </div>
        )}
        
        <div className="bg-[var(--background)] rounded-xl p-6 border border-[var(--border)]">
          <p
            className="text-[var(--text-primary)] leading-relaxed whitespace-pre-wrap"
          >
            {displayContent}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="mt-3 text-[var(--accent)] hover:opacity-80 font-semibold text-sm flex items-center gap-1 transition-opacity"
            >
              {expanded ? (
                <>
                  <span>Show less</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                </>
              ) : (
                <>
                  <span>Show more</span>
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </>
              )}
            </button>
          )}
        </div>
      </div>

      {/* Human Likeness Score */}
      <div className="pt-6 border-t border-[var(--border)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-sm font-bold text-[var(--text-primary)]">Human Likeness Score</span>
            <div className="group relative">
              <svg className="w-4 h-4 text-[var(--text-secondary)] cursor-help" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
              </svg>
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-[var(--content)] text-[var(--text-primary)] text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 border border-[var(--border)]">
                Measures how natural and human-like the generated content appears
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.humanLikenessScore >= 80 && (
              <FaBullseye className="w-6 h-6 text-green-400 animate-pulse" />
            )}
            <span className="text-xl font-bold text-[var(--accent)]">
              {post.humanLikenessScore}%
            </span>
          </div>
        </div>
        <div className="relative">
          <div className="w-full bg-[var(--background)] rounded-full h-3 overflow-hidden shadow-inner border border-[var(--border)]">
            <div
              className={`h-3 rounded-full transition-all duration-1000 ease-out bg-gradient-to-r ${colors.gradient} shadow-lg`}
              style={{ 
                width: `${post.humanLikenessScore}%`,
                animationDelay: `${index * 0.1 + 0.3}s`
              }}
            >
              <div className="h-full w-full opacity-50 bg-gradient-to-r from-transparent via-white to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
