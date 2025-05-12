"use client"

import { useRef } from "react"
import Image from "next/image"
import { motion, useInView } from "framer-motion"

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 })

  const portfolioItems = [
    {
      title: "Nebula Experience",
      description: "Interactive 3D space exploration platform",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Quantum Interface",
      description: "Award-winning UI design for tech startup",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Digital Organism",
      description: "AI-driven interactive art installation",
      image: "/placeholder.svg?height=400&width=600",
    },
    {
      title: "Hyperdrive",
      description: "Fast-paced 3D gaming experience",
      image: "/placeholder.svg?height=400&width=600",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6 } },
  }

  return (
    <section id="portfolio" className="relative py-20 px-4 md:py-32" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-cyan-900/5 to-black/0"></div>

        {/* Grid lines */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage:
                "linear-gradient(to right, #00ffff 1px, transparent 1px), linear-gradient(to bottom, #00ffff 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              backgroundPosition: "center center",
              mask: "radial-gradient(circle at center, black 30%, transparent 70%)",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
          transition={{ duration: 0.6 }}
        >
          Featured Work
        </motion.h2>

        <motion.div
          className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {portfolioItems.map((item, index) => (
            <motion.div key={index} className="group relative overflow-hidden rounded-xl" variants={itemVariants}>
              <div className="aspect-[4/3] sm:aspect-video md:aspect-[4/3]">
                <Image
                  src={item.image || "/placeholder.svg"}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* Glitch overlay effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 opacity-30 mix-blend-overlay">
                  <div className="h-full w-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxwYXRoIGQ9Ik0wIDBoMzAwdjMwMEgweiIgZmlsdGVyPSJ1cmwoI2EpIiBvcGFjaXR5PSIuMDUiLz48L3N2Zz4=')]"></div>
                </div>
              </div>

              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:opacity-100 sm:group-hover:opacity-100">
                <div className="transform transition-transform duration-300 group-hover:translate-y-0 sm:translate-y-8 sm:group-hover:translate-y-0">
                  <h3 className="mb-1 text-xl font-bold text-cyan-400">{item.title}</h3>
                  <p className="text-white">{item.description}</p>
                </div>
              </div>

              {/* Animated border */}
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 overflow-hidden rounded-xl">
                  <div className="animate-border-flow absolute -inset-[2px] rounded-xl bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-cyan-400 opacity-50 blur-[3px]"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
