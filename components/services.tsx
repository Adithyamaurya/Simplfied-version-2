"use client"

import type React from "react"

import { useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { motion, useInView } from "framer-motion"

export default function Services() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const services = [
    {
      title: "3D Animation",
      description:
        "Breathtaking animated worlds created with precision and artistic vision. We bring your wildest ideas to life with industry-leading 3D technology.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-cyan-400">
          <path
            fill="currentColor"
            d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm0-3a5 5 0 110-10 5 5 0 010 10z"
          />
        </svg>
      ),
    },
    {
      title: "Extreme UX/UI",
      description:
        "Interfaces that challenge conventions while maintaining usability. We create digital experiences that leave lasting impressions on your audience.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-fuchsia-500">
          <path
            fill="currentColor"
            d="M4 2h16a2 2 0 012 2v16a2 2 0 01-2 2H4a2 2 0 01-2-2V4a2 2 0 012-2zm0 2v16h16V4H4zm8 3l4.5 8H7.5l4.5-8zm0 2.5L8.8 14h6.4L12 9.5z"
          />
        </svg>
      ),
    },
    {
      title: "Web Development",
      description:
        "Building responsive, high-performance websites and applications using the latest web technologies to deliver seamless user experiences.",
      icon: (
        <svg viewBox="0 0 24 24" className="h-12 w-12 text-cyan-400">
          <path
            fill="currentColor"
            d="M3 3h18a1 1 0 011 1v16a1 1 0 01-1 1H3a1 1 0 01-1-1V4a1 1 0 011-1zm17 8H4v8h16v-8zm0-2V5H4v4h16zM9 6h2v2H9V6zM5 6h2v2H5V6z"
          />
        </svg>
      ),
    },
  ]

  useEffect(() => {
    if (!sectionRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      if (!sectionRef.current) return

      const cards = sectionRef.current.querySelectorAll(".service-card")

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
          const cardElement = card as HTMLElement
          cardElement.style.setProperty("--mouse-x", `${x}px`)
          cardElement.style.setProperty("--mouse-y", `${y}px`)
        }
      })
    }

    window.addEventListener("mousemove", handleMouseMove)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [])

  return (
    <section id="services" className="py-20 px-4 md:py-32" ref={sectionRef}>
      <div className="container mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Our Services
        </motion.h2>

        <div className="mt-16 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="service-card group relative overflow-hidden rounded-xl border border-cyan-400/20 bg-black/50 p-8 backdrop-blur-md transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(0,255,255,0.3)]"
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.6, delay: index * 0.2, ease: "easeOut" }}
              style={
                {
                  "--mouse-x": "0px",
                  "--mouse-y": "0px",
                } as React.CSSProperties
              }
            >
              {/* Spotlight effect */}
              <div
                className="pointer-events-none absolute -inset-px z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                  background:
                    "radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(0, 255, 255, 0.15), transparent 40%)",
                }}
              />

              {/* Background gradient */}
              <div className="absolute inset-0 z-0 bg-gradient-to-br from-cyan-400/10 to-fuchsia-500/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

              {/* Content */}
              <div className="relative z-10">
                <div className="mb-6 flex justify-center">{service.icon}</div>
                <h3 className="mb-4 text-2xl font-bold text-cyan-400">{service.title}</h3>
                <p className="mb-6 text-gray-300">{service.description}</p>
                <Button className="relative overflow-hidden rounded-full bg-gradient-to-r from-cyan-400 to-fuchsia-500 px-6 py-2 font-bold text-black shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_20px_rgba(255,0,255,0.5)]">
                  Learn More
                </Button>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 z-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="animate-border-flow absolute -inset-[4px] rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 opacity-70 blur-[5px]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes border-flow {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }
        
        .animate-border-flow {
          animation: border-flow 4s linear infinite;
          background-size: 400% 400%;
        }
      `}</style>
    </section>
  )
}
