import React from 'react';

// Props interface
interface ConfigSectionProps {
  selectedTone: string;
  setSelectedTone: (value: string) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

// Define available tones
const tones = [
  { value: 'inspirational', label: '🚀 Inspirational' },
  { value: 'professional', label: '💡 Professional' },
  { value: 'witty', label: '😂 Witty' },
  { value: 'casual', label: '😊 Casual' },
  { value: 'educational', label: '📚 Educational' },
  { value: 'storytelling', label: '📖 Storytelling' },
];

export default function ConfigSection({
  selectedTone,
  setSelectedTone,
  handleSubmit,
  isLoading,
}: ConfigSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 space-y-6">
      <div>
        <label className="block text-lg font-semibold text-gray-700 mb-4">
          Select Tone
        </label>
        <div className="flex flex-wrap gap-3">
          {tones.map((tone) => (
            <button
              key={tone.value}
              onClick={() => setSelectedTone(tone.value)}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                selectedTone === tone.value
                  ? 'bg-purple-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
              }`}
            >
              {tone.label}
            </button>
          ))}
        </div>
      </div>

      <div className="pt-4">
        <button
          onClick={handleSubmit}
          disabled={isLoading}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-all duration-200 ${
            isLoading
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
              : 'bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]'
          }`}
        >
          {isLoading ? (
            <span className="flex items-center justify-center">
              <svg
                className="animate-spin h-5 w-5 mr-3"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              Generating...
            </span>
          ) : (
            'Generate Content'
          )}
        </button>
      </div>
    </div>
  );
}
