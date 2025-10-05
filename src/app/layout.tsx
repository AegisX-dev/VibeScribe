import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeScribe - AI-Powered Social Media Content Generator",
  description: "Transform your raw thoughts into authentic, platform-specific social media posts with AI. Generate engaging content for Instagram, LinkedIn, Twitter, Facebook, TikTok, and YouTube in seconds.",
  keywords: ["AI content generator", "social media", "content creation", "Instagram", "LinkedIn", "Twitter", "AI writing", "content marketing", "DeepSeek", "OpenAI"],
  authors: [{ name: "Dev Sharma", url: "https://github.com/AegisX-Dev" }],
  creator: "Dev Sharma",
  publisher: "VibeScribe",
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "VibeScribe - AI-Powered Social Media Content Generator",
    description: "Transform your raw thoughts into authentic, platform-specific social media posts with AI. Generate engaging content in seconds.",
    siteName: "VibeScribe",
    images: [
      {
        url: "/output-view.png",
        width: 1200,
        height: 630,
        alt: "VibeScribe - AI Content Generator",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "VibeScribe - AI-Powered Social Media Content Generator",
    description: "Transform your raw thoughts into authentic, platform-specific social media posts with AI.",
    images: ["/output-view.png"],
    creator: "@ryou_dev_",
  },
  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-900 transition-colors duration-300`}
      >
        {/* Logo Section */}
        <div className="bg-gray-800 py-6 transition-colors duration-300">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
            {/* Using the Logo.png file from the public folder */}
            <Image 
              src="/Logo.png" 
              alt="VibeScribe Logo" 
              width={150} 
              height={45}
              className="h-auto rounded-full"
              priority
            />
          </div>
        </div>
        {children}
        <Footer />
      </body>
    </html>
  );
}
