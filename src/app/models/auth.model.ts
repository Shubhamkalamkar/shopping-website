export interface AuthResponse {
  token: string;
  userId: string;
  email: string;
  expiresIn: number;
}