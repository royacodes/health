# Healthy Recipe Platform

A production-grade SaaS application for discovering and sharing healthy recipes.

## Prerequisites

- Node.js >= 20.0.0
- pnpm >= 9.0.0
- Docker (optional, for local PostgreSQL)

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd healthy-platform

# Install dependencies
pnpm install

# Copy environment variables
cp .env.example .env

# Start local database (optional)
docker compose up -d

# Start development servers
pnpm dev
```

## Project Structure

```
healthy-platform/
├── apps/
│   ├── web/          # Next.js 15 frontend
│   ├── admin/        # Next.js 15 admin dashboard
│   └── api/          # Cloudflare Workers API
├── packages/
│   ├── ui/           # Shared React components
│   ├── database/     # Drizzle ORM & PostgreSQL
│   ├── auth/         # Authentication utilities
│   ├── types/        # Shared TypeScript types
│   ├── config/       # Environment validation
│   ├── utils/        # Shared helper functions
│   ├── ai/           # AI abstractions
│   └── emails/       # React Email templates
├── tooling/
│   ├── biome/        # Biome configuration
│   ├── typescript/   # TypeScript configs
│   └── eslint/       # ESLint config (minimal)
└── docs/             # Documentation
```

## Available Commands

```bash
# Development
pnpm dev              # Start all apps in development mode
pnpm build            # Build all apps and packages
pnpm lint             # Run Biome linter
pnpm typecheck        # Run TypeScript type checking
pnpm test             # Run all tests

# Formatting
pnpm format           # Format code with Biome
pnpm check            # Check and fix code with Biome

# Database
pnpm db:generate      # Generate Drizzle migrations
pnpm db:migrate       # Run migrations
pnpm db:push          # Push schema to database

# Versioning
pnpm changeset        # Create a changeset
pnpm version-packages # Version packages
pnpm release          # Build and publish
```

## Development Workflow

1. Create a feature branch from `main`
2. Make your changes
3. Run `pnpm lint`, `pnpm typecheck`, and `pnpm test` to verify
4. Create a changeset if needed: `pnpm changeset`
5. Submit a pull request

## Tech Stack

- **Frontend**: Next.js 15, React 19, Tailwind CSS v4, shadcn/ui
- **Backend**: Cloudflare Workers, Hono, Drizzle ORM
- **Database**: PostgreSQL (Neon)
- **Monorepo**: Turborepo, pnpm Workspaces
- **Code Quality**: Biome, Commitlint, Changesets
- **CI/CD**: GitHub Actions

## Environment Variables

See `.env.example` for all required environment variables.

## License

MIT
