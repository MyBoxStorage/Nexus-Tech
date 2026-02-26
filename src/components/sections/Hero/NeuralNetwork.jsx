import { useRef, useMemo, useEffect } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

// Individual node in the neural network
function Node({ position, color }) {
  const meshRef = useRef()
  const baseScale = 0.05 + Math.random() * 0.03
  
  useFrame((state) => {
    if (meshRef.current) {
      // Pulsing animation
      const pulse = Math.sin(state.clock.elapsedTime * 2 + position.x * 10) * 0.2 + 1
      meshRef.current.scale.setScalar(baseScale * pulse)
    }
  })

  return (
    <mesh ref={meshRef} position={position}>
      <sphereGeometry args={[1, 16, 16]} />
      <meshBasicMaterial color={color} transparent opacity={0.8} />
    </mesh>
  )
}

// Connection line between nodes
function Connection({ start, end, color }) {
  const lineRef = useRef()
  
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end)
  ], [start, end])
  
  const geometry = useMemo(() => new THREE.BufferGeometry().setFromPoints(points), [points])
  
  useFrame((state) => {
    if (lineRef.current) {
      // Animated opacity (signal propagation effect)
      const opacity = Math.sin(state.clock.elapsedTime * 3 + start[0] * 5) * 0.3 + 0.4
      lineRef.current.material.opacity = opacity
    }
  })

  return (
    <line ref={lineRef} geometry={geometry}>
      <lineBasicMaterial color={color} transparent opacity={0.3} linewidth={1} />
    </line>
  )
}

// Main neural network component
function NeuralNetworkScene() {
  const groupRef = useRef()
  
  // Generate nodes
  const nodes = useMemo(() => {
    const nodeList = []
    const nodeCount = 50
    
    for (let i = 0; i < nodeCount; i++) {
      // Distribute nodes in a spherical pattern
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      const radius = 1.5 + Math.random() * 1
      
      const x = radius * Math.sin(phi) * Math.cos(theta)
      const y = radius * Math.sin(phi) * Math.sin(theta)
      const z = radius * Math.cos(phi)
      
      // Alternate between blue and purple
      const color = Math.random() > 0.5 ? '#2563EB' : '#7C3AED'
      
      nodeList.push({
        id: i,
        position: [x, y, z],
        color
      })
    }
    
    return nodeList
  }, [])
  
  // Generate connections between nearby nodes
  const connections = useMemo(() => {
    const connectionList = []
    const maxDistance = 0.8
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i]
        const nodeB = nodes[j]
        
        const distance = Math.sqrt(
          Math.pow(nodeA.position[0] - nodeB.position[0], 2) +
          Math.pow(nodeA.position[1] - nodeB.position[1], 2) +
          Math.pow(nodeA.position[2] - nodeB.position[2], 2)
        )
        
        if (distance < maxDistance) {
          connectionList.push({
            id: `${i}-${j}`,
            start: nodeA.position,
            end: nodeB.position,
            color: Math.random() > 0.5 ? '#2563EB' : '#7C3AED'
          })
        }
      }
    }
    
    return connectionList
  }, [nodes])
  
  // Auto-rotation
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.1
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.1
    }
  })

  return (
    <group ref={groupRef}>
      {/* Render connections first (behind nodes) */}
      {connections.map((conn) => (
        <Connection
          key={conn.id}
          start={conn.start}
          end={conn.end}
          color={conn.color}
        />
      ))}
      
      {/* Render nodes */}
      {nodes.map((node) => (
        <Node
          key={node.id}
          position={node.position}
          color={node.color}
        />
      ))}
      
      {/* Ambient glow effect */}
      <pointLight position={[0, 0, 0]} intensity={0.5} color="#2563EB" distance={5} />
      <pointLight position={[2, 2, 2]} intensity={0.3} color="#7C3AED" distance={4} />
      <pointLight position={[-2, -2, -2]} intensity={0.3} color="#3B82F6" distance={4} />
    </group>
  )
}

// Main export component
function NeuralNetwork() {
  const containerRef = useRef(null)
  
  useEffect(() => {
    // Check if mobile for performance optimization
    const isMobile = window.innerWidth < 768
    
    if (isMobile && containerRef.current) {
      containerRef.current.style.display = 'none'
    }
  }, [])

  return (
    <div ref={containerRef} className="neural-network-container" style={{
      position: 'absolute',
      right: '5%',
      top: '50%',
      transform: 'translateY(-50%)',
      width: '500px',
      height: '500px',
      zIndex: 1,
      pointerEvents: 'none'
    }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.5} />
        <NeuralNetworkScene />
      </Canvas>
    </div>
  )
}

export default NeuralNetwork
