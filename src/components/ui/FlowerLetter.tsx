"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Text3D, Center } from "@react-three/drei";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 Original — 3D Glass Code Orbs
  
  Uses React Three Fiber + drei for Framer-level 3D quality:
    - MeshTransmissionMaterial: glass/crystal refraction
    - Environment mapping: realistic reflections
    - Float: gentle idle animation
    - Mouse-reactive rotation via useFrame
    - Code symbols rendered as 3D geometry inside orbs
*/

/* ─── Orb config per letter ─── */
interface OrbConfig {
    symbol: string;
    color: string;
    emissive: string;
    envMapIntensity: number;
}

const ORB_CONFIGS: Record<string, OrbConfig> = {
    코: {
        symbol: "{ }",
        color: "#FF9A9E",
        emissive: "#FFD37D",
        envMapIntensity: 1.2,
    },
    딩: {
        symbol: "< >",
        color: "#77C6B3",
        emissive: "#EC5212",
        envMapIntensity: 1.5,
    },
    쏙: {
        symbol: "( )",
        color: "#70A2E1",
        emissive: "#3658D3",
        envMapIntensity: 1.3,
    },
};

/* ─── 3D Glass Sphere ─── */
function GlassOrb({
    color,
    emissive,
    mouseX,
    mouseY,
}: {
    color: string;
    emissive: string;
    mouseX: number;
    mouseY: number;
}) {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (meshRef.current) {
            // Smooth rotation following mouse
            meshRef.current.rotation.x = THREE.MathUtils.lerp(
                meshRef.current.rotation.x,
                mouseY * 0.3,
                delta * 2
            );
            meshRef.current.rotation.y = THREE.MathUtils.lerp(
                meshRef.current.rotation.y,
                mouseX * 0.5,
                delta * 2
            );
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[1.2, 64, 64]} />
            <MeshTransmissionMaterial
                backside
                samples={16}
                thickness={0.5}
                chromaticAberration={0.06}
                anisotropy={0.3}
                distortion={0.2}
                distortionScale={0.3}
                temporalDistortion={0.1}
                ior={1.5}
                color={color}
                roughness={0.05}
                transmission={0.95}
                clearcoat={1}
                clearcoatRoughness={0.05}
            />
        </mesh>
    );
}

/* ─── Inner wireframe sphere for depth ─── */
function InnerWireframe({ color }: { color: string }) {
    const ref = useRef<THREE.Mesh>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.x += delta * 0.2;
            ref.current.rotation.z += delta * 0.15;
        }
    });

    return (
        <mesh ref={ref}>
            <icosahedronGeometry args={[0.6, 1]} />
            <meshBasicMaterial color={color} wireframe opacity={0.3} transparent />
        </mesh>
    );
}

/* ─── Code Symbol Ring ─── */
function SymbolRing({ symbol, color }: { symbol: string; color: string }) {
    const ref = useRef<THREE.Group>(null);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.4;
        }
    });

    // Place each character around the sphere
    const chars = symbol.split("");
    const radius = 1.5;

    return (
        <group ref={ref}>
            {chars.map((char, i) => {
                const angle = (i / chars.length) * Math.PI * 2;
                const x = Math.cos(angle) * radius;
                const z = Math.sin(angle) * radius;
                return (
                    <group key={i} position={[x, 0, z]} rotation={[0, -angle + Math.PI / 2, 0]}>
                        <Center>
                            <mesh>
                                <planeGeometry args={[0.4, 0.5]} />
                                <meshBasicMaterial
                                    color={color}
                                    transparent
                                    opacity={0.8}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                        </Center>
                    </group>
                );
            })}
        </group>
    );
}

/* ─── Single 3D Orb Scene ─── */
function OrbScene({ config, mouseX, mouseY }: { config: OrbConfig; mouseX: number; mouseY: number }) {
    return (
        <>
            <ambientLight intensity={0.4} />
            <pointLight position={[5, 5, 5]} intensity={1.5} color="#ffffff" />
            <pointLight position={[-3, -2, 4]} intensity={0.8} color={config.emissive} />
            <spotLight
                position={[0, 5, 0]}
                angle={0.5}
                penumbra={1}
                intensity={1}
                color={config.color}
            />

            <Float
                speed={2}
                rotationIntensity={0.3}
                floatIntensity={0.5}
                floatingRange={[-0.1, 0.1]}
            >
                <GlassOrb
                    color={config.color}
                    emissive={config.emissive}
                    mouseX={mouseX}
                    mouseY={mouseY}
                />
                <InnerWireframe color={config.emissive} />
            </Float>

            <SymbolRing symbol={config.symbol} color={config.emissive} />

            <Environment preset="city" environmentIntensity={0.6} />
        </>
    );
}

/* ─── Mouse influence multipliers ─── */
const MOUSE_FACTORS = [
    { x: 9.0, y: 0.07, r: 0.6 },
    { x: 115.0, y: 13.0, r: 8.4 },
    { x: 53.0, y: 2.5, r: 3.5 },
];

interface FlowerLetterProps {
    letter: string;
    shapeKey: string;
    stemWidth: number;
    stemHeight: number;
    flowerHeight: number;
    index: number;
}

export default function FlowerLetter({
    letter,
    shapeKey,
    stemWidth,
    stemHeight,
    flowerHeight,
    index,
}: FlowerLetterProps) {
    const mouse = useMousePosition();
    const orb = ORB_CONFIGS[shapeKey];
    const factor = MOUSE_FACTORS[index] || MOUSE_FACTORS[0];

    // Mouse-reactive movement
    const dx = (mouse.progressX - 0.5);
    const flowerX = dx * factor.x * 2;
    const flowerY = (mouse.progressY - 0.5) * factor.y * 2;
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
    const letterYOffset = useTransform(scrollYProgress, [0, 1], ["100%", "0%"]);
    const letterOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

    const cx = stemWidth / 2;
    const orbSize = flowerHeight;

    if (!orb) return null;

    return (
        <motion.div
            ref={containerRef}
            className="flower-letter"
            style={{
                y: letterYOffset,
                opacity: letterOpacity,
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
            }}
        >
            {/* 3D Orb Canvas */}
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
                <Canvas
                    camera={{ position: [0, 0, 4], fov: 45 }}
                    style={{ width: "100%", height: "100%" }}
                    gl={{ antialias: true, alpha: true }}
                    dpr={[1, 2]}
                >
                    <OrbScene
                        config={orb}
                        mouseX={dx * 2}
                        mouseY={(mouse.progressY - 0.5) * 2}
                    />
                </Canvas>
            </motion.div>

            {/* Stem */}
            <svg
                className="flower-letter__stem"
                width={stemWidth}
                height={stemHeight}
                fill="none"
                overflow="visible"
                preserveAspectRatio="none"
            >
                <motion.path
                    d={`M ${cx} ${stemHeight * 1.2} Q ${cx} ${stemHeight * 0.5} ${cx + flowerX * 0.3} 0`}
                    stroke="#383030"
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{
                        delay: 0.5 + index * 0.2,
                        duration: 1.2,
                        ease: [0.16, 1, 0.3, 1],
                    }}
                />
                <motion.circle
                    cx={cx + flowerX * 0.3}
                    cy={0}
                    r={6}
                    fill="#383030"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                        delay: 1.0 + index * 0.2,
                        duration: 0.3,
                        type: "spring",
                        stiffness: 300,
                    }}
                />
            </svg>
        </motion.div>
    );
}
