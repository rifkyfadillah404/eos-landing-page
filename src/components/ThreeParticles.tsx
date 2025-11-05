import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeParticlesProps {
  className?: string
}

export function ThreeParticles({ className }: ThreeParticlesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(75, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })

    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    camera.position.z = 50

    // Create particle sphere
    const particleCount = 1500
    const positions = new Float32Array(particleCount * 3)
    const colors = new Float32Array(particleCount * 3)
    const sizes = new Float32Array(particleCount)

    const color1 = new THREE.Color('#2563eb')
    const color2 = new THREE.Color('#60a5fa')
    const color3 = new THREE.Color('#3b82f6')

    for (let i = 0; i < particleCount; i++) {
      // Distribute particles in sphere
      const radius = 30 + Math.random() * 20
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = radius * Math.cos(phi)

      // Random colors
      const mixColor = Math.random()
      let finalColor: THREE.Color
      if (mixColor < 0.33) {
        finalColor = color1
      } else if (mixColor < 0.66) {
        finalColor = color2
      } else {
        finalColor = color3
      }

      colors[i * 3] = finalColor.r
      colors[i * 3 + 1] = finalColor.g
      colors[i * 3 + 2] = finalColor.b

      sizes[i] = Math.random() * 2 + 1
    }

    const geometry = new THREE.BufferGeometry()
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1))

    const material = new THREE.PointsMaterial({
      size: 2,
      vertexColors: true,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
      sizeAttenuation: true,
    })

    const particles = new THREE.Points(geometry, material)
    scene.add(particles)

    // Create connecting lines
    const lineGeometry = new THREE.BufferGeometry()
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x2563eb,
      transparent: true,
      opacity: 0.15,
      blending: THREE.AdditiveBlending,
    })

    const linePositions: number[] = []
    const maxDistance = 15

    for (let i = 0; i < particleCount; i++) {
      for (let j = i + 1; j < particleCount; j++) {
        const dx = positions[i * 3] - positions[j * 3]
        const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
        const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
        const distance = Math.sqrt(dx * dx + dy * dy + dz * dz)

        if (distance < maxDistance) {
          linePositions.push(
            positions[i * 3], positions[i * 3 + 1], positions[i * 3 + 2],
            positions[j * 3], positions[j * 3 + 1], positions[j * 3 + 2]
          )
        }
      }
    }

    lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3))
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial)
    scene.add(lines)

    // Animation
    let mouseX = 0
    let mouseY = 0
    let targetRotationX = 0
    let targetRotationY = 0

    const handleMouseMove = (event: MouseEvent) => {
      mouseX = (event.clientX / window.innerWidth) * 2 - 1
      mouseY = -(event.clientY / window.innerHeight) * 2 + 1
      targetRotationX = mouseY * 0.3
      targetRotationY = mouseX * 0.3
    }

    window.addEventListener('mousemove', handleMouseMove)

    const animate = () => {
      requestAnimationFrame(animate)

      // Rotate particles slowly
      particles.rotation.y += 0.001
      particles.rotation.x += 0.0005
      lines.rotation.y += 0.001
      lines.rotation.x += 0.0005

      // Mouse parallax
      particles.rotation.y += (targetRotationY - particles.rotation.y) * 0.05
      particles.rotation.x += (targetRotationX - particles.rotation.x) * 0.05
      lines.rotation.y += (targetRotationY - lines.rotation.y) * 0.05
      lines.rotation.x += (targetRotationX - lines.rotation.x) * 0.05

      // Animate particle sizes
      const sizes = geometry.attributes.size.array as Float32Array
      for (let i = 0; i < particleCount; i++) {
        sizes[i] = Math.sin(Date.now() * 0.001 + i * 0.1) * 1 + 2
      }
      geometry.attributes.size.needsUpdate = true

      renderer.render(scene, camera)
    }

    animate()

    const handleResize = () => {
      if (!canvas) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      renderer.dispose()
      geometry.dispose()
      material.dispose()
      lineGeometry.dispose()
      lineMaterial.dispose()
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
