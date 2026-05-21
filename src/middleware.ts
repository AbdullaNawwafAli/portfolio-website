import { auth } from "./app/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth

  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/admin-login", req.url))
  }
})

export const config = {
  matcher: ["/admin-home/:path*", "/admin-projects/:path*"],
}
