export const AuthStatus = {
  IDLE: 'IDLE',
  LOADING: 'LOADING',
  SUCCEEDED: 'SUCCEEDED',
  FAILED: 'FAILED',
} as const;

export type AuthStatusEnum = keyof typeof AuthStatus;
export type AuthStatusValue = (typeof AuthStatus)[keyof typeof AuthStatus];
