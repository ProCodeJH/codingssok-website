"use client";
import { useState } from "react";

interface TutorialStep {
    id: string; title: string; description: string; code: string; hint: string; expectedOutput?: string;
}

interface TutorialLesson {
    id: string; title: string; description: string; icon: string;
    difficulty: "beginner" | "intermediate" | "advanced"; steps: TutorialStep[];
}

const LESSONS: TutorialLesson[] = [
    {
        id: "1", title: "Hello, World!", description: "첫 C 프로그램 작성", icon: "", difficulty: "beginner",
        steps: [
            { id: "1-1", title: "printf 함수", description: "화면에 텍스트를 출력하는 printf 함수를 배워봅시다.", code: `#include <stdio.h>\n\nint main() {\n    printf("Hello, World!\\n");\n    return 0;\n}`, hint: "printf는 format의 약자입니다. \\n은 줄바꿈입니다.", expectedOutput: "Hello, World!" },
            { id: "1-2", title: "여러 줄 출력", description: "여러 printf를 사용하여 여러 줄을 출력해봅시다.", code: `#include <stdio.h>\n\nint main() {\n    printf("안녕하세요!\\n");\n    printf("C 언어를 배워봅시다!\\n");\n    return 0;\n}`, hint: "각 printf 뒤에 \\n을 붙이면 줄바꿈됩니다." },
        ]
    },
    {
        id: "2", title: "변수와 자료형", description: "int, float, char 등 자료형 이해", icon: "", difficulty: "beginner",
        steps: [
            { id: "2-1", title: "정수형 변수", description: "int 타입으로 정수를 저장합니다.", code: `#include <stdio.h>\n\nint main() {\n    int age = 25;\n    int year = 2024;\n    printf("나이: %d살\\n", age);\n    printf("연도: %d년\\n", year);\n    return 0;\n}`, hint: "%d는 정수를 출력하는 서식 지정자입니다." },
            { id: "2-2", title: "실수형과 문자", description: "float과 char 자료형을 사용합니다.", code: `#include <stdio.h>\n\nint main() {\n    float pi = 3.14;\n    char grade = 'A';\n    printf("원주율: %f\\n", pi);\n    printf("학점: %c\\n", grade);\n    return 0;\n}`, hint: "%f는 실수, %c는 문자를 출력합니다." },
        ]
    },
    {
        id: "3", title: "입력 받기", description: "scanf로 사용자 입력 처리", icon: "⌨", difficulty: "beginner",
        steps: [
            { id: "3-1", title: "scanf 함수", description: "키보드로부터 값을 입력받는 방법을 배웁니다.", code: `#include <stdio.h>\n\nint main() {\n    int num;\n    printf("숫자를 입력하세요: ");\n    scanf("%d", &num);\n    printf("입력한 숫자: %d\\n", num);\n    return 0;\n}`, hint: "scanf에서 & 기호를 빼먹지 마세요! 변수의 주소를 전달합니다." },
        ]
    },
    {
        id: "4", title: "조건문", description: "if-else로 분기 처리", icon: "⇄", difficulty: "beginner",
        steps: [
            { id: "4-1", title: "if-else 문", description: "조건에 따라 다른 코드를 실행합니다.", code: `#include <stdio.h>\n\nint main() {\n    int score = 85;\n    \n    if (score >= 90) {\n        printf("A 학점\\n");\n    } else if (score >= 80) {\n        printf("B 학점\\n");\n    } else {\n        printf("C 학점 이하\\n");\n    }\n    return 0;\n}`, hint: "조건식은 괄호 안에, 실행문은 중괄호 안에 넣습니다." },
        ]
    },
    {
        id: "5", title: "반복문", description: "for, while 루프", icon: "↻", difficulty: "intermediate",
        steps: [
            { id: "5-1", title: "for 반복문", description: "정해진 횟수만큼 반복합니다.", code: `#include <stdio.h>\n\nint main() {\n    for (int i = 1; i <= 5; i++) {\n        printf("%d번째 반복\\n", i);\n    }\n    return 0;\n}`, hint: "for(초기화; 조건; 증감) 형태입니다." },
            { id: "5-2", title: "while 반복문", description: "조건이 참인 동안 반복합니다.", code: `#include <stdio.h>\n\nint main() {\n    int count = 0;\n    while (count < 3) {\n        printf("count = %d\\n", count);\n        count++;\n    }\n    return 0;\n}`, hint: "무한 루프에 주의하세요! 종료 조건을 확인하세요." },
        ]
    },
    {
        id: "6", title: "배열", description: "여러 값을 하나의 변수로", icon: "≡", difficulty: "intermediate",
        steps: [
            { id: "6-1", title: "배열 선언과 사용", description: "같은 타입의 여러 값을 저장합니다.", code: `#include <stdio.h>\n\nint main() {\n    int scores[5] = {90, 85, 78, 92, 88};\n    int sum = 0;\n    \n    for (int i = 0; i < 5; i++) {\n        sum += scores[i];\n        printf("scores[%d] = %d\\n", i, scores[i]);\n    }\n    printf("평균: %d\\n", sum / 5);\n    return 0;\n}`, hint: "배열의 인덱스는 0부터 시작합니다." },
        ]
    },
    {
        id: "7", title: "함수", description: "코드를 재사용 가능한 단위로", icon: "", difficulty: "intermediate",
        steps: [
            { id: "7-1", title: "함수 정의와 호출", description: "기능을 함수로 분리합니다.", code: `#include <stdio.h>\n\nint add(int a, int b) {\n    return a + b;\n}\n\nvoid greet(char name[]) {\n    printf("안녕하세요, %s!\\n", name);\n}\n\nint main() {\n    int result = add(3, 5);\n    printf("3 + 5 = %d\\n", result);\n    greet("코딩쏙");\n    return 0;\n}`, hint: "반환값이 없으면 void, 있으면 해당 타입을 사용합니다." },
        ]
    },
    {
        id: "8", title: "포인터", description: "메모리 주소를 다루는 강력한 도구", icon: "◎", difficulty: "advanced",
        steps: [
            { id: "8-1", title: "포인터 기초", description: "변수의 메모리 주소를 다룹니다.", code: `#include <stdio.h>\n\nint main() {\n    int x = 42;\n    int *ptr = &x;\n    \n    printf("x의 값: %d\\n", x);\n    printf("x의 주소: %p\\n", (void*)&x);\n    printf("ptr이 가리키는 값: %d\\n", *ptr);\n    \n    *ptr = 100;  // 포인터를 통해 값 변경\n    printf("변경 후 x: %d\\n", x);\n    return 0;\n}`, hint: "&는 주소 연산자, *는 역참조 연산자입니다." },
        ]
    },
];

