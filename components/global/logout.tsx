/** @format */

"use client";
import { signOut } from "next-auth/react";
import React from "react";
import { Button } from "../ui/button";
import { LogOut } from "lucide-react";

const Logout = () => {
  const handleLogout = async () => {
    await signOut({ redirect: true, callbackUrl: "/login" });
  };
  return (
    <Button variant="outline" onClick={handleLogout}>
      <LogOut className="w-4 h-4" />
    </Button>
  );
};

export default Logout;
