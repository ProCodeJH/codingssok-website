"use client";

import { useRef, useMemo, Suspense, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame, extend } from "@react-three/fiber";
import { Float, Points, PointMaterial, Sparkles, Text, shaderMaterial } from "@react-three/drei";
import * as THREE from "three";
import gsap from "gsap";

// ═══════════════════════════════════════════════════════════════
// SHADER: Science×IT Sphere — Blue/Red + Hex Grid + Circuit + Data Pulse
// ═══════════════════════════════════════════════════════════════
const ScienceSphere = shaderMaterial(
    { uTime: 0, uHover: 0.0 },
    /* vertex */ `
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewDir;
        varying float vDisplacement;
        varying vec3 vWorldPos;
        
        vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
        vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
        vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
        float snoise(vec3 v){
            const vec2 C=vec2(1.0/6.0,1.0/3.0);
            const vec4 D=vec4(0.0,0.5,1.0,2.0);
            vec3 i=floor(v+dot(v,C.yyy));
            vec3 x0=v-i+dot(i,C.xxx);
            vec3 g=step(x0.yzx,x0.xyz);
            vec3 l=1.0-g;
            vec3 i1=min(g.xyz,l.zxy);
            vec3 i2=max(g.xyz,l.zxy);
            vec3 x1=x0-i1+C.xxx;
            vec3 x2=x0-i2+C.yyy;
            vec3 x3=x0-D.yyy;
            i=mod289(i);
            vec4 p=permute(permute(permute(
                i.z+vec4(0.0,i1.z,i2.z,1.0))
                +i.y+vec4(0.0,i1.y,i2.y,1.0))
                +i.x+vec4(0.0,i1.x,i2.x,1.0));
            float n_=0.142857142857;
            vec3 ns=n_*D.wyz-D.xzx;
            vec4 j=p-49.0*floor(p*ns.z*ns.z);
            vec4 x_=floor(j*ns.z);
            vec4 y_=floor(j-7.0*x_);
            vec4 x2_=x_*ns.x+ns.yyyy;
            vec4 y2_=y_*ns.x+ns.yyyy;
            vec4 h=1.0-abs(x2_)-abs(y2_);
            vec4 b0=vec4(x2_.xy,y2_.xy);
            vec4 b1=vec4(x2_.zw,y2_.zw);
            vec4 s0=floor(b0)*2.0+1.0;
            vec4 s1=floor(b1)*2.0+1.0;
            vec4 sh=-step(h,vec4(0.0));
            vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;
            vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
            vec3 p0=vec3(a0.xy,h.x);
            vec3 p1=vec3(a0.zw,h.y);
            vec3 p2=vec3(a1.xy,h.z);
            vec3 p3=vec3(a1.zw,h.w);
            vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
            p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
            vec4 m=max(0.5-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);
            m=m*m;
            return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
        }
        
        void main(){
            vUv=uv;
            vNormal=normalize(normalMatrix*normal);
            
            // STRONGER organic waves — triple octave
            float distortAmount = 0.35 + uHover * 0.2;
            float speed = 0.3 + uHover * 0.2;
            float n1=snoise(position*1.2+uTime*speed)*distortAmount;
            float n2=snoise(position*2.5+uTime*(speed*1.8))*distortAmount*0.6;
            float n3=snoise(position*0.5+uTime*0.1)*distortAmount*0.8;
            float n4=snoise(position*4.0+uTime*0.5)*distortAmount*0.25;
            float displacement=n1+n2+n3+n4;
            vDisplacement=displacement;
            
            vec3 newPos=position+normal*displacement;
            vWorldPos=newPos;
            vPosition=(modelViewMatrix*vec4(newPos,1.0)).xyz;
            vViewDir=normalize(-vPosition);
            
            gl_Position=projectionMatrix*modelViewMatrix*vec4(newPos,1.0);
        }
    `,
    /* fragment */ `
        uniform float uTime;
        uniform float uHover;
        varying vec2 vUv;
        varying vec3 vNormal;
        varying vec3 vPosition;
        varying vec3 vViewDir;
        varying float vDisplacement;
        varying vec3 vWorldPos;
        
        float hexGrid(vec2 p,float scale){
            p*=scale;
            vec2 h=vec2(1.0,sqrt(3.0));
            vec2 a=mod(p,h)-h*0.5;
            vec2 b=mod(p+h*0.5,h)-h*0.5;
            vec2 gv=length(a)<length(b)?a:b;
            return max(abs(gv.x),abs(gv.y*0.577+gv.x*0.5));
        }
        
        float circuitLines(vec2 p,float scale){
            vec2 g=fract(p*scale)-0.5;
            float lx=smoothstep(0.48,0.5,abs(g.x));
            float ly=smoothstep(0.48,0.5,abs(g.y));
            return max(lx,ly);
        }
        
        float dataPulse(vec2 uv,float time,float speed,float width){
            float pos=fract(time*speed);
            return smoothstep(width,0.0,abs(uv.y-pos))*0.5+
                   smoothstep(width,0.0,abs(uv.x-pos))*0.3;
        }

        // HSV to RGB conversion for holographic effect
        vec3 hsv2rgb(vec3 c){
            vec4 K=vec4(1.0,2.0/3.0,1.0/3.0,3.0);
            vec3 p=abs(fract(c.xxx+K.xyz)*6.0-K.www);
            return c.z*mix(K.xxx,clamp(p-K.xxx,0.0,1.0),c.y);
        }

        // Electric arc / lightning effect
        float electricArc(vec2 uv, float time, float seed){
            float y = uv.y * 8.0 + seed;
            float x = uv.x + sin(y * 3.0 + time * 2.0) * 0.15 + sin(y * 7.0 + time * 4.0) * 0.05;
            float arc = smoothstep(0.02, 0.0, abs(fract(x) - 0.5));
            arc *= step(0.7, sin(time * 3.0 + seed * 6.28));
            return arc;
        }
        
        void main(){
            float fresnel=1.0-max(dot(vNormal,vViewDir),0.0);
            float fresnelEdge=pow(fresnel,2.5);
            float fresnelSoft=pow(fresnel,1.5);
            
            vec3 deepBlue=vec3(0.08,0.18,0.45);
            vec3 brightBlue=vec3(0.1,0.75,1.0);
            vec3 deepRed=vec3(0.7,0.12,0.15);
            vec3 brightRed=vec3(1.0,0.3,0.3);
            vec3 purple=vec3(0.5,0.15,0.8);
            vec3 gold=vec3(1.0,0.85,0.3);
            
            // === BASE: Flowing blue-red gradient ===
            float gradientFlow=sin(vUv.y*4.0+uTime*0.4+vUv.x*2.5)*0.5+0.5;
            float redZone=sin(vUv.x*3.0-uTime*0.3+vUv.y*5.0)*0.5+0.5;
            redZone=smoothstep(0.45,0.75,redZone);
            vec3 baseColor=mix(deepBlue,mix(deepBlue*2.0,deepRed,redZone),gradientFlow);
            
            // === NEBULA VOLUME: Deep swirling cosmic clouds ===
            float nebula1 = sin(vUv.x*6.0+vUv.y*4.0+uTime*0.15)*0.5+0.5;
            float nebula2 = sin(vUv.y*8.0-vUv.x*3.0+uTime*0.2)*0.5+0.5;
            float nebulaMask = nebula1 * nebula2;
            vec3 nebulaColor = mix(
                vec3(0.05, 0.02, 0.15),  // deep space purple
                mix(vec3(0.0, 0.3, 0.6), vec3(0.6, 0.1, 0.3), nebula1),
                nebulaMask
            );
            baseColor = mix(baseColor, nebulaColor, 0.3);
            
            // === HEX GRID ===
            float hex=hexGrid(vUv,12.0);
            float hexEdge=smoothstep(0.40,0.45,hex);
            vec3 hexColor=mix(brightBlue,brightRed,redZone)*0.8;
            baseColor=mix(baseColor,baseColor+hexColor,hexEdge*0.9);
            
            // === CIRCUIT LINES ===
            float circuit=circuitLines(vUv+vec2(uTime*0.02,0.0),20.0);
            vec3 circuitColor=mix(brightBlue*0.5,brightRed*0.5,redZone);
            baseColor+=circuitColor*circuit*0.3;
            
            // === DATA PULSES ===
            float pulseIntensity = 0.6 + uHover * 0.4;
            float pulse1=dataPulse(vUv,uTime,0.15,0.03);
            float pulse2=dataPulse(vUv+0.33,uTime,-0.12,0.025);
            float pulse3=dataPulse(vec2(vUv.y,vUv.x),uTime,0.1,0.02);
            vec3 pulseColor=mix(brightBlue,brightRed,sin(uTime*0.5)*0.5+0.5);
            baseColor+=pulseColor*(pulse1+pulse2+pulse3)*pulseIntensity;
            
            // === NEURAL NODES ===
            vec2 nodeGrid=fract(vUv*8.0);
            float nodeDist=length(nodeGrid-0.5);
            float nodeDot=smoothstep(0.08,0.04,nodeDist);
            float nodeGlow=smoothstep(0.2,0.0,nodeDist)*0.3;
            vec3 nodeColor=mix(brightBlue,brightRed,step(0.5,redZone));
            baseColor+=nodeColor*(nodeDot*0.8+nodeGlow);

            // === HOLOGRAPHIC IRIDESCENCE ===
            float hueShift = dot(vNormal, vViewDir) * 2.0 + uTime * 0.1;
            float iriAngle = atan(vNormal.y, vNormal.x) * 2.0 + hueShift;
            vec3 iridescence = hsv2rgb(vec3(fract(iriAngle * 0.15 + fresnel * 0.5), 0.7, 0.9));
            baseColor += iridescence * pow(fresnel, 1.8) * 0.4;

            // === ELECTRIC ARCS ===
            float arc1 = electricArc(vUv, uTime, 0.0);
            float arc2 = electricArc(vUv * 1.3 + 0.5, uTime * 1.2, 2.1);
            float arc3 = electricArc(vec2(vUv.y, vUv.x), uTime * 0.8, 4.3);
            vec3 arcColor = mix(brightBlue * 2.0, gold, sin(uTime * 2.0) * 0.5 + 0.5);
            baseColor += arcColor * (arc1 + arc2 + arc3) * 1.5;
            
            // === ENERGY CORE GLOW (center brighten) ===
            float coreGlow = 1.0 - fresnel; // brighter at center
            coreGlow = pow(coreGlow, 3.0) * 0.6;
            baseColor += mix(brightBlue, gold, sin(uTime * 0.8) * 0.5 + 0.5) * coreGlow;

            // === FRESNEL CHROMATIC EDGE (blue+red+purple split) ===
            vec3 edgeBlue=brightBlue*pow(fresnel,2.5)*1.4;
            vec3 edgeRed=brightRed*pow(fresnel,3.0)*1.0;
            vec3 edgePurple=purple*pow(fresnel,2.0)*0.6;
            float edgeSplit=sin(atan(vNormal.y,vNormal.x)*3.0+uTime*0.4)*0.5+0.5;
            vec3 edgeColor=mix(mix(edgeBlue,edgeRed,edgeSplit),edgePurple,sin(uTime*0.3)*0.5+0.5);
            
            // === SPECULAR HIGHLIGHTS ===
            float spec1=pow(max(dot(vNormal,normalize(vec3(0.5,0.8,1.0))),0.0),30.0);
            float spec2=pow(max(dot(vNormal,normalize(vec3(-0.6,0.3,0.8))),0.0),25.0);
            float spec3=pow(max(dot(vNormal,normalize(vec3(0.0,-0.8,0.5))),0.0),20.0);
            vec3 specular=vec3(0.9,0.95,1.0)*spec1*0.7 + vec3(1.0,0.85,0.9)*spec2*0.4 + gold*spec3*0.3;
            
            // === BREATHING + COMPOSE ===
            float breathe=sin(uTime*(1.2+uHover*0.5))*0.08+1.0;
            
            vec3 finalColor=baseColor*breathe;
            finalColor+=edgeColor*fresnelSoft;
            finalColor+=specular;
            finalColor+=vec3(0.05,0.03,0.08)*vDisplacement*3.0;
            
            float purpleZone=smoothstep(0.3,0.6,redZone)*(1.0-smoothstep(0.6,0.9,redZone));
            finalColor+=purple*purpleZone*0.2;
            
            // Boost brightness
            finalColor *= 1.5;
            gl_FragColor=vec4(finalColor,1.0);
        }
    `
);


