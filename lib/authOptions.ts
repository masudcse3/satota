/** @format */

import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import bcrypt from "bcryptjs";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        phone: { label: "Phone", type: "string" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) return null;
        const { phone, password } = credentials;
        const manager = await db.manager.findUnique({ where: { phone } });
        if (!manager) {
          throw new Error("Manager not found with this phone number");
        }
        const isValid = await bcrypt.compare(password, manager.password);
        if (!isValid) {
          throw new Error("Your password is incorrect. Please try again");
        }
        return {
          id: manager.id,
          name: manager.name,
          address: manager.address,
          phone: manager.phone,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id as number;
        token.phone = user.phone as string;
        token.name = user.name as string;
        token.address = user.address as string;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          id: token.id as number,
          name: token.name as string,
          phone: token.phone as string,
          address: token.address as string,
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
  },
};
