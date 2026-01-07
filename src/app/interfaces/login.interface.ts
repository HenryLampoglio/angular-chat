export interface LoginResponse {
  token: string;
  user: userData;
}

export interface userData {
  nickname: string;
  email: string;
  publicIdentificationKey: number;
}
