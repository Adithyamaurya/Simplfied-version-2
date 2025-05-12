"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

// Team member data
const teamMembers = [
  {
    name: "Adithya Maurya",
    title: "3D Designer",
    bio: "Pioneer in spatial design with 12+ years crafting mind-bending experiences for global brands. Masters in Digital Arts from RISD.",
    image: "/placeholder.svg?height=250&width=250",
    skills: [
      { name: "Blender", level: 95 },
      { name: "Filmora", level: 90 },
      { name: "JavaScript", level: 85 },
    ],
    iconType: "designer",
  },
  {
    name: "Aakash Singh",
    title: "Design Lead",
    bio: "Award-winning frontend developer specializing in immersive interfaces and responsive animations. Creates stunning web experiences with pixel-perfect precision.",
    image: "/placeholder.svg?height=250&width=250",
    skills: [
      { name: "HTML/CSS", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "Bootstrap", level: 85 },
    ],
    iconType: "frontend",
  },
  {
    name: "Rajath Shettighar",
    title: "UI/UX Architect",
    bio: "Architecture wizard who builds robust, scalable backend systems powering our most complex applications. Specializes in high-performance APIs and database optimization.",
    image: "/placeholder.svg?height=250&width=250",
    skills: [
      { name: "Node.js", level: 92 },
      { name: "HTML/CSS", level: 88 },
      { name: "Vibe coding", level: 90 },
    ],
    iconType: "backend",
  },
  {
    name: "Prince Shirathiya",
    title: "Full Stack Developer",
    bio: "End-to-end development maestro who tackles complex projects from concept to deployment. Expert in bridging frontend aesthetics with backend functionality.",
    image: "/placeholder.svg?height=250&width=250",
    skills: [
      { name: "Flutter", level: 90 },
      { name: "Backend", level: 85 },
      { name: "Databases", level: 80 },
    ],
    iconType: "fullstack",
  },
  {
    name: "Shivam Divakar",
    title: "Backend Specialist",
    bio: "Master of creative code who transforms algorithms into art. Specializes in generative design and creating mesmerizing real-time graphics experiences.",
    image: "/placeholder.svg?height=250&width=250",
    skills: [
      { name: "HTML/CSS", level: 92 },
      { name: "PHP", level: 95 },
      { name: "Core Java", level: 88 },
    ],
    iconType: "coder",
  },
]

// SVG Icons for each team member type
const TechIcons = {
  designer: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <polygon points="50,10 90,30 90,70 50,90 10,70 10,30" fill="none" stroke="#00ffff" strokeWidth="2" />
      <polygon points="50,20 80,35 80,65 50,80 20,65 20,35" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <circle cx="50" cy="50" r="10" fill="none" stroke="#00ffff" strokeWidth="2" />
      <line x1="40" y1="50" x2="60" y2="50" stroke="#ff00ff" strokeWidth="2" />
      <line x1="50" y1="40" x2="50" y2="60" stroke="#ff00ff" strokeWidth="2" />
    </svg>
  ),
  frontend: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect x="10" y="10" width="80" height="60" rx="5" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="20" y="20" width="60" height="10" rx="2" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <rect x="20" y="35" width="30" height="25" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="55" y="35" width="25" height="10" rx="2" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <rect x="55" y="50" width="25" height="10" rx="2" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <line x1="10" y1="80" x2="90" y2="80" stroke="#00ffff" strokeWidth="2" />
      <circle cx="50" cy="85" r="5" fill="none" stroke="#ff00ff" strokeWidth="2" />
    </svg>
  ),
  backend: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect x="25" y="15" width="50" height="70" rx="5" fill="none" stroke="#00ffff" strokeWidth="2" />
      <circle cx="50" cy="30" r="8" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <rect x="35" y="45" width="30" height="5" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="35" y="55" width="30" height="5" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="35" y="65" width="30" height="5" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <line x1="15" y1="25" x2="25" y2="35" stroke="#ff00ff" strokeWidth="2" />
      <line x1="15" y1="35" x2="25" y2="45" stroke="#ff00ff" strokeWidth="2" />
      <line x1="75" y1="35" x2="85" y2="45" stroke="#ff00ff" strokeWidth="2" />
      <line x1="75" y1="45" x2="85" y2="55" stroke="#ff00ff" strokeWidth="2" />
    </svg>
  ),
  fullstack: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <circle cx="50" cy="50" r="40" fill="none" stroke="#00ffff" strokeWidth="2" />
      <path d="M30,40 L45,50 L30,60" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <path d="M70,40 L55,50 L70,60" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <line x1="40" y1="30" x2="60" y2="70" stroke="#00ffff" strokeWidth="2" />
      <circle cx="50" cy="20" r="5" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <circle cx="50" cy="80" r="5" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <circle cx="20" cy="50" r="5" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <circle cx="80" cy="50" r="5" fill="none" stroke="#ff00ff" strokeWidth="2" />
    </svg>
  ),
  coder: (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" className="h-full w-full">
      <rect x="10" y="20" width="80" height="60" rx="5" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="15" y="30" width="70" height="10" rx="2" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <rect x="15" y="45" width="50" height="5" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="15" y="55" width="60" height="5" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <rect x="15" y="65" width="40" height="5" rx="2" fill="none" stroke="#00ffff" strokeWidth="2" />
      <path d="M35,15 L40,15 L45,20 L40,25 L35,25 L30,20 Z" fill="none" stroke="#ff00ff" strokeWidth="2" />
      <path d="M60,15 L65,15 L70,20 L65,25 L60,25 L55,20 Z" fill="none" stroke="#ff00ff" strokeWidth="2" />
    </svg>
  ),
}

