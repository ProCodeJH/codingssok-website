"use client";

import { useRef, Suspense, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
    Environment,
    Float,
    ContactShadows,
    MeshDistortMaterial,
    Sphere,
} from "@react-three/drei";
import { EffectComposer, Bloom, ChromaticAberration, DepthOfField } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 Original — Siri-Level Organic 3D Orbs
  
  Ultra-premium features:
    - MeshDistortMaterial: organic liquid-like deformation
    - Multi-layered inner glow spheres with different distortions
    - Post-processing: Bloom + Chromatic Aberration + Depth of Field
    - Pulsing/breathing animations
    - Dynamic color shifts over time
    - Volumetric inner core
    - Orbiting particle field
*/

/* ─── Orb config per letter ─── */
interface OrbConfig {
    symbol: string;
    baseColor: string;
    glowColor: string;
    accentColor: string;
    emissiveIntensity: number;
    distortSpeed: number;
    distortStrength: number;
    yOffset: number;
}

const ORB_CONFIGS: Record<string, OrbConfig> = {
    코: {
        symbol: "{ }",
        baseColor: "#FFE5F0",      // 밝은 핑크 크리스탈
        glowColor: "#FF6B9D",
        accentColor: "#FFB3D9",
        emissiveIntensity: 0.6,
        distortSpeed: 1.2,
        distortStrength: 0.4,
        yOffset: 0.3,
    },
    딩: {
        symbol: "< >",
        baseColor: "#E0FFFF",      // 밝은 시안 크리스탈
        glowColor: "#00F5D4",
        accentColor: "#72EFDD",
        emissiveIntensity: 0.7,
        distortSpeed: 1.5,
        distortStrength: 0.5,
        yOffset: -0.2,
    },
    쏙: {
        symbol: "( )",
        baseColor: "#E8F4FF",      // 밝은 블루 크리스탈
        glowColor: "#4E8BFF",
        accentColor: "#A3C9FF",
        emissiveIntensity: 0.65,
        distortSpeed: 1.3,
        distortStrength: 0.45,
        yOffset: 0.1,
    },
};

