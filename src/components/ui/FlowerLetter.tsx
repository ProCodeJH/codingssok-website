"use client";

import { useRef, Suspense, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, ContactShadows, RoundedBox } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 — Premium Walking AI Robot
  
  Walking animation:
    - Legs alternate stepping based on X movement speed
    - Arms swing opposite to legs
    - Body bounces up/down during walk
    - Leans into movement direction
  
  Premium design:
    - Smooth pill/capsule body
    - Glass visor face
    - Glowing accents
    - Soft shadows
*/

function WalkingRobot({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const headRef = useRef<THREE.Group>(null);
    const bodyRef = useRef<THREE.Group>(null);
    const leftLegRef = useRef<THREE.Group>(null);
    const rightLegRef = useRef<THREE.Group>(null);
    const leftArmRef = useRef<THREE.Group>(null);
    const rightArmRef = useRef<THREE.Group>(null);
    const leftPupilRef = useRef<THREE.Mesh>(null);
    const rightPupilRef = useRef<THREE.Mesh>(null);
    const antennaRef = useRef<THREE.Group>(null);
    const antennaTipRef = useRef<THREE.Mesh>(null);
    const leftEyeGrpRef = useRef<THREE.Group>(null);
    const rightEyeGrpRef = useRef<THREE.Group>(null);
    const leftBlinkRef = useRef<THREE.Mesh>(null);
    const rightBlinkRef = useRef<THREE.Mesh>(null);

    // Track velocity for walk cycle
    const prevX = useRef(0);
    const walkPhase = useRef(0);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // ── Smooth X-axis following ──
        if (groupRef.current) {
            const targetX = mouseX * 2.5;
            const currentX = groupRef.current.position.x;
            groupRef.current.position.x = THREE.MathUtils.lerp(currentX, targetX, 0.03);

            // Calculate movement speed
            const speed = Math.abs(groupRef.current.position.x - prevX.current) / Math.max(delta, 0.001);
            prevX.current = groupRef.current.position.x;

            // Walk cycle phase advances based on speed
            const walkSpeed = Math.min(speed * 0.8, 12);
            walkPhase.current += delta * walkSpeed;

            // Lean into direction of movement
            const moveDir = targetX - currentX;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                -moveDir * 0.03,
                0.05
            );

            // Body bounce during walk
            const bounce = walkSpeed > 0.5 ? Math.abs(Math.sin(walkPhase.current)) * 0.06 : 0;
            groupRef.current.position.y = bounce;
        }

        // ── Leg walking animation ──
        const legSwing = Math.sin(walkPhase.current) * 0.5;
        if (leftLegRef.current) {
            leftLegRef.current.rotation.x = legSwing;
        }
        if (rightLegRef.current) {
            rightLegRef.current.rotation.x = -legSwing;
        }

        // ── Arms swing opposite to legs ──
        if (leftArmRef.current) {
            leftArmRef.current.rotation.x = -legSwing * 0.6;
        }
        if (rightArmRef.current) {
            rightArmRef.current.rotation.x = legSwing * 0.6;
        }

        // ── Head looks at mouse ──
        if (headRef.current) {
            headRef.current.rotation.y = THREE.MathUtils.lerp(
                headRef.current.rotation.y,
                mouseX * 0.4,
                0.04
            );
            headRef.current.rotation.x = THREE.MathUtils.lerp(
                headRef.current.rotation.x,
                mouseY * 0.12,
                0.04
            );
        }

        // ── Pupils track mouse ──
        const px = mouseX * 0.06;
        const py = mouseY * 0.04;
        if (leftPupilRef.current) {
            leftPupilRef.current.position.x = px;
            leftPupilRef.current.position.y = py;
        }
        if (rightPupilRef.current) {
            rightPupilRef.current.position.x = px;
            rightPupilRef.current.position.y = py;
        }

        // ── Blink every ~4s ──
        const blink = t % 4.2;
        const isBlinking = blink > 4.0;
        if (leftBlinkRef.current) leftBlinkRef.current.visible = isBlinking;
        if (rightBlinkRef.current) rightBlinkRef.current.visible = isBlinking;
        if (leftEyeGrpRef.current) leftEyeGrpRef.current.visible = !isBlinking;
        if (rightEyeGrpRef.current) rightEyeGrpRef.current.visible = !isBlinking;

        // ── Antenna sway ──
        if (antennaRef.current) {
            antennaRef.current.rotation.z = Math.sin(t * 2) * 0.12;
        }
        if (antennaTipRef.current) {
            const pulse = 1 + Math.sin(t * 5) * 0.2;
            antennaTipRef.current.scale.setScalar(pulse);
        }
    });

    // ── Colors ──
    const C = {
        body: "#FFFFFF",
        bodyDark: "#E8ECF0",
        accent: "#4C9EFF",
        accentLight: "#8DC4FF",
        visor: "#E3EEFF",
        eye: "#FFFFFF",
        pupil: "#1E293B",
        blush: "#FFB3C6",
        mouth: "#FF8FAB",
        glow: "#4C9EFF",
        foot: "#3A3A4A",
    };

    return (
        <group ref={groupRef}>
            {/* ══════ BODY ══════ */}
            <group ref={bodyRef} position={[0, 0, 0]}>
                {/* Main torso — pill shape */}
                <mesh position={[0, -0.1, 0]}>
                    <capsuleGeometry args={[0.42, 0.5, 16, 32]} />
                    <meshPhysicalMaterial
                        color={C.body}
                        roughness={0.15}
                        metalness={0.05}
                        clearcoat={0.8}
                        clearcoatRoughness={0.1}
                    />
                </mesh>

                {/* Chest accent stripe */}
                <mesh position={[0, 0.05, 0.42]}>
                    <boxGeometry args={[0.5, 0.06, 0.02]} />
                    <meshStandardMaterial color={C.accent} emissive={C.accent} emissiveIntensity={0.5} />
                </mesh>

                {/* Power core (belly) */}
                <mesh position={[0, -0.15, 0.42]}>
                    <circleGeometry args={[0.1, 32]} />
                    <meshStandardMaterial
                        color={C.accent}
                        emissive={C.accent}
                        emissiveIntensity={2}
                        roughness={0.1}
                    />
                </mesh>
                {/* Power core glow ring */}
                <mesh position={[0, -0.15, 0.41]}>
                    <ringGeometry args={[0.1, 0.14, 32]} />
                    <meshBasicMaterial color={C.accentLight} transparent opacity={0.4} side={THREE.DoubleSide} />
                </mesh>
            </group>

            {/* ══════ HEAD ══════ */}
            <group ref={headRef} position={[0, 0.75, 0]}>
                {/* Main head — smooth sphere */}
                <mesh>
                    <sphereGeometry args={[0.55, 64, 64]} />
                    <meshPhysicalMaterial
                        color={C.body}
                        roughness={0.12}
                        metalness={0.05}
                        clearcoat={0.9}
                        clearcoatRoughness={0.08}
                    />
                </mesh>

                {/* Face visor — glass */}
                <mesh position={[0, -0.03, 0.35]} rotation={[-0.15, 0, 0]}>
                    <sphereGeometry args={[0.38, 48, 48, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                    <meshPhysicalMaterial
                        color={C.visor}
                        roughness={0.05}
                        metalness={0.02}
                        transparent
                        opacity={0.6}
                        clearcoat={1}
                        clearcoatRoughness={0.02}
                    />
                </mesh>

                {/* ── Eyes ── */}
                <group ref={leftEyeGrpRef} position={[-0.16, 0.02, 0.48]}>
                    <mesh>
                        <sphereGeometry args={[0.1, 32, 32]} />
                        <meshBasicMaterial color={C.eye} />
                    </mesh>
                    <mesh ref={leftPupilRef} position={[0, 0, 0.06]}>
                        <sphereGeometry args={[0.055, 32, 32]} />
                        <meshBasicMaterial color={C.pupil} />
                    </mesh>
                    {/* Sparkle */}
                    <mesh position={[0.03, 0.035, 0.09]}>
                        <sphereGeometry args={[0.02, 12, 12]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                </group>

                <group ref={rightEyeGrpRef} position={[0.16, 0.02, 0.48]}>
                    <mesh>
                        <sphereGeometry args={[0.1, 32, 32]} />
                        <meshBasicMaterial color={C.eye} />
                    </mesh>
                    <mesh ref={rightPupilRef} position={[0, 0, 0.06]}>
                        <sphereGeometry args={[0.055, 32, 32]} />
                        <meshBasicMaterial color={C.pupil} />
                    </mesh>
                    <mesh position={[0.03, 0.035, 0.09]}>
                        <sphereGeometry args={[0.02, 12, 12]} />
                        <meshBasicMaterial color="#FFFFFF" />
                    </mesh>
                </group>

                {/* Blink lids */}
                <mesh ref={leftBlinkRef} position={[-0.16, 0.02, 0.5]} visible={false}>
                    <boxGeometry args={[0.2, 0.03, 0.01]} />
                    <meshBasicMaterial color={C.body} side={THREE.DoubleSide} />
                </mesh>
                <mesh ref={rightBlinkRef} position={[0.16, 0.02, 0.5]} visible={false}>
                    <boxGeometry args={[0.2, 0.03, 0.01]} />
                    <meshBasicMaterial color={C.body} side={THREE.DoubleSide} />
                </mesh>

                {/* Smile */}
                <mesh position={[0, -0.13, 0.5]} rotation={[0.15, 0, 0]}>
                    <torusGeometry args={[0.06, 0.015, 8, 20, Math.PI]} />
                    <meshBasicMaterial color={C.mouth} />
                </mesh>

                {/* Blush */}
                <mesh position={[-0.3, -0.06, 0.38]}>
                    <circleGeometry args={[0.06, 20]} />
                    <meshBasicMaterial color={C.blush} transparent opacity={0.4} side={THREE.DoubleSide} />
                </mesh>
                <mesh position={[0.3, -0.06, 0.38]}>
                    <circleGeometry args={[0.06, 20]} />
                    <meshBasicMaterial color={C.blush} transparent opacity={0.4} side={THREE.DoubleSide} />
                </mesh>

                {/* ── Antenna ── */}
                <group ref={antennaRef} position={[0, 0.55, 0]}>
                    <mesh position={[0, 0.1, 0]}>
                        <cylinderGeometry args={[0.018, 0.022, 0.2, 12]} />
                        <meshPhysicalMaterial color={C.bodyDark} roughness={0.2} clearcoat={0.5} />
                    </mesh>
                    <mesh ref={antennaTipRef} position={[0, 0.25, 0]}>
                        <sphereGeometry args={[0.05, 20, 20]} />
                        <meshStandardMaterial
                            color={C.glow}
                            emissive={C.glow}
                            emissiveIntensity={4}
                            roughness={0.1}
                        />
                    </mesh>
                </group>

                {/* Ear sensors */}
                <mesh position={[-0.56, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
                    <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.7} />
                </mesh>
                <mesh position={[0.56, 0.05, 0]} rotation={[0, 0, Math.PI / 2]}>
                    <cylinderGeometry args={[0.05, 0.05, 0.08, 16]} />
                    <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.7} />
                </mesh>
            </group>

            {/* ══════ ARMS ══════ */}
            {/* Shoulder joints */}
            <mesh position={[-0.5, 0.15, 0]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
            </mesh>
            <mesh position={[0.5, 0.15, 0]}>
                <sphereGeometry args={[0.07, 16, 16]} />
                <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
            </mesh>

            <group ref={leftArmRef} position={[-0.5, 0.15, 0]}>
                <mesh position={[0, -0.22, 0]}>
                    <capsuleGeometry args={[0.05, 0.25, 8, 16]} />
                    <meshPhysicalMaterial color={C.body} roughness={0.15} clearcoat={0.7} />
                </mesh>
                {/* Hand */}
                <mesh position={[0, -0.42, 0]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
                </mesh>
            </group>

            <group ref={rightArmRef} position={[0.5, 0.15, 0]}>
                <mesh position={[0, -0.22, 0]}>
                    <capsuleGeometry args={[0.05, 0.25, 8, 16]} />
                    <meshPhysicalMaterial color={C.body} roughness={0.15} clearcoat={0.7} />
                </mesh>
                <mesh position={[0, -0.42, 0]}>
                    <sphereGeometry args={[0.07, 16, 16]} />
                    <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
                </mesh>
            </group>

            {/* ══════ LEGS ══════ */}
            {/* Hip joints */}
            <mesh position={[-0.18, -0.45, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
            </mesh>
            <mesh position={[0.18, -0.45, 0]}>
                <sphereGeometry args={[0.06, 16, 16]} />
                <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
            </mesh>

            <group ref={leftLegRef} position={[-0.18, -0.45, 0]}>
                {/* Upper leg */}
                <mesh position={[0, -0.18, 0]}>
                    <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
                    <meshPhysicalMaterial color={C.body} roughness={0.15} clearcoat={0.7} />
                </mesh>
                {/* Knee */}
                <mesh position={[0, -0.32, 0]}>
                    <sphereGeometry args={[0.055, 16, 16]} />
                    <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
                </mesh>
                {/* Lower leg */}
                <mesh position={[0, -0.48, 0]}>
                    <capsuleGeometry args={[0.055, 0.18, 8, 16]} />
                    <meshPhysicalMaterial color={C.body} roughness={0.15} clearcoat={0.7} />
                </mesh>
                {/* Foot */}
                <RoundedBox args={[0.14, 0.06, 0.2]} radius={0.025} smoothness={4} position={[0, -0.62, 0.03]}>
                    <meshPhysicalMaterial color={C.foot} roughness={0.3} clearcoat={0.5} />
                </RoundedBox>
            </group>

            <group ref={rightLegRef} position={[0.18, -0.45, 0]}>
                <mesh position={[0, -0.18, 0]}>
                    <capsuleGeometry args={[0.06, 0.2, 8, 16]} />
                    <meshPhysicalMaterial color={C.body} roughness={0.15} clearcoat={0.7} />
                </mesh>
                <mesh position={[0, -0.32, 0]}>
                    <sphereGeometry args={[0.055, 16, 16]} />
                    <meshPhysicalMaterial color={C.bodyDark} roughness={0.15} clearcoat={0.5} />
                </mesh>
                <mesh position={[0, -0.48, 0]}>
                    <capsuleGeometry args={[0.055, 0.18, 8, 16]} />
                    <meshPhysicalMaterial color={C.body} roughness={0.15} clearcoat={0.7} />
                </mesh>
                <RoundedBox args={[0.14, 0.06, 0.2]} radius={0.025} smoothness={4} position={[0, -0.62, 0.03]}>
                    <meshPhysicalMaterial color={C.foot} roughness={0.3} clearcoat={0.5} />
                </RoundedBox>
            </group>
        </group>
    );
}

/* ─── Scene ─── */
function RobotScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 6, 6]} intensity={2} color="#FFFFFF" castShadow />
            <directionalLight position={[-3, 4, 4]} intensity={0.6} color="#E0F0FF" />
            <pointLight position={[0, -1, 5]} intensity={0.4} color="#4C9EFF" />

            <WalkingRobot mouseX={mouseX} mouseY={mouseY} />

            <ContactShadows
                position={[0, -1.15, 0]}
                opacity={0.3}
                scale={6}
                blur={2.5}
                far={4}
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

/* ─── Export ─── */
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
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
                display: "inline-flex",
                flexDirection: "column",
                alignItems: "center",
                position: "relative",
                width: 400,
                height: 400,
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
                    camera={{ position: [0, 0.2, 3.8], fov: 35 }}
                    style={{ width: "100%", height: "100%" }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.15,
                    }}
                    dpr={[1, 2]}
                >
                    <RobotScene mouseX={dx * 2} mouseY={dy * 2} />
                </Canvas>
            </Suspense>
        </motion.div>
    );
}
