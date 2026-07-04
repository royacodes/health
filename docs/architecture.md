# Architecture Overview

## Overview

The Healthy Recipe Platform follows a Domain-Driven Design (DDD) friendly Modular Monorepo architecture. This approach provides clear separation of concerns while enabling code sharing across applications.

## Principles

### 1. Domain-Driven Design

Each module represents a business domain with its own:
- **Entities**: Core business objects
- **Value Objects**: Immutable objects with identity
- **Aggregates**: Clusters of entities with a root
- **Repositories**: Data access abstraction
- **Services**: Business logic orchestration

### 2. Clean Architecture

- **Presentation Layer**: React components, pages
- **Application Layer**: Use cases, orchestration
- **Domain Layer**: Business rules, entities
- **Infrastructure Layer**: External integrations, data access

### 3. Composition over Inheritance

Favor composition patterns:
- Higher-order components
- Custom hooks
- Function composition
- Dependency injection

## Monorepo Structure

### Apps

| App | Description | Port |
|-----|-------------|------|
| `@healthy/web` | Main user-facing Next.js app | 3000 |
| `@healthy/admin` | Admin dashboard | 3001 |
| `@healthy/api` | Cloudflare Workers API | 8787 |

### Packages

| Package | Description | Consumers |
|---------|-------------|-----------|
| `@healthy/ui` | Shared React components | web, admin |
| `@healthy/database` | Drizzle ORM & schema | api |
| `@healthy/auth` | Authentication utilities | web, api |
| `@healthy/types` | Shared TypeScript types | all |
| `@healthy/config` | Environment validation | all |
| `@healthy/utils` | Helper functions | all |
| `@healthy/ai` | AI abstractions | api |
| `@healthy/emails` | Email templates | api |

### Tooling

| Package | Description |
|---------|-------------|
| `tooling/biome` | Shared Biome config |
| `tooling/typescript` | Shared TypeScript configs |

## Data Flow

```
Client Request
    ↓
Next.js App (SSR/CSR)
    ↓
API Routes / Server Actions
    ↓
Packages (auth, database, utils)
    ↓
Cloudflare Workers API
    ↓
PostgreSQL (Neon)
```

## State Management

- **Server State**: React Query for API data
- **Form State**: React Hook Form + Zod
- **URL State**: Next.js router
- **Global State**: React Context (minimal)

## Error Handling

- **API Errors**: Structured error responses with status codes
- **Validation Errors**: Zod schema validation
- **UI Errors**: Error boundaries with fallback UI
- **Logging**: Structured logging for debugging

## Security

- **Authentication**: Session-based with secure cookies
- **Authorization**: Role-based access control
- **Validation**: Input validation at all boundaries
- **Environment**: Secrets never in code
