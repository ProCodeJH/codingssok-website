"use client";

import { useRef, Suspense, useEffect, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, useAnimations, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";
import { clone as cloneSkeleton } from "three/examples/jsm/utils/SkeletonUtils.js";

/*
  코딩쏙 — GLTF Walking Robot (Fixed)
  
  Uses SkeletonUtils.clone for proper skinned mesh cloning.
  Procedural walk cycle on skeleton bones.
*/

/* ─── Robot ─── */
function RobotModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const modelRef = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/robot.glb");
    const prevX = useRef(0);
    const walkPhase = useRef(0);

    // Properly clone skinned mesh
    const clonedScene = useMemo(() => cloneSkeleton(scene), [scene]);

    // Auto-fit bounds
    const bounds = useMemo(() => {
        const box = new THREE.Box3().setFromObject(clonedScene);
        const size = new THREE.Vector3();
        box.getSize(size);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const maxDim = Math.max(size.x, size.y, size.z);
        return {
            scale: 2.5 / maxDim,
            centerY: center.y,
            bottomY: box.min.y,
            height: size.y,
        };
    }, [clonedScene]);

    // Find all bones
    const bones = useMemo(() => {
        const found: Record<string, THREE.Bone> = {};
        clonedScene.traverse((child: THREE.Object3D) => {
            if ((child as THREE.Bone).isBone) {
                found[child.name] = child as THREE.Bone;
            }
        });
        console.log("🦴 Robot bones:", Object.keys(found));
        return found;
    }, [clonedScene]);

    // Find bone by partial name match
    const findBone = (hints: string[]): THREE.Bone | null => {
        const keys = Object.keys(bones);
        for (const hint of hints) {
            const match = keys.find(k => k.toLowerCase().includes(hint.toLowerCase()));
            if (match) return bones[match];
        }
        return null;
    };

    // Leg/arm/head bone refs (memoized)
    const skeleton = useMemo(() => ({
        leftUpperLeg: findBone(["leftupleg", "left_thigh", "l_thigh", "thigh.l", "thigh_l", "upperleg.l", "upper_leg.l", "lefthip"]),
        rightUpperLeg: findBone(["rightupleg", "right_thigh", "r_thigh", "thigh.r", "thigh_r", "upperleg.r", "upper_leg.r", "righthip"]),
        leftLowerLeg: findBone(["leftleg", "left_shin", "l_shin", "shin.l", "lowerleg.l", "lower_leg.l", "leftknee", "calf.l"]),
        rightLowerLeg: findBone(["rightleg", "right_shin", "r_shin", "shin.r", "lowerleg.r", "lower_leg.r", "rightknee", "calf.r"]),
        leftUpperArm: findBone(["leftarm", "left_upper_arm", "upperarm.l", "upper_arm.l", "l_shoulder", "leftshoulder"]),
        rightUpperArm: findBone(["rightarm", "right_upper_arm", "upperarm.r", "upper_arm.r", "r_shoulder", "rightshoulder"]),
        head: findBone(["head"]),
        spine: findBone(["spine", "spine1", "spine2"]),
        hips: findBone(["hips", "pelvis", "root"]),
    }), [bones]);

    // If model has built-in animations, use them
    const { actions, mixer } = useAnimations(animations, modelRef);

    useEffect(() => {
        // Try to play "walk" or "idle" animation if exists
        const walkAction = actions["walk"] || actions["Walk"] || actions["walking"] || actions["Walking"];
        if (walkAction) {
            walkAction.play();
        } else {
            // Play first animation if any
            const first = Object.values(actions)[0];
            if (first) first.play();
        }
    }, [actions]);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();
        if (!groupRef.current) return;

        // ── X-axis follow ──
        const targetX = mouseX * 2.0;
        const currentX = groupRef.current.position.x;
        groupRef.current.position.x = THREE.MathUtils.lerp(currentX, targetX, 0.03);

        // Speed for walk cycle
        const speed = Math.abs(groupRef.current.position.x - prevX.current) / Math.max(delta, 0.001);
        prevX.current = groupRef.current.position.x;

        const walkSpeed = Math.min(speed * 0.8, 10);
        walkPhase.current += delta * walkSpeed;
        const phase = walkPhase.current;

        // ── Body lean ──
        const moveDir = targetX - currentX;
        groupRef.current.rotation.z = THREE.MathUtils.lerp(
            groupRef.current.rotation.z,
            -moveDir * 0.03,
            0.05
        );

        // ── Face mouse ──
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y,
            mouseX * 0.25,
            0.04
        );

        // ── Walk bounce ──
        const bounce = walkSpeed > 0.3 ? Math.abs(Math.sin(phase * 2)) * 0.03 : 0;
        groupRef.current.position.y = bounce;

        // ── Procedural bone walk (only if no built-in anim) ──
        if (animations.length === 0) {
            const swing = walkSpeed > 0.3 ? Math.sin(phase) * 0.5 : 0;
            const armSwing = walkSpeed > 0.3 ? Math.sin(phase) * 0.3 : 0;

            if (skeleton.leftUpperLeg) skeleton.leftUpperLeg.rotation.x = swing;
            if (skeleton.rightUpperLeg) skeleton.rightUpperLeg.rotation.x = -swing;
            if (skeleton.leftLowerLeg) skeleton.leftLowerLeg.rotation.x = Math.max(0, -swing) * 0.4;
            if (skeleton.rightLowerLeg) skeleton.rightLowerLeg.rotation.x = Math.max(0, swing) * 0.4;
            if (skeleton.leftUpperArm) skeleton.leftUpperArm.rotation.x = -armSwing;
            if (skeleton.rightUpperArm) skeleton.rightUpperArm.rotation.x = armSwing;

            if (skeleton.hips) skeleton.hips.rotation.z = walkSpeed > 0.3 ? Math.sin(phase) * 0.03 : 0;
        }

        // ── Head always tracks mouse (even with built-in anim) ──
        if (skeleton.head) {
            skeleton.head.rotation.y = THREE.MathUtils.lerp(
                skeleton.head.rotation.y,
                mouseX * 0.3,
                0.05
            );
            skeleton.head.rotation.x = THREE.MathUtils.lerp(
                skeleton.head.rotation.x,
                mouseY * 0.15,
                0.05
            );
        }

        // ── Idle breathing ──
        if (walkSpeed < 0.3 && skeleton.spine) {
            skeleton.spine.rotation.x = Math.sin(t * 1.5) * 0.01;
        }
    });

    return (
        <group ref={groupRef}>
            <group ref={modelRef} scale={bounds.scale} position={[0, -bounds.bottomY * bounds.scale, 0]}>
                <primitive object={clonedScene} />
            </group>
        </group>
    );
}

/* ─── Scene ─── */
function RobotScene({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    return (
        <>
            <ambientLight intensity={0.9} />
            <directionalLight position={[4, 6, 6]} intensity={2} color="#FFFFFF" castShadow />
            <directionalLight position={[-3, 4, 3]} intensity={0.6} color="#E8F4FF" />
            <pointLight position={[0, 1, 5]} intensity={0.5} color="#4C9EFF" />

            <RobotModel mouseX={mouseX} mouseY={mouseY} />

            <ContactShadows
                position={[0, 0.01, 0]}
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
    const [hasError, setHasError] = useState(false);

    if (hasError) {
        return (
            <div style={{
                width: 420, height: 450,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: "3rem",
            }}>
                🤖
            </div>
        );
    }

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
                        width: "100%", height: "100%",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "1.2rem", color: "#999", fontFamily: "monospace",
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
                    onCreated={(state) => {
                        state.gl.setClearColor(0x000000, 0);
                    }}
                >
                    <RobotScene mouseX={dx * 2} mouseY={dy * 2} />
                </Canvas>
            </Suspense>
        </motion.div>
    );
}
