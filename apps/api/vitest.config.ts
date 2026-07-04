import path from "node:path";
import { defineConfig } from "vitest/config";

const packagesDir = path.resolve(__dirname, "../../packages");

export default defineConfig({
  resolve: {
    alias: [
      { find: /^@healthy\/auth\/(.*)$/, replacement: path.join(packagesDir, "auth/src/$1") },
      { find: "@healthy/auth", replacement: path.join(packagesDir, "auth/src/index.ts") },
      {
        find: /^@healthy\/database\/(.*)$/,
        replacement: path.join(packagesDir, "database/src/$1"),
      },
      { find: "@healthy/database", replacement: path.join(packagesDir, "database/src/index.ts") },
      { find: /^@healthy\/types\/(.*)$/, replacement: path.join(packagesDir, "types/src/$1") },
      { find: "@healthy/types", replacement: path.join(packagesDir, "types/src/index.ts") },
      { find: /^@healthy\/utils\/(.*)$/, replacement: path.join(packagesDir, "utils/src/$1") },
      { find: "@healthy/utils", replacement: path.join(packagesDir, "utils/src/index.ts") },
      { find: /^@healthy\/config\/(.*)$/, replacement: path.join(packagesDir, "config/src/$1") },
      { find: "@healthy/config", replacement: path.join(packagesDir, "config/src/index.ts") },
      { find: /^@healthy\/food\/(.*)$/, replacement: path.join(packagesDir, "food/src/$1") },
      { find: "@healthy/food", replacement: path.join(packagesDir, "food/src/index.ts") },
      { find: /^@healthy\/recipe\/(.*)$/, replacement: path.join(packagesDir, "recipe/src/$1") },
      { find: "@healthy/recipe", replacement: path.join(packagesDir, "recipe/src/index.ts") },
    ],
  },
  test: {
    globals: true,
    environment: "node",
    env: {
      DATABASE_URL: "postgresql://test:test@localhost:5432/test",
      BETTER_AUTH_SECRET: "test-secret",
    },
  },
});