extend({ ScienceSphere });

declare module '@react-three/fiber' {
    interface ThreeElements {
        scienceSphere: any;
    }
}

// ═══════════════════════════════════════════════
// 1. Orbital Code Rings
// ═══════════════════════════════════════════════
function CodeRing({ radius, speed, tiltX, tiltZ, words, color, opacity = 1, reverse = false }: { radius: number; speed: number; tiltX: number; tiltZ: number; words: string[]; color: string; opacity?: number; reverse?: boolean }) {
    const ringRef = useRef<THREE.Group>(null);
    const count = words.length;

    useFrame((_s, delta) => {
        if (ringRef.current) ringRef.current.rotation.y += speed * (reverse ? -1 : 1) * delta;
    });

    return (
        <group rotation={[tiltX, 0, tiltZ]}>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[radius, 0.015, 16, 100]} />
                <meshBasicMaterial color={color} transparent opacity={opacity * 0.3} />
            </mesh>
            <group ref={ringRef}>
                {words.map((word, i) => {
                    const a = (i / count) * Math.PI * 2;
                    return (
                        <group key={i} position={[Math.cos(a) * radius, 0, Math.sin(a) * radius]} rotation={[0, -a + Math.PI / 2, 0]}>
                            <mesh position={[-0.5, 0, 0]}>
                                <sphereGeometry args={[0.07, 16, 16]} />
                                <meshBasicMaterial color={color} />
                            </mesh>
                            <Text position={[0, 0, 0]} fontSize={0.3} color={color} fillOpacity={opacity}>{word}</Text>
                        </group>
                    );
                })}
            </group>
        </group>
    );
}

