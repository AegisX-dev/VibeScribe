import { Github, Linkedin, Instagram, Heart, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900/50 border-t border-gray-800 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">VibeScribe</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Transform your raw thoughts into authentic, platform-specific social media posts with AI-powered creativity.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Built with</span>
              <Heart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for Vibe Buildathon</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Tech Stack</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                Next.js 15 + TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-pink-500 rounded-full"></span>
                DeepSeek R1 via OpenRouter
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                Supabase + PostgreSQL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                Tailwind CSS v4
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/AegisX-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors group"
              >
                <Github className="w-5 h-5" />
                <span className="text-sm">@AegisX-Dev</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com/in/dev-sharma-aegis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-blue-400 transition-colors group"
              >
                <Linkedin className="w-5 h-5" />
                <span className="text-sm">dev-sharma-aegis</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://instagram.com/Ryou.dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-pink-400 transition-colors group"
              >
                <Instagram className="w-5 h-5" />
                <span className="text-sm">@Ryou.dev_</span>
                <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {currentYear} VibeScribe by <span className="text-gray-400 font-medium">Dev Sharma</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-gray-500">
              <a
                href="https://github.com/AegisX-Dev/VibeScribe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-400 transition-colors flex items-center gap-1"
              >
                <Github className="w-4 h-4" />
                Open Source
              </a>
              <span>•</span>
              <span className="px-2 py-1 bg-purple-500/10 text-purple-400 rounded-md font-medium">
                Vibe Buildathon 🚀
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
