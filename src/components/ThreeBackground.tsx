import { useEffect, useRef } from 'react'
import * as THREE from 'three'

interface ThreeBackgroundProps {
  className?: string
}

export function ThreeBackground({ className = '' }: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const sceneRef = useRef<THREE.Scene | null>(null)
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null)
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null)
  const gridMeshRef = useRef<THREE.Mesh | null>(null)
  const wireframeMeshRef = useRef<THREE.LineSegments | null>(null)
  const mouseRef = useRef({ x: 0, y: 0 })
  const frameIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!containerRef.current) {
      console.log('ThreeBackground: container not ready')
      return
    }

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      console.log('ThreeBackground: reduced motion enabled')
      return
    }

    const container = containerRef.current
    const width = container.clientWidth || window.innerWidth
    const height = container.clientHeight || window.innerHeight
    
    console.log('ThreeBackground: Initializing', { width, height })

    // Scene setup
    const scene = new THREE.Scene()
    sceneRef.current = scene

    // Camera setup
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000)
    camera.position.set(0, 20, 50)
    camera.lookAt(0, 0, 0)
    cameraRef.current = camera

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    })
    renderer.setSize(width, height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    rendererRef.current = renderer
    container.appendChild(renderer.domElement)

    // Create wave grid
    const gridSize = 80
    const gridDivisions = 60
    const geometry = new THREE.PlaneGeometry(gridSize, gridSize, gridDivisions, gridDivisions)
    
    // Store original positions for wave animation
    const positionAttribute = geometry.getAttribute('position')
    const originalPositions = new Float32Array(positionAttribute.array.length)
    for (let i = 0; i < positionAttribute.array.length; i++) {
      originalPositions[i] = positionAttribute.array[i]
    }
    geometry.userData.originalPositions = originalPositions
    
    console.log('ThreeBackground: Created grid', gridDivisions, 'x', gridDivisions)

    // Grid material with shader
    const material = new THREE.ShaderMaterial({
      transparent: true,
      side: THREE.DoubleSide,
      uniforms: {
        uTime: { value: 0 },
        uColorStart: { value: new THREE.Color(0x2563eb) },
        uColorEnd: { value: new THREE.Color(0x3b82f6) },
      },
      vertexShader: `
        uniform float uTime;
        varying vec3 vPosition;
        varying float vElevation;
        
        void main() {
          vPosition = position;
          
          vec3 pos = position;
          
          // Multiple wave layers for complex motion - more dramatic!
          float wave1 = sin(pos.x * 0.3 + uTime * 0.8) * cos(pos.y * 0.3 + uTime * 0.6);
          float wave2 = sin(pos.x * 0.5 - uTime * 0.5) * sin(pos.y * 0.4 + uTime * 0.7);
          float wave3 = cos(pos.x * 0.2 + pos.y * 0.2 + uTime * 0.4);
          
          pos.z = (wave1 * 8.0) + (wave2 * 6.0) + (wave3 * 4.0);
          vElevation = pos.z;
          
          gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 uColorStart;
        uniform vec3 uColorEnd;
        varying vec3 vPosition;
        varying float vElevation;
        
        void main() {
          // Color based on elevation
          float colorMix = (vElevation + 10.0) / 20.0;
          colorMix = clamp(colorMix, 0.0, 1.0);
          
          vec3 color = mix(uColorStart, uColorEnd, colorMix);
          
          // Fade edges
          float distFromCenter = length(vPosition.xy) / 40.0;
          float alpha = 1.0 - smoothstep(0.5, 1.0, distFromCenter);
          alpha *= 0.85;
          
          gl_FragColor = vec4(color, alpha);
        }
      `,
    })

    const gridMesh = new THREE.Mesh(geometry, material)
    gridMesh.rotation.x = -Math.PI * 0.35
    scene.add(gridMesh)
    gridMeshRef.current = gridMesh
    
    // Add wireframe overlay for grid lines
    const wireframeGeometry = new THREE.WireframeGeometry(geometry)
    const wireframeMaterial = new THREE.LineBasicMaterial({
      color: 0x1d4ed8,
      transparent: true,
      opacity: 0.8,
      linewidth: 2,
    })
    
    const wireframe = new THREE.LineSegments(wireframeGeometry, wireframeMaterial)
    wireframe.rotation.x = -Math.PI * 0.35
    scene.add(wireframe)
    wireframeMeshRef.current = wireframe
    
    console.log('ThreeBackground: Grid and wireframe added to scene')

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      mouseRef.current.x = (event.clientX / width) * 2 - 1
      mouseRef.current.y = -(event.clientY / height) * 2 + 1
    }
    window.addEventListener('mousemove', handleMouseMove)

    // Handle resize
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current || !containerRef.current) return

      const newWidth = containerRef.current.clientWidth
      const newHeight = containerRef.current.clientHeight

      cameraRef.current.aspect = newWidth / newHeight
      cameraRef.current.updateProjectionMatrix()
      rendererRef.current.setSize(newWidth, newHeight)
      rendererRef.current.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    }
    window.addEventListener('resize', handleResize)

    // Animation loop
    const clock = new THREE.Clock()
    let frameCount = 0
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current || !gridMeshRef.current) return

      const elapsedTime = clock.getElapsedTime()

      // Update shader time for wave animation
      const shaderMaterial = gridMeshRef.current.material as THREE.ShaderMaterial
      shaderMaterial.uniforms.uTime.value = elapsedTime

      // Subtle grid rotation
      gridMeshRef.current.rotation.z = Math.sin(elapsedTime * 0.1) * 0.05
      if (wireframeMeshRef.current) {
        wireframeMeshRef.current.rotation.z = Math.sin(elapsedTime * 0.1) * 0.05
      }
      
      // Debug log every 120 frames
      frameCount++
      if (frameCount === 120) {
        console.log('ThreeBackground: Wave grid animating', { elapsedTime })
        frameCount = 0
      }

      // Mouse parallax effect - subtle for professional look
      const targetX = mouseRef.current.x * 3
      const targetY = mouseRef.current.y * 3
      const currentX = cameraRef.current.position.x
      const currentY = cameraRef.current.position.y
      
      cameraRef.current.position.x += (targetX - currentX) * 0.05
      cameraRef.current.position.y += (20 + targetY - currentY) * 0.05
      cameraRef.current.lookAt(0, 0, 0)

      rendererRef.current.render(sceneRef.current, cameraRef.current)
      frameIdRef.current = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('resize', handleResize)
      
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current)
      }
      
      if (rendererRef.current) {
        rendererRef.current.dispose()
        if (container && rendererRef.current.domElement.parentNode === container) {
          container.removeChild(rendererRef.current.domElement)
        }
      }
      
      if (gridMeshRef.current) {
        gridMeshRef.current.geometry.dispose()
        if (gridMeshRef.current.material instanceof THREE.Material) {
          gridMeshRef.current.material.dispose()
        }
      }
      
      if (wireframeMeshRef.current) {
        wireframeMeshRef.current.geometry.dispose()
        if (wireframeMeshRef.current.material instanceof THREE.Material) {
          wireframeMeshRef.current.material.dispose()
        }
      }
    }
  }, [])

  return <div ref={containerRef} className={className} aria-hidden="true" />
}