// ═══════════════════════════════════════════════
// 2. Science × IT Sphere (No mouse interaction)
// ═══════════════════════════════════════════════
function Globe({ scrollProgress }: { scrollProgress: number }) {
    const coreRef = useRef<THREE.Group>(null);
    const matRef = useRef<any>(null);
    const particlesRef = useRef<THREE.Points>(null);
    const l1 = useRef<THREE.PointLight>(null);
    const l2 = useRef<THREE.PointLight>(null);
    const l3 = useRef<THREE.PointLight>(null);
    const l4 = useRef<THREE.PointLight>(null);

    const pData = useMemo(() => {
        const N = 2500;
        const pos = new Float32Array(N * 3);
        const col = new Float32Array(N * 3);
        for (let i = 0; i < N; i++) {
            const r = 1.8 + Math.random() * 3.5;
            const th = Math.random() * Math.PI * 2;
            const ph = Math.acos(Math.random() * 2 - 1);
            pos[i * 3] = r * Math.sin(ph) * Math.cos(th);
            pos[i * 3 + 1] = r * Math.sin(ph) * Math.sin(th);
            pos[i * 3 + 2] = r * Math.cos(ph);
            const rnd = Math.random();
            const c = new THREE.Color(
                rnd > 0.8 ? "#fbbf24" : // gold
                    rnd > 0.6 ? "#ef4444" :
                        rnd > 0.4 ? "#8b5cf6" : // purple
                            rnd > 0.2 ? "#0ea5e9" : "#38bdf8"
            );
            col[i * 3] = c.r;
            col[i * 3 + 1] = c.g;
            col[i * 3 + 2] = c.b;
        }
        return { positions: pos, colors: col };
    }, []);

    useFrame((state) => {
        const t = state.clock.getElapsedTime();
        if (matRef.current) {
            matRef.current.uTime = t;
            matRef.current.uHover = 0.3;
        }
        if (coreRef.current) {
            coreRef.current.rotation.y = t * 0.06;
            coreRef.current.rotation.z = Math.sin(t * 0.2) * 0.08;
            coreRef.current.rotation.x = Math.cos(t * 0.15) * 0.05;
        }
        if (particlesRef.current) particlesRef.current.rotation.y = t * -0.02;
        if (l1.current) l1.current.position.set(Math.sin(t * 0.5) * 4, Math.sin(t * 0.3) * 2.5, Math.cos(t * 0.5) * 4);
        if (l2.current) l2.current.position.set(Math.sin(t * -0.4) * 5, Math.cos(t * 0.6) * 3, Math.cos(t * -0.4) * 5);
        if (l3.current) l3.current.position.set(Math.cos(t * 0.3) * 3.5, Math.sin(t * 0.7) * 2, Math.sin(t * 0.3) * 3.5);
        if (l4.current) l4.current.position.set(Math.sin(t * 0.7) * 3, -Math.cos(t * 0.4) * 3, Math.cos(t * 0.6) * 4);
    });

    const scale = 3.0 + scrollProgress * 0.3;

    return (
        <group scale={scale}>
            <pointLight ref={l1} color="#0ea5e9" intensity={6} distance={15} />
            <pointLight ref={l2} color="#ef4444" intensity={5} distance={15} />
            <pointLight ref={l3} color="#8b5cf6" intensity={4} distance={15} />
            <pointLight ref={l4} color="#fbbf24" intensity={3} distance={12} />

            <Float speed={0.8} rotationIntensity={0.2} floatIntensity={0.3}>
                <group ref={coreRef}>
                    {/* INNER ENERGY CORE — soft inner glow */}
                    <mesh scale={0.5}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color="#38bdf8" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
                    </mesh>
                    <mesh scale={0.25}>
                        <sphereGeometry args={[1, 16, 16]} />
                        <meshBasicMaterial color="#ffffff" transparent opacity={0.5} blending={THREE.AdditiveBlending} />
                    </mesh>

                    {/* MAIN SHADER SPHERE */}
                    <mesh>
                        <sphereGeometry args={[1, 128, 128]} />
                        <scienceSphere ref={matRef} transparent />
                    </mesh>

                    {/* WIREFRAME LAYERS */}
                    <mesh scale={1.06}>
                        <icosahedronGeometry args={[1, 3]} />
                        <meshBasicMaterial color="#0ea5e9" wireframe transparent opacity={0.25} blending={THREE.AdditiveBlending} />
                    </mesh>
                    <mesh scale={1.1}>
                        <icosahedronGeometry args={[1, 2]} />
                        <meshBasicMaterial color="#ef4444" wireframe transparent opacity={0.15} blending={THREE.AdditiveBlending} />
                    </mesh>
                    <mesh scale={1.15}>
                        <icosahedronGeometry args={[1, 4]} />
                        <meshBasicMaterial color="#8b5cf6" wireframe transparent opacity={0.08} blending={THREE.AdditiveBlending} />
                    </mesh>

                    {/* OUTER GLOW SHELL (replaces glass — simple + reliable) */}
                    <mesh scale={1.25}>
                        <sphereGeometry args={[1, 48, 48]} />
                        <meshBasicMaterial color="#60a5fa" transparent opacity={0.06} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
                    </mesh>
                    <mesh scale={1.4}>
                        <sphereGeometry args={[1, 32, 32]} />
                        <meshBasicMaterial color="#0ea5e9" transparent opacity={0.025} blending={THREE.AdditiveBlending} side={THREE.BackSide} />
                    </mesh>
                </group>

                <Points ref={particlesRef} positions={pData.positions} colors={pData.colors}>
                    <PointMaterial transparent vertexColors size={0.03} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
                </Points>
                <Sparkles count={400} scale={16} size={3} speed={0.6} color="#ffffff" opacity={0.5} noise={2} />
            </Float>
        </group>
    );
}

