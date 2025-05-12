"use client"

import { useEffect, useState } from "react"

export default function MouseFollower() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [isHovering, setIsHovering] = useState(false)
  const [trailPositions, setTrailPositions] = useState<Array<{ x: number; y: number }>>([])

  useEffect(() => {
    // Only enable on devices with hover capability
    const hasHover = window.matchMedia("(hover: hover)").matches
    setIsVisible(hasHover)

    if (!hasHover) return

    const updatePosition = (e: MouseEvent) => {
      const newPosition = { x: e.clientX, y: e.clientY }
      setPosition(newPosition)

      // Update trail positions
      setTrailPositions((prev) => {
        const newTrail = [newPosition, ...prev.slice(0, 9)]
        return newTrail
      })
    }

    const handleClick = () => {
      setClicked(true)
      setTimeout(() => setClicked(false), 300)
    }

    const handleHoverStart = (e: MouseEvent) => {
      if (
        (e.target as HTMLElement).tagName === "BUTTON" ||
        (e.target as HTMLElement).tagName === "A" ||
        (e.target as HTMLElement).closest("button") ||
        (e.target as HTMLElement).closest("a")
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mousemove", handleHoverStart)
    window.addEventListener("click", handleClick)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mousemove", handleHoverStart)
      window.removeEventListener("click", handleClick)
    }
  }, [])

  if (!isVisible) return null

  return (
    <>
      {/* Trail effect */}
      {trailPositions.map((pos, index) => (
        <div
          key={index}
          className="pointer-events-none fixed z-[9998] mix-blend-lighten"
          style={{
            left: `${pos.x}px`,
            top: `${pos.y}px`,
            transform: `translate(-50%, -50%) scale(${0.8 - index * 0.07})`,
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            background: `rgba(${index % 2 ? "255, 0, 255" : "0, 255, 255"}, ${0.2 - index * 0.02})`,
            transition: "opacity 0.3s ease",
            opacity: clicked ? 0 : 1,
          }}
        />
      ))}

      {/* Main cursor */}
      <div
        className="pointer-events-none fixed z-[9999] mix-blend-lighten"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${clicked ? 1.5 : isHovering ? 2 : 1})`,
          width: "30px",
          height: "30px",
          borderRadius: "50%",
          background: isHovering
            ? "rgba(255, 0, 255, 0.4)"
            : clicked
              ? "rgba(255, 255, 255, 0.5)"
              : "rgba(0, 255, 255, 0.3)",
          boxShadow: isHovering
            ? "0 0 20px rgba(255, 0, 255, 0.6)"
            : clicked
              ? "0 0 30px rgba(255, 255, 255, 0.8)"
              : "0 0 10px rgba(0, 255, 255, 0.5)",
          transition: clicked
            ? "transform 0.3s ease, background 0.3s ease, box-shadow 0.3s ease"
            : "transform 0.1s ease, background 0.3s ease, box-shadow 0.3s ease",
        }}
      />
    </>
  )
}
