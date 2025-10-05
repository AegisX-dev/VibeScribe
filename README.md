# VibeScribe 🚀

[![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38bdf8?logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?logo=vercel)](https://vibe-scribe.vercel.app)
[![Version](https://img.shields.io/badge/version-0.1.0-green.svg)](https://github.com/AegisX-Dev/VibeScribe)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

🌐 **[Live Demo](https://vibe-scribe.vercel.app)** | 🚀 **Deployed on Vercel** | ⭐ **Star us on GitHub!**

**VibeScribe** is an AI-powered content partner that transforms raw, unstructured thoughts into authentic, platform-specific social media posts. The goal is to generate content that feels genuinely human, maintains a consistent brand voice, and saves creators hours of time.

This project is a single-page web application built with Next.js. The core functionality revolves around taking user input, sending it to a backend API route which then calls the OpenRouter API with DeepSeek R1, and displaying the formatted results with a human-likeness score.

## 🎯 Quick Start

Want to try it out right now? Visit **[vibe-scribe.vercel.app](https://vibe-scribe.vercel.app)** and:

1. 💭 Dump your raw ideas into the text area (no formatting needed!)
2. 🎨 Choose your tone (Inspirational, Professional, or Witty)
3. 📝 Optionally add your brand voice description
4. ✨ Click "Generate Content" and watch the magic happen!
5. 📋 Copy your favorite posts with one click

**Pro Tip:** Save your profile in the Personalization Box to get even more tailored content!

## 📸 Screenshots

### Main Interface - Input & Output

![VibeScribe Interface showing generated posts](./public/output-view.png)
_Transform messy brain dumps into polished, platform-specific posts with AI-powered generation_

### Personalization & Platform Selection

![Platform selection and personalization panel](./public/input-view.png)
_Customize your content with brand voice, tone selection, and save your profile for personalized results_

## ✨ Core Features

- **🧠 Unstructured Input:** A single "brain dump" text area for messy notes and ideas - no structure required!
- **🤖 AI-Powered Generation:** Leverages DeepSeek R1 via OpenRouter API for intelligent content creation.
- **🎨 Tone & Voice Customization:** Choose from multiple tones (Inspirational, Professional, Witty) and describe your unique brand voice.
- **📱 Multi-Platform Support:** Generates optimized content for Instagram, LinkedIn, Twitter/X, Facebook, TikTok, and YouTube.
- **✨ Human-Like Nuances:** AI focuses on natural language flow, varied sentence structure, and appropriate emoji usage.
- **👤 Personalization Box:** Save your profile information (name, social media handles, interests) for personalized content generation.
- **💾 Profile Management:** Create, update, and delete your profile with Supabase database persistence.
- **📊 Human Likeness Score:** Each generated post includes a score indicating how authentic and human-like it sounds.
- **📋 One-Click Copy:** Easily copy generated posts to clipboard with visual feedback.
- **🎯 Platform-Specific Formatting:** Content tailored to each platform's best practices and character limits.
- **🌙 Modern UI:** Clean, dark-themed interface with smooth animations and intuitive user experience.

## 🛠️ Tech Stack

This project is built with a modern, serverless-first tech stack:

- **Framework:** [Next.js](https://nextjs.org/) 15 (using the App Router with Server Actions)
  - _Why?_ Latest App Router for optimal performance, built-in API routes, and excellent developer experience
- **Language:** [TypeScript](https://www.typescriptlang.org/) 5.0+
  - _Why?_ Type safety prevents bugs, better IDE support, and improved code maintainability
- **Styling:** [Tailwind CSS](https://tailwindcss.com/) v4 (with custom animations and gradients)
  - _Why?_ Rapid UI development, consistent design system, and tiny production bundle sizes
- **AI Service:** [OpenRouter API](https://openrouter.ai/) with [DeepSeek R1](https://openrouter.ai/models/deepseek/deepseek-r1) model
  - _Why?_ Access to cutting-edge AI models, cost-effective pricing, and consistent API interface
- **Database:** [Supabase](https://supabase.com/) (PostgreSQL) with Row Level Security policies
  - _Why?_ Real-time capabilities, built-in authentication, and powerful PostgreSQL features
- **State Management:** React Hooks (`useState`, `useEffect`, `useCallback`)
  - _Why?_ Simple, built-in solution without additional dependencies
- **API Routes:** Next.js API Routes for serverless functions
  - _Why?_ Seamless backend integration, automatic deployment, and zero server management
- **Icons & UI:** Lucide React for icons, custom components
  - _Why?_ Lightweight, customizable, and tree-shakeable icon library
- **Deployment:** [Vercel](https://vercel.com/) (recommended)
  - _Why?_ Zero-config deployment, automatic SSL, global CDN, and excellent Next.js integration
- **Environment:** Node.js 18+

## 📂 Project Structure

The project follows the standard Next.js App Router structure. Understanding this structure is key to navigating the codebase.

```
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ ├── generate/
│ │ │ │ └── route.ts # The backend API endpoint. Handles OpenRouter API calls.
│ │ │ └── profile/
│ │ │   └── route.ts # API endpoint for user profile CRUD operations.
│ │ ├── components/
│ │ │ ├── ConfigSection.tsx # Component for tone selection and the generate button.
│ │ │ ├── ContentCard.tsx # Displays a single generated post with a copy button.
│ │ │ ├── InputSection.tsx # Component for the main textarea and brand voice input.
│ │ │ ├── OutputSection.tsx # Displays loading/error states and the grid of ContentCards.
│ │ │ └── PersonalizationBox.tsx # Component for user profile management.
│ │ ├── globals.css # Global styles for Tailwind CSS.
│ │ ├── layout.tsx # Root layout.
│ │ └── page.tsx # The main page component. Manages all application state.
│ ├── lib/
│ │ └── supabaseClient.ts # Supabase client configuration.
├── .env.local # For storing environment variables (API keys).
├── next.config.ts # Next.js configuration.
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- An OpenRouter API key ([Get one here](https://openrouter.ai/keys))
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
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Set up Supabase:**

    - Create a new Supabase project
    - Go to the SQL Editor in your Supabase dashboard
    - Run the SQL script from `supabase-setup.sql` file in this repository
    - This will create the `profiles` table with proper RLS (Row Level Security) policies
    - **IMPORTANT:** The RLS policies are required for delete operations to work properly!

5.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your API keys:
    ```
    OPENROUTER_API_KEY=your_openrouter_api_key_here
    NEXT_PUBLIC_SITE_URL=https://vibe-scribe.vercel.app
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```
    **Note:** For local development, use `http://localhost:3000` for `NEXT_PUBLIC_SITE_URL`
6.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔌 API Endpoints

The application has two main API endpoints:

### `POST /api/generate`

This endpoint is responsible for communicating with the OpenRouter API service using the DeepSeek R1 model.

- **Request Body:**
  The frontend sends a JSON object with the user's input.

  ```json
  {
    "rawText": "My new AI product VibeScribe just launched. Built for a buildathon. It turns ideas into social posts.",
    "brandVoice": "Excited and energetic, like a startup founder on launch day.",
    "selectedTone": "🚀 Inspirational",
    "userProfile": {
      "id": "user-123",
      "full_name": "John Doe",
      "instagram_username": "@johndoe",
      "twitter_username": "@johndoe",
      "linkedin_username": "johndoe",
      "other_details": "Tech enthusiast and AI builder"
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
      },
      {
        "platform": "Twitter/X",
        "content": "1/ We just launched VibeScribe! 🚀\n\nIt’s an AI tool born out of a buildathon that turns your brain dumps into clean, human-like social media posts for IG, LinkedIn, and more.\n\nNo more robotic content.",
        "humanLikenessScore": 10
      }
    ]
  }
  ```

- **Error Response (400):**
  If required fields are missing:

  ```json
  {
    "error": "Raw text is required"
  }
  ```

- **Error Response (500):**
  If the API call fails:
  ```json
  {
    "error": "Failed to generate content",
    "details": "Error message details"
  }
  ```

### `GET /api/profile?id={userId}`

Retrieves a user's profile information from the database.

- **Query Parameters:**

  - `id` (required): The unique user ID

- **Success Response (200):**

  ```json
  {
    "profile": {
      "id": "user-123",
      "full_name": "John Doe",
      "instagram_username": "@johndoe",
      "twitter_username": "@johndoe",
      "linkedin_username": "johndoe",
      "other_details": "Tech enthusiast and AI builder",
      "created_at": "2025-10-05T10:00:00Z",
      "updated_at": "2025-10-05T10:00:00Z"
    }
  }
  ```

- **No Profile Response (200):**
  ```json
  {
    "profile": null,
    "message": "No profile found. Please create one."
  }
  ```

### `POST /api/profile`

Creates or updates a user's profile in the database.

- **Request Body:**

  ```json
  {
    "id": "user-123",
    "full_name": "John Doe",
    "instagram_username": "@johndoe",
    "twitter_username": "@johndoe",
    "linkedin_username": "johndoe",
    "other_details": "Tech enthusiast and AI builder"
  }
  ```

- **Success Response (200):**

  ```json
  {
    "message": "Profile saved successfully!",
    "profile": {
      "id": "user-123",
      "full_name": "John Doe",
      "instagram_username": "@johndoe",
      "twitter_username": "@johndoe",
      "linkedin_username": "johndoe",
      "other_details": "Tech enthusiast and AI builder"
    }
  }
  ```

- **Error Response (400):**
  ```json
  {
    "error": "User ID is required."
  }
  ```

### `DELETE /api/profile?id={userId}`

Deletes a user's profile from the database.

- **Query Parameters:**

  - `id` (required): The unique user ID

- **Success Response (200):**

  ```json
  {
    "message": "Profile deleted successfully!"
  }
  ```

- **Error Response (400):**
  ```json
  {
    "error": "User ID is required."
  }
  ```

## 🎨 UI Components

### PersonalizationBox

The PersonalizationBox component allows users to save their profile information for personalized content generation.

**Features:**

- **Auto-save user ID:** Generates and stores a unique user ID in localStorage
- **Form fields:** Full name, Instagram, Twitter/X, LinkedIn usernames, and other details
- **Database persistence:** Saves data to Supabase
- **Auto-load:** Retrieves existing profile data on page load
- **Delete functionality:** Users can delete their profile with a confirmation modal
- **Visual feedback:** Success/error messages for all operations

**Usage:**

```tsx
<PersonalizationBox className="sticky top-8" />
```

## 🚀 Deployment

This project is optimized for deployment on Vercel:

**Live Production URL:** [https://vibe-scribe.vercel.app](https://vibe-scribe.vercel.app)

### Deploy Your Own:

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel dashboard:
   - `OPENROUTER_API_KEY` - Your OpenRouter API key
   - `NEXT_PUBLIC_SITE_URL` - Your production URL (e.g., `https://vibe-scribe.vercel.app`)
   - `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anonymous key
4. Deploy!

### Vercel Domains:

- Production: `vibe-scribe.vercel.app`
- Git Branch (main): `vibe-scribe-git-main-aegisx-devs.vercel.app`
- Deployment Preview: `vibe-scribe-5fsf57ztb-aegisx-devs.vercel.app`

## ❓ FAQ

### **Q: Do I need an OpenRouter API key to use the live demo?**

A: No! The live demo at [vibe-scribe.vercel.app](https://vibe-scribe.vercel.app) is fully functional and ready to use. You only need an API key if you're running your own instance locally.

### **Q: Is my data stored anywhere?**

A: Your input text is only sent to the AI service for generation and is not stored on our servers. If you choose to save a profile in the Personalization Box, only your profile information (name, social handles, interests) is stored in Supabase.

### **Q: How is the Human Likeness Score calculated?**

A: The score is generated by the DeepSeek R1 AI model based on factors like natural language flow, varied sentence structure, appropriate emoji usage, and authenticity markers that make content feel human-written rather than AI-generated.

### **Q: Can I use this for commercial purposes?**

A: Yes! VibeScribe is open source under the MIT License, which allows commercial use. However, please note that you'll need your own OpenRouter API key and are responsible for any associated costs.

### **Q: Which AI model does VibeScribe use?**

A: We use DeepSeek R1 via the OpenRouter API. It's a cutting-edge model known for producing highly natural, human-like text with strong reasoning capabilities.

### **Q: Can I add more platforms?**

A: Absolutely! The code is modular and easy to extend. You can add new platforms by modifying the prompt in `/src/app/api/generate/route.ts` and updating the UI components.

### **Q: Why do I get an error when trying to delete my profile?**

A: Make sure the Supabase Row Level Security (RLS) policies are properly set up. Run the `supabase-setup.sql` script in your Supabase SQL Editor to configure the necessary permissions.

### **Q: Is there a character limit for input?**

A: The interface doesn't impose a hard limit, but for best results, we recommend 50-500 words. Very short inputs may not provide enough context, while extremely long inputs might produce less focused results.

## 📝 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

### How to Contribute:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/AmazingFeature`)
3. **Commit your changes** (`git commit -m 'Add some AmazingFeature'`)
4. **Push to the branch** (`git push origin feature/AmazingFeature`)
5. **Open a Pull Request**

### Contribution Guidelines:

- Write clear, descriptive commit messages
- Follow the existing code style and conventions
- Add tests for new features when applicable
- Update documentation as needed
- Keep PRs focused on a single feature or fix

## 👨‍💻 Author

**Dev Sharma**

- GitHub: [@AegisX-Dev](https://github.com/AegisX-Dev)
- Instagram: [@Ryou.dev\_](https://instagram.com/Ryou.dev_)
- LinkedIn: [dev-sharma-aegis](https://linkedin.com/in/dev-sharma-aegis)
- Website: [vibe-scribe.vercel.app](https://vibe-scribe.vercel.app)

## 💡 About the Project

VibeScribe was built as part of a hackathon to solve a common problem: the "blank page syndrome" that content creators face. Instead of replacing human creativity, VibeScribe enhances it by transforming rough ideas into polished, platform-ready content that maintains your unique voice.

The project showcases:

- Modern React patterns with Next.js 15
- Integration with cutting-edge AI models (DeepSeek R1)
- Full-stack development with serverless architecture
- Database design with proper security policies (Row Level Security)
- Clean, responsive UI/UX design
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

**⭐ If you find this project helpful, please consider giving it a star on GitHub!**
