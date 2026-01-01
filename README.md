# Hindustani Raga Identifier

An AI-powered web application that identifies Hindustani Classical ragas based on their Aroha (ascending) and Avaroha (descending) note patterns using Google's Gemini AI.

## Features

- 🎵 **Interactive Note Selection**: Visual interface with audio playback for selecting notes
- 🤖 **AI-Powered Identification**: Uses Gemini 2.0 Flash with Google Search verification
- 📚 **Comprehensive Analysis**: Provides Thaat classification, Vadi/Samvadi notes, and detailed reasoning
- 🎥 **Real YouTube Videos**: Integrates YouTube Data API for authentic raga performances
- 📖 **Educational Resources**: Links to authoritative sources like ragajunglism.org
- 🎨 **Beautiful UI**: Modern, responsive design with smooth animations

## Getting Started

### Prerequisites

- Node.js 18+ installed
- Google Gemini API key ([Get one here](https://aistudio.google.com/))
- YouTube Data API key (optional, for real video links)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/raga-identifier.git
   cd raga-identifier
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Edit `.env.local` and add your API keys:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   YOUTUBE_API_KEY=your_youtube_api_key_here
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open [http://localhost:3000](http://localhost:3000)** in your browser

## How It Works

1. **Select Notes**: Choose notes for Aroha and Avaroha using the interactive selector
2. **AI Analysis**: Gemini AI analyzes the note patterns and searches for verification
3. **Get Results**: Receive the identified raga with confidence level, Thaat classification, and educational resources

## Technology Stack

- **Framework**: Next.js 16 (App Router)
- **AI Model**: Google Gemini 2.0 Flash with Google Search
- **APIs**: YouTube Data API v3
- **Styling**: CSS Modules with modern design
- **Fonts**: Outfit & Playfair Display (Google Fonts)

## Project Structure

```
raga-identifier/
├── src/
│   ├── app/
│   │   ├── api/guess-raga/    # API route for raga identification
│   │   ├── page.tsx            # Main page component
│   │   └── layout.tsx          # Root layout with metadata
│   ├── components/
│   │   ├── NoteSelector.tsx    # Interactive note selection UI
│   │   ├── RagaCard.tsx        # Results display component
│   │   └── ResourceLinks.tsx   # YouTube & article links
│   └── utils/
│       └── youtube.ts          # YouTube API integration
├── public/samples/             # Audio samples for notes
└── .env.local                  # Environment variables (gitignored)
```

## API Keys Setup

See [GEMINI_SETUP.md](./GEMINI_SETUP.md) for detailed instructions on obtaining and configuring API keys.

## Deployment

This app is optimized for deployment on [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Import the repository in Vercel
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY`
   - `YOUTUBE_API_KEY`
4. Deploy!

For detailed deployment instructions, see the deployment guide in the project documentation.

## Security

- ✅ API keys are stored in `.env.local` (gitignored)
- ✅ Environment variables are loaded securely via `process.env`
- ✅ No sensitive data is committed to version control
- ✅ `.env.example` template provided for collaborators

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.

## Acknowledgments

- Built with [Next.js](https://nextjs.org)
- Powered by [Google Gemini AI](https://ai.google.dev/)
- Raga information from [Raga Junglism](https://ragajunglism.org)
- YouTube integration via [YouTube Data API](https://developers.google.com/youtube/v3)

---

**Note**: This application requires API keys to function. The Gemini API offers a generous free tier, and YouTube Data API provides 10,000 quota units per day for free.