// ═══════════════════════════════════════════════
// 3a. Inward-streaming particles (absorption effect)
// ═══════════════════════════════════════════════
function InwardParticles({ count = 80 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const data = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const spd = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 8 + Math.random() * 14;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
            spd[i] = 0.3 + Math.random() * 0.7;
        }
        return { pos, spd };
    }, [count]);

    useFrame(() => {
        if (!ref.current) return;
        const p = ref.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            const ix = i * 3;
            const dx = -p[ix], dy = -p[ix + 1], dz = -p[ix + 2];
            const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);
            if (dist < 0.5) {
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const r = 10 + Math.random() * 12;
                p[ix] = r * Math.sin(phi) * Math.cos(theta);
                p[ix + 1] = r * Math.sin(phi) * Math.sin(theta);
                p[ix + 2] = r * Math.cos(phi);
            } else {
                const s = data.spd[i] * 0.02;
                p[ix] += dx * s; p[ix + 1] += dy * s; p[ix + 2] += dz * s;
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={data.pos} stride={3}>
            <PointMaterial transparent size={0.08} color="#38bdf8" sizeAttenuation depthWrite={false} opacity={0.7} blending={THREE.AdditiveBlending} />
        </Points>
    );
}

// ═══════════════════════════════════════════════
// 3b. Burst particles (periodic outward explosion)
// ═══════════════════════════════════════════════
function BurstParticles({ count = 60 }: { count?: number }) {
    const ref = useRef<THREE.Points>(null);
    const data = useMemo(() => {
        const pos = new Float32Array(count * 3);
        const vel = new Float32Array(count * 3);
        const life = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            life[i] = -Math.random() * 5; // stagger start
        }
        return { pos, vel, life };
    }, [count]);

    useFrame((_, delta) => {
        if (!ref.current) return;
        const p = ref.current.geometry.attributes.position.array as Float32Array;
        for (let i = 0; i < count; i++) {
            data.life[i] += delta;
            if (data.life[i] > 3 || data.life[i] < 0) {
                if (data.life[i] > 3) data.life[i] = 0;
                const theta = Math.random() * Math.PI * 2;
                const phi = Math.acos(2 * Math.random() - 1);
                const speed = 1.5 + Math.random() * 3;
                data.vel[i * 3] = Math.sin(phi) * Math.cos(theta) * speed;
                data.vel[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * speed;
                data.vel[i * 3 + 2] = Math.cos(phi) * speed;
                p[i * 3] = 0; p[i * 3 + 1] = 0; p[i * 3 + 2] = 0;
            }
            if (data.life[i] >= 0) {
                p[i * 3] += data.vel[i * 3] * delta;
                p[i * 3 + 1] += data.vel[i * 3 + 1] * delta;
                p[i * 3 + 2] += data.vel[i * 3 + 2] * delta;
            }
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <Points ref={ref} positions={data.pos} stride={3}>
            <PointMaterial transparent size={0.06} color="#ef4444" sizeAttenuation depthWrite={false} opacity={0.6} blending={THREE.AdditiveBlending} />
        </Points>
    );
}

// ═══════════════════════════════════════════════
// 3c. Perspective Grid (infinite horizon)
// ═══════════════════════════════════════════════
function PerspectiveGrid() {
    const ref = useRef<THREE.GridHelper>(null);
    useFrame((state) => {
        if (!ref.current) return;
        ref.current.position.z = -(state.clock.getElapsedTime() * 0.5) % 2;
    });
    return (
        <group position={[0, -6, 0]} rotation={[0, 0, 0]}>
            <gridHelper ref={ref} args={[60, 40, "#0ea5e920", "#0ea5e910"]} />
        </group>
    );
}


// ═══════════════════════════════════════════════
// 3. R3F Scene (with all effects)
// ═══════════════════════════════════════════════
function R3FScene({ scrollProgress }: { scrollProgress: number }) {
    const groupRef = useRef<THREE.Group>(null);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.getElapsedTime();
        groupRef.current.rotation.y = Math.sin(t * 0.08) * 0.15;
        groupRef.current.rotation.x = Math.cos(t * 0.06) * 0.08;
    });

    // 8 rings with LONGER source code snippets
    const r1 = ["const model = await tf.loadLayersModel('ai/v3')", "export function trainNeuralNetwork(data: Dataset)", "interface BionicIntelligence extends CoreAI {}", "async function processQuantumState(qubits: number[])", "const gradient = backpropagate(loss, weights)", "type NeuralLayer = Dense | Conv2D | LSTM"];
    const r2 = ["E = mc\u00B2  //  mass-energy equivalence", "\u2207\u00B2\u03C8 + (2m/\u0127\u00B2)(E-V)\u03C8 = 0", "\u2211\u1D62 P(x\u1D62) \u00B7 log\u2082 P(x\u1D62)  // entropy", "f(x) = \u222B\u2080\u221E e^(-t) \u00B7 t^(x-1) dt  // gamma", "\u2207 \u00D7 E = -\u2202B/\u2202t  // Maxwell"];
    const r3 = ["<NeuralNode layers={[128,64,32]} activation='relu' />", "System.out.println(matrix.transpose().inverse())", "import { TensorFlow, PyTorch, Scikit } from 'ai-core'", "Array.from({length: 1024}, () => Math.random())", "const weights = optimizer.minimize(() => loss(pred, y))"];
    const r4 = ["DataPipeline.stream().filter().map().reduce()", "QuantumCircuit(5).hadamard(0).cnot(0,1).measure()", "await fetch('/api/neural/predict', { body: tensor })", "Vector3.cross(normal, tangent).normalize()", "blockchain.verify(hash, signature, publicKey)"];
    const r5 = ["SELECT embedding FROM neurons WHERE layer = 'hidden'", "docker build -t ai-model:v3 --target production .", "git commit -m 'feat: quantum error correction'", "kubectl apply -f neural-cluster.yaml --namespace=ai", "npm run train -- --epochs=100 --batch-size=32"];
    const r6 = ["def forward(self, x): return self.relu(self.fc(x))", "model.compile(optimizer='adam', loss='mse')", "torch.nn.functional.softmax(logits, dim=-1)", "predictions = model.predict(test_data, verbose=1)", "accuracy: 0.9847 | loss: 0.0231 | val_acc: 0.9812"];
    const r7 = ["class TransformerBlock(nn.Module):", "attention_weights = Q @ K.T / sqrt(d_k)", "positional_encoding = sin(pos / 10000^(2i/d))", "layer_norm(x + MultiHeadAttention(x))"];
    const r8 = ["const DNA = 'ATCGATCG'.split('').map(nucleotide)", "protein.fold(sequence, temperature=310.15)", "genome.align(reference, query, scoring_matrix)", "CRISPR.edit(target_gene, guide_rna, cas9)"];

    // Scroll parallax: sphere moves back, rings move at different rates
    const sphereZ = scrollProgress * -3;
    const ringOffset = scrollProgress * -1;

    return (
        <group position={[0, 1.5, 0]}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1.8} color="#e0f2fe" distance={50} />
            <pointLight position={[-8, -5, 8]} intensity={0.8} color="#ef4444" distance={30} />
            <directionalLight position={[-5, 5, 5]} intensity={0.8} color="#ffffff" />

            {/* Perspective grid behind everything */}
            <PerspectiveGrid />

            {/* Particle effects */}
            <InwardParticles count={80} />
            <BurstParticles count={60} />


            <group ref={groupRef}>
                {/* Sphere with scroll parallax depth */}
                <group position={[0, 0, sphereZ]} scale={1.4}>
                    <Globe scrollProgress={scrollProgress} />
                </group>

                {/* Rings with slight parallax offset */}
                <group position={[0, 0, ringOffset]}>
                    <CodeRing radius={5} speed={0.18} tiltX={0.12} tiltZ={-0.08} words={r1} color="#0ea5e9" opacity={0.95} />
                    <CodeRing radius={7} speed={-0.12} tiltX={-0.18} tiltZ={0.1} words={r2} color="#38bdf8" opacity={0.9} reverse />
                    <CodeRing radius={9} speed={0.09} tiltX={0.14} tiltZ={0.18} words={r3} color="#0284c7" opacity={0.85} />
                    <CodeRing radius={11} speed={-0.07} tiltX={-0.1} tiltZ={-0.14} words={r4} color="#06b6d4" opacity={0.8} reverse />
                    <CodeRing radius={13} speed={0.06} tiltX={0.2} tiltZ={0.05} words={r5} color="#3b82f6" opacity={0.7} />
                    <CodeRing radius={15} speed={-0.05} tiltX={-0.12} tiltZ={0.15} words={r6} color="#818cf8" opacity={0.6} reverse />
                    <CodeRing radius={17} speed={0.04} tiltX={0.06} tiltZ={-0.12} words={r7} color="#a78bfa" opacity={0.5} />
                    <CodeRing radius={19} speed={-0.03} tiltX={-0.06} tiltZ={0.06} words={r8} color="#94a3b8" opacity={0.45} reverse />
                    <CodeRing radius={21} speed={0.035} tiltX={0.15} tiltZ={-0.1} words={r1} color="#22d3ee" opacity={0.35} />
                    <CodeRing radius={23} speed={-0.025} tiltX={-0.08} tiltZ={0.12} words={r3} color="#a5b4fc" opacity={0.3} reverse />
                    <CodeRing radius={25} speed={0.02} tiltX={0.1} tiltZ={0.08} words={r5} color="#67e8f9" opacity={0.25} />
                    <CodeRing radius={28} speed={-0.015} tiltX={-0.05} tiltZ={-0.08} words={r6} color="#c4b5fd" opacity={0.2} reverse />
                </group>
            </group>
        </group>
    );
}

