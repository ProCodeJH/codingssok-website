"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

/* ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•??
   FAQ ??Cinematic Glass Ultra V3.1
   Aero-glass accordion Â· Depth-grid BG Â· 3D icons
   ?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•?â•??*/

const FAQ_ITEMS = [
    {
        question: "?˜í•™???½í•˜ë©?ì½”ë”©???´ë µì§€ ?Šë‚˜??",
        answer: "?„í? ê·¸ë ‡ì§€ ?ŠìŠµ?ˆë‹¤. ì½”ë”©?™ì˜ ì»¤ë¦¬?˜ëŸ¼?€ ?˜í•™ ?¤ë ¥ê³?ë¬´ê??˜ê²Œ ?¼ë¦¬???¬ê³ ?¥ì„ ê¸°ë¥´????ì´ˆì ??ë§ì¶”ê³??ˆìŠµ?ˆë‹¤. ?¤íˆ??ì½”ë”©???µí•´ ?˜í•™??ê°œë…???ì—°?¤ëŸ½ê²??´í•´?˜ê²Œ ?˜ëŠ” ê²½ìš°ê°€ ë§ìŠµ?ˆë‹¤. ë³€?? ë°˜ë³µë¬? ì¡°ê±´ë¬???ì½”ë”©??ê¸°ë³¸ ê°œë…???˜í•™???¬ê³ ??ê¸°ì´ˆê°€ ?©ë‹ˆ??",
        icon: "functions",
    },
    {
        question: "?€?™ë…„?¸ë° ?€?´í•‘???ë ¤??ê´œì°®?„ê¹Œ??",
        answer: "ë¬¼ë¡ ?…ë‹ˆ?? ?€?™ë…„ ?™ìƒ?¤ì? ë¸”ë¡ì½”ë”©ë¶€???œì‘?˜ì—¬ ë§ˆìš°???œë˜ê·¸ë§Œ?¼ë¡œ ?„ë¡œê·¸ë˜ë°?ê°œë…??ë°°ìš¸ ???ˆìŠµ?ˆë‹¤. ?€?´í•‘ ?ë„???ì—°?¤ëŸ½ê²??¥ìƒ?˜ë©°, ?ìŠ¤??ì½”ë”©?¼ë¡œ???„í™˜?€ ?„ì´??ì¤€ë¹??íƒœ??ë§ì¶° ?¨ê³„?ìœ¼ë¡?ì§„í–‰?©ë‹ˆ??",
        icon: "keyboard",
    },
    {
        question: "?¼ë“œë°±ì? ?´ë–»ê²?ì£¼ì‹œ?˜ìš”?",
        answer: "ë§??˜ì—… ???™ë?ëª¨ë‹˜ê»?ì¹´ì¹´?¤í†¡?¼ë¡œ ?˜ì—… ?´ìš©ê³??„ì´???™ìŠµ ?íƒœë¥??ì„¸??ë³´ê³ ?œë¦½?ˆë‹¤. ??1???¬ì¸µ ?™ìŠµ ë¦¬í¬?¸ë? ?œê³µ?˜ë©°, ë¶„ê¸°ë³„ë¡œ 1:1 ?™ë?ëª??ë‹´??ì§„í–‰?©ë‹ˆ?? ?„ì´???±ì¥ ê³¼ì •???¬ëª…?˜ê²Œ ê³µìœ ?©ë‹ˆ??",
        icon: "monitoring",
    },
    {
        question: "?˜ì—…?€ ?´ë–¤ ë°©ì‹?¼ë¡œ ì§„í–‰?˜ë‚˜??",
        answer: "1:4~1:6 ?Œìˆ˜?•ì˜ˆ ?€ë©??˜ì—…?¼ë¡œ, ?„ì´???˜ì???ë§ì¶˜ ê°œë³„ ì»¤ë¦¬?˜ëŸ¼???œê³µ?©ë‹ˆ?? 90ë¶??˜ì—… ì¤?ì²˜ìŒ 10ë¶„ì? ë³µìŠµ, 60ë¶„ì? ?ˆë¡œ???´ìš© ?¤ìŠµ, ë§ˆì?ë§?20ë¶„ì? ?ìœ  ?„ë¡œ?íŠ¸ ?œê°„?¼ë¡œ ?´ì˜?©ë‹ˆ?? ? ìƒ?˜ì´ ê°??„ì´ ?†ì—??ì§ì ‘ ì½”ë“œë¥??¨ê»˜ ?•ì¸?˜ë©° ë°€ì°?ì§€?„í•©?ˆë‹¤.",
        icon: "groups",
        defaultOpen: true,
    },
    {
        question: "ì²´í—˜ ?˜ì—…?€ ë¬´ë£Œ?¸ê???",
        answer: "?? ì²?ì²´í—˜ ?˜ì—…?€ ?„ì „ ë¬´ë£Œ?…ë‹ˆ?? ??60ë¶„ê°„ ì§„í–‰?˜ë©°, ?„ì´???„ì¬ ?˜ì????Œì•…?˜ê³  ë§ì¶¤ ì»¤ë¦¬?˜ëŸ¼???œì•ˆ?œë¦½?ˆë‹¤. ë¶€???†ì´ ?¸í•˜ê²?ë°©ë¬¸??ì£¼ì„¸?? ì²´í—˜ ?˜ì—… ???±ë¡ ?¬ë????ìœ ë¡?²Œ ê²°ì •?˜ì‹¤ ???ˆìŠµ?ˆë‹¤.",
        icon: "card_giftcard",
    },
    {
        question: "ì½”ë”©??ë°°ìš°ë©??™êµ ?±ì ???„ì????˜ë‚˜??",
        answer: "ì½”ë”© ?™ìŠµ?€ ?¼ë¦¬???¬ê³ ?? ë¬¸ì œ ë¶„ì„?? ì°½ì˜?¥ì„ ì¢…í•©?ìœ¼ë¡??¥ìƒ?œí‚µ?ˆë‹¤. ?¹íˆ ?˜í•™ê³?ê³¼í•™ ê³¼ëª©?ì„œ ?ˆì— ?„ëŠ” ?±ì  ?¥ìƒ??ë³´ì´???™ìƒ?¤ì´ ë§ìŠµ?ˆë‹¤. ?í•œ SW ê´€???€???˜ìƒ ?´ë ¥?€ ?™ìƒë¶€??ê¸°ì¬?????ˆì–´ ?…ì‹œ?ë„ ?„ì????©ë‹ˆ??",
        icon: "school",
    },
];

