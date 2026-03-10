"use client";

import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

/* ── GPU Particles using InstancedMesh ── */
const PARTICLE_COUNT = 800;

export default function GpuParticles({ progress = 0 }: { progress?: number }) {
    const meshRef = useRef<THREE.InstancedMesh>(null!);
    const dummy = useMemo(() => new THREE.Object3D(), []);

    const particles = useMemo(() => {
        const arr = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            arr.push({
                x: (Math.random() - 0.5) * 40,
                y: (Math.random() - 0.5) * 25,
                z: (Math.random() - 0.5) * 40,
                speedX: (Math.random() - 0.5) * 0.005,
                speedY: Math.random() * 0.003 + 0.001,
                speedZ: (Math.random() - 0.5) * 0.005,
                scale: Math.random() * 0.04 + 0.01,
                phase: Math.random() * Math.PI * 2,
            });
        }
        return arr;
    }, []);

    // Color based on progress
    const baseColor = useMemo(() => {
        if (progress >= 80) return new THREE.Color("#3b82f6");
        if (progress >= 40) return new THREE.Color("#60a5fa");
        return new THREE.Color("#93c5fd");
    }, [progress]);

    useFrame((state) => {
        if (!meshRef.current) return;
        const t = state.clock.elapsedTime;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
            const p = particles[i];
            const x = p.x + Math.sin(t * 0.3 + p.phase) * 0.5;
            const y = ((p.y + t * p.speedY * 20) % 25) - 12.5;
            const z = p.z + Math.cos(t * 0.2 + p.phase) * 0.5;
            const pulsedScale = p.scale * (1 + Math.sin(t * 2 + p.phase) * 0.3);

            dummy.position.set(x, y, z);
            dummy.scale.setScalar(pulsedScale);
            dummy.updateMatrix();
            meshRef.current.setMatrixAt(i, dummy.matrix);
        }
        meshRef.current.instanceMatrix.needsUpdate = true;
    });

    return (
        <instancedMesh ref={meshRef} args={[undefined, undefined, PARTICLE_COUNT]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshBasicMaterial color={baseColor} transparent opacity={0.4} />
        </instancedMesh>
    );
}
