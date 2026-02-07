"use client";

import { useRef, Suspense, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 — GLTF Walking Robot
  
  1. Load GLB model
  2. Traverse skeleton to find leg/arm bones
  3. Apply procedural walk cycle based on X movement speed
  4. Ground the model (no floating)
*/

/* ─── Find all bones in model ─── */
function findBones(root: THREE.Object3D): Record<string, THREE.Bone> {
    const bones: Record<string, THREE.Bone> = {};
    root.traverse((child) => {
        if ((child as THREE.Bone).isBone) {
            bones[child.name.toLowerCase()] = child as THREE.Bone;
            // Also store with original name
            bones[child.name] = child as THREE.Bone;
        }
    });
    return bones;
}

/* ─── Try to find bone by partial name match ─── */
function findBoneByHints(bones: Record<string, THREE.Bone>, hints: string[]): THREE.Bone | null {
    const keys = Object.keys(bones);
    for (const hint of hints) {
        const found = keys.find(k => k.toLowerCase().includes(hint.toLowerCase()));
        if (found) return bones[found];
    }
    return null;
}

/* ─── Robot Component ─── */
function RobotModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/robot.glb");
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);
    const prevX = useRef(0);
    const walkPhase = useRef(0);
    const [debugInfo, setDebugInfo] = useState("");

    // Clone scene
    const clonedScene = useMemo(() => scene.clone(true), [scene]);

    // Auto-fit
    const { scale, centerY, bottomY } = useMemo(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        const s = 2.5 / maxDim;
        return { scale: s, centerY: center.y, bottomY: box.min.y };
    }, [clonedScene]);

    // Find bones
    const boneRefs = useMemo(() => {
        const bones = findBones(clonedScene);
        const boneNames = Object.keys(bones);
        console.log("🦴 Found bones:", boneNames);

        // Common bone naming conventions
        const leftUpperLeg = findBoneByHints(bones, ["leftupperleg", "left_thigh", "l_thigh", "thigh_l", "lefthip", "l_hip", "upperleg_l", "left_upper_leg"]);
        const rightUpperLeg = findBoneByHints(bones, ["rightupperleg", "right_thigh", "r_thigh", "thigh_r", "righthip", "r_hip", "upperleg_r", "right_upper_leg"]);
        const leftLowerLeg = findBoneByHints(bones, ["leftlowerleg", "left_shin", "l_shin", "shin_l", "leftknee", "l_knee", "lowerleg_l", "left_lower_leg", "left_leg"]);
        const rightLowerLeg = findBoneByHints(bones, ["rightlowerleg", "right_shin", "r_shin", "shin_r", "rightknee", "r_knee", "lowerleg_r", "right_lower_leg", "right_leg"]);
        const leftUpperArm = findBoneByHints(bones, ["leftupperarm", "left_shoulder", "l_shoulder", "upperarm_l", "left_upper_arm", "leftshoulder"]);
        const rightUpperArm = findBoneByHints(bones, ["rightupperarm", "right_shoulder", "r_shoulder", "upperarm_r", "right_upper_arm", "rightshoulder"]);
        const spine = findBoneByHints(bones, ["spine", "torso", "chest", "body"]);
        const head = findBoneByHints(bones, ["head", "neck"]);
        const hips = findBoneByHints(bones, ["hips", "pelvis", "root"]);

        return { leftUpperLeg, rightUpperLeg, leftLowerLeg, rightLowerLeg, leftUpperArm, rightUpperArm, spine, head, hips, allBones: bones };
    }, [clonedScene]);

    // Play built-in animations if any
    useEffect(() => {
        if (animations.length > 0) {
            const mixer = new THREE.AnimationMixer(clonedScene);
            animations.forEach((clip) => {
                const action = mixer.clipAction(clip);
                action.play();
            });
            mixerRef.current = mixer;
            return () => { mixer.stopAllAction(); };
        }
        return undefined;
    }, [animations, clonedScene]);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Update mixer
        if (mixerRef.current) mixerRef.current.update(delta);

        if (!groupRef.current) return;

        // ── Smooth X follow ──
        const targetX = mouseX * 2.5;
        const currentX = groupRef.current.position.x;
        groupRef.current.position.x = THREE.MathUtils.lerp(currentX, targetX, 0.03);

        // Speed
        const speed = Math.abs(groupRef.current.position.x - prevX.current) / Math.max(delta, 0.001);
        prevX.current = groupRef.current.position.x;

        // Walk phase
        const walkSpeed = Math.min(speed * 0.8, 10);
        walkPhase.current += delta * walkSpeed;
        const phase = walkPhase.current;

        // Movement direction for lean
        const moveDir = targetX - currentX;

        // ── Body lean ──
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            -moveDir * 0.03,
            0.05
        );

        // ── Face toward mouse ──
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouseX * 0.25,
            0.04
        );

        // ── Walk bounce (only when moving) ──
        const bounce = walkSpeed > 0.3 ? Math.abs(Math.sin(phase * 2)) * 0.03 : 0;
        const yBase = -bottomY * scale; // Ground the model
        groupRef.current.position.y = yBase + bounce;

        // ── Procedural bone animation ──
        const swingAngle = walkSpeed > 0.3 ? Math.sin(phase) * 0.6 : 0;
        const armSwing = walkSpeed > 0.3 ? Math.sin(phase) * 0.4 : 0;

        // Legs
        if (boneRefs.leftUpperLeg) {
            boneRefs.leftUpperLeg.rotation.x = swingAngle;
        }
        if (boneRefs.rightUpperLeg) {
            boneRefs.rightUpperLeg.rotation.x = -swingAngle;
        }
        if (boneRefs.leftLowerLeg) {
            // Lower leg bends at knee during walk
            boneRefs.leftLowerLeg.rotation.x = Math.max(0, -swingAngle) * 0.5;
        }
        if (boneRefs.rightLowerLeg) {
            boneRefs.rightLowerLeg.rotation.x = Math.max(0, swingAngle) * 0.5;
        }

        // Arms swing opposite
        if (boneRefs.leftUpperArm) {
            boneRefs.leftUpperArm.rotation.x = -armSwing;
        }
        if (boneRefs.rightUpperArm) {
            boneRefs.rightUpperArm.rotation.x = armSwing;
        }

        // Head look at mouse
        if (boneRefs.head) {
            boneRefs.head.rotation.y = THREE.MathUtils.lerp(
                boneRefs.head.rotation.y,
                mouseX * 0.3,
                0.05
            );
            boneRefs.head.rotation.x = THREE.MathUtils.lerp(
                boneRefs.head.rotation.x,
                mouseY * 0.15,
                0.05
            );
        }

        // Hips sway
        if (boneRefs.hips) {
            boneRefs.hips.rotation.z = walkSpeed > 0.3 ? Math.sin(phase) * 0.04 : 0;
        }

        // Spine slight twist
        if (boneRefs.spine) {
            boneRefs.spine.rotation.y = THREE.MathUtils.lerp(
                boneRefs.spine.rotation.y,
                mouseX * 0.1,
                0.04
            );
        }

        // Idle breathing when stationary
        if (walkSpeed < 0.3 && boneRefs.spine) {
            boneRefs.spine.rotation.x = Math.sin(t * 1.5) * 0.015;
        }
    });

    return (
        <group ref={groupRef} scale={scale} position={[0, -bottomY * scale, 0]}>
            <primitive object={clonedScene} />
        </group>
    );
}

