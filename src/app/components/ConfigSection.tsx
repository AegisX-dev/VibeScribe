import React from 'react';
import { Smartphone, Drama, Rocket, Lightbulb, Laugh, Smile, BookOpen, BookText, Instagram, Twitter, Linkedin, Facebook, Music, Video, Sparkles } from 'lucide-react';

// Props interface
interface ConfigSectionProps {
  selectedTone: string;
  setSelectedTone: (value: string) => void;
  selectedPlatforms: string[];
  setSelectedPlatforms: (value: string[]) => void;
  handleSubmit: () => void;
  isLoading: boolean;
}

// Define available tones with descriptions
const tones = [
  { value: 'inspirational', label: 'Inspirational', icon: Rocket, description: 'Motivate and uplift' },
  { value: 'professional', label: 'Professional', icon: Lightbulb, description: 'Polished and business-ready' },
  { value: 'witty', label: 'Witty', icon: Laugh, description: 'Clever and humorous' },
  { value: 'casual', label: 'Casual', icon: Smile, description: 'Friendly and approachable' },
  { value: 'educational', label: 'Educational', icon: BookOpen, description: 'Informative and insightful' },
  { value: 'storytelling', label: 'Storytelling', icon: BookText, description: 'Narrative and engaging' },
];

// Define available platforms
const platforms = [
  { value: 'Instagram', label: 'Instagram', icon: Instagram, description: 'Visual storytelling' },
  { value: 'Twitter', label: 'Twitter/X', icon: Twitter, description: 'Short and punchy' },
  { value: 'LinkedIn', label: 'LinkedIn', icon: Linkedin, description: 'Professional networking' },
  { value: 'Facebook', label: 'Facebook', icon: Facebook, description: 'Community engagement' },
  { value: 'TikTok', label: 'TikTok', icon: Music, description: 'Short video scripts' },
  { value: 'YouTube', label: 'YouTube', icon: Video, description: 'Video descriptions' },
];

export default function ConfigSection({
  selectedTone,
  setSelectedTone,
  selectedPlatforms,
  setSelectedPlatforms,
  handleSubmit,
  isLoading,
}: ConfigSectionProps) {
  
  // Toggle platform selection
  const togglePlatform = (platform: string) => {
    if (selectedPlatforms.includes(platform)) {
      setSelectedPlatforms(selectedPlatforms.filter(p => p !== platform));
    } else {
      setSelectedPlatforms([...selectedPlatforms, platform]);
    }
  };

  return (
    <div className="glass-effect rounded-2xl shadow-xl p-6 md:p-8 space-y-6 border-2 border-gray-700 hover:shadow-2xl transition-all duration-300">
      {/* Platform Selection */}
      <div>
        <label className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-100 mb-5">
          <Smartphone className="w-6 h-6 text-blue-400" />
          <span>Select Platforms</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {platforms.map((platform) => {
            const IconComponent = platform.icon;
            return (
              <div key={platform.value} className="relative group">
                <button
                  onClick={() => togglePlatform(platform.value)}
                  className="relative w-full inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                  title={platform.description}
                >
                  <span
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] transition-opacity duration-500 ${
                      selectedPlatforms.includes(platform.value) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  ></span>

                  <span className={`relative z-10 block px-4 py-3 rounded-xl ${
                    selectedPlatforms.includes(platform.value) ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gray-950'
                  }`}>
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        <span className="text-base">{platform.label}</span>
                      </div>
                      <span className={`text-xs transition-opacity duration-200 ${
                        selectedPlatforms.includes(platform.value) ? 'opacity-90' : 'opacity-0 group-hover:opacity-70'
                      }`}>
                        {platform.description}
                      </span>
                    </div>
                  </span>

                  {selectedPlatforms.includes(platform.value) && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-20">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
        <p className="text-sm text-gray-400 mt-3">
          Selected: {selectedPlatforms.length} platform{selectedPlatforms.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Tone Selection */}
      <div>
        <label className="flex items-center gap-2 text-lg md:text-xl font-bold text-gray-100 mb-5">
          <Drama className="w-6 h-6 text-pink-400" />
          <span>Select Your Tone</span>
        </label>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {tones.map((tone) => {
            const IconComponent = tone.icon;
            return (
              <div key={tone.value} className="relative group">
                <button
                  onClick={() => setSelectedTone(tone.value)}
                  className="relative w-full inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95"
                  title={tone.description}
                >
                  <span
                    className={`absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] transition-opacity duration-500 ${
                      selectedTone === tone.value ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                  ></span>

                  <span className={`relative z-10 block px-4 py-4 rounded-xl ${
                    selectedTone === tone.value ? 'bg-gradient-to-br from-purple-600 to-blue-600' : 'bg-gray-950'
                  }`}>
                    <div className="relative z-10 flex flex-col items-center gap-1">
                      <div className="flex items-center gap-2">
                        <IconComponent className="w-5 h-5" />
                        <span className="text-base">{tone.label}</span>
                      </div>
                      <span className={`text-xs transition-opacity duration-200 ${
                        selectedTone === tone.value ? 'opacity-90' : 'opacity-0 group-hover:opacity-70'
                    }`}>
                      {tone.description}
                    </span>
                  </div>
                </span>

                  {selectedTone === tone.value && (
                    <div className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center shadow-lg z-20">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  )}
                </button>
              </div>
            );
          })}
        </div>
      </div>

      <div className="pt-4">
        <div className="relative group">
          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="relative w-full inline-block p-px font-semibold leading-6 text-white bg-gray-800 shadow-2xl cursor-pointer rounded-xl shadow-zinc-900 transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span
              className="absolute inset-0 rounded-xl bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 p-[2px] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            ></span>

            <span className="relative z-10 block px-6 py-5 rounded-xl bg-gray-950">
              <div className="relative z-10 flex items-center justify-center space-x-2">
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin h-6 w-6"
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
                    <span className="text-lg font-bold">Generating Magic...</span>
                  </>
                ) : (
                  <>
                    <span className="transition-all duration-500 group-hover:translate-x-1 text-lg font-bold">
                      <Sparkles className="w-5 h-5 inline-block mr-2" />
                      Generate Content
                    </span>
                    <svg
                      className="w-6 h-6 transition-transform duration-500 group-hover:translate-x-1"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        clipRule="evenodd"
                        d="M8.22 5.22a.75.75 0 0 1 1.06 0l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L11.94 10 8.22 6.28a.75.75 0 0 1 0-1.06Z"
                        fillRule="evenodd"
                      ></path>
                    </svg>
                  </>
                )}
              </div>
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}
