"use client"

import { useEffect, useState } from "react"
import Hero from "@/components/hero"
import Services from "@/components/services"
import Team from "@/components/team"
import Portfolio from "@/components/portfolio"
import Contact from "@/components/contact"
import Footer from "@/components/footer"
import BackgroundCanvas from "@/components/background-canvas"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative min-h-screen overflow-x-hidden bg-black text-white">
      {isLoading ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="text-center">
            <div className="mb-4 text-4xl font-extrabold uppercase tracking-wider gradient-text">SIMPLIFIED V</div>
            <div className="relative h-1 w-48 overflow-hidden rounded-full bg-gray-800">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 animate-loading-bar"></div>
            </div>
          </div>
        </div>
      ) : (
        <>
          <BackgroundCanvas />
          <Hero />
          <Services />
          <Team />
          <Portfolio />
          <Contact />
          <Footer />
        </>
      )}

      <style jsx global>{`
        @keyframes loading-bar {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        .animate-loading-bar {
          animation: loading-bar 1.5s infinite;
        }
      `}</style>
    </main>
  )
}
