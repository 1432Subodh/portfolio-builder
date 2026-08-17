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
