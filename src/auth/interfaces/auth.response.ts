export interface AuthResponse {
  accessToken: string;
  user: User;
}

export interface User {
  id: number;
  email: string;
  password: string;
  fullname: string;
  isActive: boolean;
  globalRole: string;
  createdAt: Date;
  createdById: number;
  deletedAt: null;
  deletedById: null;
  phone: string;
  roles: string[];
}