// ═══════════════════════════════════════════════
// TEXT EFFECTS
// ═══════════════════════════════════════════════

// 1. Gradient Title with flowing animation
function GradientTitle({ text }: { text: string }) {
    return (
        <h1 style={{
            fontSize: "clamp(48px, 8vw, 96px)",
            fontWeight: 900,
            letterSpacing: "-0.03em",
            background: "linear-gradient(135deg, #0ea5e9, #6366f1, #ef4444, #0ea5e9)",
            backgroundSize: "300% 300%",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientFlow 4s ease infinite",
            lineHeight: 1.1,
            textShadow: "none",
            filter: "drop-shadow(0 0 30px rgba(14,165,233,0.3))",
        }}>
            {text}
            <style>{`
                @keyframes gradientFlow {
                    0%{background-position:0% 50%}
                    50%{background-position:100% 50%}
                    100%{background-position:0% 50%}
                }
            `}</style>
        </h1>
    );
}

// 2. Glitch/Matrix Decode Effect
function GlitchDecode({ text, delay = 0 }: { text: string; delay?: number }) {
    const [display, setDisplay] = useState("");
    const [started, setStarted] = useState(false);
    const chars = "!@#$%^&*()_+-=[]{}|;:,.<>?/~`ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    useEffect(() => {
        const timer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(timer);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplay(
                text.split("").map((char, i) => {
                    if (char === " ") return " ";
                    if (i < iteration) return char;
                    return chars[Math.floor(Math.random() * chars.length)];
                }).join("")
            );
            iteration += 0.5;
            if (iteration >= text.length) clearInterval(interval);
        }, 40);
        return () => clearInterval(interval);
    }, [started, text]);

    return (
        <p style={{
            fontSize: "clamp(24px, 5vw, 44px)",
            fontWeight: 600,
            color: "#1e293b",
            fontFamily: "'Pretendard', sans-serif",
            minHeight: "1.5em",
            textShadow: "0 0 20px rgba(255,255,255,0.8)",
            opacity: started ? 1 : 0,
            transition: "opacity 0.3s",
        }}>
            {display || "\u00A0"}
        </p>
    );
}

