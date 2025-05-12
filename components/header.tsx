"use client"

import { useState, useEffect } from "react"
import Link from "next/link"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  return (
    <header
      className={`fixed top-0 z-50 w-full px-4 py-6 transition-all duration-300 ${
        isScrolled ? "bg-black/90 backdrop-blur-sm" : "bg-gradient-to-b from-black/90 to-transparent"
      }`}
    >
      <div className="container mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <span className="text-2xl font-extrabold uppercase tracking-wider gradient-text">SIMPLIFIED V</span>
        </Link>

        <button className="z-50 block md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          <div className="flex h-6 w-8 flex-col items-end justify-between">
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "translate-y-2.5 rotate-45" : ""
              }`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${isMenuOpen ? "opacity-0" : ""}`}
            ></span>
            <span
              className={`block h-0.5 w-full bg-white transition-all duration-300 ${
                isMenuOpen ? "-translate-y-2.5 -rotate-45" : ""
              }`}
            ></span>
          </div>
        </button>

        <nav
          className={`fixed inset-0 z-40 flex items-center justify-center bg-black/95 transition-all duration-300 md:static md:h-auto md:w-auto md:bg-transparent md:opacity-100 ${
            isMenuOpen ? "opacity-100" : "pointer-events-none opacity-0 md:pointer-events-auto"
          }`}
        >
          <ul className="flex flex-col items-center gap-8 md:flex-row md:gap-8">
            {["home", "services", "team", "portfolio", "contact"].map((item) => (
              <li key={item}>
                <Link
                  href={`#${item}`}
                  className="text-lg font-semibold uppercase tracking-wide text-white transition-colors duration-300 hover:text-cyan-400 gradient-border md:text-base"
                  onClick={closeMenu}
                >
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}
