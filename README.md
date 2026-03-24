# Vibe Coding - AI-Powered Code Generation Platform

A next-generation web IDE that combines AI code generation, Monaco editor, live code execution, and instant deployment to Vercel.

## Features

- **🤖 AI Code Generation** - Generate complete Next.js websites from natural language prompts using free AI models
- **📝 Monaco Editor** - Full-featured browser-based IDE with syntax highlighting, intellisense, and code formatting
- **▶️ Live Code Execution** - Execute JavaScript code directly in the browser using Piston API
- **🎯 Task Agent Tab** - Track and manage generation tasks with real-time status updates
- **🚀 Deploy to Vercel** - One-click deployment of generated code to Vercel
- **🔐 GitHub OAuth** - Secure authentication via GitHub with Supabase
- **💾 Project Management** - Save, organize, and manage all your generated projects
- **🎨 Dark Theme IDE** - Beautiful dark theme with electric purple/blue accents

## Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Editor**: Monaco Editor (VS Code engine)
- **Database**: Supabase (PostgreSQL with RLS)
- **Authentication**: Supabase Auth with GitHub OAuth
- **AI Models**: OpenRouter (free models: Llama 2, Mistral, Llama 3)
- **Code Execution**: Piston API
- **Deployment**: Vercel

## Getting Started

### Prerequisites

- Node.js 18+ and npm/pnpm/yarn
- Supabase account (https://supabase.com)
- GitHub OAuth app credentials
- OpenRouter API key (free tier available)

### Installation

1. **Clone the repository**
```bash
git clone <repo-url>
cd vibe-coding-platform
```

2. **Install dependencies**
```bash
pnpm install
# or npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Then update `.env.local` with:
- Supabase URL and anon key
- OpenRouter API key
- App URL (http://localhost:3000 for development)

4. **Set up Supabase**

The database schema is already configured in `/scripts`:
- `001_create_schema.sql` - Creates tables and RLS policies
- `002_seed_free_models.sql` - Seeds free AI models

Run these migrations in your Supabase dashboard SQL editor.

5. **Configure GitHub OAuth**

In Supabase:
1. Go to Authentication > Providers > GitHub
2. Add GitHub OAuth app credentials
3. Set Authorization callback URL to `http://localhost:3000/auth/callback`

6. **Run the development server**
```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

### 1. Sign Up / Login
- Visit the home page and click "Sign Up Free"
- Authenticate with GitHub
- Your profile is automatically created in Supabase

### 2. Create a Project
Navigate to the IDE at `/ide` or Dashboard and click "Launch IDE"

### 3. Generate Code
1. Enter a natural language description in the "Generate" tab
2. Select an AI model (free models recommended)
3. Click "Generate" to create code
4. Watch the code stream into the editor in real-time

### 4. Edit & Execute Code
1. Edit code directly in the Monaco editor
2. Click "Run Code" to execute JavaScript
3. View output in the "Output" tab

### 5. Manage Tasks
- View all generation tasks in the "Tasks" tab
- Track status: Pending, In Progress, Completed
- Mark tasks as complete

## Project Structure

```
vibe-coding-platform/
├── app/
│   ├── auth/              # Authentication pages
│   │   ├── login/
│   │   ├── sign-up/
│   │   ├── callback/
│   │   └── error/
│   ├── dashboard/         # User dashboard
│   ├── ide/              # Main IDE workspace
│   ├── generator/        # Legacy generator (for backward compatibility)
│   ├── layout.tsx        # Root layout with providers
│   ├── page.tsx          # Landing page
│   └── api/
│       ├── generate/     # AI code generation endpoint
│       └── execute/      # Code execution endpoint
├── components/
│   ├── code-editor.tsx          # Monaco editor wrapper
│   ├── code-executor.tsx        # Code execution & output display
│   ├── agent-tab.tsx            # Task tracking component
│   ├── prompt-input.tsx         # AI prompt input
│   └── ...
├── lib/
│   ├── supabase/
│   │   ├── client.ts    # Browser client
│   │   ├── server.ts    # Server client
│   │   └── middleware.ts # Session middleware
│   ├── model-context.tsx # Model selection state
│   └── piston.ts        # Code execution utilities
├── scripts/
│   ├── 001_create_schema.sql       # Database schema
│   └── 002_seed_free_models.sql    # Free models seed data
└── middleware.ts         # Next.js middleware for auth
```

## API Endpoints

### Generate Code
```
POST /api/generate
Body: {
  "prompt": "Create a landing page",
  "model": "meta-llama/llama-2-70b-chat"
}
```

### Execute Code (via Piston API)
```
POST https://emkc.org/api/v2/piston/execute
Body: {
  "language": "javascript",
  "version": "*",
  "files": [{"name": "main", "content": "code here"}]
}
```

## Free AI Models Available

1. **Llama 2 70B** - Fast, open-source, excellent for code
2. **Mistral 7B** - Efficient, good quality, low latency
3. **Llama 3 8B** - Latest open-source, improved capabilities
4. **Others** - Check OpenRouter for additional free models

## Database Schema

### Tables
- `profiles` - User profiles (synced with auth.users)
- `ai_models` - Available AI models with metadata
- `projects` - User-generated projects
- `generation_history` - History of code generations

All tables have Row Level Security (RLS) enabled to ensure users can only access their own data.

## Deployment to Vercel

1. Push your code to GitHub
2. Connect repository to Vercel
3. Add environment variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `OPENROUTER_API_KEY`
   - `NEXT_PUBLIC_APP_URL` (your Vercel URL)
4. Deploy

## Troubleshooting

### "useModel must be used within ModelProvider"
- Ensure `ModelProvider` wraps the app in `layout.tsx`
- Clear browser cache and restart dev server

### Code generation fails with 402 error
- Check OpenRouter credits: https://openrouter.ai/settings/credits
- Use free models which don't require credits
- Check `OPENROUTER_API_KEY` is set correctly

### Piston API execution fails
- Verify Piston API is accessible: https://emkc.org/api/v2/piston/runtimes
- Check for CORS issues (Piston API is public and CORS-friendly)
- Some code might require specific Node.js/JavaScript version

### GitHub OAuth not working
- Verify GitHub app credentials in Supabase
- Check redirect URL matches: `{APP_URL}/auth/callback`
- Clear cookies and try again

## Performance Optimization

- **Monaco Editor**: Loaded lazily to reduce initial bundle
- **Streaming**: AI responses stream directly to editor
- **Code Splitting**: Routes are automatically code-split
- **Image Optimization**: All images optimized with Next.js Image

## Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Commit changes
4. Push to branch
5. Open a Pull Request

## License

MIT License - see LICENSE file for details

## Support

For issues or questions:
- Check the troubleshooting section
- Open an issue on GitHub
- Visit https://vercel.com/help

## Roadmap

- [ ] Real-time collaboration (multi-user editing)
- [ ] Cloud file storage for projects
- [ ] Git integration for version control
- [ ] Custom model support
- [ ] Chrome extension for quick generation
- [ ] Team/Organization support
- [ ] Advanced analytics dashboard