function FAQItem({ item, index, isInView }: { item: typeof FAQ_ITEMS[0]; index: number; isInView: boolean }) {
    const [isOpen, setIsOpen] = useState(item.defaultOpen || false);

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.08 * index, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
            className={`fq-item ${isOpen ? "fq-item-active" : ""}`}
            onClick={() => setIsOpen(!isOpen)}
        >
            {/* Active glow */}
            {isOpen && <div className="fq-active-glow" />}

            <div className="fq-row">
                <div className="fq-left">
                    <div className={`fq-icon-box ${isOpen ? "fq-icon-active" : ""}`}>
                        <span className="material-symbols-outlined fq-icon-sym">{item.icon}</span>
                    </div>
                    <h3 className="fq-question">{item.question}</h3>
                </div>
                <div className={`fq-toggle ${isOpen ? "fq-toggle-active" : ""}`}>
                    <span className="material-symbols-outlined fq-toggle-icon">
                        {isOpen ? "remove" : "add"}
                    </span>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
                        style={{ overflow: "hidden" }}
                    >
                        <p className="fq-answer">{item.answer}</p>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default function FAQ() {
    const ref = useRef<HTMLElement>(null);
    const isInView = useInView(ref, { once: true, margin: "-60px" });

    return (
        <section ref={ref} id="faq" className="fq-section">
                        
            {/* BG */}
            <div className="fq-bg" aria-hidden>
                <div className="fq-nebula" />
                <div className="fq-depth-grid" />
                <div className="fq-light-leak" />
                {/* 3D floating icons */}
                <div className="fq-3d-icon fq-3d-1"><span className="material-symbols-outlined fq-silver">calculate</span></div>
                <div className="fq-3d-icon fq-3d-2"><span className="material-symbols-outlined fq-silver">keyboard</span></div>
                <div className="fq-3d-icon fq-3d-3"><span className="material-symbols-outlined fq-silver">insert_chart</span></div>
            </div>

            <div className="fq-container">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.8 }}
                    className="fq-header"
                >
                    <div className="fq-header-icon">
                        <span className="material-symbols-outlined" style={{ fontSize: 28 }}>chat_bubble</span>
                    </div>
                    <p className="fq-header-sub">Supreme Inquiry Interface</p>
                    <h2 className="fq-title">
                        ?™ë?ëª¨ë‹˜???ì£¼<br />
                        <span className="fq-title-accent">ë¬»ëŠ” ì§ˆë¬¸</span>
                    </h2>
                </motion.div>

                {/* Items */}
                <div className="fq-list">
                    {FAQ_ITEMS.map((item, i) => (
                        <FAQItem key={i} item={item} index={i} isInView={isInView} />
                    ))}
                </div>
            </div>

            <style>{`
/* ?â•??Section ?â•??*/
.fq-section { position: relative; overflow: hidden; padding: clamp(80px,10vw,140px) 0; background: #F8F7F4; font-family: 'Noto Sans KR', sans-serif; color: #1e293b; }
.fq-container { max-width: 900px; margin: 0 auto; padding: 0 clamp(16px,4vw,40px); position: relative; z-index: 10; }

/* BG */
.fq-bg { position: absolute; inset: 0; pointer-events: none; z-index: 0; overflow: hidden; }
.fq-nebula { position: absolute; inset: -50%; background: radial-gradient(circle at 50% 50%, rgba(90,139,187,0.12) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,107,107,0.08) 0%, transparent 40%), radial-gradient(circle at 20% 80%, rgba(138,43,226,0.08) 0%, transparent 40%); filter: blur(80px); }
.fq-depth-grid { position: absolute; inset: 0; background-image: linear-gradient(to right, rgba(0,0,0,0.025) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,0,0,0.025) 1px, transparent 1px); background-size: 60px 60px; transform: perspective(1000px) rotateX(60deg) translateY(100px) translateZ(-200px); }
.fq-light-leak { position: absolute; inset: 0; background: radial-gradient(circle at 90% 10%, rgba(255,255,255,0.35) 0%, transparent 30%); mix-blend-mode: overlay; }

/* 3D floating icons */
.fq-3d-icon { position: absolute; z-index: 4; pointer-events: none; mix-blend-mode: luminosity; }
.fq-silver { font-size: 80px; background: linear-gradient(135deg, #e0e0e0 0%, #f5f5f5 50%, #d4d4d4 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(2px 4px 6px rgba(0,0,0,0.15)); opacity: 0.6; }
.fq-3d-1 { top: 15%; left: 8%; transform: rotate(-15deg) perspective(500px) rotateY(20deg); }
.fq-3d-2 { top: 40%; right: 6%; transform: rotate(10deg) perspective(500px) rotateY(-30deg) rotateX(20deg); }
.fq-3d-3 { bottom: 15%; left: 12%; transform: rotate(5deg) perspective(500px) rotateY(15deg) rotateX(-10deg); }

/* Header */
.fq-header { text-align: center; margin-bottom: clamp(40px,6vw,72px); position: relative; z-index: 20; }
.fq-header-icon { display: inline-flex; width: 64px; height: 64px; border-radius: 16px; background: rgba(255,255,255,0.4); backdrop-filter: blur(8px); border: 1px solid rgba(255,255,255,0.6); align-items: center; justify-content: center; color: #5A8BBB; margin-bottom: 24px; box-shadow: 0 8px 32px rgba(31,38,135,0.1); }
.fq-header-sub { font-size: 11px; font-weight: 900; letter-spacing: 0.3em; text-transform: uppercase; color: #5A8BBB; margin-bottom: 16px; }
.fq-title { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 900; line-height: 1.15; letter-spacing: -0.02em; background: linear-gradient(to bottom, #1e293b 0%, #334155 50%, #475569 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
.fq-title-accent { background: linear-gradient(to right, #5A8BBB, #FF6B6B); -webkit-background-clip: text; -webkit-text-fill-color: transparent; filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08)); }

/* FAQ Item */
.fq-list { display: flex; flex-direction: column; gap: 20px; position: relative; z-index: 20; }
.fq-item {
    position: relative; cursor: pointer;
    background: linear-gradient(135deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 100%);
    backdrop-filter: blur(8px);
    border: 1px solid rgba(255,255,255,0.8); border-top: 1px solid #fff; border-left: 1px solid #fff;
    border-radius: 24px; padding: 24px 32px;
    box-shadow: 0 8px 32px rgba(31,38,135,0.1), inset 0 0 20px rgba(255,255,255,0.3);
    transform-style: preserve-3d;
    transition: all 0.5s cubic-bezier(0.25, 1, 0.5, 1);
    overflow: hidden;
}
.fq-item::before { content: ''; position: absolute; inset: 0; border-radius: inherit; box-shadow: inset 0 0 15px rgba(90,139,187,0.2); pointer-events: none; }
.fq-item::after { content: ''; position: absolute; inset: -2px; border-radius: inherit; background: linear-gradient(90deg, rgba(255,0,0,0.15), rgba(0,255,0,0.15), rgba(0,0,255,0.15)); z-index: -1; filter: blur(4px); opacity: 0.4; pointer-events: none; }
.fq-item-active { background: linear-gradient(135deg, rgba(255,255,255,0.85) 0%, rgba(255,255,255,0.4) 100%); border-color: rgba(255,107,107,0.4); transform: scale(1.02) translateZ(20px); z-index: 3; box-shadow: 0 0 40px rgba(255,107,107,0.15), inset 0 0 20px rgba(255,255,255,0.5); }
.fq-item-active::before { box-shadow: inset 0 0 20px rgba(255,107,107,0.15); }
.fq-active-glow { position: absolute; top: 0; right: 0; width: 256px; height: 256px; background: rgba(255,107,107,0.08); border-radius: 50%; filter: blur(40px); transform: translate(33%, -50%); pointer-events: none; }

/* Row */
.fq-row { display: flex; align-items: center; justify-content: space-between; position: relative; z-index: 10; }
.fq-left { display: flex; align-items: center; gap: 20px; }
.fq-icon-box { width: 56px; height: 56px; border-radius: 16px; background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; color: #64748b; box-shadow: inset 0 0 10px rgba(255,255,255,0.3); transition: all 0.3s; flex-shrink: 0; }
.fq-icon-active { background: rgba(255,107,107,0.15); border-color: rgba(255,107,107,0.3); color: #FF6B6B; }
.fq-icon-sym { font-size: 24px; }
.fq-question { font-size: clamp(16px, 2.5vw, 22px); font-weight: 700; color: #1e293b; }
.fq-toggle { width: 40px; height: 40px; border-radius: 50%; background: rgba(255,255,255,0.5); border: 1px solid rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; color: #64748b; flex-shrink: 0; transition: all 0.3s; }
.fq-toggle-active { background: #FF6B6B; color: #fff; border-color: transparent; box-shadow: 0 4px 16px rgba(255,107,107,0.4); }
.fq-toggle-icon { font-size: 20px; }

/* Answer */
.fq-answer { padding: 20px 0 8px 76px; font-size: 16px; color: #475569; line-height: 1.75; font-weight: 500; position: relative; z-index: 10; }
@media (max-width: 640px) { .fq-answer { padding-left: 0; } }

/* Keyframes */
@keyframes fqFloat { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-12px); } }
            `}</style>
        </section>
    );
}
