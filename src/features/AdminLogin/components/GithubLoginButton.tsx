"use client"
import { Button } from "../../../ui/shadcn/button"
import { login } from "@/features/AdminLogin/server/actions/auth"

const GithubLoginButton = () => {
  const handleLogin = async () => {
    await login()
  }
  return <Button onClick={handleLogin}>LOGIN</Button>
}

export default GithubLoginButton
