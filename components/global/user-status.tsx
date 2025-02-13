/** @format */

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";
import React from "react";

import Logout from "./logout";
interface Session {
  user: {
    id: number;
    phone: string;
    name: string;
    address: string;
  };
}
const UserStatus = async () => {
  const session = (await getServerSession(authOptions)) as Session | null;

  return (
    <>
      {session && (
        <div className="flex gap-2 items-center">
          <p>
            Welcome, {session.user.name}-{session.user.address}!
          </p>
          <Logout />
        </div>
      )}
    </>
  );
};

export default UserStatus;
