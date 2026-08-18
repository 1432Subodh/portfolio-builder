import { ObjectId } from "mongodb";

export interface UserDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider: "credentials" | "google";
  createdAt: Date;
  updatedAt: Date;
}

export type AdminRole = "admin" | "superadmin";

export interface AdminDoc {
  _id?: ObjectId;
  name: string;
  email: string;
  password: string;
  role: AdminRole;
  isActive: boolean;
  lastLoginAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface ProjectDoc {
  _id?: ObjectId;
  userId: ObjectId;
  name: string;
  slug: string;
  template?: string;
  sections: Record<string, unknown>[];
  settings: Record<string, unknown>;
  published: boolean;
  publishedUrl?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComponentCategoryDoc {
  _id?: ObjectId;
  name: string;
  slug: string;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ComponentDoc {
  _id?: ObjectId;
  categoryId: ObjectId;
  name: string;
  slug: string;
  componentSlug?: string;
  type?: string;
  description?: string;
  isActive: boolean;
  content?: Record<string, unknown>;
  theme?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}
