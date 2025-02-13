/** @format */

import { Toaster } from "@/components/ui/toaster";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Next.js with Tailwind CSS",
  description: "A simple Next.js app with Tailwind CSS",
};
export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <div className="h-screen flex flex-col justify-center items-center bg-bgactive text-white">
          {children}
          <Toaster />
        </div>
      </body>
    </html>
  );
}
