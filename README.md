# Vibe Coding - AI-Powered Website Generator

An intelligent platform that generates complete Next.js websites from natural language prompts using advanced AI models through OpenRouter.

## Features

- **AI-Powered Generation**: Describe your website and get production-ready code instantly
- **Real-time Streaming**: Watch your code being generated in real-time with live updates
- **Modern Stack**: Built with Next.js 16, React 19, TypeScript, and Tailwind CSS
- **Responsive Design**: Beautiful dark theme with electric accents
- **Code Statistics**: Track generated code metrics and component counts
- **One-Click Copy**: Easily copy generated code to your clipboard
- **Settings Panel**: Configure AI generation preferences and API keys

## Quick Start

### Prerequisites

- Node.js 18+ installed
- An OpenRouter API key (get one free at [openrouter.ai](https://openrouter.ai))
- pnpm (or npm/yarn)

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
# or
pnpm install
```

2. Set up environment variables:

```bash
# Create a .env.local file in the root directory
OPENROUTER_API_KEY=your_api_key_here
```

3. Run the development server:

```bash
npm run dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Usage

### Landing Page

Visit the home page to learn about Vibe Coding features and benefits. Click "Start Building" to go to the generator.

### Generator Workspace

The generator has three panels:

1. **Left Panel - Prompt Input**
   - Describe your website in natural language
   - Use the quick examples for inspiration
   - Press Ctrl+Enter or click "Generate Website" to start

2. **Middle Panel - Generated Code**
   - View streaming code generation in real-time
   - Copy code with one click
   - See beautiful syntax highlighting

3. **Right Panel - Statistics**
   - View code metrics (lines, components, file size)
   - See deployment instructions
   - Get helpful next steps

### Settings

Click the gear icon in the generator header to:
- Configure your OpenRouter API key
- Select code style (Modern, Simple, Component-based)
- Choose framework version (Next.js 16, 15, 14)

## How It Works

1. **You describe** what website you want to build
2. **AI understands** your requirements using advanced language models
3. **Code is generated** line-by-line in real-time
4. **You get production-ready** Next.js code with proper structure
5. **Copy and deploy** to your own Next.js project

## API Endpoints

### POST /api/generate

Generates website code based on a prompt.

**Request:**
```json
{
  "prompt": "Create a modern landing page for a SaaS product with pricing section"
}
```

**Response:**
Streams generated code as text/event-stream

## Technology Stack

- **Frontend**: React 19, Next.js 16, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **UI Components**: Radix UI
- **Code Streaming**: Server-Sent Events (SSE)
- **API Integration**: OpenRouter
- **Layout**: Resizable Panels

## Project Structure

```
├── app/
│   ├── layout.tsx              # Root layout with theme provider
│   ├── page.tsx                # Landing page
│   ├── generator/
│   │   └── page.tsx            # Generator workspace
│   ├── api/
│   │   └── generate/
│   │       └── route.ts        # Code generation API
│   └── globals.css             # Global styles and tokens
├── components/
│   ├── header.tsx              # Navigation header
│   ├── footer.tsx              # Footer
│   ├── prompt-input.tsx        # Prompt input component
│   ├── code-display.tsx        # Code viewer
│   ├── website-preview.tsx     # Statistics panel
│   ├── settings-panel.tsx      # Settings modal
│   ├── streaming-loader.tsx    # Loading animation
│   └── error-boundary.tsx      # Error handling
└── package.json
```

## Customization

### Theme Colors

Edit `/app/globals.css` to customize the color scheme. The theme uses OKLch color space for better perceptual uniformity:

```css
:root {
  --primary: oklch(0.6 0.2 265);      /* Electric Purple */
  --secondary: oklch(0.5 0.18 280);   /* Deep Violet */
  --background: oklch(0.12 0 0);      /* Near Black */
  --foreground: oklch(0.95 0 0);      /* Off White */
}
```

### Font Configuration

The project uses Geist font from Google. To change fonts:

1. Update `app/layout.tsx`:
```tsx
import { YourFont } from 'next/font/google'
const _yourFont = YourFont({ subsets: ["latin"] })
```

2. Update `globals.css`:
```css
--font-sans: 'Your Font Name';
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect to Vercel at [vercel.com](https://vercel.com)
3. Add environment variable: `OPENROUTER_API_KEY`
4. Deploy!

### Other Platforms

Make sure to set the `OPENROUTER_API_KEY` environment variable in your hosting platform's settings.

## API Rate Limits

OpenRouter has rate limits based on your plan:
- Free tier: 20 requests/minute
- Pro tier: Higher limits

Check your usage at [openrouter.ai/account/usage](https://openrouter.ai/account/usage)

## Troubleshooting

### "API key not configured" error

Make sure you've set `OPENROUTER_API_KEY` in your `.env.local` file and restarted the development server.

### Code generation is slow

This is normal for the first request. The AI model is thinking about your prompt. Subsequent requests may be faster due to caching.

### Streaming stops unexpectedly

Check your network connection and API rate limits. Try again after a few seconds.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - feel free to use this project for personal and commercial purposes.

## Support

For issues or questions:
- Check the [Troubleshooting](#troubleshooting) section
- Visit [openrouter.ai](https://openrouter.ai) for API support
- Check [Next.js documentation](https://nextjs.org/docs)

## Roadmap

- Live preview rendering of generated code
- Code formatting and linting options
- Template library for quick starts
- Code diffing and version history
- Team collaboration features
- API rate limit tracking
- Dark mode toggle
- Multiple language support

## Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- AI models powered by [OpenRouter](https://openrouter.ai/)
- Icons from [Lucide](https://lucide.dev/)
