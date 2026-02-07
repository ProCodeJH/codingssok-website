"use client";

import { useRef, Suspense, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, Environment, ContactShadows } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { motion } from "framer-motion";
import { useMousePosition } from "@/components/effects/MouseTracker";
import * as THREE from "three";

/*
  코딩쏙 — GLTF Robot Model
  
  Loads user-provided .glb robot model
  Mouse-follow on X-axis with body lean
  Head tracks mouse
  Walking leg animation based on movement speed
*/

/* ─── Auto-fit model to scene ─── */
function useModelBounds(scene: THREE.Object3D) {
    const box = new THREE.Box3().setFromObject(scene);
    const size = new THREE.Vector3();
    box.getSize(size);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const maxDim = Math.max(size.x, size.y, size.z);
    const scale = 2.2 / maxDim; // fit within ~2.2 units
    return { scale, center, size };
}

/* ─── Robot Component ─── */
function RobotModel({ mouseX, mouseY }: { mouseX: number; mouseY: number }) {
    const groupRef = useRef<THREE.Group>(null);
    const { scene, animations } = useGLTF("/models/robot.glb");
    const mixerRef = useRef<THREE.AnimationMixer | null>(null);
    const prevX = useRef(0);
    const walkPhase = useRef(0);

    // Clone the scene so we can manipulate it
    const clonedScene = scene.clone(true);

    // Auto-fit
    const { scale, center } = useModelBounds(clonedScene);

    // Set up animation mixer if animations exist
    useEffect(() => {
        if (animations.length > 0) {
            const mixer = new THREE.AnimationMixer(clonedScene);
            animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
            mixerRef.current = mixer;
            return () => {
                mixer.stopAllAction();
            };
        }
    }, []);

    useFrame((state, delta) => {
        const t = state.clock.getElapsedTime();

        // Update animation mixer
        if (mixerRef.current) {
            mixerRef.current.update(delta);
        }

        if (groupRef.current) {
            // Smooth X-axis follow
            const targetX = mouseX * 2.5;
            const currentX = groupRef.current.position.x;
            groupRef.current.position.x = THREE.MathUtils.lerp(currentX, targetX, 0.03);

            // Calculate speed
            const speed = Math.abs(groupRef.current.position.x - prevX.current) / Math.max(delta, 0.001);
            prevX.current = groupRef.current.position.x;

            // Lean into movement
            const moveDir = targetX - currentX;
            groupRef.current.rotation.z = THREE.MathUtils.lerp(
                groupRef.current.rotation.z,
                -moveDir * 0.04,
                0.05
            );

            // Look toward mouse (Y rotation)
            groupRef.current.rotation.y = THREE.MathUtils.lerp(
                groupRef.current.rotation.y,
                mouseX * 0.3,
                0.04
            );

            // Subtle head tilt up/down
            groupRef.current.rotation.x = THREE.MathUtils.lerp(
                groupRef.current.rotation.x,
                mouseY * 0.08,
                0.04
            );

            // Walk bounce
            const walkSpeed = Math.min(speed * 0.6, 8);
            walkPhase.current += delta * walkSpeed;
            const bounce = walkSpeed > 0.3 ? Math.abs(Math.sin(walkPhase.current)) * 0.04 : 0;

            // Idle gentle float
            const idleFloat = Math.sin(t * 1.5) * 0.03;
            groupRef.current.position.y = -center.y * scale + bounce + idleFloat;
        }
    });

    return (
        <group ref={groupRef} scale={scale} position={[0, -center.y * scale, 0]}>
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
            <pointLight position={[0, 0, 5]} intensity={0.5} color="#4C9EFF" />
            <pointLight position={[-2, -1, 3]} intensity={0.3} color="#FFB3C6" />

            <RobotModel mouseX={mouseX} mouseY={mouseY} />

            <ContactShadows
                position={[0, -1.2, 0]}
                opacity={0.3}
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

/* ─── Preload model ─── */
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
                height: 420,
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
                        fontSize: "3rem",
                        color: "#aaa",
                    }}>
                        로봇 로딩중...
                    </div>
                }
            >
                <Canvas
                    camera={{ position: [0, 0.5, 4], fov: 35 }}
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
