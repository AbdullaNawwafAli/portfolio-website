import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/features/Shell/components/Navbar"
import Footer from "@/features/Shell/components/Footer"
import { cinzel, raleway } from "@/lib/fonts"
import QueryProvider from "@/features/TanStack/QueryProvider"

export const metadata: Metadata = {
  title: "Nawwaf's Portfolio Website",
  description: "My portfolio website showcasing me",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${raleway.variable}`}>
      <body>
        <QueryProvider>
          {/* Background columns */}
          <div className="background-columns">
            {[...Array(10).keys()].map((key) => (
              <div className="column" key={key}></div>
            ))}
          </div>

          {/*Content */}
          <div className="content">
            <Navbar>
              {children}
              <Footer />
            </Navbar>
          </div>
        </QueryProvider>
      </body>
    </html>
  )
}
