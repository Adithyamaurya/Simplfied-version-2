"use client"

import { useRef } from "react"
import Link from "next/link"
import { Instagram, Twitter, Linkedin, Youtube } from "lucide-react"
import { motion, useInView } from "framer-motion"

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null)
  const isInView = useInView(footerRef, { once: false, amount: 0.3 })

  const socialLinks = [
    { icon: <Instagram className="h-6 w-6" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="h-6 w-6" />, href: "#", label: "Twitter" },
    { icon: <Linkedin className="h-6 w-6" />, href: "#", label: "LinkedIn" },
    { icon: <Youtube className="h-6 w-6" />, href: "#", label: "YouTube" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5 } },
  }

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-t from-black to-black/50 py-16 px-4 text-center">
      {/* Animated background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: "radial-gradient(circle, #00ffff 1px, transparent 1px)",
              backgroundSize: "30px 30px",
              backgroundPosition: "center center",
            }}
          ></div>
        </div>
      </div>

      <div className="container mx-auto">
        <motion.div
          className="mb-8 flex justify-center gap-8"
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {socialLinks.map((link, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Link
                href={link.href}
                className="group relative flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/30 text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/50 hover:text-cyan-400 hover:shadow-[0_0_15px_rgba(0,255,255,0.5)]"
                aria-label={link.label}
              >
                {link.icon}
                <span className="absolute -inset-px rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/20 to-fuchsia-500/20 blur-sm"></span>
                </span>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="mb-4 flex justify-center">
            <span className="text-2xl font-extrabold uppercase tracking-wider gradient-text">SIMPLIFIED V</span>
          </div>
          <p className="text-sm text-gray-600">© {new Date().getFullYear()} SIMPLIFIED V All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  )
}