// 3. Stagger Letter Animation
function StaggerText({ text, delay = 0 }: { text: string; delay?: number }) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const t = setTimeout(() => setVisible(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    return (
        <p style={{ fontSize: "clamp(18px, 3vw, 28px)", fontWeight: 500, color: "#475569", letterSpacing: "0.15em", textTransform: "uppercase", display: "flex", gap: "2px", flexWrap: "wrap", justifyContent: "center" }}>
            {text.split("").map((char, i) => (
                <span key={i} style={{
                    display: "inline-block",
                    opacity: visible ? 1 : 0,
                    transform: visible ? "translateY(0)" : "translateY(20px)",
                    transition: `all 0.4s cubic-bezier(0.16,1,0.3,1) ${i * 0.04}s`,
                    textShadow: "0 0 10px rgba(255,255,255,0.6)",
                }}>
                    {char === " " ? "\u00A0" : char}
                </span>
            ))}
        </p>
    );
}

// 4. TypeWriter Effect
function TypeWriter({ lines, delay = 0 }: { lines: string[]; delay?: number }) {
    const [lineIdx, setLineIdx] = useState(0);
    const [charIdx, setCharIdx] = useState(0);
    const [started, setStarted] = useState(false);
    const [deleting, setDeleting] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        const current = lines[lineIdx];
        let timer: ReturnType<typeof setTimeout>;

        if (!deleting) {
            if (charIdx < current.length) {
                timer = setTimeout(() => setCharIdx(c => c + 1), 50 + Math.random() * 30);
            } else {
                timer = setTimeout(() => setDeleting(true), 2000);
            }
        } else {
            if (charIdx > 0) {
                timer = setTimeout(() => setCharIdx(c => c - 1), 25);
            } else {
                setDeleting(false);
                setLineIdx(l => (l + 1) % lines.length);
            }
        }
        return () => clearTimeout(timer);
    }, [charIdx, deleting, started, lineIdx, lines]);

    return (
        <div style={{
            background: "rgba(15, 23, 42, 0.85)",
            backdropFilter: "blur(12px)",
            borderRadius: "12px",
            padding: "16px 24px",
            fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
            fontSize: "clamp(14px, 2vw, 18px)",
            color: "#38bdf8",
            minHeight: "52px",
            display: "flex",
            alignItems: "center",
            border: "1px solid rgba(56,189,248,0.2)",
            boxShadow: `0 4px 24px rgba(0,0,0,0.2), inset 0 0 30px rgba(14,165,233,0.05), 0 0 ${!deleting && charIdx > 0 ? 15 : 5}px rgba(56,189,248,${!deleting && charIdx > 0 ? 0.4 : 0.1})`,
            opacity: started ? 1 : 0,
            transition: "opacity 0.5s",
        }}>
            <span style={{ color: "#64748b", marginRight: "8px" }}>{">"}</span>
            {started ? lines[lineIdx].substring(0, charIdx) : ""}
            <span style={{ animation: "blink 0.8s step-end infinite", color: "#ef4444", fontWeight: 700, marginLeft: "1px" }}>|</span>
        </div>
    );
}

