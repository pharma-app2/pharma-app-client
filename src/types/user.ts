export type User = {
  id?: string;
  fullName: string;
  email: string;
  cpf?: string;
};

export type UserSignUpDTO = {
  fullName: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  cpf?: string;
};

export const UserRole = {
  ROLE_PATIENT: 'ROLE_PATIENT',
  ROLE_PHARMACIST: 'ROLE_PHARMACIST',
} as const;

export type UserRoleEnum = keyof typeof UserRole;
export type UserRoleValue = (typeof UserRole)[keyof typeof UserRole];

export type UserSignInDTO = {
  email: string;
  password?: string;
  role: UserRoleEnum;
};

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: string;
  fullName: string;
};

export type UserWithoutId = Omit<User, 'id'>;
