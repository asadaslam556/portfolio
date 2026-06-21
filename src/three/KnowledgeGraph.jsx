import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const PALETTE = ['#38bdf8', '#22d3ee', '#818cf8', '#7dd3fc', '#a5b4fc', '#5eead4']

// ---- graph geometry -------------------------------------------------------
function buildGraph(count = 46, radius = 2.6) {
  const nodes = []
  const golden = Math.PI * (3 - Math.sqrt(5)) // golden angle
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2
    const r = Math.sqrt(1 - y * y)
    const theta = golden * i
    const jitter = 0.82 + Math.random() * 0.18
    nodes.push({
      pos: new THREE.Vector3(
        Math.cos(theta) * r * radius * jitter,
        y * radius * jitter,
        Math.sin(theta) * r * radius * jitter
      ),
      color: PALETTE[i % PALETTE.length],
      degree: 0,
      phase: Math.random() * Math.PI * 2,
    })
  }

  // connect each node to its 2 nearest neighbours (deduped)
  const edgeSet = new Set()
  const edges = []
  for (let i = 0; i < count; i++) {
    const dists = []
    for (let j = 0; j < count; j++) {
      if (i === j) continue
      dists.push([j, nodes[i].pos.distanceTo(nodes[j].pos)])
    }
    dists.sort((a, b) => a[1] - b[1])
    for (let k = 0; k < 2; k++) {
      const j = dists[k][0]
      const key = i < j ? `${i}-${j}` : `${j}-${i}`
      if (!edgeSet.has(key)) {
        edgeSet.add(key)
        edges.push([i, j])
        nodes[i].degree++
        nodes[j].degree++
      }
    }
  }
  return { nodes, edges }
}

// soft radial-gradient sprite texture used as a glow halo (fake bloom)
function makeGlowTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = size
  const ctx = canvas.getContext('2d')
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.2, 'rgba(255,255,255,0.55)')
  g.addColorStop(0.5, 'rgba(255,255,255,0.12)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, size, size)
  const tex = new THREE.CanvasTexture(canvas)
  tex.needsUpdate = true
  return tex
}

// ---- edges ----------------------------------------------------------------
function Edges({ nodes, edges }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(edges.length * 2 * 3)
    edges.forEach(([a, b], i) => {
      const o = i * 6
      positions[o] = nodes[a].pos.x
      positions[o + 1] = nodes[a].pos.y
      positions[o + 2] = nodes[a].pos.z
      positions[o + 3] = nodes[b].pos.x
      positions[o + 4] = nodes[b].pos.y
      positions[o + 5] = nodes[b].pos.z
    })
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [nodes, edges])

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#4d7fd6"
        transparent
        opacity={0.18}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </lineSegments>
  )
}

// ---- nodes ----------------------------------------------------------------
function Nodes({ nodes, glowTex }) {
  const group = useRef()
  const maxDegree = useMemo(
    () => Math.max(...nodes.map((n) => n.degree)),
    [nodes]
  )

  useFrame((state) => {
    const t = state.clock.elapsedTime
    const g = group.current
    if (!g) return
    for (let i = 0; i < g.children.length; i++) {
      const node = nodes[i]
      const pulse = 0.5 + 0.5 * Math.sin(t * 1.1 + node.phase)
      const mesh = g.children[i]
      // child 0 = core sphere, child 1 = glow sprite
      const core = mesh.children[0]
      const halo = mesh.children[1]
      if (core?.material) core.material.emissiveIntensity = 1.1 + pulse * 1.6
      if (halo) {
        const s = halo.userData.base * (0.85 + pulse * 0.5)
        halo.scale.setScalar(s)
        halo.material.opacity = halo.userData.opacity * (0.6 + pulse * 0.5)
      }
    }
  })

  return (
    <group ref={group}>
      {nodes.map((n, i) => {
        const hub = n.degree >= Math.max(3, maxDegree - 1)
        const coreSize = hub ? 0.075 : 0.045
        const haloBase = hub ? 0.95 : 0.6
        return (
          <group key={i} position={n.pos}>
            <mesh>
              <sphereGeometry args={[coreSize, 16, 16]} />
              <meshStandardMaterial
                color={n.color}
                emissive={n.color}
                emissiveIntensity={1.6}
                toneMapped={false}
                roughness={0.35}
                metalness={0.1}
              />
            </mesh>
            <sprite
              scale={haloBase}
              userData={{ base: haloBase, opacity: hub ? 0.85 : 0.6 }}
            >
              <spriteMaterial
                map={glowTex}
                color={n.color}
                transparent
                opacity={0.7}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
                toneMapped={false}
              />
            </sprite>
          </group>
        )
      })}
    </group>
  )
}

// ---- floating particles ---------------------------------------------------
function Particles({ count = 160, glowTex }) {
  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const r = 4 + Math.random() * 4
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)
      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta)
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta)
      positions[i * 3 + 2] = r * Math.cos(phi)
    }
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [count])

  const ref = useRef()
  useFrame((state) => {
    if (ref.current) ref.current.rotation.y = state.clock.elapsedTime * 0.02
  })

  return (
    <points ref={ref} geometry={geometry}>
      <pointsMaterial
        map={glowTex}
        color="#9fd0ff"
        size={0.08}
        sizeAttenuation
        transparent
        opacity={0.7}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}

// ---- scene with pointer-reactive rotation --------------------------------
function Scene({ reducedMotion }) {
  const { nodes, edges } = useMemo(() => buildGraph(46, 2.6), [])
  const glowTex = useMemo(() => makeGlowTexture(), [])
  const root = useRef()
  const pointer = useRef({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return
    const handler = (e) => {
      pointer.current.x = (e.clientX / window.innerWidth) * 2 - 1
      pointer.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('pointermove', handler)
    return () => window.removeEventListener('pointermove', handler)
  }, [reducedMotion])

  useFrame((state, delta) => {
    const g = root.current
    if (!g) return
    // frame-rate independent damping toward target rotation
    const lambda = 2.2
    const factor = 1 - Math.exp(-lambda * delta)
    const targetY = pointer.current.x * 0.5 + state.clock.elapsedTime * (reducedMotion ? 0 : 0.06)
    const targetX = pointer.current.y * 0.35
    g.rotation.y += (targetY - g.rotation.y) * factor
    g.rotation.x += (targetX - g.rotation.x) * factor
  })

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[6, 4, 6]} intensity={45} color="#38bdf8" />
      <pointLight position={[-6, -3, -4]} intensity={30} color="#818cf8" />
      <group ref={root}>
        <Edges nodes={nodes} edges={edges} />
        <Nodes nodes={nodes} glowTex={glowTex} />
        <Particles glowTex={glowTex} />
      </group>
    </>
  )
}

export default function KnowledgeGraph({ reducedMotion = false }) {
  const wrapRef = useRef(null)
  const [active, setActive] = useState(true)

  // Pause the render loop whenever the hero scrolls out of view, so the 3D
  // scene never burns GPU/battery while the visitor reads other sections.
  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { threshold: 0 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])

  return (
    <div ref={wrapRef} className="h-full w-full">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
        frameloop={!reducedMotion && active ? 'always' : 'demand'}
      >
        <Scene reducedMotion={reducedMotion} />
      </Canvas>
    </div>
  )
}
