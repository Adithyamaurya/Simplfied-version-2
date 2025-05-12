import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/header"
import { ThemeProvider } from "@/components/theme-provider"
import MouseFollower from "@/components/mouse-follower"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SIMPLIFIED - Digital Experiences",
  description: "We create mind-bending digital experiences that transcend the ordinary.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          <MouseFollower />
          <Header />
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
