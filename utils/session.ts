/** @format */

import { authOptions } from "@/lib/authOptions";
import { getServerSession } from "next-auth";

type Session = {
  user: {
    id: number;
    phone: string;
    name: string;
    address: string;
  };
};

// Asynchronous function to get the session
export const getSession = async (): Promise<Session | null> => {
  const session = await getServerSession(authOptions);
  return session as Session | null;
};

// Synchronous wrapper to call the async function
export const getSessions = (): Session | null => {
  let sessionData: Session | null = null;

  // Immediately invoke the async function
  (async () => {
    sessionData = await getSession();
  })();

  return sessionData;
};