/* ─── Scene ─── */
function RobotScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    return (
        <>
            <ambientLight intensity={0.8} />
            <directionalLight position={[4, 6, 6]} intensity={2} color="#FFFFFF" castShadow />
            <directionalLight position={[-3, 4, 3]} intensity={0.6} color="#E8F4FF" />
            <pointLight position={[0, 1, 5]} intensity={0.5} color="#4C9EFF" />
            <pointLight position={[-2, -1, 3]} intensity={0.3} color="#FFB3C6" />

            <RobotModel mouseX={mouseX} mouseY={mouseY} />

            <ContactShadows
                position={[0, 0, 0]}
                opacity={0.35}
                scale={6}
                blur={2.5}
                far={5}
            />

            <Environment preset="apartment" environmentIntensity={0.5} />

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

useGLTF.preload("/models/robot.glb");

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
                width: 420,
                height: 450,
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
                        fontSize: "1.2rem",
                        color: "#999",
                        fontFamily: "monospace",
                    }}>
                        🤖 로봇 로딩중...
                    </div>
                }
            >
                <Canvas
                    camera={{ position: [0, 1.2, 5], fov: 30 }}
                    style={{ width: "100%", height: "100%", background: "transparent" }}
                    gl={{
                        antialias: true,
                        alpha: true,
                        toneMapping: THREE.ACESFilmicToneMapping,
                        toneMappingExposure: 1.2,
                    }}
                    dpr={[1, 2]}
                >
                    <RobotScene mouseX={dx * 2} mouseY={dy * 2} />
                </Canvas>
            </Suspense>
        </motion.div>
    );
}
