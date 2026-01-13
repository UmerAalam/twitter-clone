export interface SignIn {
  email: string;
  password: string;
}

export interface SignUp {
  name: string;
  email: string;
  password: string;
}

export interface UserEmail {
  email: string;
}

export interface User {
  id: number;
  name: string;
  email: string;
  bio?: string; // optional
  avatar?: string; // optional (URL)
  createdAt: Date;
  updatedAt: Date;
}

export interface UserWithoutPassword {
  id: number;
  email: string;
  name: string;
  bio?: string;
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}

export interface UserWithoutEmail {
  id: number;
  name: string;
  bio: string; // not optional here per schema
  avatar?: string;
  created_at: Date;
  updated_at: Date;
}

// --- Update user ---
export interface UpdatedUser {
  id: number;
  name?: string;
  email?: string;
  password?: string;
  bio?: string;
  avatar?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
