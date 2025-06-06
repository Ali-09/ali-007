import { User } from './user.model';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  salary: number;
  currency_id: number;
}

export interface AuthResponse {
  user: User;
  access_token: string;
}
