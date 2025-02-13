/** @format */

// next-auth.d.ts
import "next-auth";

declare module "next-auth" {
  interface User {
    id: number;
    name: string;
    phone: string;
    address: string;
  }

  interface Session {
    user: User;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    phone: string;
    name: string;
    address: string;
  }
}
