import { FaGithub, FaLinkedin, FaInstagram, FaHeart, FaExternalLinkAlt } from 'react-icons/fa';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[var(--content)] border-t border-[var(--border)] mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[var(--accent)]">VibeScribe</h3>
            <p className="text-[var(--text-secondary)] text-sm leading-relaxed">
              Transform your raw thoughts into authentic, platform-specific social media posts with AI-powered creativity.
            </p>
            <div className="flex items-center gap-2 text-sm text-[var(--text-secondary)]">
              <span>Built with</span>
              <FaHeart className="w-4 h-4 text-red-500 fill-red-500 animate-pulse" />
              <span>for Vibe Buildathon</span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Tech Stack</h4>
            <ul className="space-y-2 text-sm text-[var(--text-secondary)]">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Next.js 15 + TypeScript
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                DeepSeek R1 via OpenRouter
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Supabase + PostgreSQL
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[var(--accent)] rounded-full"></span>
                Tailwind CSS v4
              </li>
            </ul>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-[var(--text-primary)]">Connect</h4>
            <div className="flex flex-col gap-3">
              <a
                href="https://github.com/AegisX-Dev"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors group"
              >
                <FaGithub className="w-5 h-5" />
                <span className="text-sm">@AegisX-Dev</span>
                <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://linkedin.com/in/dev-sharma-aegis"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent)] transition-colors group"
              >
                <FaLinkedin className="w-5 h-5" />
                <span className="text-sm">dev-sharma-aegis</span>
                <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="https://instagram.com/Ryou.dev_"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[var(--text-secondary)] hover:text-pink-400 transition-colors group"
              >
                <FaInstagram className="w-5 h-5" />
                <span className="text-sm">@Ryou.dev_</span>
                <FaExternalLinkAlt className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[var(--border)]">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-[var(--text-secondary)]">
              © {currentYear} VibeScribe by <span className="text-[var(--text-primary)] font-medium">Dev Sharma</span>. All rights reserved.
            </p>
            <div className="flex items-center gap-4 text-xs text-[var(--text-secondary)]">
              <a
                href="https://github.com/AegisX-Dev/VibeScribe"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[var(--text-primary)] transition-colors flex items-center gap-1"
              >
                <FaGithub className="w-4 h-4" />
                Open Source
              </a>
              <span>•</span>
              <span className="px-2 py-1 bg-[var(--accent)]/10 text-[var(--accent)] rounded-md font-medium">
                Vibe Buildathon 🚀
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
