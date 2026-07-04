"use client";

import { useSession } from "@/lib/auth";
import { type Permission, type UserRole, hasAnyPermission, hasPermission } from "./permissions";

export function useRequireAuth() {
  const { data: session, isPending } = useSession();

  return {
    user: session?.user ?? null,
    session: session?.session ?? null,
    isAuthenticated: !!session?.user,
    isLoading: isPending,
  };
}

export function useRequireRole(role: UserRole) {
  const { user, isAuthenticated, isLoading } = useRequireAuth();

  const userRole = (user as Record<string, unknown>)?.role as UserRole | undefined;

  return {
    user,
    isAuthenticated,
    isLoading,
    hasRole: isAuthenticated && userRole === role,
    isAuthorized: isAuthenticated && userRole === role,
  };
}

export function useRequirePermission(permission: Permission) {
  const { user, isAuthenticated, isLoading } = useRequireAuth();

  const userRole = ((user as Record<string, unknown>)?.role as UserRole) ?? "user";

  return {
    user,
    isAuthenticated,
    isLoading,
    hasPermission: isAuthenticated && hasPermission(userRole, permission),
    isAuthorized: isAuthenticated && hasPermission(userRole, permission),
  };
}

export function useRequireAnyPermission(permissions: Permission[]) {
  const { user, isAuthenticated, isLoading } = useRequireAuth();

  const userRole = ((user as Record<string, unknown>)?.role as UserRole) ?? "user";

  return {
    user,
    isAuthenticated,
    isLoading,
    hasPermission: isAuthenticated && hasAnyPermission(userRole, permissions),
    isAuthorized: isAuthenticated && hasAnyPermission(userRole, permissions),
  };
}
