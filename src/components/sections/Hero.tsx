"use client";

import { motion } from "framer-motion";
import { ChevronDown, Terminal, Sparkles } from "lucide-react";

// 코드 에디터에 표시될 Python 코드
const codeLines = [
    { num: 1, content: '<span class="syntax-keyword">class</span> <span class="syntax-class">CodingSSok</span>:' },
    { num: 2, content: '    <span class="syntax-string">"""AI 시대 코딩 교육 전문 학원"""</span>' },
    { num: 3, content: '' },
    { num: 4, content: '    <span class="syntax-keyword">def</span> <span class="syntax-function">__init__</span>(<span class="syntax-variable">self</span>):' },
    { num: 5, content: '        <span class="syntax-variable">self</span>.tracks = [<span class="syntax-string">"C언어"</span>, <span class="syntax-string">"Python"</span>, <span class="syntax-string">"Arduino"</span>]' },
    { num: 6, content: '        <span class="syntax-variable">self</span>.experience = <span class="syntax-number">10</span>  <span class="syntax-comment"># 년</span>' },
    { num: 7, content: '' },
    { num: 8, content: '    <span class="syntax-keyword">def</span> <span class="syntax-function">learn</span>(<span class="syntax-variable">self</span>, student):' },
    { num: 9, content: '        <span class="syntax-keyword">return</span> <span class="syntax-string">f"🚀 {student}님, 미래 개발자!"</span>' },
];

export default function Hero() {
    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-b from-[#0A0A0F] via-[#0A0A0F] to-[#12121A]">
                {/* Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(0, 102, 255, 0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0, 102, 255, 0.1) 1px, transparent 1px)
                        `,
                        backgroundSize: "60px 60px",
                    }}
                />

                {/* Glowing Orbs */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.25, 0.45, 0.25] }}
                    transition={{ duration: 5, repeat: Infinity }}
                    className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0066FF] rounded-full blur-[180px]"
                />
                <motion.div
                    animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.35, 0.2] }}
                    transition={{ duration: 6, repeat: Infinity }}
                    className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#00E5FF] rounded-full blur-[150px]"
                />
            </div>

            {/* Main Content */}
            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    {/* Left: Text Content */}
                    <div className="text-center lg:text-left">
                        {/* Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full mb-8"
                        >
                            <Terminal className="w-4 h-4 text-[#00E5FF]" aria-hidden="true" />
                            <span className="text-sm font-medium text-white/80">
                                IT 아빠들이 선택한 코딩교육
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.1] mb-6"
                        >
                            AI 시대 역량을
                            <br />
                            <span className="gradient-text">&apos;쏙&apos;</span> 채우는 학원
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="text-lg md:text-xl text-white/60 mb-10 max-w-lg mx-auto lg:mx-0 leading-relaxed"
                        >
                            C·Python 중심 <span className="text-[#00E5FF] font-semibold">텍스트코딩</span> 강화
                            <br />
                            프로젝트 · 공모전 · 자격증 완벽 대비
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                        >
                            <motion.a
                                href="#contact"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn btn-primary text-lg px-10 py-5 rounded-2xl font-bold shadow-lg shadow-[#0066FF]/25"
                            >
                                🎯 무료 상담 신청
                            </motion.a>
                            <motion.a
                                href="#curriculum"
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="btn btn-secondary text-lg px-10 py-5 rounded-2xl font-bold"
                            >
                                📚 커리큘럼 보기
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1 }}
                            className="mt-14 grid grid-cols-3 gap-8 max-w-md mx-auto lg:mx-0"
                        >
                            {[
                                { value: "5", label: "트랙 커리큘럼" },
                                { value: "10+", label: "년 교육경력" },
                                { value: "1:1", label: "맞춤 멘토링" },
                            ].map((stat, i) => (
                                <div key={i} className="text-center lg:text-left">
                                    <div className="text-3xl md:text-4xl font-black gradient-text tabular-nums">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-white/50 mt-1">{stat.label}</div>
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    {/* Right: Code Editor Visual */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                        className="mt-12 lg:mt-0"
                    >
                        <div className="code-editor">
                            {/* Editor Header */}
                            <div className="code-editor-header">
                                <div className="code-dot red" />
                                <div className="code-dot yellow" />
                                <div className="code-dot green" />
                                <span className="ml-4 text-sm text-white/50 font-mono">codingssok.py</span>
                            </div>

                            {/* Editor Body */}
                            <div className="code-editor-body">
                                {codeLines.map((line, i) => (
                                    <motion.div
                                        key={line.num}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.9 + i * 0.1 }}
                                        className="flex"
                                    >
                                        <span className="w-8 text-right text-white/30 select-none mr-6 font-mono">
                                            {line.num}
                                        </span>
                                        <span
                                            className="text-white/90"
                                            dangerouslySetInnerHTML={{ __html: line.content || "&nbsp;" }}
                                        />
                                    </motion.div>
                                ))}

                                {/* Typing Cursor */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2 }}
                                    className="flex mt-1"
                                >
                                    <span className="w-8 text-right text-white/30 select-none mr-6 font-mono">10</span>
                                    <span className="typing-cursor" />
                                </motion.div>
                            </div>
                        </div>

                        {/* Terminal Output */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 1.8 }}
                            className="terminal mt-4"
                        >
                            <div className="terminal-header">
                                <Sparkles className="w-4 h-4 text-[#10B981]" aria-hidden="true" />
                                <span className="text-sm text-white/50">실행 결과</span>
                            </div>
                            <div className="terminal-body">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 2.2 }}
                                >
                                    <p className="terminal-prompt text-[#58A6FF]">academy.learn(&quot;학생&quot;)</p>
                                    <p className="terminal-success mt-2 text-lg">→ 🚀 학생님, 미래 개발자!</p>
                                </motion.div>
                            </div>
                        </motion.div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.5 }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2"
            >
                <motion.div
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex flex-col items-center gap-2 text-white/40"
                >
                    <span className="text-xs tracking-widest uppercase">Scroll</span>
                    <ChevronDown className="w-5 h-5" aria-hidden="true" />
                </motion.div>
            </motion.div>
        </section>
    );
}
