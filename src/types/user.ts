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

export type UserSignInDTO = {
  email: string;
  password?: string;
};

export type AuthenticatedUser = {
  id: string;
  email: string;
  role: string;
  fullName: string;
  jwtCookie?: {
    name: string;
    value: string;
    maxAge: string;
    domain?: string;
    path: string;
    secure: boolean;
    httpOnly: boolean;
    partitioned: boolean;
    sameSite?: string;
  };
};

export type UserWithoutId = Omit<User, 'id'>;