/* ─── Organic Distorting Sphere ─── */
function OrganicSphere({
    config,
    mouseX,
    mouseY,
}: {
    config: OrbConfig;
    mouseX: number;
    mouseY: number;
}) {
    const outerRef = useRef<THREE.Mesh>(null);
    const innerRef1 = useRef<THREE.Mesh>(null);
    const innerRef2 = useRef<THREE.Mesh>(null);
    const coreRef = useRef<THREE.Mesh>(null);

    // Dynamic color that shifts over time
    const [hue, setHue] = useState(0);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Mouse interaction - smooth rotation
        if (outerRef.current) {
            outerRef.current.rotation.x = THREE.MathUtils.lerp(
                outerRef.current.rotation.x,
                mouseY * 0.5,
                delta * 2
            );
            outerRef.current.rotation.y = THREE.MathUtils.lerp(
                outerRef.current.rotation.y,
                mouseX * 0.7 + t * 0.15,
                delta * 2
            );
        }

        // Inner sphere counter-rotation
        if (innerRef1.current) {
            innerRef1.current.rotation.x = t * 0.4;
            innerRef1.current.rotation.z = t * 0.3;
        }

        if (innerRef2.current) {
            innerRef2.current.rotation.y = -t * 0.5;
            innerRef2.current.rotation.x = Math.sin(t * 0.4) * 0.5;
        }

        // Pulsing core
        if (coreRef.current) {
            const pulse = 0.7 + Math.sin(t * 2) * 0.15;
            coreRef.current.scale.setScalar(pulse);
        }

        // Hue shift animation
        setHue((h: number) => (h + delta * 10) % 360);
    });

    const dynamicColor = useMemo(() => {
        return new THREE.Color().setHSL(hue / 360, 0.7, 0.5);
    }, [hue]);

    return (
        <group position={[0, config.yOffset, 0]}>
            {/* Outer distorting sphere - main shell */}
            <Sphere ref={outerRef} args={[1.3, 128, 128]}>
                <MeshDistortMaterial
                    color={config.baseColor}
                    metalness={0.1}
                    roughness={0.05}
                    clearcoat={1.0}
                    clearcoatRoughness={0.01}
                    envMapIntensity={2.0}
                    distort={config.distortStrength}
                    speed={config.distortSpeed}
                    transmission={0.95}
                    thickness={0.8}
                    ior={1.5}
                    transparent
                    opacity={0.85}
                />
            </Sphere>

            {/* First inner glow layer */}
            <Sphere ref={innerRef1} args={[1.0, 64, 64]} scale={0.88}>
                <MeshDistortMaterial
                    color={config.glowColor}
                    emissive={config.glowColor}
                    emissiveIntensity={config.emissiveIntensity * 1.8}
                    transparent
                    opacity={0.5}
                    distort={config.distortStrength * 0.6}
                    speed={config.distortSpeed * 0.8}
                    side={THREE.DoubleSide}
                />
            </Sphere>

            {/* Second inner glow layer */}
            <Sphere ref={innerRef2} args={[0.8, 64, 64]} scale={0.75}>
                <MeshDistortMaterial
                    color={config.accentColor}
                    emissive={config.accentColor}
                    emissiveIntensity={1.5}
                    transparent
                    opacity={0.6}
                    distort={config.distortStrength * 0.8}
                    speed={config.distortSpeed * 1.2}
                    side={THREE.DoubleSide}
                />
            </Sphere>

            {/* Volumetric inner core */}
            <Sphere ref={coreRef} args={[0.4, 32, 32]}>
                <meshBasicMaterial
                    color={config.glowColor}
                    transparent
                    opacity={0.95}
                />
            </Sphere>

            {/* Orbiting accent rings */}
            <OrbitingRings color={config.accentColor} />

            {/* Dynamic particle field */}
            <DynamicParticles color={config.glowColor} count={20} radius={2.2} />
        </group>
    );
}

