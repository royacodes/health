export type UserRole = "user" | "moderator" | "admin";

export type Permission =
  | "read:own_profile"
  | "write:own_profile"
  | "read:any_profile"
  | "write:any_profile"
  | "delete:own_account"
  | "delete:any_account"
  | "suspend:any_account"
  | "manage:roles"
  | "read:audit_logs"
  | "manage:sessions"
  | "manage:settings";

const rolePermissions: Record<UserRole, Permission[]> = {
  user: ["read:own_profile", "write:own_profile", "delete:own_account", "manage:sessions"],
  moderator: [
    "read:own_profile",
    "write:own_profile",
    "delete:own_account",
    "manage:sessions",
    "read:any_profile",
    "suspend:any_account",
    "read:audit_logs",
  ],
  admin: [
    "read:own_profile",
    "write:own_profile",
    "delete:own_account",
    "manage:sessions",
    "read:any_profile",
    "write:any_profile",
    "delete:any_account",
    "suspend:any_account",
    "manage:roles",
    "read:audit_logs",
    "manage:settings",
  ],
};

export function hasPermission(role: UserRole, permission: Permission): boolean {
  return rolePermissions[role]?.includes(permission) ?? false;
}

export function hasAnyPermission(role: UserRole, permissions: Permission[]): boolean {
  return permissions.some((p) => hasPermission(role, p));
}

export function hasAllPermissions(role: UserRole, permissions: Permission[]): boolean {
  return permissions.every((p) => hasPermission(role, p));
}

export function getPermissions(role: UserRole): Permission[] {
  return rolePermissions[role] ?? [];
}
