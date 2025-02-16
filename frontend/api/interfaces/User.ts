export interface User {
  id: number;
  username: string;
  email: string;
  password?: string;
  role: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface UserResponse {
  profile: User;
}
