"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, RoundedBox, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 — Single Cute AI Robot (Chibi Style)
  
  Chibi proportions: huge head, tiny body
  Follows mouse on X-axis (whole body slides)
  Eyes track mouse cursor
  Blinks, waves, wobbles
*/

/* ─── Chibi Robot ─── */
function ChibiRobot({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const leftPupilRef = useRef<THREE.Mesh>(null);
    const rightPupilRef = useRef<THREE.Mesh>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);
    const antennaRef = useRef<THREE.Group>(null);
    const antennaBulbRef = useRef<THREE.Mesh>(null);
    const leftEyeGroupRef = useRef<THREE.Group>(null);
    const rightEyeGroupRef = useRef<THREE.Group>(null);
    const leftBlinkRef = useRef<THREE.Mesh>(null);
    const rightBlinkRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();

        // Whole body slides on X-axis following mouse
        if (groupRef.current) {
            groupRef.current.position.x = THREE.MathUtils.lerp(
                groupRef.current.position.x,
                mouseX * 1.2,
                0.04
            );
            // Subtle tilt when moving
            groupRef.current.rotation.z = THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                -mouseX * 0.08,
                0.04
            );
            // Gentle idle bob
            groupRef.current.position.y = Math.sin(t * 1.2) * 0.05;
        }

        // Head looks toward mouse
        if (headRef.current) {
            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                mouseX * 0.5,
                0.06
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                mouseY * 0.15,
                0.06
            );
        }

        // Pupils track mouse
        const px = mouseX * 0.07;
        const py = mouseY * 0.05;
        if (leftPupilRef.current) {
            leftPupilRef.current.position.x = px;
            leftPupilRef.current.position.y = py;
        }
        if (rightPupilRef.current) {
            rightPupilRef.current.position.x = px;
            rightPupilRef.current.position.y = py;
        }

        // Blink every ~4s
        const blink = t % 4;
        const isBlinking = blink > 3.8;
        if (leftBlinkRef.current) leftBlinkRef.current.visible = isBlinking;
        if (rightBlinkRef.current) rightBlinkRef.current.visible = isBlinking;
        if (leftEyeGroupRef.current) leftEyeGroupRef.current.visible = !isBlinking;
        if (rightEyeGroupRef.current) rightEyeGroupRef.current.visible = !isBlinking;

        // Right arm waves hello
        if (rightArmRef.current) {
            const wave = Math.sin(t * 3) * 0.25;
            rightArmRef.current.rotation.z = -0.8 + wave;
        }

        // Left arm gentle idle
        if (leftArmRef.current) {
            leftArmRef.current.rotation.z = 0.3 + Math.sin(t * 1.5) * 0.1;
        }

        // Antenna wobble
        if (antennaRef.current) {
            antennaRef.current.rotation.z = Math.sin(t * 2.5) * 0.15;
            antennaRef.current.rotation.x = Math.cos(t * 2) * 0.1;
        }

        // Antenna bulb pulses
        if (antennaBulbRef.current) {
            const s = 1 + Math.sin(t * 4) * 0.15;
            antennaBulbRef.current.scale.setScalar(s);
        }
    });

    const BODY = "#FFD93D";   // 밝은 옐로우
    const ACCENT = "#FFFBE6"; // 크림
    const DARK = "#2D2D2D";
    const PINK = "#FF8FAB";
    const BLUE = "#6FA8F5";

    return (
        <group ref={groupRef}>
            {/* ── BODY (small, chibi) ── */}
            <RoundedBox args={[0.9, 0.8, 0.7]} radius={0.25} smoothness={8} position={[0, -0.7, 0]}>
                <meshStandardMaterial color={BODY} roughness={0.35} metalness={0.05} />
            </RoundedBox>

            {/* Belly button / power indicator */}
            <mesh position={[0, -0.65, 0.36]}>
                <circleGeometry args={[0.08, 32]} />
                <meshStandardMaterial color={BLUE} emissive={BLUE} emissiveIntensity={2} />
            </mesh>

            {/* ── HEAD (huge, chibi ratio) ── */}
            <group ref={headRef} position={[0, 0.25, 0]}>
                {/* Main head — big rounded sphere-ish */}
                <mesh>
                    <sphereGeometry args={[0.85, 64, 64]} />
                    <meshStandardMaterial color={BODY} roughness={0.3} metalness={0.05} />
                </mesh>

                {/* Face visor / screen */}
                <mesh position={[0, -0.05, 0.6]} rotation={[0, 0, 0]}>
                    <sphereGeometry args={[0.55, 48, 48, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#F0F4FF"
                        roughness={0.1}
                        metalness={0.1}
                        transparent
                        opacity={0.85}
                    />
                </mesh>

                {/* ── LEFT EYE ── */}
                <group ref={leftEyeGroupRef} position={[-0.22, 0.05, 0.75]}>
                    {/* Eye white */}
                    <mesh>
                        <sphereGeometry args={[0.16, 32, 32]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                    {/* Pupil */}
                    <mesh ref={leftPupilRef} position={[0, 0, 0.1]}>
                        <sphereGeometry args={[0.09, 32, 32]} />
                        <meshBasicMaterial color={DARK} />
                    </mesh>
                    {/* Highlight sparkle */}
                    <mesh position={[0.04, 0.05, 0.14]}>
                        <sphereGeometry args={[0.035, 16, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                    <mesh position={[-0.02, -0.02, 0.14]}>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                </group>

                {/* ── RIGHT EYE ── */}
                <group ref={rightEyeGroupRef} position={[0.22, 0.05, 0.75]}>
                    <mesh>
                        <sphereGeometry args={[0.16, 32, 32]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                    <mesh ref={rightPupilRef} position={[0, 0, 0.1]}>
                        <sphereGeometry args={[0.09, 32, 32]} />
                        <meshBasicMaterial color={DARK} />
                    </mesh>
                    <mesh position={[0.04, 0.05, 0.14]}>
                        <sphereGeometry args={[0.035, 16, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                    <mesh position={[-0.02, -0.02, 0.14]}>
                        <sphereGeometry args={[0.02, 16, 16]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                </group>

                {/* Blink lids */}
                <mesh ref={leftBlinkRef} position={[-0.22, 0.05, 0.76]} visible={false}>
                    <planeGeometry args={[0.32, 0.05]} />
                    <meshBasicMaterial color={BODY} side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={rightBlinkRef} position={[0.22, 0.05, 0.76]} visible={false}>
                    <planeGeometry args={[0.32, 0.05]} />
                    <meshBasicMaterial color={BODY} side={THREE.DoubleSide} />
                </mesh>

                {/* Cute smile */}
                <mesh position={[0, -0.2, 0.78]} rotation={[0.1, 0, 0]}>
                    <torusGeometry args={[0.08, 0.02, 8, 20, Math.PI]} />
                    <meshBasicMaterial color={PINK} />
                </mesh>

                {/* Blush cheeks */}
                <mesh position={[-0.45, -0.1, 0.55]}>
                    <circleGeometry args={[0.1, 24]} />
                    <meshBasicMaterial color={PINK} transparent opacity={0.35} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0.45, -0.1, 0.55]}>
                    <circleGeometry args={[0.1, 24]} />
                    <meshBasicMaterial color={PINK} transparent opacity={0.35} side={THREE.DoubleSide} />
                </mesh>

                {/* ── ANTENNA ── */}
                <group ref={antennaRef} position={[0, 0.85, 0]}>
                    <mesh position={[0, 0.12, 0]}>
                        <cylinderGeometry args={[0.025, 0.03, 0.25, 12]} />
                        <meshStandardMaterial color={BODY} roughness={0.3} metalness={0.1} />
                    </mesh>
                    <mesh ref={antennaBulbRef} position={[0, 0.3, 0]}>
                        <sphereGeometry args={[0.07, 24, 24]} />
                        <meshStandardMaterial
                            color="#FFE066"
                            emissive="#FFD93D"
                            emissiveIntensity={3}
                            roughness={0.1}
                        />
                    </mesh>
                </group>

                {/* Ears */}
                <mesh position={[-0.88, 0.1, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.15, 16]} />
                    <meshStandardMaterial color={ACCENT} roughness={0.3} />
                </mesh>
                <mesh position={[0.88, 0.1, 0]}>
                    <cylinderGeometry args={[0.06, 0.06, 0.15, 16]} />
                    <meshStandardMaterial color={ACCENT} roughness={0.3} />
                </mesh>
            </group>

            {/* ── ARMS ── */}
            <group ref={leftArmRef} position={[-0.55, -0.5, 0]}>
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.065, 0.25, 8, 16]} />
                    <meshStandardMaterial color={BODY} roughness={0.35} />
                </mesh>
                <mesh position={[0, -0.42, 0]}>
                    <sphereGeometry args={[0.09, 16, 16]} />
                    <meshStandardMaterial color={ACCENT} roughness={0.3} />
                </mesh>
            </group>

            <group ref={rightArmRef} position={[0.55, -0.5, 0]}>
                <mesh position={[0, -0.2, 0]}>
                    <capsuleGeometry args={[0.065, 0.25, 8, 16]} />
                    <meshStandardMaterial color={BODY} roughness={0.35} />
                </mesh>
                <mesh position={[0, -0.42, 0]}>
                    <sphereGeometry args={[0.09, 16, 16]} />
                    <meshStandardMaterial color={ACCENT} roughness={0.3} />
                </mesh>
            </group>

            {/* ── LEGS (stubby chibi) ── */}
            <mesh position={[-0.2, -1.25, 0]}>
                <capsuleGeometry args={[0.09, 0.2, 8, 16]} />
                <meshStandardMaterial color={BODY} roughness={0.35} />
            </mesh>
            <mesh position={[0.2, -1.25, 0]}>
                <capsuleGeometry args={[0.09, 0.2, 8, 16]} />
                <meshStandardMaterial color={BODY} roughness={0.35} />
            </mesh>

            {/* Feet */}
            <RoundedBox args={[0.2, 0.1, 0.25]} radius={0.04} smoothness={4} position={[-0.2, -1.45, 0.03]}>
                <meshStandardMaterial color={ACCENT} roughness={0.3} />
            </RoundedBox>
            <RoundedBox args={[0.2, 0.1, 0.25]} radius={0.04} smoothness={4} position={[0.2, -1.45, 0.03]}>
                <meshStandardMaterial color={ACCENT} roughness={0.3} />
            </RoundedBox>
        </group>
    );
}

/* ─── Scene ─── */
function RobotScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    return (
        <>
            <ambientLight intensity={0.7} />
            <directionalLight position={[3, 5, 5]} intensity={1.8} color="#FFFBE6" castShadow />
            <pointLight position={[-3, 2, 3]} intensity={0.5} color="#ffffff" />
            <pointLight position={[0, -1, 5]} intensity={0.3} color="#FFD93D" />

            <Float
                speed={2.5}
                rotationIntensity={0.08}
                floatIntensity={0.4}
                floatingRange={[-0.1, 0.1]}
            >
                <ChibiRobot mouseX={mouseX} mouseY={mouseY} />
            </Float>

            <ContactShadows
                position={[0, -1.6, 0]}
                opacity={0.25}
                scale={5}
                blur={2.5}
                far={5}
            />

            <Environment preset="apartment" environmentIntensity={0.4} />

            <EffectComposer>
                <Bloom
                    intensity={0.3}
                    luminanceThreshold={0.85}
                    luminanceSmoothing={0.9}
                    mipmapBlur
                />
            </EffectComposer>
        </>
    );
}

/* ─── Export: Single Robot Component ─── */
export default function FlowerLetter({
    index = 0,
}: {
    letter?: string;
    shapeKey?: string;
    stemWidth?: number;
    stemHeight?: number;
    flowerHeight?: number;
    orbSize?: number;
    index?: number;
}) {
    const mouse = useMousePosition();
    const dx = mouse.progressX - 0.5;
    const dy = mouse.progressY - 0.5;

    return (
        <motion.div
            className="flower-letter"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: 320,
                height: 380,
            }}
        >
            <Suspense
                fallback={
                    <div style={{
                        width: "100%",
                        height: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "4rem",
                    }}>
                        🤖
                    </div>
                }
            >
                <Canvas
                    camera={{ position: [0, 0.1, 4], fov: 35 }}
                    style={{ width: "100%", height: "100%" }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.1,
                    }}
                    dpr={[1, 2]}
                >
                    <RobotScene mouseX={dx * 2} mouseY={dy * 2} />
                </Canvas>
            </Suspense>
        </motion.div>
    );
}
