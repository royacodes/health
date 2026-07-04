import { createAuthClient } from "better-auth/client";
import { usernameClient } from "better-auth/client/plugins";

const API_URL = process.env.API_URL || "http://localhost:8787";

export const authServerClient = createAuthClient({
  baseURL: API_URL,
  plugins: [usernameClient()],
});
