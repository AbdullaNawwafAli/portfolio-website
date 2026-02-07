"use server";

import { signIn, signOut } from "@/app/auth";

export const login = async () => {
  await signIn("github", { redirectTo: "/admin-hero" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