export default function Team() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)
  const [direction, setDirection] = useState(0) // -1 for left, 1 for right
  const sectionRef = useRef<HTMLDivElement>(null)

  const goToSlide = (index: number) => {
    if (isAnimating) return
    setDirection(index > currentIndex ? 1 : -1)
    setIsAnimating(true)
    setCurrentIndex(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const nextSlide = () => {
    if (isAnimating) return
    const newIndex = (currentIndex + 1) % teamMembers.length
    setDirection(1)
    goToSlide(newIndex)
  }

  const prevSlide = () => {
    if (isAnimating) return
    const newIndex = (currentIndex - 1 + teamMembers.length) % teamMembers.length
    setDirection(-1)
    goToSlide(newIndex)
  }

  // Auto-play carousel
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 5000)

    return () => clearInterval(interval)
  }, [currentIndex])

  // Particle effect for the active member
  useEffect(() => {
    if (!sectionRef.current) return

    const canvas = document.createElement("canvas")
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const particleContainer = sectionRef.current.querySelector(".particle-container")
    if (!particleContainer) return

    particleContainer.appendChild(canvas)

    const resizeCanvas = () => {
      canvas.width = particleContainer.clientWidth
      canvas.height = particleContainer.clientHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 3 + 1
        this.speedX = (Math.random() - 0.5) * 2
        this.speedY = (Math.random() - 0.5) * 2
        this.color = Math.random() > 0.5 ? "#00ffff" : "#ff00ff"
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    const particles: Particle[] = []
    for (let i = 0; i < 50; i++) {
      particles.push(new Particle())
    }

    const animate = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const particle of particles) {
        particle.update()
        particle.draw()
      }

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
      if (particleContainer && particleContainer.contains(canvas)) {
        particleContainer.removeChild(canvas)
      }
    }
  }, [])

  return (
    <section id="team" className="relative py-20 px-4 md:py-32" ref={sectionRef}>
      {/* Background elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-fuchsia-900/5 to-black/0"></div>
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10"
            style={{
              top: `${20 + i * 15}%`,
              left: 0,
              right: 0,
              height: "1px",
              background: "linear-gradient(90deg, transparent, #00ffff, transparent)",
              transform: `translateY(${Math.sin(i) * 20}px)`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto">
        <motion.h2
          className="section-title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.6 }}
        >
          Meet Our Team
        </motion.h2>

        <div className="relative mt-16 overflow-hidden">
          <div className="particle-container absolute inset-0 -z-10"></div>

          <AnimatePresence initial={false} mode="wait" custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              initial={{ opacity: 0, x: direction * 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -100 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              className="w-full"
            >
              <div className="flex flex-col items-center justify-center gap-8 md:flex-row md:items-start md:justify-start">
                <div className="relative h-48 w-48 flex-shrink-0 md:h-64 md:w-64">
                  <div className="relative h-full w-full overflow-hidden rounded-full">
                    <Image
                      src={teamMembers[currentIndex].image || "/placeholder.svg"}
                      alt={teamMembers[currentIndex].name}
                      fill
                      className="object-cover"
                    />
                    <div className="member-glow"></div>

                    {/* Animated ring */}
                    <div className="absolute inset-0 rounded-full">
                      <div className="absolute -inset-1 animate-spin-slow rounded-full bg-gradient-to-r from-cyan-400/30 via-fuchsia-500/30 to-cyan-400/30 opacity-70 blur-sm"></div>
                    </div>
                  </div>
                </div>

                <div className="max-w-2xl text-center md:text-left">
                  <motion.h3
                    className="mb-2 text-3xl font-bold gradient-text md:text-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.2 }}
                  >
                    {teamMembers[currentIndex].name}
                  </motion.h3>

                  <motion.p
                    className="mb-6 text-lg font-semibold uppercase tracking-wide text-cyan-400"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                  >
                    {teamMembers[currentIndex].title}
                  </motion.p>

                  <motion.div
                    className="mb-6 rounded-xl border border-cyan-400/20 bg-black/30 p-4 backdrop-blur-sm"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                  >
                    <div className="flex flex-col gap-4 md:flex-row md:items-center">
                      <div className="flex-1">
                        {teamMembers[currentIndex].skills.map((skill, idx) => (
                          <div key={idx} className="mb-3 flex items-center gap-2">
                            <div className="w-24 text-sm text-white">{skill.name}</div>
                            <div className="h-2 flex-1 overflow-hidden rounded-full bg-white/10">
                              <motion.div
                                className="h-full rounded bg-gradient-to-r from-cyan-400 to-fuchsia-500"
                                initial={{ width: 0 }}
                                animate={{ width: `${skill.level}%` }}
                                transition={{ duration: 1, delay: 0.5 + idx * 0.1 }}
                              ></motion.div>
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mx-auto h-24 w-24 md:h-28 md:w-28">
                        <motion.div
                          className={`tech-icon ${teamMembers[currentIndex].iconType}`}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1, rotate: 360 }}
                          transition={{ duration: 0.5, delay: 0.6 }}
                        >
                          {TechIcons[teamMembers[currentIndex].iconType as keyof typeof TechIcons]}
                        </motion.div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.p
                    className="text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.7 }}
                  >
                    {teamMembers[currentIndex].bio}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div className="mt-8 flex items-center justify-center gap-8">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-2 border-cyan-400/50 bg-transparent text-cyan-400 hover:bg-cyan-400/20 hover:text-white"
            >
              <ChevronLeft className="h-6 w-6" />
              <span className="sr-only">Previous</span>
            </Button>

            <div className="flex gap-4">
              {teamMembers.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goToSlide(idx)}
                  className={`relative h-3 w-3 rounded-full transition-all duration-300 ${
                    idx === currentIndex
                      ? "bg-cyan-400 shadow-[0_0_10px_rgba(0,255,255,0.7)] scale-125"
                      : "bg-cyan-400/30"
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                >
                  {idx === currentIndex && (
                    <span className="absolute -inset-1 animate-ping rounded-full bg-cyan-400/75"></span>
                  )}
                </button>
              ))}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="h-12 w-12 rounded-full border-2 border-cyan-400/50 bg-transparent text-cyan-400 hover:bg-cyan-400/20 hover:text-white"
            >
              <ChevronRight className="h-6 w-6" />
              <span className="sr-only">Next</span>
            </Button>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 10s linear infinite;
        }
      `}</style>
    </section>
  )
}
