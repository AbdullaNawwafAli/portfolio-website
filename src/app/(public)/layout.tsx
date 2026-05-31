import type { Metadata } from "next"
import Navbar from "@/features/Shell/components/Navbar"
import Footer from "@/features/Shell/components/Footer"

export const metadata: Metadata = {
  title: "Nawwaf's Portfolio Website",
  description: "My portfolio website showcasing me",
}

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <Navbar>
      {children}
      <Footer />
    </Navbar>
  )
}
