export type User = {
  id?: string;
  fullName: string;
  email: string;
  password?: string;
  passwordConfirmation?: string;
  cpf?: string;
};

export type UserWithoutId = Omit<User, 'id'>;
