// We're doing this instead of creating an enum due to this error:
// This syntax is not allowed when 'erasableSyntaxOnly' is enabled

export const RouteProtection = {
  PRIVATE: 'PRIVATE',
  PUBLIC: 'PUBLIC',
  NONE: 'NONE',
} as const;

export type RouteProtectionEnum = keyof typeof RouteProtection;
export type RouteProtectionValue =
  (typeof RouteProtection)[keyof typeof RouteProtection];