/* ─── Orbiting Accent Rings ─── */
function OrbitingRings({ color }: { color: string }) {
    const ring1Ref = useRef<THREE.Mesh>(null);
    const ring2Ref = useRef<THREE.Mesh>(null);
    const ring3Ref = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ring1Ref.current) {
            ring1Ref.current.rotation.z = t * 0.6;
            ring1Ref.current.rotation.x = Math.sin(t * 0.3) * 0.4;
        }
        if (ring2Ref.current) {
            ring2Ref.current.rotation.y = t * 0.8;
            ring2Ref.current.rotation.x = Math.cos(t * 0.4) * 0.3;
        }
        if (ring3Ref.current) {
            ring3Ref.current.rotation.x = t * 0.5;
            ring3Ref.current.rotation.z = Math.sin(t * 0.5) * 0.5;
        }
    });

    return (
        <>
            <mesh ref={ring1Ref} rotation={[Math.PI / 3, 0, 0]}>
                <torusGeometry args={[1.7, 0.015, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.6} />
            </mesh>
            <mesh ref={ring2Ref} rotation={[Math.PI / 5, Math.PI / 4, 0]}>
                <torusGeometry args={[1.9, 0.012, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.4} />
            </mesh>
            <mesh ref={ring3Ref} rotation={[0, Math.PI / 6, Math.PI / 3]}>
                <torusGeometry args={[2.1, 0.01, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={0.3} />
            </mesh>
        </>
    );
}

/* ─── Dynamic Particle Field ─── */
function DynamicParticles({ color, count, radius }: { color: string; count: number; radius: number }) {
    const ref = useRef<THREE.Group>(null);
    const particles = useMemo(() => {
        return Array.from({ length: count }, (_, i) => {
            const angle = (i / count) * Math.PI * 2;
            const r = radius + Math.random() * 0.4;
            return {
                x: Math.cos(angle) * r,
                y: (Math.random() - 0.5) * 2,
                z: Math.sin(angle) * r,
                scale: 0.02 + Math.random() * 0.04,
                speed: 0.5 + Math.random() * 0.5,
            };
        });
    }, [count, radius]);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (ref.current) {
            ref.current.rotation.y = t * 0.3;
            ref.current.children.forEach((child, i) => {
                const particle = particles[i];
                child.position.y = particle.y + Math.sin(t * particle.speed + i) * 0.3;
            });
        }
    });

    return (
        <group ref={ref}>
            {particles.map((p, i) => (
                <mesh key={i} position={[p.x, p.y, p.z]}>
                    <sphereGeometry args={[p.scale, 12, 12]} />
                    <meshBasicMaterial color={color} transparent opacity={0.8} />
                </mesh>
            ))}
        </group>
    );
}

/* ─── Scene with Post-Processing ─── */
function OrbScene({ config, mouseX, mouseY }: { config: OrbConfig; mouseX: number; mouseY: number }) {
    return (
        <>
            {/* Dramatic lighting setup */}
            <ambientLight intensity={0.1} />
            <spotLight
                position={[5, 5, 5]}
                angle={0.3}
                penumbra={1}
                intensity={4}
                color="#ffffff"
                castShadow
            />
            <pointLight position={[-4, 2, 3]} intensity={1.5} color="#ffffff" />
            <pointLight position={[0, -3, 4]} intensity={2} color={config.glowColor} />
            <pointLight position={[3, 0, -4]} intensity={1.2} color={config.accentColor} />

            <Float
                speed={1.8}
                rotationIntensity={0.2}
                floatIntensity={0.6}
                floatingRange={[-0.2, 0.2]}
            >
                <OrganicSphere config={config} mouseX={mouseX} mouseY={mouseY} />
            </Float>

            <ContactShadows
                position={[0, -2.5, 0]}
                opacity={0.4}
                scale={6}
                blur={3}
                far={5}
                color={config.glowColor}
            />

            <Environment preset="night" environmentIntensity={2.0} />

            {/* Post-processing effects */}
            <EffectComposer>
                <Bloom
                    intensity={1.5}
                    luminanceThreshold={0.2}
                    luminanceSmoothing={0.9}
                    height={300}
                    mipmapBlur
                />
                <ChromaticAberration
                    blendFunction={BlendFunction.NORMAL}
                    offset={new THREE.Vector2(0.002, 0.002)}
                />
                <DepthOfField
                    focusDistance={0}
                    focalLength={0.02}
                    bokehScale={2}
                    height={480}
                />
            </EffectComposer>
        </>
    );
}

const MOUSE_FACTORS = [
    { x: 15.0, r: 1.5 },
    { x: 90.0, r: 7.0 },
    { x: 50.0, r: 4.0 },
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

    const springConfig = { damping: 20, stiffness: 100 };
    const springX = useSpring(useMotionValue(flowerX), springConfig);
    const springR = useSpring(useMotionValue(flowerRotate), springConfig);

    springX.set(flowerX);
    springR.set(flowerRotate);

    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 85%", "start 40%"],
    });
    const letterOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);
    const letterScale = useTransform(scrollYProgress, [0, 1], [0.6, 1]);

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
                <Suspense
                    fallback={
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                borderRadius: "50%",
                                background: `radial-gradient(circle at 30% 30%, ${orb.glowColor}44, ${orb.baseColor})`,
                            }}
                        />
                    }
                >
                    <Canvas
                        camera={{ position: [0, 0, 5], fov: 40 }}
                        style={{ width: "100%", height: "100%" }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            powerPreference: "high-performance",
                            toneMapping: THREE.ACESFilmicToneMapping,
                            toneMappingExposure: 1.3,
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

            <motion.span
                className="flower-letter__label"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                style={{
                    marginTop: "12px",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: "1.125rem",
                    color: orb.glowColor,
                    fontWeight: 600,
                    letterSpacing: "0.1em",
                    textShadow: `0 0 20px ${orb.glowColor}aa`,
                }}
            >
                {orb.symbol}
            </motion.span>
        </motion.div>
    );
}
