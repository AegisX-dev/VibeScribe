# VibeScribe 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Gemini API](https://img.shields.io/badge/Gemini-2.5%20Flash-4285F4?logo=google)](https://ai.google.dev/)
[![React Icons](https://img.shields.io/badge/Icons-React%20Icons-red?logo=react)](https://react-icons.github.io/react-icons/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vibe-scribe.vercel.app)
[![Version](https://img.shields.io/badge/version-2.0.0-green.svg)](https://github.com/AegisX-Dev/VibeScribe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **[Live Demo](https://vibe-scribe.vercel.app)** | � **[Read the Case Study](https://ai-orchestrator.hashnode.dev/from-ai-tool-to-ai-partner-re-architecting-vibescribe-for-deep-personalization)** | ⭐ **Star us on GitHub!**

**VibeScribe** is an AI-powered content partner that transforms raw, unstructured thoughts into authentic, platform-specific social media posts. The goal is to generate content that feels genuinely human, maintains _your_ unique brand voice, and saves creators hours of time.

This project is a single-page web application built with Next.js. The core functionality revolves around taking user input, sending it to a backend API route which then calls the **Google AI API** with **Gemini 2.5 Flash**, and displaying the formatted results with a human-likeness score.

## 🎯 Quick Start

Want to try it out right now? Visit **[vibe-scribe.vercel.app](https://vibe-scribe.vercel.app)** and:

1.  💭 Dump your raw ideas into the text area (no formatting needed!)
2.  🎨 Choose your tone (Inspirational, Professional, or Witty)
3.  ✨ Click "Generate Content" and watch the magic happen!
4.  📋 Copy your favorite posts with one click

**Pro Tip:** Go to the Personalization Box and save your profile. The AI will use this data to generate deeply personalized content that matches your role, audience, and unique writing style!

## � Hero Demo

![VibeScribe Hero Demo](./assets/hero-demo.gif)

## ✨ Core Features

- **🧠 Unstructured Input:** A single "brain dump" text area for messy notes and ideas - no structure required!
- **🤖 Next-Gen AI Core:** Leverages **Gemini 2.5 Flash** via the Google AI API for state-of-the-art, human-like content generation.
- **👤 Deep Personalization:** The Personalization Box now saves your core identity (`role`, `project_name`, `target_audience`, `style_keywords`) to Supabase.
- **✨ AI Style Mimicking (Optional):** Provide a URL to your blog or portfolio (like your Hashnode blog), and the AI will analyze its style to generate content in _your_ unique voice.
- **🎨 Tone Selection:** Choose from multiple tones (Inspirational, Professional, Witty) to guide the AI.
- **📱 Multi-Platform Support:** Generates optimized content for Instagram, LinkedIn, Twitter/X, Facebook, TikTok, and YouTube.
- **💾 Profile Management:** Create, update, and delete your profile with Supabase database persistence.
- **📊 Human Likeness Score:** Each generated post includes a score indicating how authentic and human-like it sounds.
- **📋 One-Click Copy:** Easily copy generated posts to clipboard with visual feedback.
- **🌙 Modern UI:** Clean, minimalist, dark-themed interface with smooth animations and an intuitive user experience.

## 🛠️ Tech Stack

This project is built with a modern, serverless-first tech stack:

- **Framework:** [Next.js](https://nextjs.org/) 15 (using the App Router with Server Actions)
  - _Why?_ Latest App Router for optimal performance, built-in API routes, and excellent developer experience.
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5.0+
  - _Why?_ Type safety prevents bugs, better IDE support, and improved code maintainability.
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4
  - _Why?_ Rapid UI development for a clean, minimalist, dark-first design system.
- **AI Service:** [Google AI API](https://ai.google.dev/) with [Gemini 2.5 Flash](https://ai.google.dev/gemini-api/docs/models)
  - _Why?_ State-of-the-art model for creative, personalized, and human-like text generation with a massive 1M token context window.
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL) with Row Level Security policies
  - _Why?_ Real-time capabilities, built-in authentication, and powerful PostgreSQL features.
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
  - _Why?_ Simple, built-in solution without additional dependencies.
- **API Routes:** Next.js API Routes for serverless functions
  - _Why?_ Seamless backend integration, automatic deployment, and zero server management.
- **Icons & UI:** [React Icons](https://react-icons.github.io/react-icons/)
  - _Why?_ Comprehensive, popular, and tree-shakeable icon library.
- **Deployment:** [Vercel](https://vercel.com/) (recommended)
  - _Why?_ Zero-config deployment, automatic SSL, global CDN, and excellent Next.js integration.
- **File-based Routing:** All pages and API routes are located in the `src/app/` directory.
- **Server Components:** Most components are React Server Components for better performance.
- **API Routes:** Backend logic is handled in `src/app/api/` using Next.js API Routes.

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Google AI API key ([Get one here](https://aistudio.google.com/app/apikey))
- A Supabase account and project ([Get started here](https://supabase.com/))

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/AegisX-dev/VibeScribe.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd vibescribe
    ```
3.  **Install dependencies:**
    (This will install Next.js, React, Tailwind, etc. from `package.json`)
    ```sh
    npm install
    ```
4.  **Set up Supabase:**

    - Create a new Supabase project.
    - Go to the **SQL Editor** in your Supabase dashboard.
    - Run the contents of `supabase-setup.sql` to create the `profiles` table and enable Row Level Security.
    - Then, run the contents of `alter-profiles-table.sql` to add the new columns required for V2.

5.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your API keys. Get your Google AI key from [Google AI Studio](https://aistudio.google.com/app/apikey).
    ```
    GOOGLE_API_KEY="your_google_api_key_here"
    NEXT_PUBLIC_SITE_URL="http://localhost:3000"
    NEXT_PUBLIC_SUPABASE_URL="your_supabase_project_url"
    NEXT_PUBLIC_SUPABASE_ANON_KEY="your_supabase_anon_key"
    ```
    **Note:** For production, change `NEXT_PUBLIC_SITE_URL` to your live URL.
6.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 📂 Project Structure

The project follows a standard Next.js App Router structure:

```
/
├── public/                 # Static assets (images, fonts)
├── src/
│   ├── app/                # Main application folder (App Router)
│   │   ├── api/            # API routes (server-side logic)
│   │   │   ├── generate/   # Handles AI content generation
│   │   │   └── profile/    # Handles user profile CRUD
│   │   ├── components/     # Reusable React components
│   │   ├── context/        # React context providers
│   │   ├── globals.css     # Global styles
│   │   ├── layout.tsx      # Root layout
│   │   └── page.tsx        # Main page component
│   └── lib/                # Helper functions and utilities
│       ├── supabaseClient.ts # Supabase client configuration
│       └── types.ts        # TypeScript type definitions (e.g., UserProfile)
├── supabase-setup.sql      # Initial database schema
├── alter-profiles-table.sql # Database schema modifications
├── next.config.ts          # Next.js configuration
└── package.json            # Project dependencies
```

## 🔌 API Endpoints

The application has two main API endpoints:

### `POST /api/generate`

This endpoint is responsible for communicating with the **Google AI API** service using the **Gemini 2.5 Flash** model.

- **Request Body:**
  The frontend sends a JSON object with the user's input and their rich profile.

  ```json
  {
    "rawText": "My new AI product VibeScribe just launched. Built for a buildathon. It turns ideas into social posts.",
    "selectedTone": "🚀 Inspirational",
    "userProfile": {
      "id": "user-123",
      "full_name": "Dev Sharma",
      "role": "AI Founder & Indie Hacker",
      "project_name": "VibeScribe",
      "project_description": "An AI-powered content partner that turns raw ideas into authentic social media posts.",
      "target_audience": "Developers, content creators, and startup founders",
      "style_keywords": "Technical, witty, and inspirational. Uses emojis.",
      "source_url": "[https://my-hashnode-blog.com/my-best-article](https://my-hashnode-blog.com/my-best-article)",
      "instagram_username": "@Ryou.dev_",
      "twitter_username": "@AegisX-Dev",
      "linkedin_username": "dev-sharma-aegis"
    }
  }
  ```

- **Success Response (200):**
  On success, the API returns a JSON object containing an array of generated posts.

  ```json
  {
    "posts": [
      {
        "platform": "Instagram",
        "content": "Just launched VibeScribe! 🚀 We built this AI content partner during a buildathon to turn messy ideas into magic social posts. So proud of the team! #AI #ContentCreation #StartupLife #Buildathon",
        "humanLikenessScore": 9
      },
      {
        "platform": "LinkedIn",
        "content": "Thrilled to announce the launch of VibeScribe, an AI-powered tool designed to help creators and solopreneurs transform raw thoughts into authentic, platform-specific content.\n\nOur goal was to solve the 'blank page' problem and create an AI that enhances, rather than replaces, the human voice. Excited for the journey ahead.\n\n#AI #SaaS #ContentMarketing #ProductLaunch",
        "humanLikenessScore": 9
      }
    ]
  }
  ```

- **Error Response (400/500):**
  Returns a JSON object with an error message.
  ```json
  {
    "error": "Failed to generate content",
    "details": "Error message details"
  }
  ```

### `GET /api/profile?id={userId}`

Retrieves a user's profile information from the database.

### `POST /api/profile`

Creates or updates a user's profile in the database.

- **Request Body:**

  ```json
  {
    "id": "user-123",
    "full_name": "Dev Sharma",
    "role": "AI Founder & Indie Hacker",
    "project_name": "VibeScribe",
    "project_description": "An AI-powered content partner that turns raw ideas into authentic social media posts.",
    "target_audience": "Developers, content creators, and startup founders",
    "style_keywords": "Technical, witty, and inspirational. Uses emojis.",
    "source_url": "[https://my-hashnode-blog.com/my-best-article](https://my-hashnode-blog.com/my-best-article)",
    "instagram_username": "@Ryou.dev_",
    "twitter_username": "@AegisX-Dev",
    "linkedin_username": "dev-sharma-aegis"
  }
  ```

- **Success Response (200):**
  ```json
  {
    "message": "Profile saved successfully!",
    "profile": { ... }
  }
  ```

### `DELETE /api/profile?id={userId}`

Deletes a user's profile from the database.

## 🎨 UI Components

### `PersonalizationBox`

The `PersonalizationBox` component allows users to save their profile information for deeply personalized content generation.

**V2 Features:**

- **Auto-save user ID:** Generates and stores a unique user ID in `localStorage`.
- **Deep Personalization Fields:**
  - `full_name`
  - `role` (Your title, e.g., "Founder")
  - `project_name`
  - `project_description`
  - `target_audience`
  - `style_keywords` (e.g., "Witty, technical, uses emojis")
  - `source_url` (Optional URL to your blog for style-mimicking)
  - Social handles (Instagram, Twitter/X, LinkedIn)
- **Database persistence:** Saves all profile data to Supabase.
- **Auto-load:** Retrieves existing profile data on page load.
- **Delete functionality:** Users can delete their profile with a confirmation modal.
- **Visual feedback:** Success/error messages for all operations.

- **Usage:**
  ```typescript
  <PersonalizationBox className="sticky top-8" />
  ```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

- **Live Production URL:** `https://vibe-scribe.vercel.app`

### Deploy Your Own:

1.  Push your code to GitHub
2.  Import your repository to Vercel
3.  Add environment variables in Vercel dashboard:
    - `GOOGLE_API_KEY` - Your Google AI API key
    - `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://vibe-scribe.vercel.app`)
    - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
    - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
4.  Deploy!

## ❓ FAQ

**Q: Do I need a Google AI API key to use the live demo?**
A: No! The live demo at `vibe-scribe.vercel.app` is fully functional and ready to use. You only need an API key if you're running your own instance locally.

**Q: Is my data stored anywhere?**
A: Your input text ("brain dump") is only sent to the AI service for generation and is not stored. If you choose to save a profile in the Personalization Box, your profile information is stored securely in your own Supabase database.

**Q: How is the Human Likeness Score calculated?**
A: The score is generated by the Gemini 2.5 Flash AI model based on factors like natural language flow, varied sentence structure, appropriate emoji usage, and authenticity markers that make content feel human-written rather than AI-generated.

**Q: Can I use this for commercial purposes?**
A: Yes! VibeScribe is open source under the MIT License, which allows commercial use. However, please note that you'll need your own Google AI API key and are responsible for any associated costs.

**Q: Which AI model does VibeScribe use?**
A: We use Gemini 2.5 Flash via the Google AI API. It's a state-of-the-art model known for producing highly natural, human-like text with a massive context window, making it perfect for deep personalization.

**Q: Can I add more platforms?**
A: Absolutely! The code is modular and easy to extend. You can add new platforms by modifying the prompt in `/src/app/api/generate/route.ts` and updating the UI components.

**QS: Why do I get an error when trying to delete my profile?**
A: Make sure the Supabase Row Level Security (RLS) policies are properly set up. Run the `supabase-setup.sql` script in your Supabase SQL Editor to configure the necessary permissions.

## 📝 License

This project is open source and available under the [MIT License](httpsaws.com/s/M).

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/AegisX-Dev/VibeScribe/issues).

## 👨‍💻 Author

**Dev Sharma**

- GitHub: [@AegisX-Dev](https://github.com/AegisX-Dev)
- Instagram: [@Ryou.dev\_](https://www.instagram.com/ryou.dev_/)
- LinkedIn: [dev-sharma-aegis](https://www.linkedin.com/in/dev-sharma-aegis/)
- Website: [vibe-scribe.vercel.app](https://vibe-scribe.vercel.app)

## 💡 About the Project

VibeScribe was built to solve a common problem: the "blank page syndrome" that content creators face. Instead of replacing human creativity, VibeScribe enhances it by transforming rough ideas into polished, platform-ready content that maintains your unique voice.

The V2 project showcases:

- Modern React patterns with Next.js 15
- Integration with state-of-the-art AI models (Gemini 2.5 Flash)
- Deep Personalization with style-mimicking capabilities
- Full-stack development with serverless architecture
- Database design with proper security policies (Row Level Security)
- Clean, responsive, minimalist UI/UX design
- Production-ready deployment on Vercel

### 🎯 Use Cases

VibeScribe is perfect for:

- **Content Creators:** Generate weeks of content in minutes
- **Marketing Teams:** Maintain brand consistency across platforms
- **Solopreneurs:** Save time on social media without sacrificing quality
- **Agencies:** Scale content production for multiple clients
- **Bloggers:** Repurpose blog posts into social media content
- **E-commerce:** Create product launch announcements across platforms

### 🔒 Security & Privacy

- **Row Level Security (RLS):** Supabase policies ensure users can only access their own data
- **No Data Retention:** Input text is processed in real-time and not stored
- **Secure API Keys:** Environment variables protect sensitive credentials
- **HTTPS Only:** All communications are encrypted in transit
- **Open Source:** Full transparency - review the code yourself!

---

Made with ❤️ using Next.js, TypeScript, and AI | Built during a Hackathon 🚀

⭐ **If you find this project helpful, please consider giving it a star on GitHub!**
