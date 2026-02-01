import { BaseModel } from './base.model';

export interface User extends BaseModel {
  nickname: string;
  email: string;
  publicIdentificationKey: number;
  userQuote: string | null;
}
