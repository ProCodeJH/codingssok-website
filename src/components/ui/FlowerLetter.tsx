"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, useSpring, useMotionValue, useScroll, useTransform } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 — Cute 3D AI Robots
  
  Each letter gets a unique kawaii robot:
    코 — Pink bot, curly antenna, loves { }
    딩 — Mint bot, zigzag antenna, loves < >
    쏙 — Blue bot, star antenna, loves ( )
  
  Built from Three.js primitives:
    RoundedBox body, sphere head, cylinder limbs
    LED eyes that blink + follow mouse
    Bobbing idle animation + Float
*/

/* ─── Robot config ─── */
interface RobotConfig {
    symbol: string;
    bodyColor: string;
    accentColor: string;
    eyeColor: string;
    cheekColor: string;
}

const ROBOT_CONFIGS: Record<string, RobotConfig> = {
    코: {
        symbol: "{ }",
        bodyColor: "#FF8FAB",
        accentColor: "#FFD6E0",
        eyeColor: "#FFFFFF",
        cheekColor: "#FF6B8A",
    },
    딩: {
        symbol: "< >",
        bodyColor: "#5CE0C2",
        accentColor: "#B8F5E8",
        eyeColor: "#FFFFFF",
        cheekColor: "#3DCFAD",
    },
    쏙: {
        symbol: "( )",
        bodyColor: "#6FA8F5",
        accentColor: "#C3DDFF",
        eyeColor: "#FFFFFF",
        cheekColor: "#5090E0",
    },
};

