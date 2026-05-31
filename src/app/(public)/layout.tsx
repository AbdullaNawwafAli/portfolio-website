import type { Metadata } from "next"
import Navbar from "@/features/Shell/components/Navbar"
import Footer from "@/features/Shell/components/Footer"
import { cinzel, raleway } from "@/lib/fonts"
import QueryProvider from "@/features/TanStackQuery/components/QueryProvider"
import { Toaster } from "@/ui/shadcn/sonner"

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
