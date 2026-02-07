"use client";
import { Button } from "./shadcn/button";
import { logout } from "@/server/actions/auth";

const GithubLogoutButton = () => {
  return <Button onClick={() => logout()}>LOGIN</Button>;
};

export default GithubLogoutButton;
