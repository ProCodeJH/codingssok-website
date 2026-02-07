"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 2200);
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-white"
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                    {/* 배경 블러 블롭 */}
                    <div className="absolute inset-0 pointer-events-none">
                        <motion.div
                            className="absolute top-1/3 left-1/3 w-64 h-64 bg-blue-200/40 rounded-full blur-3xl"
                            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.6, 0.3] }}
                            transition={{ duration: 2, repeat: Infinity }}
                        />
                        <motion.div
                            className="absolute bottom-1/3 right-1/3 w-48 h-48 bg-cyan-200/40 rounded-full blur-3xl"
                            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.2, 0.4] }}
                            transition={{ duration: 2.5, repeat: Infinity }}
                        />
                    </div>

                    <div className="relative flex flex-col items-center gap-6">
                        {/* 로고 아이콘 */}
                        <motion.div
                            className="w-20 h-20 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center text-white text-3xl font-bold shadow-2xl shadow-blue-500/30"
                            initial={{ y: -40, opacity: 0, scale: 0.5, rotate: -10 }}
                            animate={{ y: 0, opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                        >
                            쏙
                        </motion.div>

                        {/* 텍스트 */}
                        <motion.div
                            className="text-center"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <h2 className="text-2xl font-bold text-gray-900">코딩쏙</h2>
                            <p className="text-sm text-gray-500 mt-1">AI 시대 역량을 &apos;쏙&apos; 채우는 코딩 교육</p>
                        </motion.div>

                        {/* 로딩 바 */}
                        <motion.div
                            className="w-48 h-1 rounded-full bg-gray-100 overflow-hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.8 }}
                        >
                            <motion.div
                                className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-500"
                                initial={{ width: "0%" }}
                                animate={{ width: "100%" }}
                                transition={{ delay: 0.9, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                            />
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
