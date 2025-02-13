/** @format */

import { getSession } from "next-auth/react";

export default async function HomePage() {
  const session = await getSession();
  console.log("Session from home page", session);

  return <>Hello {}</>;
}
