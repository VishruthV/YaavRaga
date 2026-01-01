# Copilot Instructions for Raga Identifier

## Project Overview

This is a Next.js application that identifies Hindustani Classical ragas using Google's Gemini AI. The app analyzes Aroha (ascending) and Avaroha (descending) note patterns to identify ragas with detailed analysis including Thaat classification, Vadi/Samvadi notes, and educational resources.

## Code Style & Conventions

### TypeScript
- Use TypeScript for all new files
- Prefer `interface` over `type` for object definitions
- Use explicit return types for functions
- Enable strict mode

### React/Next.js
- Use functional components with hooks
- Prefer `async/await` over `.then()` for promises
- Use CSS Modules for component styling
- Follow Next.js App Router conventions

### File Organization
- **Components**: Place in `src/components/`
- **API Routes**: Place in `src/app/api/`
- **Utilities**: Place in `src/utils/`
- **Documentation**: **Always create new .md files in the `docs/` folder**
- **Styles**: Co-locate CSS modules with components

### Naming Conventions
- **Components**: PascalCase (e.g., `NoteSelector.tsx`)
- **Files**: PascalCase for components, camelCase for utilities
- **CSS Modules**: Match component name (e.g., `NoteSelector.module.css`)
- **API Routes**: kebab-case (e.g., `guess-raga/route.ts`)

## Environment Variables

- Store sensitive keys in `.env.local` (gitignored)
- Use `.env.example` for templates
- Access via `process.env.VARIABLE_NAME`
- Required variables:
  - `GEMINI_API_KEY`: Google Gemini AI API key
  - `YOUTUBE_API_KEY`: YouTube Data API key (optional)

## Documentation Guidelines

### Creating Documentation
- **All new .md files MUST be created in the `docs/` folder**
- Use clear, descriptive filenames (e.g., `api-setup.md`, `deployment.md`)
- Include a title and brief description at the top
- Use proper markdown formatting with headers, code blocks, and lists

### Documentation Structure
```
docs/
├── setup.md           # Setup and installation
├── api-reference.md   # API documentation
├── deployment.md      # Deployment instructions
└── troubleshooting.md # Common issues and fixes
```

## API Development

### API Routes
- Place in `src/app/api/[route-name]/route.ts`
- Use `NextResponse` for responses
- Include proper error handling with try-catch
- Log errors with `console.error()`
- Return appropriate HTTP status codes

### Error Handling
```typescript
try {
  // API logic
} catch (error) {
  console.error('Error description:', error);
  return NextResponse.json(
    { error: 'User-friendly message' },
    { status: 500 }
  );
}
```

## Component Development

### Component Structure
```typescript
interface ComponentProps {
  // Props definition
}

export default function ComponentName({ props }: ComponentProps) {
  // Component logic
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}
```

### Styling
- Use CSS Modules for component-specific styles
- Use CSS variables for theme values
- Follow mobile-first responsive design
- Use semantic class names

## Git Workflow

### Commits
- Write clear, descriptive commit messages
- Use present tense ("Add feature" not "Added feature")
- Reference issues when applicable

### Security
- **Never commit `.env.local`** (already in .gitignore)
- Always verify with `git status` before committing
- Use `.env.example` for sharing configuration templates

## Testing & Debugging

### Development
- Run `npm run dev` for local development
- Check browser console for client-side errors
- Check terminal for server-side errors
- Use `console.log()` for debugging (remove before commit)

### API Testing
- Test with simple inputs first
- Check API quota limits
- Verify environment variables are loaded
- Monitor API response times

## Deployment

### Vercel Deployment
- Push code to GitHub
- Connect repository to Vercel
- Add environment variables in Vercel dashboard
- Deploy from `main` branch

## AI/LLM Integration

### Gemini API
- Use structured prompts for consistency
- Request JSON responses with `response_mime_type: "application/json"`
- Include error handling for API failures
- Log full responses for debugging
- Monitor token usage and quotas

### Best Practices
- Keep prompts focused and specific
- Use examples in prompts when helpful
- Validate LLM responses before using
- Provide fallback behavior for API failures

## Performance

### Optimization
- Use Next.js Image component for images
- Lazy load components when appropriate
- Minimize API calls
- Cache responses when possible

## Accessibility

- Use semantic HTML elements
- Include ARIA labels where needed
- Ensure keyboard navigation works
- Test with screen readers

## Important Reminders

1. **Documentation files go in `docs/` folder** - This is mandatory
2. **Never commit API keys** - Always use environment variables
3. **Test locally before pushing** - Ensure the app runs without errors
4. **Update README.md** - Keep project documentation current
5. **Follow the established patterns** - Maintain consistency across the codebase

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Gemini API Docs](https://ai.google.dev/docs)
- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Raga Junglism](https://ragajunglism.org) - Authoritative raga reference
