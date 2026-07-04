# Folder Structure

## Root

```
healthy-platform/
├── .github/              # GitHub Actions workflows
│   └── workflows/
│       └── ci.yml        # CI pipeline
├── apps/                 # Application packages
│   ├── web/              # Main Next.js app
│   ├── admin/            # Admin Next.js app
│   └── api/              # Cloudflare Workers API
├── packages/             # Shared packages
│   ├── ui/               # React components
│   ├── database/         # Drizzle ORM
│   ├── auth/             # Authentication
│   ├── types/            # TypeScript types
│   ├── config/           # Environment config
│   ├── utils/            # Utilities
│   ├── ai/               # AI abstractions
│   └── emails/           # Email templates
├── tooling/              # Build tooling
│   ├── biome/            # Biome config
│   ├── typescript/       # TypeScript configs
│   └── eslint/           # ESLint config
├── docs/                 # Documentation
├── package.json          # Root package.json
├── pnpm-workspace.yaml   # pnpm workspace config
├── turbo.json            # Turborepo config
├── tsconfig.json         # Root TypeScript config
├── biome.json            # Biome config
├── lefthook.yml          # Git hooks config
├── commitlint.config.js  # Commitlint config
├── docker-compose.yml    # Local PostgreSQL
└── .env.example          # Environment template
```

## Apps

### apps/web

```
web/
├── src/
│   ├── app/              # Next.js App Router
│   │   ├── layout.tsx    # Root layout
│   │   ├── page.tsx      # Home page
│   │   └── globals.css   # Global styles
│   ├── components/       # Shared components
│   ├── features/         # Feature modules
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility functions
│   ├── providers/        # Context providers
│   ├── styles/           # Additional styles
│   ├── types/            # App-specific types
│   ├── utils/            # Utilities
│   └── services/         # API service layer
├── public/               # Static assets
├── next.config.ts        # Next.js config
├── postcss.config.mjs    # PostCSS config
└── tsconfig.json         # TypeScript config
```

### apps/api

```
api/
├── src/
│   ├── index.ts          # Hono app entry
│   ├── routes/           # API routes
│   │   ├── health.ts     # Health endpoint
│   │   └── index.ts      # Route aggregator
│   ├── modules/          # Domain modules
│   ├── middlewares/       # Hono middlewares
│   ├── services/         # Service layer
│   ├── repositories/     # Repository pattern
│   ├── db/               # Database connection
│   ├── lib/              # Shared lib
│   ├── utils/            # Utilities
│   ├── config/           # Configuration
│   └── types/            # Types
├── wrangler.toml         # Cloudflare config
└── tsconfig.json         # TypeScript config
```

## Packages

### packages/ui

```
ui/
├── src/
│   ├── index.tsx         # Barrel export
│   ├── components/       # React components
│   │   └── button.tsx    # Button component
│   ├── lib/
│   │   └── utils.ts      # cn() utility
│   └── styles.css        # Tailwind imports
├── package.json
└── tsconfig.json
```

### packages/database

```
database/
├── src/
│   ├── index.ts          # Barrel export
│   ├── client.ts         # Database client
│   ├── schema/           # Drizzle schema
│   │   └── index.ts      # Schema exports
│   └── migrations/       # Generated migrations
├── drizzle.config.ts     # Drizzle Kit config
├── package.json
└── tsconfig.json
```