// 5. Counter Rolling Effect
function CounterRoll({ target, suffix = "", label, delay = 0 }: { target: number; suffix?: string; label: string; delay?: number }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);

    useEffect(() => {
        const t = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(t);
    }, [delay]);

    useEffect(() => {
        if (!started) return;
        const duration = 2000;
        const steps = 60;
        const increment = target / steps;
        let current = 0;
        const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(interval);
            } else {
                setCount(Math.floor(current));
            }
        }, duration / steps);
        return () => clearInterval(interval);
    }, [started, target]);

    return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span style={{
                fontSize: "clamp(36px, 5vw, 56px)",
                fontWeight: 800,
                color: "#0ea5e9",
                fontFamily: "'Outfit', sans-serif",
                textShadow: "0 0 20px rgba(14,165,233,0.3), 0 0 40px rgba(255,255,255,0.5)",
                opacity: started ? 1 : 0,
                transform: started ? "translateY(0)" : "translateY(10px)",
                transition: "all 0.5s ease",
            }}>
                {count}{suffix}
            </span>
            <span style={{
                fontSize: "clamp(13px, 1.5vw, 16px)",
                fontWeight: 500,
                color: "#64748b",
                textShadow: "0 0 10px rgba(255,255,255,0.6)",
                opacity: started ? 0.8 : 0,
                transition: "opacity 0.5s ease 0.3s",
            }}>
                {label}
            </span>
        </div>
    );
}

// ═══════════════════════════════════════════════
// Mouse Parallax wrapper for text layers
// ═══════════════════════════════════════════════
function MouseParallaxText({ children }: { children: React.ReactNode }) {
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    useEffect(() => {
        const handleMove = (e: MouseEvent) => {
            const cx = (e.clientX / window.innerWidth - 0.5) * 2;
            const cy = (e.clientY / window.innerHeight - 0.5) * 2;
            setOffset({ x: cx * 8, y: cy * 5 });
        };
        window.addEventListener("mousemove", handleMove);
        return () => window.removeEventListener("mousemove", handleMove);
    }, []);

    return (
        <div style={{
            transform: `translate(${offset.x}px, ${offset.y}px)`,
            transition: "transform 0.15s ease-out",
            pointerEvents: "none",
        }}>
            {children}
        </div>
    );
}

