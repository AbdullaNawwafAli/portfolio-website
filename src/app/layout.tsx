import type { Metadata } from "next";
import { Cinzel_Decorative, Raleway } from "next/font/google";
import "./globals.css";
import Navbar from "@/ui/layout/Navbar";

export const cinzel = Cinzel_Decorative({
  subsets: ["latin"],
  weight: ["700"],
});

export const raleway = Raleway({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-raleway",
});

export const ralewayNav = Raleway({
  subsets: ["latin"],
  display: "swap",
  weight: ["600"],
  variable: "--font-raleway",
});

export const metadata: Metadata = {
  title: "Nawwaf's Portfolio Website",
  description: "My portfolio website showcasing me",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
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
          </Navbar>
        </div>
      </body>
    </html>
  );
}
