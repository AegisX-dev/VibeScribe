import React from 'react';

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
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <label
          htmlFor="brain-dump"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Brain Dump
        </label>
        <textarea
          id="brain-dump"
          value={rawText}
          onChange={(e) => setRawText(e.target.value)}
          placeholder="Type or paste your thoughts, ideas, or content here..."
          className="w-full h-48 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none text-gray-700 placeholder-gray-400"
          rows={8}
        />
      </div>

      <div>
        <label
          htmlFor="brand-voice"
          className="block text-lg font-semibold text-gray-700 mb-2"
        >
          Brand Voice
        </label>
        <input
          id="brand-voice"
          type="text"
          value={brandVoice}
          onChange={(e) => setBrandVoice(e.target.value)}
          placeholder="Describe your brand's voice (e.g., professional, casual, witty)"
          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-gray-700 placeholder-gray-400"
        />
      </div>
    </div>
  );
}
