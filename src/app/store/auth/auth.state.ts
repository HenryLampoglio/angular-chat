export interface User {
  id: number;
  name: string;
  email: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  error: any | null;
}

export const initialState: AuthState = {
  user: null,
  token: null,
  error: null,
};
