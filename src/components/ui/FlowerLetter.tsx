"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, ContactShadows } from "@react-three/drei";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 Original — Ultra-Premium 3D Glass Code Orbs
  
  Apple-level quality:
    - Dark glossy MeshPhysicalMaterial with high metalness
    - Strong specular highlights + chromatic aberration post-processing  
    - Environment reflections with HDR
    - Contact shadows for grounding
    - No stems — orbs float freely at staggered heights
    - Larger sizes (200-250px)
*/

/* ─── Orb config per letter ─── */
interface OrbConfig {
    symbol: string;
    baseColor: string;
    accentColor: string;
    emissiveColor: string;
    roughness: number;
    metalness: number;
    yOffset: number; // staggered floating heights
}

const ORB_CONFIGS: Record<string, OrbConfig> = {
    코: {
        symbol: "{ }",
        baseColor: "#1a1a2e",
        accentColor: "#FF6B9D",
        emissiveColor: "#FF9A9E",
        roughness: 0.05,
        metalness: 0.95,
        yOffset: 0.3,
    },
    딩: {
        symbol: "< >",
        baseColor: "#0f1923",
        accentColor: "#00D4AA",
        emissiveColor: "#77C6B3",
        roughness: 0.03,
        metalness: 0.97,
        yOffset: -0.2,
    },
    쏙: {
        symbol: "( )",
        baseColor: "#0d1b2a",
        accentColor: "#4E8BFF",
        emissiveColor: "#70A2E1",
        roughness: 0.04,
        metalness: 0.96,
        yOffset: 0.1,
    },
};

/* ─── Ultra-Premium Glass Sphere ─── */
function PremiumSphere({
    config,
    mouseX,
    mouseY,
}: {
    config: OrbConfig;
    mouseX: number;
    mouseY: number;
}) {
    const outerRef = useRef<THREE.Mesh>(null);
    const innerRef = useRef<THREE.Mesh>(null);
    const ringRef = useRef<THREE.Mesh>(null);
    const glowRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        if (outerRef.current) {
            // Smooth mouse-reactive rotation
            outerRef.current.rotation.x = THREE.MathUtils.lerp(
                outerRef.current.rotation.x,
                mouseY * 0.4,
                delta * 1.5
            );
            outerRef.current.rotation.y = THREE.MathUtils.lerp(
                outerRef.current.rotation.y,
                mouseX * 0.6 + t * 0.1,
                delta * 1.5
            );
        }

        if (innerRef.current) {
            innerRef.current.rotation.x = t * 0.3;
            innerRef.current.rotation.z = t * 0.2;
            innerRef.current.rotation.y = t * 0.15;
        }

        if (ringRef.current) {
            ringRef.current.rotation.z = t * 0.5;
            ringRef.current.rotation.x = Math.sin(t * 0.3) * 0.3;
        }

        // Pulsing glow
        if (glowRef.current) {
            const scale = 1.6 + Math.sin(t * 2) * 0.05;
            glowRef.current.scale.setScalar(scale);
        }
    });

    return (
        <group position={[0, config.yOffset, 0]}>
            {/* Outer glow sphere */}
            <mesh ref={glowRef}>
                <sphereGeometry args={[1.6, 32, 32]} />
                <meshBasicMaterial
                    color={config.accentColor}
                    transparent
                    opacity={0.03}
                    side={THREE.BackSide}
                />
            </mesh>

            {/* Main sphere — dark glossy like reference */}
            <mesh ref={outerRef}>
                <sphereGeometry args={[1.3, 128, 128]} />
                <meshPhysicalMaterial
                    color={config.baseColor}
                    metalness={config.metalness}
                    roughness={config.roughness}
                    clearcoat={1.0}
                    clearcoatRoughness={0.02}
                    reflectivity={1.0}
                    envMapIntensity={2.5}
                    ior={2.4}
                    specularIntensity={1.0}
                    specularColor={new THREE.Color(config.accentColor)}
                    sheen={0.5}
                    sheenRoughness={0.2}
                    sheenColor={new THREE.Color(config.accentColor)}
                />
            </mesh>

            {/* Inner rotating wireframe icosahedron */}
            <mesh ref={innerRef}>
                <icosahedronGeometry args={[0.7, 1]} />
                <meshBasicMaterial
                    color={config.accentColor}
                    wireframe
                    transparent
                    opacity={0.15}
                />
            </mesh>

            {/* Thin accent ring orbiting */}
            <mesh ref={ringRef} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[1.6, 0.015, 16, 100]} />
                <meshBasicMaterial
                    color={config.accentColor}
                    transparent
                    opacity={0.6}
                />
            </mesh>

            {/* Second ring at different angle */}
            <mesh rotation={[Math.PI / 5, Math.PI / 4, 0]}>
                <torusGeometry args={[1.8, 0.01, 16, 100]} />
                <meshBasicMaterial
                    color={config.emissiveColor}
                    transparent
                    opacity={0.25}
                />
            </mesh>

            {/* Small floating particles */}
            <Particles color={config.accentColor} count={8} radius={2.0} />
        </group>
    );
}