/* ─── Cute Robot Character ─── */
function CuteRobot({
    config,
    mouseX,
    mouseY,
}: {
    config: RobotConfig;
    mouseX: number;
    mouseY: number;
}) {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftEyeRef = useRef<THREE.Group>(null);
    const rightEyeRef = useRef<THREE.Group>(null);
    const leftPupilRef = useRef<THREE.Mesh>(null);
    const rightPupilRef = useRef<THREE.Mesh>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);
    const antennaRef = useRef<THREE.Group>(null);
    const leftEyeClosedRef = useRef<THREE.Mesh>(null);
    const rightEyeClosedRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Head follows mouse smoothly
        if (headRef.current) {
            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                mouseX * 0.4,
                0.05
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                mouseY * 0.2,
                0.05
            );
        }

        // Pupils follow mouse
        const pupilOffsetX = mouseX * 0.06;
        const pupilOffsetY = mouseY * 0.04;
        if (leftPupilRef.current) {
            leftPupilRef.current.position.x = pupilOffsetX;
            leftPupilRef.current.position.y = pupilOffsetY;
        }
        if (rightPupilRef.current) {
            rightPupilRef.current.position.x = pupilOffsetX;
            rightPupilRef.current.position.y = pupilOffsetY;
        }

        // Eye blink every ~3 seconds
        const blinkCycle = t % 3.5;
        const isBlinking = blinkCycle > 3.3 && blinkCycle < 3.5;
        if (leftEyeClosedRef.current) leftEyeClosedRef.current.visible = isBlinking;
        if (rightEyeClosedRef.current) rightEyeClosedRef.current.visible = isBlinking;
        if (leftEyeRef.current) {
            leftEyeRef.current.visible = !isBlinking;
        }
        if (rightEyeRef.current) {
            rightEyeRef.current.visible = !isBlinking;
        }

        // Arms gentle wave
        if (leftArmRef.current) {
            leftArmRef.current.rotation.z = Math.sin(t * 1.5) * 0.15 + 0.3;
        }
        if (rightArmRef.current) {
            rightArmRef.current.rotation.z = Math.sin(t * 1.5 + Math.PI) * 0.15 - 0.3;
        }

        // Antenna wobble
        if (antennaRef.current) {
            antennaRef.current.rotation.z = Math.sin(t * 2) * 0.1;
            antennaRef.current.rotation.x = Math.sin(t * 1.7) * 0.08;
        }

        // Gentle body sway
        if (groupRef.current) {
            groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
        }
    });

    const bodyMat = useMemo(
        () => new THREE.MeshStandardMaterial({
            color: config.bodyColor,
            roughness: 0.3,
            metalness: 0.1,
        }),
        [config.bodyColor]
    );

    const accentMat = useMemo(
        () => new THREE.MeshStandardMaterial({
            color: config.accentColor,
            roughness: 0.4,
            metalness: 0.05,
        }),
        [config.accentColor]
    );

    return (
        <group ref={groupRef}>
            {/* ── Body ── */}
            <RoundedBox args={[1.1, 1.3, 0.9]} radius={0.25} smoothness={8} position={[0, -0.3, 0]}>
                <meshStandardMaterial color={config.bodyColor} roughness={0.3} metalness={0.1} />
            </RoundedBox>

            {/* Belly screen */}
            <RoundedBox args={[0.6, 0.5, 0.05]} radius={0.1} smoothness={4} position={[0, -0.25, 0.43]}>
                <meshStandardMaterial color="#1a1a2e" roughness={0.1} metalness={0.3} />
            </RoundedBox>
            {/* Screen glow */}
            <mesh position={[0, -0.25, 0.46]}>
                <planeGeometry args={[0.5, 0.4]} />
                <meshBasicMaterial color={config.accentColor} transparent opacity={0.3} />
            </mesh>

            {/* ── Head ── */}
            <group ref={headRef} position={[0, 0.85, 0]}>
                {/* Head shape */}
                <RoundedBox args={[1.2, 0.95, 0.95]} radius={0.3} smoothness={8}>
                    <meshStandardMaterial color={config.bodyColor} roughness={0.3} metalness={0.1} />
                </RoundedBox>

                {/* Face plate */}
                <RoundedBox args={[1.0, 0.7, 0.1]} radius={0.2} smoothness={4} position={[0, -0.02, 0.43]}>
                    <meshStandardMaterial color={config.accentColor} roughness={0.2} metalness={0.05} />
                </RoundedBox>

                {/* ── Left Eye ── */}
                <group ref={leftEyeRef} position={[-0.25, 0.05, 0.49]}>
                    {/* Eye white */}
                    <mesh>
                        <sphereGeometry args={[0.15, 32, 32]} />
                        <meshStandardMaterial color={config.eyeColor} roughness={0.1} />
                    </mesh>
                    {/* Pupil */}
                    <mesh ref={leftPupilRef} position={[0, 0, 0.1]}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                        <meshStandardMaterial color="#1a1a2e" roughness={0.05} metalness={0.2} />
                    </mesh>
                    {/* Highlight */}
                    <mesh position={[0.04, 0.04, 0.13]}>
                        <sphereGeometry args={[0.03, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>

                {/* ── Right Eye ── */}
                <group ref={rightEyeRef} position={[0.25, 0.05, 0.49]}>
                    <mesh>
                        <sphereGeometry args={[0.15, 32, 32]} />
                        <meshStandardMaterial color={config.eyeColor} roughness={0.1} />
                    </mesh>
                    <mesh ref={rightPupilRef} position={[0, 0, 0.1]}>
                        <sphereGeometry args={[0.08, 32, 32]} />
                        <meshStandardMaterial color="#1a1a2e" roughness={0.05} metalness={0.2} />
                    </mesh>
                    <mesh position={[0.04, 0.04, 0.13]}>
                        <sphereGeometry args={[0.03, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" />
                    </mesh>
                </group>

                {/* Blink overlays (hidden by default) */}
                <mesh ref={leftEyeClosedRef} position={[-0.25, 0.05, 0.5]} visible={false}>
                    <boxGeometry args={[0.28, 0.04, 0.01]} />
                    <meshStandardMaterial color={config.bodyColor} />
                </mesh>
                <mesh ref={rightEyeClosedRef} position={[0.25, 0.05, 0.5]} visible={false}>
                    <boxGeometry args={[0.28, 0.04, 0.01]} />
                    <meshStandardMaterial color={config.bodyColor} />
                </mesh>

                {/* Mouth — cute smile */}
                <mesh position={[0, -0.18, 0.49]} rotation={[0, 0, 0]}>
                    <torusGeometry args={[0.09, 0.02, 8, 16, Math.PI]} />
                    <meshStandardMaterial color="#FF7096" roughness={0.3} />
                </mesh>

                {/* Cheeks */}
                <mesh position={[-0.38, -0.08, 0.4]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={config.cheekColor} transparent opacity={0.5} />
                </mesh>
                <mesh position={[0.38, -0.08, 0.4]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshBasicMaterial color={config.cheekColor} transparent opacity={0.5} />
                </mesh>

                {/* ── Antenna ── */}
                <group ref={antennaRef} position={[0, 0.5, 0]}>
                    {/* Stick */}
                    <mesh position={[0, 0.15, 0]}>
                        <cylinderGeometry args={[0.03, 0.03, 0.3, 12]} />
                        <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
                    </mesh>
                    {/* Bulb */}
                    <mesh position={[0, 0.35, 0]}>
                        <sphereGeometry args={[0.08, 16, 16]} />
                        <meshStandardMaterial
                            color={config.accentColor}
                            emissive={config.accentColor}
                            emissiveIntensity={2}
                        />
                    </mesh>
                </group>

                {/* Ears */}
                <RoundedBox args={[0.15, 0.3, 0.2]} radius={0.06} smoothness={4} position={[-0.7, 0, 0]}>
                    <meshStandardMaterial color={config.accentColor} roughness={0.3} />
                </RoundedBox>
                <RoundedBox args={[0.15, 0.3, 0.2]} radius={0.06} smoothness={4} position={[0.7, 0, 0]}>
                    <meshStandardMaterial color={config.accentColor} roughness={0.3} />
                </RoundedBox>
            </group>

            {/* ── Arms ── */}
            <group ref={leftArmRef} position={[-0.7, -0.1, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
                    <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.6, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color={config.accentColor} roughness={0.3} />
                </mesh>
            </group>

            <group ref={rightArmRef} position={[0.7, -0.1, 0]}>
                <mesh position={[0, -0.3, 0]}>
                    <capsuleGeometry args={[0.08, 0.4, 8, 16]} />
                    <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
                </mesh>
                <mesh position={[0, -0.6, 0]}>
                    <sphereGeometry args={[0.12, 16, 16]} />
                    <meshStandardMaterial color={config.accentColor} roughness={0.3} />
                </mesh>
            </group>

            {/* ── Legs ── */}
            <mesh position={[-0.25, -1.15, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
            </mesh>
            <mesh position={[0.25, -1.15, 0]}>
                <capsuleGeometry args={[0.1, 0.3, 8, 16]} />
                <meshStandardMaterial color={config.bodyColor} roughness={0.3} />
            </mesh>

            {/* Feet */}
            <RoundedBox args={[0.25, 0.12, 0.3]} radius={0.05} smoothness={4} position={[-0.25, -1.45, 0.05]}>
                <meshStandardMaterial color={config.accentColor} roughness={0.3} />
            </RoundedBox>
            <RoundedBox args={[0.25, 0.12, 0.3]} radius={0.05} smoothness={4} position={[0.25, -1.45, 0.05]}>
                <meshStandardMaterial color={config.accentColor} roughness={0.3} />
            </RoundedBox>
        </group>
    );
}

/* ─── Robot Scene ─── */
function RobotScene({ config, mouseX, mouseY }: { config: RobotConfig; mouseX: number; mouseY: number }) {
    return (
        <>
            <ambientLight intensity={0.6} />
            <directionalLight position={[3, 5, 5]} intensity={1.5} color="#ffffff" castShadow />
            <pointLight position={[-3, 2, 3]} intensity={0.8} color="#ffffff" />
            <pointLight position={[0, -1, 4]} intensity={0.5} color={config.accentColor} />

            <Float
                speed={2}
                rotationIntensity={0.1}
                floatIntensity={0.5}
                floatingRange={[-0.15, 0.15]}
            >
                <CuteRobot config={config} mouseX={mouseX} mouseY={mouseY} />
            </Float>

            <ContactShadows
                position={[0, -1.6, 0]}
                opacity={0.35}
                scale={4}
                blur={2.5}
                far={5}
            />

            <Environment preset="apartment" environmentIntensity={0.5} />

            <EffectComposer>
                <Bloom
                    intensity={0.4}
                    luminanceThreshold={0.8}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
}

/* ─── Mouse influence ─── */
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
    orbSize = 240,
    index,
}: FlowerLetterProps) {
    const mouse = useMousePosition();
    const config = ROBOT_CONFIGS[shapeKey];
    const factor = MOUSE_FACTORS[index] || MOUSE_FACTORS[0];

    const dx = (mouse.progressX - 0.5);
    const flowerX = dx * factor.x * 2;
    const flowerRotate = dx * factor.r * 0.5;

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

    if (!config) return null;

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
                    height: orbSize * 1.2,
                    willChange: "transform",
                }}
            >
                <Suspense
                    fallback={
                        <div
                            style={{
                                width: "100%",
                                height: "100%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: "3rem",
                            }}
                        >
                            🤖
                        </div>
                    }
                >
                    <Canvas
                        camera={{ position: [0, 0.2, 4.5], fov: 35 }}
                        style={{ width: "100%", height: "100%" }}
                        gl={{
                            antialias: true,
                            alpha: true,
                            toneMapping: THREE.ACESFilmicToneMapping,
                            toneMappingExposure: 1.2,
                        }}
                        dpr={[1, 2]}
                    >
                        <RobotScene
                            config={config}
                            mouseX={dx * 2}
                            mouseY={(mouse.progressY - 0.5) * 2}
                        />
                    </Canvas>
                </Suspense>
            </motion.div>

            {/* Robot name label */}
            <motion.span
                className="flower-letter__label"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.2, duration: 0.6 }}
                style={{
                    marginTop: "8px",
                    fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
                    fontSize: "1rem",
                    color: config.bodyColor,
                    fontWeight: 700,
                    letterSpacing: "0.05em",
                }}
            >
                {config.symbol}
            </motion.span>
        </motion.div>
    );
}
