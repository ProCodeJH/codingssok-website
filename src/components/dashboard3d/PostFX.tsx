"use client";

import { EffectComposer, Bloom } from "@react-three/postprocessing";

/* ── Minimal Post-Processing — no flicker ── */
export default function PostFX() {
    return (
        <EffectComposer multisampling={0}>
            <Bloom
                intensity={0.4}
                luminanceThreshold={0.6}
                luminanceSmoothing={0.9}
                mipmapBlur
            />
        </EffectComposer>
    );
}