// ═══════════════════════════════════════════════
// 4. Hero Entry — GSAP ScrollTrigger Integration
// ═══════════════════════════════════════════════
const TOPO = `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='rgba(14, 165, 233, 0.05)' fill-rule='evenodd'/%3E%3C/svg%3E")`;

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const [scrollProgress, setScrollProgress] = useState(0);

    // ─── GSAP: Scroll-reactive sphere scaling ───
    useEffect(() => {
        if (!sectionRef.current) return;

        const handleScroll = () => {
            if (!sectionRef.current) return;
            const rect = sectionRef.current.getBoundingClientRect();
            const viewH = window.innerHeight;
            const progress = Math.max(0, Math.min(1, -rect.top / viewH));
            setScrollProgress(progress);
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <section ref={sectionRef} id="hero" className="relative w-full text-slate-800" style={{ minHeight: "100vh", background: "#ffffff" }}>
            <div className="absolute inset-0 -z-50" style={{ background: "#ffffff" }} />

            <motion.div
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0 w-full h-full z-0 pointer-events-auto"
            >
                <Canvas dpr={[1, 1.5]} performance={{ min: 0.5 }} camera={{ position: [0, 0, 16], fov: 70 }} style={{ background: "transparent", width: "100%", height: "100%" }}>
                    <Suspense fallback={null}>
                        <R3FScene scrollProgress={scrollProgress} />
                    </Suspense>
                </Canvas>
            </motion.div>

            <style>{`
                .data-stream { position:absolute; background:linear-gradient(90deg,transparent,#0ea5e9,transparent); height:1px; width:150px; opacity:0.6; filter:blur(0.5px); animation:stream 4s cubic-bezier(0.4,0,0.2,1) infinite; }
                .data-stream-red { position:absolute; background:linear-gradient(90deg,transparent,#ef4444,transparent); height:1px; width:120px; opacity:0.4; filter:blur(0.5px); animation:stream 5s cubic-bezier(0.4,0,0.2,1) infinite; }
                @keyframes stream { 0%{transform:translateX(-200%) translateY(0);opacity:0} 10%{opacity:1} 90%{opacity:1} 100%{transform:translateX(120vw) translateY(50px);opacity:0} }
            `}</style>

            <div className="data-stream" style={{ top: '20%', left: 0, animationDuration: '5s' }} />
            <div className="data-stream-red" style={{ top: '45%', left: 0, animationDelay: '1.5s', animationDuration: '6s' }} />
            <div className="data-stream" style={{ top: '65%', left: 0, animationDelay: '2s', animationDuration: '4s' }} />
            <div className="data-stream" style={{ top: '35%', right: 0, animationDelay: '1s', animationDirection: 'reverse', animationDuration: '6s' }} />



            <div
                className="relative z-10 w-full min-h-[100vh] flex flex-col items-center justify-between pt-44 pb-12 pointer-events-none"
                style={{
                    filter: `blur(${scrollProgress * 4}px)`,
                    opacity: 1 - scrollProgress * 0.5,
                    transition: "filter 0.1s, opacity 0.1s",
                }}
            >
                {/* TOP: Logo + Tagline — moved down, bigger, tagline close */}
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", textAlign: "center" }}>
                    <img
                        src="/images/promo/logo-codingssok.png"
                        alt="코딩쏙"
                        style={{
                            height: "clamp(100px, 16vw, 220px)",
                            objectFit: "contain",
                            animation: "logoFlip 1.2s cubic-bezier(0.16,1,0.3,1) both",
                            filter: "drop-shadow(0 4px 20px rgba(14,165,233,0.2))",
                        }}
                    />
                    <p style={{ fontSize: "clamp(16px, 2.5vw, 24px)", fontWeight: 500, color: "#475569", letterSpacing: "0.05em", textShadow: "0 0 20px rgba(255,255,255,0.9), 0 0 40px rgba(255,255,255,0.6)" }}>머리에 쏙쏙 들어오는 코딩교육</p>
                </div>

                {/* SPACER — sphere visible here, push text far below */}
                <div style={{ minHeight: "55vh" }} />

                {/* BOTTOM: Text effects with mouse parallax */}
                <MouseParallaxText>
                    <div style={{
                        display: "flex", flexDirection: "column", alignItems: "center", gap: "20px", textAlign: "center", maxWidth: "1100px", padding: "24px 32px",
                        background: "rgba(255,255,255,0.7)",
                        backdropFilter: "blur(12px)",
                        WebkitBackdropFilter: "blur(12px)",
                        borderRadius: "24px",
                        border: "1px solid rgba(255,255,255,0.5)",
                    }}>
                        {/* Decorative accent line */}
                        <div style={{ display: "flex", alignItems: "center", gap: "12px", opacity: 0.6 }}>
                            <div style={{ width: "40px", height: "1px", background: "linear-gradient(90deg, transparent, #0ea5e9)" }} />
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 8px #0ea5e9" }} />
                            <span style={{ fontSize: "11px", fontWeight: 700, letterSpacing: "0.3em", color: "#0ea5e9", textTransform: "uppercase" as const }}>Codingssok Academy</span>
                            <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#0ea5e9", boxShadow: "0 0 8px #0ea5e9" }} />
                            <div style={{ width: "40px", height: "1px", background: "linear-gradient(270deg, transparent, #0ea5e9)" }} />
                        </div>

                        <GlitchDecode text="AI 시대, 진짜 코딩을 배우세요" delay={800} />

                        <StaggerText text="Think → Code → Create → Launch" delay={2000} />

                        {/* Brief description */}
                        <p style={{
                            fontSize: "clamp(14px, 1.8vw, 18px)",
                            color: "#64748b",
                            lineHeight: 1.7,
                            maxWidth: "600px",
                            opacity: 0.8,
                            animation: "fadeSlideUp 1s ease 2.5s both",
                        }}>
                            단순 암기가 아닌, <span style={{ color: "#0ea5e9", fontWeight: 600 }}>AI와 함께 사고하는 코딩</span>을<br />
                            기초부터 실전 프로젝트까지 체계적으로 배워보세요.
                        </p>

                        <TypeWriter lines={[
                            "const future = await learn('coding');",
                            "student.skills.push('React', 'AI', 'Web3');",
                            "console.log('Welcome to 코딩쏙! 🚀');",
                        ]} delay={3000} />

                        {/* CTA hint */}
                        <div style={{
                            display: "flex", gap: "8px", alignItems: "center",
                            animation: "fadeSlideUp 1s ease 4s both",
                            opacity: 0.5,
                        }}>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 10l3 3 3-3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                            <span style={{ fontSize: "12px", color: "#94a3b8", letterSpacing: "0.1em" }}>SCROLL TO EXPLORE</span>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M8 3v10M5 10l3 3 3-3" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
                        </div>
                    </div>
                </MouseParallaxText>
            </div>

            <style>{`
                @keyframes logoFlip {
                    0% { transform: perspective(600px) rotateY(-90deg) scale(0.5); opacity: 0; }
                    60% { transform: perspective(600px) rotateY(10deg) scale(1.05); opacity: 1; }
                    100% { transform: perspective(600px) rotateY(0deg) scale(1); opacity: 1; }
                }
                @keyframes blink { 50% { opacity: 0; } }
                @keyframes fadeSlideUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </section>
    );
}