interface Props { isOpen: boolean; onClose: () => void; onLoadCode?: (code: string) => void }

export function TutorialMode({ isOpen, onClose, onLoadCode }: Props) {
    const [selLesson, setSelLesson] = useState<TutorialLesson | null>(null);
    const [stepIdx, setStepIdx] = useState(0);
    const [showHint, setShowHint] = useState(false);

    const diffColor = (d: string) => d === "beginner" ? "#22c55e" : d === "intermediate" ? "#f59e0b" : "#ef4444";

    if (!isOpen) return null;
    const border = "rgba(255,255,255,0.06)";

    return (
        <div style={{ height: "100%", display: "flex", flexDirection: "column", overflow: "hidden" }}>
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${border}`, background: "rgba(236,82,18,0.06)" }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}> 튜토리얼</span>
            </div>

            {selLesson ? (
                <div style={{ flex: 1, overflowY: "auto", padding: 14 }}>
                    <div onClick={() => { setSelLesson(null); setStepIdx(0); setShowHint(false); }} style={{ cursor: "pointer", fontSize: 12, color: "rgba(255,255,255,0.5)", marginBottom: 12 }}>← 목록으로</div>

                    <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{selLesson.icon} {selLesson.title}</h3>
                    <div style={{ fontSize: 11, color: "rgba(255,255,255,0.3)", marginBottom: 12 }}>Step {stepIdx + 1} / {selLesson.steps.length}</div>

                    {/* Progress */}
                    <div style={{ height: 3, background: "rgba(255,255,255,0.05)", borderRadius: 2, marginBottom: 16 }}>
                        <div style={{ height: "100%", width: `${((stepIdx + 1) / selLesson.steps.length) * 100}%`, background: "#EC5212", borderRadius: 2, transition: "width 0.3s" }} />
                    </div>

                    {(() => {
                        const step = selLesson.steps[stepIdx];
                        return (
                            <>
                                <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6 }}>{step.title}</h4>
                                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", lineHeight: 1.6, marginBottom: 12 }}>{step.description}</p>

                                {/* Code preview */}
                                <div style={{ padding: 12, background: "rgba(0,0,0,0.3)", borderRadius: 8, marginBottom: 12 }}>
                                    <pre style={{ fontFamily: "monospace", fontSize: 11, color: "#a5d6ff", margin: 0, whiteSpace: "pre-wrap", lineHeight: 1.6 }}>{step.code}</pre>
                                </div>

                                {step.expectedOutput && (
                                    <div style={{ padding: 8, background: "rgba(34,197,94,0.1)", borderRadius: 6, marginBottom: 12 }}>
                                        <div style={{ fontSize: 9, color: "rgba(255,255,255,0.3)", marginBottom: 2 }}>예상 출력</div>
                                        <div style={{ fontFamily: "monospace", fontSize: 11, color: "#86efac" }}>{step.expectedOutput}</div>
                                    </div>
                                )}

                                <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
                                    <button onClick={() => { onLoadCode?.(step.code); }} style={{ flex: 1, padding: 10, borderRadius: 8, border: "none", background: "#EC5212", color: "#fff", fontWeight: 700, fontSize: 12, cursor: "pointer" }}>에디터에 로드</button>
                                    <button onClick={() => setShowHint(!showHint)} style={{ padding: "10px 14px", borderRadius: 8, border: `1px solid ${border}`, background: "#252320", color: "#ccc", fontSize: 12, cursor: "pointer" }}></button>
                                </div>

                                {showHint && (
                                    <div style={{ padding: 10, background: "rgba(59,130,246,0.1)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: 8, fontSize: 12, color: "#93c5fd", marginBottom: 12 }}> {step.hint}</div>
                                )}

                                {/* Navigation */}
                                <div style={{ display: "flex", gap: 8, justifyContent: "space-between" }}>
                                    <button onClick={() => { setStepIdx(Math.max(0, stepIdx - 1)); setShowHint(false); }} disabled={stepIdx === 0} style={{ padding: "8px 16px", borderRadius: 6, border: `1px solid ${border}`, background: "transparent", color: stepIdx === 0 ? "#555" : "#ccc", fontSize: 11, cursor: stepIdx === 0 ? "default" : "pointer" }}>◀ 이전</button>
                                    <button onClick={() => { setStepIdx(Math.min(selLesson.steps.length - 1, stepIdx + 1)); setShowHint(false); }} disabled={stepIdx >= selLesson.steps.length - 1} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: stepIdx >= selLesson.steps.length - 1 ? "#333" : "#EC5212", color: "#fff", fontSize: 11, fontWeight: 700, cursor: stepIdx >= selLesson.steps.length - 1 ? "default" : "pointer" }}>다음 ▶</button>
                                </div>
                            </>
                        );
                    })()}
                </div>
            ) : (
                <div style={{ flex: 1, overflowY: "auto", padding: 12 }}>
                    {LESSONS.map(lesson => (
                        <div key={lesson.id} onClick={() => { setSelLesson(lesson); setStepIdx(0); setShowHint(false); }} style={{
                            display: "flex", alignItems: "center", gap: 10, padding: "12px 14px", background: "rgba(0,0,0,0.08)", border: `1px solid ${border}`, borderRadius: 10, marginBottom: 6, cursor: "pointer", transition: "transform 0.15s"
                        }}>
                            <span style={{ fontSize: 22 }}>{lesson.icon}</span>
                            <div style={{ flex: 1 }}>
                                <div style={{ fontSize: 13, fontWeight: 600 }}>{lesson.title}</div>
                                <div style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", marginTop: 2 }}>{lesson.description}</div>
                            </div>
                            <span style={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, background: `${diffColor(lesson.difficulty)}20`, color: diffColor(lesson.difficulty), fontWeight: 600 }}>{lesson.difficulty === "beginner" ? "초급" : lesson.difficulty === "intermediate" ? "중급" : "고급"}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
