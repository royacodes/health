export interface User {
  id: string;
  email: string;
  emailVerified: Date | null;
  displayName: string | null;
  username: string | null;
  avatar: string | null;
  locale: string | null;
  timezone: string | null;
  status: "active" | "pending" | "suspended" | "deleted";
  role: "user" | "moderator" | "admin";
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserProfile {
  userId: string;
  gender: "male" | "female" | "other" | "prefer_not_to_say" | null;
  birthDate: Date | null;
  height: number | null;
  weight: number | null;
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active" | null;
  goal:
    | "lose_weight"
    | "maintain_weight"
    | "gain_weight"
    | "build_muscle"
    | "improve_health"
    | null;
  country: string | null;
  bio: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserPreferences {
  userId: string;
  theme: string | null;
  measurementSystem: "metric" | "imperial";
  dietType:
    | "none"
    | "vegetarian"
    | "vegan"
    | "keto"
    | "paleo"
    | "mediterranean"
    | "gluten_free"
    | "dairy_free";
  allergies: string[];
  dislikedIngredients: string[];
  notificationPreferences: {
    email: boolean;
    push: boolean;
    marketing: boolean;
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface UserSession {
  id: string;
  userId: string;
  token: string;
  ip: string | null;
  userAgent: string | null;
  platform: string | null;
  location: string | null;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuditLog {
  id: string;
  userId: string;
  action: string;
  ip: string | null;
  userAgent: string | null;
  metadata: Record<string, unknown> | null;
  createdAt: Date;
}

export interface Onboarding {
  userId: string;
  currentStep: number;
  totalSteps: number;
  completed: number[];
  data: Record<string, unknown>;
  completedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export type UserRole = "user" | "moderator" | "admin";
export type UserStatus = "active" | "pending" | "suspended" | "deleted";
