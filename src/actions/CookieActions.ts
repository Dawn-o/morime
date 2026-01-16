"use server";

import { cookies } from "next/headers";

export async function setSfwCookie(value: string): Promise<string> {
  const cookieStore = await cookies();
  cookieStore.set("sfw", value, {
    path: "/",
    maxAge: 31536000, // 1 year
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });
  return value;
}

export async function getSfwCookie(): Promise<boolean> {
  const cookieStore = await cookies();
  const cookie = cookieStore.get("sfw");
  return cookie?.value === "false" ? false : true;
}
