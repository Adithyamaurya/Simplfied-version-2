"use client"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"

export default function Hero() {
  const textRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    if (!textRef.current) return

    const glitchText = () => {
      if (!textRef.current) return

      const originalText = "Redefine Reality"
      const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+{}|:<>?~"

      let iterations = 0
      const maxIterations = 15

      const interval = setInterval(() => {
        if (!textRef.current) {
          clearInterval(interval)
          return
        }

        textRef.current.innerText = originalText
          .split("")
          .map((char, index) => {
            if (index < iterations) {
              return originalText[index]
            }
            return chars[Math.floor(Math.random() * chars.length)]
          })
          .join("")

        if (iterations >= originalText.length) {
          clearInterval(interval)
        }

        iterations += 1 / 3
      }, 50)
    }

    // Initial glitch
    glitchText()

    // Glitch on interval
    const glitchInterval = setInterval(glitchText, 10000)

    return () => clearInterval(glitchInterval)
  }, [])

  return (
    <section
      id="home"
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-4 py-20 text-center"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: `radial-gradient(circle, ${
                Math.random() > 0.5 ? "rgba(0, 255, 255, 0.3)" : "rgba(255, 0, 255, 0.3)"
              } 0%, transparent 70%)`,
              transform: `rotate(${Math.random() * 360}deg)`,
              animation: `pulse ${Math.random() * 5 + 5}s infinite alternate ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      {/* Glitch lines */}
      <div className="absolute inset-0 -z-10 overflow-hidden opacity-20">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="absolute bg-cyan-400"
            style={{
              top: `${Math.random() * 100}%`,
              left: 0,
              right: 0,
              height: `${Math.random() * 2 + 1}px`,
              opacity: 0,
              animation: `glitchLine ${Math.random() * 2 + 1}s infinite`,
              animationDelay: `${Math.random() * 5}s`,
            }}
          />
        ))}
      </div>

      <motion.h1
        className="mb-6 text-5xl font-black uppercase leading-none tracking-tighter sm:text-6xl md:text-7xl lg:text-8xl"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <span className="gradient-text relative">
          <span ref={textRef}>Redefine Reality</span>
          <span className="absolute -inset-1 animate-pulse opacity-30 blur-xl gradient-text">Redefine Reality</span>
        </span>
      </motion.h1>

      <motion.p
        className="mb-8 max-w-3xl text-lg text-gray-300 md:text-xl lg:text-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
      >
        We create mind-bending digital experiences that transcend the ordinary. Our team combines cutting-edge
        technology with extreme design to push the boundaries of what's possible.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6, ease: "easeOut" }}
      >
        <Button className="group relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-8 py-6 text-lg font-bold uppercase tracking-wide text-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(255,0,255,0.7)]">
          <span className="relative z-10">Explore Our Universe</span>
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-all duration-700 group-hover:translate-x-full group-hover:opacity-100"></span>
        </Button>
      </motion.div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.5); opacity: 0.3; }
          100% { transform: scale(1); opacity: 0.1; }
        }
        
        @keyframes glitchLine {
          0% { opacity: 0; transform: translateX(-100%); }
          10% { opacity: 0.8; }
          20% { opacity: 0; transform: translateX(100%); }
          100% { opacity: 0; }
        }
      `}</style>
    </section>
  )
}
