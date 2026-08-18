import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import bcrypt from "bcryptjs";
import { getClient, getDb } from "@/lib/db";

export function isAdminRole(role?: string | null): boolean {
  return role === "admin" || role === "superadmin";
}

export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  adapter: MongoDBAdapter(getClient()),
  session: { strategy: "jwt" },
  trustHost: true,
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          scope: "openid email profile",
          access_type: "offline",
          prompt: "consent",
        },
      },
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
        };
      },
    }),
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await getDb();
        const user = await db.collection("users").findOne({ email: credentials.email });
        if (!user || !user.password) return null;

        const valid = await bcrypt.compare(credentials.password as string, user.password);
        if (!valid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
          role: "user",
        };
      },
    }),
    Credentials({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const db = await getDb();
        const admin = await db
          .collection("admin")
          .findOne({ email: credentials.email, isActive: { $ne: false } });
        if (!admin || !admin.password) return null;

        const valid = await bcrypt.compare(credentials.password as string, admin.password);
        if (!valid) return null;

        await db
          .collection("admin")
          .updateOne({ _id: admin._id }, { $set: { lastLoginAt: new Date() } });

        return {
          id: admin._id.toString(),
          name: admin.name,
          email: admin.email,
          image: null,
          role: admin.role ?? "admin",
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (user) {
        token.id = user.id;
        token.role = user.role ?? "user";
      }
      if (account?.provider === "google" && user?.image) {
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = (token.role as string) ?? "user";
        if (token.image) {
          session.user.image = token.image as string;
        }
      }
      return session;
    },
  },
});
