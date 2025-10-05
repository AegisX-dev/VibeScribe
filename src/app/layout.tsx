import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibeScribe - AI Content Generator",
  description: "Generate personalized content with AI",
  icons: {
    icon: '/Logo.png',
    apple: '/Logo.png',
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
      </body>
    </html>
  );
}
