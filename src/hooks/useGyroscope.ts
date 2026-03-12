"use client";

import { useState, useEffect, useCallback, useRef } from "react";

interface DeviceOrientationEventiOS extends DeviceOrientationEvent {
    requestPermission?: () => Promise<"granted" | "denied">;
}
declare const DeviceOrientationEvent: {
    new (type: string, eventInitDict?: DeviceOrientationEventInit): DeviceOrientationEvent;
    prototype: DeviceOrientationEvent;
    requestPermission?: () => Promise<"granted" | "denied">;
};

/**
 * useGyroscope — 모바일 자이로스코프 + 햅틱 피드백
 * 
 * - DeviceOrientationEvent → CSS perspective tilt
 * - navigator.vibrate → 코스 완료/포탈 진입 시 진동
 * - 자이로 없는 환경에서는 마우스 기반 패럴렉스 폴백
 */

interface GyroscopeState {
    /** X축 기울기 (화면 좌우, -1~1 정규화) */
    tiltX: number;
    /** Y축 기울기 (화면 상하, -1~1 정규화) */
    tiltY: number;
    /** 자이로 사용 가능 여부 */
    isGyroAvailable: boolean;
    /** CSS transform string for easy use */
    transform: string;
    /** 햅틱 진동 트리거 */
    vibrate: (pattern?: number | number[]) => void;
}

interface UseGyroscopeOptions {
    /** 최대 기울기 각도 (deg), 기본 15 */
    maxTilt?: number;
    /** 감도 (0-1), 기본 0.3 */
    sensitivity?: number;
    /** 비활성화 */
    disabled?: boolean;
}

export default function useGyroscope(options: UseGyroscopeOptions = {}): GyroscopeState {
    const { maxTilt = 15, sensitivity = 0.3, disabled = false } = options;
    const [tiltX, setTiltX] = useState(0);
    const [tiltY, setTiltY] = useState(0);
    const [isGyroAvailable, setIsGyroAvailable] = useState(false);
    const targetRef = useRef({ x: 0, y: 0 });
    const currentRef = useRef({ x: 0, y: 0 });
    const frameRef = useRef<number>(0);

    // Smooth lerp animation loop
    useEffect(() => {
        if (disabled) return;

        const animate = () => {
            currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.08;
            currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.08;

            const newX = Math.round(currentRef.current.x * 1000) / 1000;
            const newY = Math.round(currentRef.current.y * 1000) / 1000;

            setTiltX(newX);
            setTiltY(newY);

            frameRef.current = requestAnimationFrame(animate);
        };
        frameRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(frameRef.current);
    }, [disabled]);

    // Try gyroscope first
    useEffect(() => {
        if (disabled) return;
        if (typeof window === "undefined") return;

        let permissionGranted = false;

        const handleOrientation = (e: DeviceOrientationEvent) => {
            if (!permissionGranted) {
                setIsGyroAvailable(true);
                permissionGranted = true;
            }
            const beta = e.beta ?? 0;   // -180 ~ 180 (front-back tilt)
            const gamma = e.gamma ?? 0;  // -90 ~ 90 (left-right tilt)

            // Normalize to -1 ~ 1
            targetRef.current.x = Math.max(-1, Math.min(1, (gamma / 45) * sensitivity));
            targetRef.current.y = Math.max(-1, Math.min(1, ((beta - 45) / 45) * sensitivity));
        };

        // iOS 13+ requires permission
        const requestPermission = async () => {
            if (typeof DeviceOrientationEvent.requestPermission === "function") {
                try {
                    const perm = await DeviceOrientationEvent.requestPermission();
                    if (perm === "granted") {
                        window.addEventListener("deviceorientation", handleOrientation);
                    }
                } catch {
                    // Fallback to mouse
                }
            } else {
                window.addEventListener("deviceorientation", handleOrientation);
            }
        };

        // Check if DeviceOrientationEvent is available
        if ("DeviceOrientationEvent" in window) {
            requestPermission();
        }

        return () => {
            window.removeEventListener("deviceorientation", handleOrientation);
        };
    }, [disabled, sensitivity]);

    // Mouse fallback for desktop
    useEffect(() => {
        if (disabled || isGyroAvailable) return;
        if (typeof window === "undefined") return;

        const handleMouse = (e: MouseEvent) => {
            const nx = (e.clientX / window.innerWidth - 0.5) * 2; // -1 ~ 1
            const ny = (e.clientY / window.innerHeight - 0.5) * 2;
            targetRef.current.x = nx * sensitivity;
            targetRef.current.y = ny * sensitivity;
        };

        window.addEventListener("mousemove", handleMouse, { passive: true });
        return () => window.removeEventListener("mousemove", handleMouse);
    }, [disabled, isGyroAvailable, sensitivity]);

    // Haptic vibrate function
    const vibrate = useCallback((pattern: number | number[] = 50) => {
        if (typeof navigator !== "undefined" && navigator.vibrate) {
            try { navigator.vibrate(pattern); } catch {}
        }
    }, []);

    // Generate CSS transform
    const rotateY = tiltX * maxTilt;
    const rotateX = -tiltY * maxTilt;
    const transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg)`;

    return {
        tiltX,
        tiltY,
        isGyroAvailable,
        transform,
        vibrate,
    };
}
