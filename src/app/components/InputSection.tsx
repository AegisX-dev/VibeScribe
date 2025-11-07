import React from 'react';
import { FaBrain, FaPalette } from 'react-icons/fa';

// Props interface
interface InputSectionProps {
  rawText: string;
  setRawText: (value: string) => void;
  brandVoice: string;
  setBrandVoice: (value: string) => void;
}

export default function InputSection({
  rawText,
  setRawText,
  brandVoice,
  setBrandVoice,
}: InputSectionProps) {
  const maxChars = 2000;
  const charCount = rawText.length;
  const percentage = (charCount / maxChars) * 100;

  return (
    <div className="glass-effect rounded-2xl shadow-xl p-6 md:p-8 space-y-6 transition-all duration-300">
      <div>
        <div className="flex items-center justify-between mb-3">
          <label
            htmlFor="brain-dump"
            className="flex items-center gap-2 text-lg md:text-xl font-bold text-[var(--text-primary)]"
          >
            <FaBrain className="w-6 h-6 text-[var(--accent)]" />
            <span>Brain Dump</span>
          </label>
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${
              percentage > 90 ? 'text-red-500' : percentage > 70 ? 'text-yellow-600' : 'text-[var(--text-secondary)]'
            }`}>
              {charCount} / {maxChars}
            </span>
          </div>
        </div>
        <div className="relative group">
          <textarea
            id="brain-dump"
            value={rawText}
            onChange={(e) => {
              if (e.target.value.length <= maxChars) {
                setRawText(e.target.value);
              }
            }}
            placeholder="✍️ Dump all your thoughts, ideas, or content here... Let your creativity flow!"
            className="bg-[var(--content)] w-full h-48 px-4 py-3 outline-none text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 resize-none placeholder-[var(--text-secondary)]"
            rows={8}
            maxLength={maxChars}
          />
          {/* Progress bar */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-[var(--background)] rounded-b-lg overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                percentage > 90 ? 'bg-red-500' : percentage > 70 ? 'bg-yellow-500' : 'bg-[var(--accent)]'
              }`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      </div>

      <div>
        <label
          htmlFor="brand-voice"
          className="flex items-center gap-2 text-lg md:text-xl font-bold text-[var(--text-primary)] mb-3"
        >
          <FaPalette className="w-6 h-6 text-[var(--accent)]" />
          <span>Brand Voice</span>
          <span className="text-sm font-normal text-[var(--text-secondary)]">(Optional)</span>
        </label>
        <div className="relative">
          <input
            id="brand-voice"
            type="text"
            value={brandVoice}
            onChange={(e) => setBrandVoice(e.target.value)}
            placeholder="e.g., professional yet friendly, witty and engaging, inspirational"
            className="bg-[var(--content)] px-4 py-3 outline-none w-full text-[var(--text-primary)] rounded-lg border border-[var(--border)] transition-colors duration-100 placeholder-[var(--text-secondary)]"
          />
          {brandVoice && (
            <button
              onClick={() => setBrandVoice('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
              aria-label="Clear brand voice"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
