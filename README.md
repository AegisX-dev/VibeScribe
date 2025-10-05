# VibeScribe 🚀

**VibeScribe** is an AI-powered content partner that transforms raw, unstructured thoughts into authentic, platform-specific social media posts. The goal is to generate content that feels genuinely human, maintains a consistent brand voice, and saves creators hours of time.

This project is a single-page web application built with Next.js. The core functionality revolves around taking user input, sending it to a backend API route which then calls the OpenAI API, and displaying the formatted results.

## ✨ Core Features

- **Unstructured Input:** A single "brain dump" text area for messy notes and ideas.
- **AI-Powered Generation:** Leverages a powerful LLM to create content.
- **Tone & Voice Customization:** Users can select a tone and describe their brand voice to guide the AI.
- **Platform-Specific Output:** Generates optimized content for Instagram, LinkedIn, and Twitter/X.
- **Human-Like Nuances:** Focuses on natural language flow, varied sentence structure, and appropriate emoji usage.
- **Simple UI:** A clean, intuitive interface for a seamless user experience.

## 🛠️ Tech Stack

This project is built with a modern, serverless-first tech stack:

- **Framework:** [Next.js](https://nextjs.org/) 14 (using the App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Service:** [Google Gemini API](https://ai.google.dev/) (specifically `gemini-pro`)
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Deployment:** [Vercel](https://vercel.com/)

## 📂 Project Structure

The project follows the standard Next.js App Router structure. Understanding this structure is key to navigating the codebase.

```
├── src/
│ ├── app/
│ │ ├── api/
│ │ │ └── generate/
│ │ │ └── route.ts # The backend API endpoint. Handles Gemini API calls.
│ │ ├── components/
│ │ │ ├── ConfigSection.tsx # Component for tone selection and the generate button.
│ │ │ ├── ContentCard.tsx # Displays a single generated post with a copy button.
│ │ │ ├── InputSection.tsx # Component for the main textarea and brand voice input.
│ │ │ └── OutputSection.tsx # Displays loading/error states and the grid of ContentCards.
│ │ ├── globals.css # Global styles for Tailwind CSS.
│ │ ├── layout.tsx # Root layout.
│ │ └── page.tsx # The main page component. Manages all application state.
├── .env.local # For storing environment variables (API keys).
├── next.config.js # Next.js configuration.
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Node.js (v18 or later)
- npm or yarn
- A Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

### Installation

1.  **Clone the repository:**
    ```sh
    git clone [https://github.com/your-username/vibescribe.git](https://github.com/your-username/vibescribe.git)
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd vibescribe
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```
4.  **Install the Gemini API package:**
    ```sh
    npm install @google/generative-ai
    ```
5.  **Set up environment variables:**
    Create a `.env.local` file in the root of the project and add your Gemini API key.
    ```
    GEMINI_API_KEY=your_gemini_api_key_here
    ```
6.  **Run the development server:**
    ```sh
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🔌 API Endpoint

The application has a single, critical API endpoint for generating content.

### `POST /api/generate`

This endpoint is responsible for communicating with the Google Gemini API service.

- **Request Body:**
  The frontend sends a JSON object with the user's input.

  ```json
  {
    "rawText": "My new AI product VibeScribe just launched. Built for a buildathon. It turns ideas into social posts.",
    "brandVoice": "Excited and energetic, like a startup founder on launch day.",
    "selectedTone": "🚀 Inspirational"
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

- **Error Response (500):**
  If the API call fails, it returns an error message.
  ```json
  {
    "error": "Failed to generate content."
  }
  ```
