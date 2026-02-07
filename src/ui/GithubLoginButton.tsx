"use client";
import { Button } from "./shadcn/button";
import { login } from "@/server/actions/auth";

const GithubLoginButton = () => {
  const handleLogin = async () => {
    await login();
  };
  return <Button onClick={handleLogin}>LOGIN</Button>;
};

export default GithubLoginButton;