/* ─── Floating Particles around orb ─── */
function Particles({ color, count, radius }: { color: string; count: number; radius: number }) {
    const ref = useRef<THREE.Group>(null);
    const particles = Array.from({ length: count }, (_, i) => {
        const angle = (i / count) * Math.PI * 2;
        const r = radius + Math.random() * 0.3;
        return {
            x: Math.cos(angle) * r,
            y: (Math.random() - 0.5) * 1.5,
            z: Math.sin(angle) * r,
            scale: 0.02 + Math.random() * 0.03,
        };
    });

    useFrame((state) => {
        if (ref.current) {
            ref.current.rotation.y = state.clock.getElapsedTime() * 0.2;
        }
    });

    return (
        <group ref={ref}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]}>
                    <sphereGeometry args={[p.scale, 8, 8]} />
                    <meshBasicMaterial color={color} transparent opacity={0.7} />
                </mesh>
            ))}
        </group>
    );
}

/* ─── Single Orb Scene ─── */
function OrbScene({ config, mouseX, mouseY }: { config: OrbConfig; mouseX: number; mouseY: number }) {
    return (
        <>
            {/* Dramatic multi-point lighting */}
            <ambientLight intensity={0.15} />

            {/* Main key light — top right, strong white */}
            <spotLight
                position={[4, 4, 3]}
                angle={0.4}
                penumbra={0.8}
                intensity={3}
                color="#ffffff"
                castShadow
            />

            {/* Fill light — soft from left */}
            <pointLight position={[-3, 1, 2]} intensity={0.5} color="#ffffff" />

            {/* Accent rim light — colored */}
            <pointLight position={[0, -2, 4]} intensity={1.2} color={config.accentColor} />

            {/* Back light for edge highlight */}
            <pointLight position={[2, 0, -3]} intensity={0.8} color="#ffffff" />

            <Float
                speed={1.5}
                rotationIntensity={0.15}
                floatIntensity={0.4}
                floatingRange={[-0.15, 0.15]}
            >
                <PremiumSphere
                    config={config}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
            </Float>

            {/* Contact shadow for grounding */}
            <ContactShadows
                position={[0, -2.2, 0]}
                opacity={0.3}
                scale={5}
                blur={2.5}
                far={4}
                color={config.accentColor}
            />

            <Environment preset="night" environmentIntensity={1.5} />
        </>
    );
}

/* ─── Mouse influence multipliers ─── */
const MOUSE_FACTORS = [
    { x: 12.0, r: 1.0 },
    { x: 80.0, r: 6.0 },
    { x: 45.0, r: 3.0 },
];

interface FlowerLetterProps {
    letter: string;
    shapeKey: string;
    stemWidth?: number;
    stemHeight?: number;
    flowerHeight?: number;
    orbSize?: number;
    index: number;
}

export default function FlowerLetter({
    letter,
    shapeKey,
    orbSize = 220,
    index,
}: FlowerLetterProps) {
    const mouse = useMousePosition();
    const orb = ORB_CONFIGS[shapeKey];
    const factor = MOUSE_FACTORS[index] || MOUSE_FACTORS[0];

    const dx = (mouse.progressX - 0.5);
    const flowerX = dx * factor.x * 2;
    const flowerRotate = dx * factor.r * 2;

    const springConfig = { damping: 25, stiffness: 120 };
    const springX = useSpring(useMotionValue(flowerX), springConfig);
    const springR = useSpring(useMotionValue(flowerRotate), springConfig);

    springX.set(flowerX);
    springR.set(flowerRotate);

    // Scroll-driven reveal
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "start 40%"],
    });
    const letterOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const letterScale = useTransform(scrollYProgress, [0, 1], [0.7, 1]);

    if (!orb) return null;

    return (
        <motion.div
            ref={containerRef}
            className="flower-letter"
            style={{
                opacity: letterOpacity,
                scale: letterScale,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* 3D Orb — no stems, just floating */}
            <motion.div
                className="flower-letter__orb"
                style={{
                    x: springX,
                    rotate: springR,
                    width: orbSize,
                    height: orbSize,
                    willChange: "transform",
                }}
            >
                <Suspense fallback={
                    <div style={{
                        width: "100%",
                        height: "100%",
                        borderRadius: "50%",
                        background: `radial-gradient(circle at 30% 30%, ${orb.accentColor}33, ${orb.baseColor})`,
                    }} />
                }>
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 40 }}
                        style={{ width: "100%", height: "100%" }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance",
                            toneMapping: THREE.ACESFilmicToneMapping,
                            toneMappingExposure: 1.2,
                        }}
                        dpr={[1, 2]}
                    >
                        <OrbScene
                            config={orb}
                            mouseX={dx * 2}
                            mouseY={(mouse.progressY - 0.5) * 2}
                        />
                    </Canvas>
                </Suspense>
            </motion.div>

            {/* Code symbol label below orb */}
            <motion.span
                className="flower-letter__label"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                style={{
                    marginTop: "12px",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: "1.125rem",
                    color: orb.accentColor,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textShadow: `0 0 20px ${orb.accentColor}66`,
                }}
            >
                {orb.symbol}
            </motion.span>
        </motion.div>
    );
}
