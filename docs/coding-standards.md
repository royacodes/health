# Coding Standards

## General Principles

### 1. Functional Programming

- Prefer pure functions over classes
- Use immutability where possible
- Avoid side effects in core logic
- Compose functions for complex operations

### 2. SOLID Principles

- **S**ingle Responsibility: One function, one job
- **O**pen/Closed: Extend via composition, not modification
- **L**iskov Substitution: Use interfaces over concrete types
- **I**nterface Segregation: Small, focused interfaces
- **D**ependency Inversion: Depend on abstractions

### 3. Clean Architecture

- Business logic independent of frameworks
- Dependencies point inward (domain → application → infrastructure)
- Use repository pattern for data access
- Service layer orchestrates business operations

## Naming Conventions

### Files & Folders

| Type | Convention | Example |
|------|------------|---------|
| Components | PascalCase | `Button.tsx` |
| Hooks | camelCase | `useAuth.ts` |
| Utils | camelCase | `formatDate.ts` |
| Types | PascalCase | `User.ts` |
| Tests | *.test.ts | `Button.test.ts` |
| Config | camelCase | `drizzle.config.ts` |

### Code

| Type | Convention | Example |
|------|------------|---------|
| Variables | camelCase | `userName` |
| Functions | camelCase | `getUserById` |
| Components | PascalCase | `UserProfile` |
| Types/Interfaces | PascalCase | `UserData` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRIES` |
| Enums | PascalCase | `UserRole` |

## TypeScript

### Strict Mode

Always use strict TypeScript:

```typescript
// ✅ Good
function getUser(id: string): User | undefined {
  // ...
}

// ❌ Bad
function getUser(id) {
  // ...
}
```

### Type Safety

- Prefer `interface` over `type` for object shapes
- Use `readonly` for immutable data
- Avoid `any` — use `unknown` and narrow
- Use discriminated unions for state machines

```typescript
// ✅ Good
interface User {
  readonly id: string;
  readonly name: string;
}

// ❌ Bad
type User = {
  id: any;
  name: any;
};
```

## React

### Components

- Use functional components only
- Keep components small (< 100 lines)
- One component per file
- Use named exports

```typescript
// ✅ Good
export function UserCard({ user }: UserCardProps) {
  return (
    <div>
      <h2>{user.name}</h2>
    </div>
  );
}

// ❌ Bad
export default function({ user }) {
  return <div><h2>{user.name}</h2></div>;
}
```

### Hooks

- Prefix custom hooks with `use`
- Return objects, not arrays (unless tuple pattern)
- Keep hooks focused on one concern

```typescript
// ✅ Good
export function useUser(id: string) {
  const [user, setUser] = useState<User | null>(null);
  // ...
  return { user, isLoading, error };
}
```

## Error Handling

### API Errors

```typescript
// ✅ Structured error responses
interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

// ✅ Throw domain errors
class NotFoundError extends Error {
  constructor(resource: string) {
    super(`${resource} not found`);
    this.name = "NotFoundError";
  }
}
```

### Validation

```typescript
// ✅ Use Zod for validation
const userSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
});

type UserInput = z.infer<typeof userSchema>;
```

## Imports

### Order

1. External packages
2. Internal packages (`@healthy/*`)
3. Relative imports (`./`, `../`)

```typescript
// ✅ Good
import { z } from "zod";
import { Button } from "@healthy/ui";
import { formatDate } from "./utils.js";
```

### File Extensions

- Use `.js` extension in imports for ESM compatibility
- Never use `.ts` extension in imports

```typescript
// ✅ Good
import { db } from "./client.js";

// ❌ Bad
import { db } from "./client";
```

## Testing

### Unit Tests

- Test behavior, not implementation
- Use descriptive test names
- Arrange, Act, Assert pattern
- Mock external dependencies

```typescript
// ✅ Good
describe("formatDate", () => {
  it("formats ISO string to readable date", () => {
    const result = formatDate("2024-01-15");
    expect(result).toBe("January 15, 2024");
  });
});
```

## Comments

- Don't explain WHAT — code should be self-documenting
- Explain WHY when non-obvious
- Don't reference tickets or PRs in comments
- Keep comments up-to-date or delete them

```typescript
// ✅ Good — explains WHY
// Neon serverless driver requires HTTP-based connection
const sql = neon(process.env.DATABASE_URL!);

// ❌ Bad — explains WHAT
// Create database connection
const sql = neon(process.env.DATABASE_URL!);
```

## File Size

- Max 200 lines per file
- Split large files into smaller modules
- One component/hook/utility per file
