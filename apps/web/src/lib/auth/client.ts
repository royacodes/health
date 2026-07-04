"use client";

import { usernameClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

export const authClient = createAuthClient({
  baseURL: API_URL,
  plugins: [usernameClient()],
});

export type AuthClient = typeof authClient;

export const { signIn, signUp, signOut, useSession } = authClient;
