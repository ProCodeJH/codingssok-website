"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { createClient } from "@/lib/supabase";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

/*
  코딩쏙 학습 플랫폼 — Coddy.tech 스타일 리디자인
  게이미피케이션 (XP, 스트릭, 레벨) + 다크/라이트 테마 + 프리미엄 에디터 UI
*/

interface Lesson {
    id: string;
    title: string;
    category: string;
    desc: string;
    code: string;
    xp: number;
    difficulty: "입문" | "기초" | "중급";
}

const lessons: Lesson[] = [
    {
        id: "html-basic",
        title: "HTML 기본 구조",
        category: "HTML",
        desc: "웹 페이지의 기본 뼈대를 만들어봐요",
        xp: 10,
        difficulty: "입문",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <title>나의 첫 웹페이지</title>\n</head>\n<body>\n    <h1>안녕하세요!</h1>\n    <p>코딩쏙에서 만든 첫 번째 웹페이지입니다.</p>\n    <p>여기에 내용을 추가해보세요.</p>\n</body>\n</html>`,
    },
    {
        id: "html-list",
        title: "목록과 링크",
        category: "HTML",
        desc: "리스트와 하이퍼링크를 만들어봐요",
        xp: 15,
        difficulty: "입문",
        code: `<!DOCTYPE html>\n<html>\n<body>\n    <h2>좋아하는 과일 목록</h2>\n    <ul>\n        <li>🍎 사과</li>\n        <li>🍊 오렌지</li>\n        <li>🍇 포도</li>\n    </ul>\n\n    <h2>유용한 사이트</h2>\n    <ol>\n        <li><a href="https://google.com">구글</a></li>\n        <li><a href="https://naver.com">네이버</a></li>\n    </ol>\n</body>\n</html>`,
    },
    {
        id: "html-table",
        title: "표 만들기",
        category: "HTML",
        desc: "표를 사용해 데이터를 정리해봐요",
        xp: 20,
        difficulty: "기초",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        table { border-collapse: collapse; width: 80%; margin: 20px auto; }\n        th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }\n        th { background: #EC5212; color: white; }\n        tr:nth-child(even) { background: #f9f9f9; }\n    </style>\n</head>\n<body>\n    <h2 style="text-align:center;">시간표</h2>\n    <table>\n        <tr><th>요일</th><th>과목</th><th>시간</th></tr>\n        <tr><td>월</td><td>C언어</td><td>4:00-5:30</td></tr>\n        <tr><td>수</td><td>HTML/CSS</td><td>4:00-5:30</td></tr>\n        <tr><td>금</td><td>알고리즘</td><td>4:00-5:30</td></tr>\n    </table>\n</body>\n</html>`,
    },
    {
        id: "css-basic",
        title: "CSS 스타일링 기초",
        category: "CSS",
        desc: "색상, 폰트, 배경으로 꾸며봐요",
        xp: 15,
        difficulty: "입문",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body {\n            font-family: Arial, sans-serif;\n            background: #fdfaf5;\n            margin: 40px;\n        }\n        h1 {\n            color: #EC5212;\n            border-bottom: 3px solid #FFD37D;\n            padding-bottom: 10px;\n        }\n        .card {\n            background: white;\n            border-radius: 12px;\n            padding: 24px;\n            box-shadow: 0 4px 12px rgba(0,0,0,0.1);\n            max-width: 400px;\n        }\n        .tag {\n            display: inline-block;\n            background: #77C6B3;\n            color: white;\n            padding: 4px 12px;\n            border-radius: 20px;\n            font-size: 14px;\n        }\n    </style>\n</head>\n<body>\n    <h1>CSS 스타일링 연습</h1>\n    <div class="card">\n        <h2>나의 프로필</h2>\n        <p>이름: 코딩쏙 학생</p>\n        <span class="tag">초급</span>\n    </div>\n</body>\n</html>`,
    },
    {
        id: "css-flexbox",
        title: "Flexbox 레이아웃",
        category: "CSS",
        desc: "요소를 자유롭게 배치해봐요",
        xp: 25,
        difficulty: "기초",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: sans-serif; margin: 20px; background: #f5f5f5; }\n        .container {\n            display: flex;\n            gap: 16px;\n            flex-wrap: wrap;\n            justify-content: center;\n        }\n        .box {\n            width: 150px;\n            height: 150px;\n            border-radius: 16px;\n            display: flex;\n            align-items: center;\n            justify-content: center;\n            font-size: 40px;\n            color: white;\n            font-weight: bold;\n        }\n    </style>\n</head>\n<body>\n    <h2 style="text-align:center;">Flexbox 갤러리</h2>\n    <div class="container">\n        <div class="box" style="background:#EC5212;">🎨</div>\n        <div class="box" style="background:#77C6B3;">🎵</div>\n        <div class="box" style="background:#70A2E1;">📚</div>\n        <div class="box" style="background:#FFD37D;">⭐</div>\n    </div>\n</body>\n</html>`,
    },
    {
        id: "css-animation",
        title: "CSS 애니메이션",
        category: "CSS",
        desc: "움직이는 웹페이지를 만들어봐요",
        xp: 30,
        difficulty: "중급",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: sans-serif; text-align: center; background: #0d1117; color: white; }\n        .ball {\n            width: 60px; height: 60px;\n            background: #EC5212;\n            border-radius: 50%;\n            margin: 40px auto;\n            animation: bounce 1s ease infinite alternate;\n        }\n        @keyframes bounce {\n            from { transform: translateY(0); }\n            to { transform: translateY(-100px); }\n        }\n        .spin {\n            width: 80px; height: 80px;\n            border: 4px solid #333;\n            border-top: 4px solid #77C6B3;\n            border-radius: 50%;\n            margin: 30px auto;\n            animation: spin 1s linear infinite;\n        }\n        @keyframes spin {\n            to { transform: rotate(360deg); }\n        }\n        h1 { animation: fadeIn 2s ease; }\n        @keyframes fadeIn {\n            from { opacity: 0; transform: translateY(-20px); }\n            to { opacity: 1; transform: translateY(0); }\n        }\n    </style>\n</head>\n<body>\n    <h1>✨ CSS 애니메이션</h1>\n    <div class="ball"></div>\n    <p>통통 튀는 공</p>\n    <div class="spin"></div>\n    <p>로딩 스피너</p>\n</body>\n</html>`,
    },
    {
        id: "js-basic",
        title: "JavaScript 기초",
        category: "JS",
        desc: "버튼 클릭으로 웹 페이지를 제어해봐요",
        xp: 20,
        difficulty: "기초",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: sans-serif; margin: 40px; background: #fdfaf5; }\n        button {\n            background: #EC5212; color: white; border: none;\n            padding: 12px 24px; border-radius: 8px; font-size: 16px;\n            cursor: pointer; margin: 8px;\n        }\n        button:hover { opacity: 0.8; }\n        #result {\n            margin-top: 20px; padding: 20px;\n            background: white; border-radius: 12px;\n            box-shadow: 0 2px 8px rgba(0,0,0,0.1);\n            font-size: 18px; min-height: 60px;\n        }\n    </style>\n</head>\n<body>\n    <h2>🎮 JavaScript 인터랙션</h2>\n    <button onclick="sayHello()">인사하기</button>\n    <button onclick="random()">랜덤 숫자</button>\n    <button onclick="changeColor()">색상 변경</button>\n    <div id="result">버튼을 클릭해보세요!</div>\n\n    <script>\n        function sayHello() {\n            document.getElementById('result').textContent = '안녕하세요! 반갑습니다 🌸';\n        }\n        function random() {\n            const num = Math.floor(Math.random() * 100) + 1;\n            document.getElementById('result').textContent = '🎲 랜덤 숫자: ' + num;\n        }\n        function changeColor() {\n            const colors = ['#EC5212', '#77C6B3', '#70A2E1', '#FFD37D'];\n            const pick = colors[Math.floor(Math.random() * colors.length)];\n            document.getElementById('result').style.background = pick;\n            document.getElementById('result').style.color = 'white';\n            document.getElementById('result').textContent = '🎨 색상: ' + pick;\n        }\n    </script>\n</body>\n</html>`,
    },
    {
        id: "js-counter",
        title: "카운터 만들기",
        category: "JS",
        desc: "+/- 버튼이 있는 카운터를 만들어봐요",
        xp: 25,
        difficulty: "중급",
        code: `<!DOCTYPE html>\n<html>\n<head>\n    <style>\n        body { font-family: sans-serif; display: flex; justify-content: center; align-items: center; min-height: 100vh; background: linear-gradient(135deg, #fdfaf5, #fff5eb); margin: 0; }\n        .counter {\n            text-align: center; background: white; padding: 40px 60px;\n            border-radius: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.1);\n        }\n        .count { font-size: 80px; font-weight: 800; color: #EC5212; margin: 20px 0; }\n        .btn {\n            width: 60px; height: 60px; border-radius: 50%; border: none;\n            font-size: 28px; cursor: pointer; margin: 0 10px;\n            transition: transform 0.2s;\n        }\n        .btn:hover { transform: scale(1.1); }\n        .btn-plus { background: #EC5212; color: white; }\n        .btn-minus { background: #f5f5f5; color: #333; }\n        .btn-reset { background: none; border: 1px solid #ddd; font-size: 14px; width: auto; height: auto; padding: 8px 16px; border-radius: 8px; margin-top: 16px; cursor: pointer; }\n    </style>\n</head>\n<body>\n    <div class="counter">\n        <h2>카운터</h2>\n        <div class="count" id="count">0</div>\n        <button class="btn btn-minus" onclick="change(-1)">−</button>\n        <button class="btn btn-plus" onclick="change(1)">+</button>\n        <br>\n        <button class="btn-reset" onclick="reset()">초기화</button>\n    </div>\n    <script>\n        let count = 0;\n        function change(n) {\n            count += n;\n            document.getElementById('count').textContent = count;\n        }\n        function reset() { count = 0; document.getElementById('count').textContent = 0; }\n    </script>\n</body>\n</html>`,
    },
];

const categories = ["전체", "HTML", "CSS", "JS"];
const catColors: Record<string, string> = {
    HTML: "#E85A18",
    CSS: "#29ABE2",
    JS: "#FCAD00",
};
const diffColors: Record<string, string> = {
    "입문": "#05B20C",
    "기초": "#29ABE2",
    "중급": "#cf7f26",
};

export default function LearningPage() {
    const [selectedLesson, setSelectedLesson] = useState(lessons[0]);
    const [code, setCode] = useState(lessons[0].code);
    const [userId, setUserId] = useState<string | null>(null);
    const [completedLessons, setCompletedLessons] = useState<string[]>([]);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [filterCat, setFilterCat] = useState("전체");
    const [layout, setLayout] = useState<"row" | "col">("row");
    const [darkMode, setDarkMode] = useState(false);
    const [showXpToast, setShowXpToast] = useState(false);
    const [earnedXp, setEarnedXp] = useState(0);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const supabase = createClient();

    // Theme colors
    // 코딩쏙 브랜드 테마: 베이지 + 오렌지
    const t = darkMode
        ? {
            bgPrimary: "#2a2420",
            bgSecondary: "#332e28",
            bgCard: "#3a342d",
            bgEditor: "#1e1c1a",
            textPrimary: "rgba(255,255,255,0.87)",
            textSecondary: "rgba(255,255,255,0.5)",
            border: "#4a4038",
            hover: "#3e3830",
            accent: "#EC5212",
            headerBg: "rgba(42,36,32,0.95)",
        }
        : {
            bgPrimary: "#FDFAF5",
            bgSecondary: "#fff",
            bgCard: "#fff",
            bgEditor: "#faf8f5",
            textPrimary: "#383030",
            textSecondary: "#707070",
            border: "#e8e2d9",
            hover: "#f6f0e5",
            accent: "#EC5212",
            headerBg: "rgba(253,250,245,0.92)",
        };

    useEffect(() => {
        const check = () => setLayout(window.innerWidth < 768 ? "col" : "row");
        check();
        window.addEventListener("resize", check);
        return () => window.removeEventListener("resize", check);
    }, []);

    useEffect(() => {
        supabase.auth.getUser().then(({ data }) => {
            if (!data.user) { window.location.href = "/login"; return; }
            setUserId(data.user.id);
        });
    }, [supabase]);

    const fetchCompleted = useCallback(async () => {
        if (!userId) return;
        try {
            const { data } = await supabase.from("learning_progress").select("lesson_id")
                .eq("user_id", userId).eq("subject", "html-css").eq("completed", true);
            setCompletedLessons((data || []).map(d => d.lesson_id));
        } catch (err) { console.error(err); }
    }, [userId, supabase]);

    useEffect(() => { if (userId) fetchCompleted(); }, [userId, fetchCompleted]);

    const updatePreview = useCallback(() => {
        if (!iframeRef.current) return;
        const doc = iframeRef.current.contentDocument;
        if (doc) { doc.open(); doc.write(code); doc.close(); }
    }, [code]);

    useEffect(() => { updatePreview(); }, [code, updatePreview]);

    const selectLesson = (lesson: Lesson) => {
        setSelectedLesson(lesson);
        setCode(lesson.code);
        setSidebarOpen(false);
    };

    const markComplete = async () => {
        if (!userId) return;
        const exists = completedLessons.includes(selectedLesson.id);
        if (exists) return;
        try {
            await supabase.from("learning_progress").upsert({
                user_id: userId, subject: "html-css", lesson_id: selectedLesson.id, completed: true,
            }, { onConflict: "user_id,subject,lesson_id" });
            setCompletedLessons([...completedLessons, selectedLesson.id]);
            setEarnedXp(selectedLesson.xp);
            setShowXpToast(true);
            setTimeout(() => setShowXpToast(false), 2500);
        } catch (err) { console.error(err); }
    };

    const totalXp = completedLessons.reduce((sum, id) => {
        const l = lessons.find(les => les.id === id);
        return sum + (l?.xp || 0);
    }, 0);
    const level = Math.floor(totalXp / 50) + 1;
    const xpToNext = 50 - (totalXp % 50);
    const progressPercent = lessons.length > 0 ? Math.round((completedLessons.length / lessons.length) * 100) : 0;
    const filtered = filterCat === "전체" ? lessons : lessons.filter(l => l.category === filterCat);
    const streak = completedLessons.length; // simplified streak

    return (
        <div style={{ minHeight: "100vh", background: t.bgPrimary, display: "flex", flexDirection: "column", fontFamily: "'Pretendard', -apple-system, system-ui, sans-serif", color: t.textPrimary, transition: "all 0.3s" }}>

            {/* ═══ Top Bar ═══ */}
            <motion.header
                initial={{ y: -10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                style={{
                    background: t.headerBg, backdropFilter: "blur(20px)",
                    borderBottom: `1px solid ${t.border}`,
                    padding: "0 clamp(12px, 2vw, 24px)",
                    height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
                    position: "sticky", top: 0, zIndex: 50,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {layout === "col" && (
                        <button onClick={() => setSidebarOpen(!sidebarOpen)} style={{
                            background: "none", border: "none", fontSize: 20, cursor: "pointer", color: t.textPrimary, padding: 4,
                        }}>☰</button>
                    )}
                    <Link href="/dashboard" style={{ textDecoration: "none", color: t.accent, fontSize: 13, fontWeight: 600 }}>
                        ← 대시보드
                    </Link>
                    <span style={{ color: t.border }}>|</span>
                    <h1 style={{ fontSize: 15, fontWeight: 700, color: t.textPrimary, margin: 0 }}>
                        🌐 웹 개발 학습
                    </h1>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                    {/* XP Badge */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 6,
                        background: darkMode ? "rgba(255,211,125,0.15)" : "rgba(255,211,125,0.2)",
                        padding: "4px 12px", borderRadius: 20,
                    }}>
                        <span style={{ fontSize: 14 }}>⚡</span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#D4940A", fontFamily: "monospace" }}>{totalXp} XP</span>
                    </div>

                    {/* Streak */}
                    <div style={{
                        display: "flex", alignItems: "center", gap: 4,
                        background: darkMode ? "rgba(232,90,24,0.12)" : "rgba(232,90,24,0.08)",
                        padding: "4px 10px", borderRadius: 20,
                    }}>
                        <motion.span animate={{ scale: [1, 1.15, 1] }} transition={{ duration: 2, repeat: Infinity }} style={{ fontSize: 14 }}>🔥</motion.span>
                        <span style={{ fontSize: 13, fontWeight: 700, color: "#E85A18" }}>{streak}</span>
                    </div>

                    {/* Level */}
                    <div style={{
                        background: t.accent, color: "#fff",
                        padding: "4px 10px", borderRadius: 20, fontSize: 11, fontWeight: 700,
                    }}>
                        Lv.{level}
                    </div>

                    {/* Dark/Light Toggle */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setDarkMode(!darkMode)}
                        style={{
                            background: "none", border: `1.5px solid ${t.border}`,
                            borderRadius: 999, width: 32, height: 32, cursor: "pointer",
                            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16,
                        }}
                    >
                        {darkMode ? "☀️" : "🌙"}
                    </motion.button>
                </div>
            </motion.header>

            {/* ═══ Level Progress Bar ═══ */}
            <div style={{
                height: 3, background: t.bgSecondary, position: "relative",
            }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${((totalXp % 50) / 50) * 100}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    style={{
                        height: "100%",
                        background: `linear-gradient(90deg, ${t.accent}, #FF6B35)`,
                        borderRadius: "0 4px 4px 0",
                    }}
                />
            </div>

            <div style={{ flex: 1, display: "flex", flexDirection: "row", position: "relative", overflow: "hidden" }}>

                {/* ═══ Sidebar ═══ */}
                <AnimatePresence>
                    {(layout === "row" || sidebarOpen) && (
                        <>
                            {layout === "col" && sidebarOpen && (
                                <motion.div
                                    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                                    onClick={() => setSidebarOpen(false)}
                                    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 40 }}
                                />
                            )}
                            <motion.aside
                                initial={layout === "col" ? { x: -300 } : false}
                                animate={{ x: 0 }}
                                exit={layout === "col" ? { x: -300 } : undefined}
                                transition={{ type: "spring", damping: 25 }}
                                style={{
                                    width: layout === "col" ? 300 : 280,
                                    background: t.bgSecondary,
                                    borderRight: `1px solid ${t.border}`,
                                    overflowY: "auto",
                                    position: layout === "col" ? "fixed" : "relative",
                                    top: layout === "col" ? 0 : "auto",
                                    left: 0, bottom: 0, zIndex: 45,
                                    boxShadow: layout === "col" ? "4px 0 24px rgba(0,0,0,0.2)" : "none",
                                    display: "flex", flexDirection: "column",
                                }}
                            >
                                {/* Sidebar Header */}
                                <div style={{ padding: "16px 16px 12px", borderBottom: `1px solid ${t.border}` }}>
                                    {layout === "col" && (
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                                            <span style={{ fontWeight: 700, fontSize: 15 }}>📖 레슨 목록</span>
                                            <button onClick={() => setSidebarOpen(false)} style={{
                                                background: "none", border: "none", fontSize: 18, cursor: "pointer", color: t.textSecondary
                                            }}>✕</button>
                                        </div>
                                    )}

                                    {/* Progress Card */}
                                    <div style={{
                                        background: darkMode ? "rgba(236,82,18,0.08)" : "rgba(236,82,18,0.06)",
                                        borderRadius: 12, padding: 14,
                                    }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                                            <span style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary }}>진행률</span>
                                            <span style={{ fontSize: 12, fontWeight: 700, color: t.accent }}>{progressPercent}%</span>
                                        </div>
                                        <div style={{ height: 6, background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)", borderRadius: 999, overflow: "hidden" }}>
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${progressPercent}%` }}
                                                transition={{ duration: 1.2, ease: "easeOut" }}
                                                style={{ height: "100%", background: `linear-gradient(90deg, #77C6B3, #EC5212)`, borderRadius: 999 }}
                                            />
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 11, color: t.textSecondary }}>
                                            <span>{completedLessons.length}/{lessons.length} 완료</span>
                                            <span>다음 레벨까지 {xpToNext} XP</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Category Filter */}
                                <div style={{ padding: "12px 16px 8px", display: "flex", gap: 6, flexWrap: "wrap" }}>
                                    {categories.map(cat => (
                                        <button key={cat} onClick={() => setFilterCat(cat)} style={{
                                            padding: "5px 14px", borderRadius: 20, border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer",
                                            background: filterCat === cat
                                                ? (cat === "전체" ? t.accent : catColors[cat] || t.accent)
                                                : darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)",
                                            color: filterCat === cat ? "#fff" : t.textSecondary,
                                            transition: "all 0.2s",
                                        }}>
                                            {cat}
                                        </button>
                                    ))}
                                </div>

                                {/* Lesson List */}
                                <div style={{ flex: 1, overflowY: "auto", padding: "4px 12px 16px" }}>
                                    {filtered.map((lesson, i) => {
                                        const done = completedLessons.includes(lesson.id);
                                        const active = selectedLesson.id === lesson.id;
                                        return (
                                            <motion.button
                                                key={lesson.id}
                                                initial={{ opacity: 0, x: -15 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: i * 0.05 }}
                                                onClick={() => selectLesson(lesson)}
                                                style={{
                                                    width: "100%", textAlign: "left", padding: "12px 14px", border: "none",
                                                    borderRadius: 12, marginBottom: 4, cursor: "pointer",
                                                    background: active
                                                        ? darkMode ? "rgba(236,82,18,0.12)" : "rgba(236,82,18,0.06)"
                                                        : "transparent",
                                                    borderLeft: active ? `3px solid ${t.accent}` : "3px solid transparent",
                                                    transition: "all 0.2s",
                                                    display: "block",
                                                    color: t.textPrimary,
                                                }}
                                            >
                                                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                                                    <span style={{ fontSize: 14 }}>{done ? "✅" : active ? "▶️" : "📄"}</span>
                                                    <span style={{
                                                        fontSize: 9, fontWeight: 700, padding: "2px 8px", borderRadius: 4,
                                                        background: `${catColors[lesson.category]}20`,
                                                        color: catColors[lesson.category],
                                                    }}>{lesson.category}</span>
                                                    <span style={{
                                                        fontSize: 9, fontWeight: 600, padding: "2px 6px", borderRadius: 4,
                                                        background: `${diffColors[lesson.difficulty]}15`,
                                                        color: diffColors[lesson.difficulty],
                                                    }}>{lesson.difficulty}</span>
                                                </div>
                                                <span style={{ fontSize: 13, fontWeight: active ? 700 : 500, color: active ? t.accent : t.textPrimary, display: "block" }}>
                                                    {lesson.title}
                                                </span>
                                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 4 }}>
                                                    <span style={{ fontSize: 11, color: t.textSecondary }}>{lesson.desc}</span>
                                                    <span style={{ fontSize: 10, color: "#FCAD00", fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>+{lesson.xp} XP</span>
                                                </div>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </motion.aside>
                        </>
                    )}
                </AnimatePresence>

                {/* ═══ Editor + Preview ═══ */}
                <div style={{ flex: 1, display: "grid", gridTemplateColumns: layout === "col" ? "1fr" : "1fr 1fr", gridTemplateRows: layout === "col" ? "1fr 1fr" : "1fr" }}>

                    {/* Code Editor */}
                    <div style={{ display: "flex", flexDirection: "column", borderRight: layout === "col" ? "none" : `1px solid ${t.border}`, borderBottom: layout === "col" ? `1px solid ${t.border}` : "none" }}>
                        {/* Editor Tab Bar */}
                        <div style={{
                            padding: "0 16px", height: 40, background: t.bgCard,
                            borderBottom: `1px solid ${t.border}`,
                            display: "flex", justifyContent: "space-between", alignItems: "center",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                {/* File tab */}
                                <div style={{
                                    display: "flex", alignItems: "center", gap: 6,
                                    background: t.bgEditor, padding: "4px 14px", borderRadius: "8px 8px 0 0",
                                    borderBottom: `2px solid ${t.accent}`, fontSize: 12, fontWeight: 600, color: t.textPrimary,
                                }}>
                                    <span style={{ color: catColors[selectedLesson.category] || "#999" }}>●</span>
                                    {selectedLesson.title}
                                    <span style={{ fontSize: 10, color: t.textSecondary }}>.html</span>
                                </div>
                            </div>
                            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                                <button onClick={() => setCode(selectedLesson.code)} style={{
                                    background: "none", border: `1px solid ${t.border}`, borderRadius: 6,
                                    padding: "4px 10px", fontSize: 11, cursor: "pointer", color: t.textSecondary,
                                    fontWeight: 600,
                                }}>
                                    ↺ 리셋
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={markComplete}
                                    disabled={completedLessons.includes(selectedLesson.id)}
                                    style={{
                                        padding: "5px 16px", borderRadius: 8, border: "none",
                                        background: completedLessons.includes(selectedLesson.id) ? "#05B20C" : t.accent,
                                        color: "#fff", fontSize: 11, fontWeight: 700,
                                        cursor: completedLessons.includes(selectedLesson.id) ? "default" : "pointer",
                                        boxShadow: completedLessons.includes(selectedLesson.id) ? "none" : `0 3px 0 0 ${darkMode ? "#b33d0d" : "#c44410"}`,
                                        transition: "all 0.2s",
                                    }}
                                >
                                    {completedLessons.includes(selectedLesson.id) ? "✅ 완료됨" : "✓ 완료하기"}
                                </motion.button>
                            </div>
                        </div>

                        {/* Line numbers + Code */}
                        <div style={{ flex: 1, display: "flex", overflow: "auto", background: t.bgEditor }}>
                            {/* Line numbers */}
                            <div style={{
                                padding: "16px 0", minWidth: 44, textAlign: "right",
                                fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                                fontSize: 13, lineHeight: "1.6", color: darkMode ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.2)",
                                userSelect: "none", borderRight: `1px solid ${t.border}`,
                                paddingRight: 12,
                            }}>
                                {code.split("\n").map((_, i) => (
                                    <div key={i}>{i + 1}</div>
                                ))}
                            </div>
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                spellCheck={false}
                                style={{
                                    flex: 1, padding: "16px", border: "none", background: "transparent",
                                    fontFamily: "'Fira Code', 'Consolas', 'Monaco', monospace",
                                    fontSize: 13, lineHeight: "1.6", resize: "none", outline: "none", tabSize: 2,
                                    color: t.textPrimary, caretColor: t.accent,
                                }}
                                onKeyDown={(e) => {
                                    if (e.key === "Tab") {
                                        e.preventDefault();
                                        const ta = e.target as HTMLTextAreaElement;
                                        const s = ta.selectionStart, end = ta.selectionEnd;
                                        setCode(code.substring(0, s) + "  " + code.substring(end));
                                        setTimeout(() => { ta.selectionStart = ta.selectionEnd = s + 2; }, 0);
                                    }
                                }}
                            />
                        </div>
                    </div>

                    {/* Preview */}
                    <div style={{ display: "flex", flexDirection: "column", background: t.bgCard }}>
                        <div style={{
                            height: 40, padding: "0 16px", background: t.bgCard,
                            borderBottom: `1px solid ${t.border}`,
                            display: "flex", alignItems: "center", justifyContent: "space-between",
                        }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <div style={{ display: "flex", gap: 5 }}>
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FF5F57" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#FFBD2E" }} />
                                    <span style={{ width: 10, height: 10, borderRadius: "50%", background: "#28C840" }} />
                                </div>
                                <span style={{ fontSize: 12, fontWeight: 600, color: t.textSecondary, marginLeft: 8 }}>
                                    미리보기
                                </span>
                            </div>
                            <span style={{ fontSize: 10, color: t.textSecondary, background: darkMode ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.04)", padding: "2px 8px", borderRadius: 4 }}>
                                localhost:3000
                            </span>
                        </div>
                        <iframe
                            ref={iframeRef}
                            style={{ flex: 1, border: "none", background: "#fff" }}
                            sandbox="allow-scripts"
                            title="Preview"
                        />
                    </div>
                </div>
            </div>

            {/* ═══ XP Toast ═══ */}
            <AnimatePresence>
                {showXpToast && (
                    <motion.div
                        initial={{ opacity: 0, y: 40, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.8 }}
                        style={{
                            position: "fixed", bottom: 32, left: "50%", transform: "translateX(-50%)",
                            background: "linear-gradient(135deg, #FCAD00, #E85A18)",
                            color: "#fff", padding: "12px 28px", borderRadius: 16,
                            fontWeight: 700, fontSize: 16, zIndex: 999,
                            boxShadow: "0 8px 32px rgba(252,173,0,0.4)",
                            display: "flex", alignItems: "center", gap: 10,
                        }}
                    >
                        <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 0.5 }}>⚡</motion.span>
                        +{earnedXp} XP 획득!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
