"use client"

import { useEffect, useRef, useState } from "react"
import * as THREE from "three"
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer"
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass"
import { UnrealBloomPass } from "three/examples/jsm/postprocessing/UnrealBloomPass"
import { GlitchPass } from "three/examples/jsm/postprocessing/GlitchPass"

export default function BackgroundCanvas() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [scrollPosition, setScrollPosition] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()

    // Add fog for depth
    scene.fog = new THREE.FogExp2(0x000000, 0.035)

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    camera.position.z = 5

    // Renderer with higher quality
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    })
    renderer.setSize(window.innerWidth, window.innerHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.toneMapping = THREE.ACESFilmicToneMapping
    renderer.toneMappingExposure = 1.5
    containerRef.current.appendChild(renderer.domElement)

    // Post-processing
    const composer = new EffectComposer(renderer)
    const renderPass = new RenderPass(scene, camera)
    composer.addPass(renderPass)

    // Bloom effect
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(window.innerWidth, window.innerHeight),
      1.5, // strength
      0.4, // radius
      0.85, // threshold
    )
    composer.addPass(bloomPass)

    // Glitch effect (subtle)
    const glitchPass = new GlitchPass(0.5)
    glitchPass.enabled = false // Start disabled, will enable on scroll
    composer.addPass(glitchPass)

    // Create main particle system
    const particleCount = 8000
    const particleGeometry = new THREE.BufferGeometry()
    const particlePositions = new Float32Array(particleCount * 3)
    const particleSizes = new Float32Array(particleCount)
    const particleColors = new Float32Array(particleCount * 3)

    // Create a more interesting distribution of particles
    for (let i = 0; i < particleCount; i++) {
      // Create clusters and patterns instead of random distribution
      const angle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 15
      const height = (Math.random() - 0.5) * 20

      // Spiral pattern
      const x = Math.cos(angle * 5) * radius
      const z = Math.sin(angle * 5) * radius
      const y = height + Math.sin(angle * 3) * 2

      const i3 = i * 3
      particlePositions[i3] = x
      particlePositions[i3 + 1] = y
      particlePositions[i3 + 2] = z

      // Vary particle sizes
      particleSizes[i] = Math.random() * 3 + 0.5

      // Create color gradient from cyan to magenta
      const colorT = Math.random()
      particleColors[i3] = colorT * 1.0 // R: 0 to 1.0 (magenta component)
      particleColors[i3 + 1] = 0.5 + Math.random() * 0.5 // G: random variation
      particleColors[i3 + 2] = 1.0 - colorT * 0.5 // B: 1.0 to 0.5 (cyan component)
    }

    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3))
    particleGeometry.setAttribute("size", new THREE.BufferAttribute(particleSizes, 1))
    particleGeometry.setAttribute("color", new THREE.BufferAttribute(particleColors, 3))

    // Custom shader material for particles
    const particleMaterial = new THREE.ShaderMaterial({
      uniforms: {
        time: { value: 0 },
        mousePosition: { value: new THREE.Vector2(0, 0) },
        scrollPosition: { value: 0 },
      },
      vertexShader: `
        attribute float size;
        attribute vec3 color;
        varying vec3 vColor;
        uniform float time;
        uniform vec2 mousePosition;
        uniform float scrollPosition;
        
        void main() {
          vColor = color;
          
          // Dynamic movement based on time
          vec3 pos = position;
          float waveX = sin(time * 0.3 + position.z * 0.2) * 0.2;
          float waveY = cos(time * 0.2 + position.x * 0.1) * 0.3;
          float waveZ = sin(time * 0.15 + position.y * 0.05) * 0.2;
          
          // Mouse influence (subtle attraction)
          float mouseDistance = distance(vec2(position.x, position.y), mousePosition);
          float mouseInfluence = 0.5 / (1.0 + mouseDistance * 0.1);
          vec2 mouseDir = normalize(vec2(mousePosition.x - position.x, mousePosition.y - position.y));
          
          // Apply transformations
          pos.x += waveX + mouseDir.x * mouseInfluence * 0.1;
          pos.y += waveY + mouseDir.y * mouseInfluence * 0.1;
          pos.z += waveZ;
          
          // Scroll effect - particles move away from camera
          pos.z += scrollPosition * 0.01;
          
          // Project to screen space
          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
          gl_Position = projectionMatrix * mvPosition;
          
          // Size attenuation
          gl_PointSize = size * (300.0 / -mvPosition.z) * (1.0 + sin(time + position.x * 10.0) * 0.2);
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        uniform float time;
        
        void main() {
          // Calculate distance from center of point
          vec2 center = gl_PointCoord - 0.5;
          float dist = length(center);
          
          // Discard pixels outside of circle
          if (dist > 0.5) discard;
          
          // Create glowing particle effect
          float strength = 1.0 - dist * 2.0;
          strength = pow(strength, 1.5);
          
          // Pulse effect
          float pulse = 0.5 + 0.5 * sin(time * 3.0 + vColor.r * 10.0);
          strength *= 0.75 + pulse * 0.25;
          
          // Output color with glow
          gl_FragColor = vec4(vColor, strength);
        }
      `,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    })

    const particleSystem = new THREE.Points(particleGeometry, particleMaterial)
    scene.add(particleSystem)

    // Create secondary particle system (smaller background particles)
    const bgParticleCount = 2000
    const bgParticleGeometry = new THREE.BufferGeometry()
    const bgParticlePositions = new Float32Array(bgParticleCount * 3)

    for (let i = 0; i < bgParticleCount; i++) {
      const i3 = i * 3
      bgParticlePositions[i3] = (Math.random() - 0.5) * 50
      bgParticlePositions[i3 + 1] = (Math.random() - 0.5) * 50
      bgParticlePositions[i3 + 2] = (Math.random() - 0.5) * 50
    }

    bgParticleGeometry.setAttribute("position", new THREE.BufferAttribute(bgParticlePositions, 3))

    const bgParticleMaterial = new THREE.PointsMaterial({
      size: 0.1,
      color: 0x88ccff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    })

    const bgParticleSystem = new THREE.Points(bgParticleGeometry, bgParticleMaterial)
    scene.add(bgParticleSystem)

    // Create energy lines
    const linesCount = 50
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xff00ff,
      transparent: true,
      opacity: 0.3,
      blending: THREE.AdditiveBlending,
    })

    const lines: THREE.Line[] = []

    for (let i = 0; i < linesCount; i++) {
      const lineGeometry = new THREE.BufferGeometry()
      const points = []
      const startAngle = Math.random() * Math.PI * 2
      const radius = 5 + Math.random() * 10
      const height = (Math.random() - 0.5) * 10
      const segments = Math.floor(Math.random() * 5) + 3

      for (let j = 0; j <= segments; j++) {
        const angle = startAngle + (j / segments) * Math.PI * 2
        points.push(
          new THREE.Vector3(Math.cos(angle) * radius, height + (Math.random() - 0.5) * 5, Math.sin(angle) * radius),
        )
      }

      lineGeometry.setFromPoints(points)
      const line = new THREE.Line(lineGeometry, lineMaterial)
      scene.add(line)
      lines.push(line)
    }

    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0x222222)
    scene.add(ambientLight)

    // Add point lights
    const light1 = new THREE.PointLight(0x00ffff, 2, 50)
    light1.position.set(10, 5, 10)
    scene.add(light1)

    const light2 = new THREE.PointLight(0xff00ff, 2, 50)
    light2.position.set(-10, -5, -10)
    scene.add(light2)

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      // Convert mouse position to normalized device coordinates (-1 to +1)
      const x = (e.clientX / window.innerWidth) * 2 - 1
      const y = -(e.clientY / window.innerHeight) * 2 + 1
      setMousePosition({ x, y })
    }

    // Scroll handler
    const handleScroll = () => {
      const scrollY = window.scrollY
      setScrollPosition(scrollY)

      // Enable glitch effect when scrolling fast
      const scrollSpeed = Math.abs(scrollY - scrollPosition)
      glitchPass.enabled = scrollSpeed > 30

      // Disable glitch after a short delay
      if (glitchPass.enabled) {
        setTimeout(() => {
          glitchPass.enabled = false
        }, 500)
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    window.addEventListener("scroll", handleScroll)

    // Animation
    let time = 0
    const animate = () => {
      requestAnimationFrame(animate)
      time += 0.01

      // Update uniforms
      if (particleMaterial.uniforms) {
        particleMaterial.uniforms.time.value = time
        particleMaterial.uniforms.mousePosition.value = new THREE.Vector2(mousePosition.x, mousePosition.y)
        particleMaterial.uniforms.scrollPosition.value = scrollPosition * 0.01
      }

      // Rotate particle systems
      particleSystem.rotation.y = time * 0.05
      bgParticleSystem.rotation.x = time * 0.02
      bgParticleSystem.rotation.y = time * 0.01

      // Animate energy lines
      lines.forEach((line, i) => {
        line.rotation.x = time * 0.02 + i * 0.01
        line.rotation.y = time * 0.03 + i * 0.02
        line.rotation.z = time * 0.01 + i * 0.03

        // Pulse the opacity
        const material = line.material as THREE.LineBasicMaterial
        material.opacity = 0.2 + 0.3 * Math.sin(time + i)
      })

      // Animate lights
      light1.position.x = Math.sin(time * 0.3) * 15
      light1.position.z = Math.cos(time * 0.3) * 15

      light2.position.x = Math.sin(time * 0.4 + Math.PI) * 15
      light2.position.z = Math.cos(time * 0.4 + Math.PI) * 15

      // Render with post-processing
      composer.render()
    }

    animate()

    // Handle window resize
    const handleResize = () => {
      const width = window.innerWidth
      const height = window.innerHeight

      camera.aspect = width / height
      camera.updateProjectionMatrix()

      renderer.setSize(width, height)
      composer.setSize(width, height)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("scroll", handleScroll)
      window.removeEventListener("resize", handleResize)

      if (containerRef.current) {
        containerRef.current.removeChild(renderer.domElement)
      }

      // Dispose resources
      particleGeometry.dispose()
      particleMaterial.dispose()
      bgParticleGeometry.dispose()
      bgParticleMaterial.dispose()
      lines.forEach((line) => {
        line.geometry
          .dispose()(line.material as THREE.Material)
          .dispose()
      })
    }
  }, [])

  return <div ref={containerRef} className="fixed inset-0 -z-10 h-full w-full" />
}
