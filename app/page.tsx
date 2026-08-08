"use client";

import { useEffect, useMemo, useRef, useState } from "react";

type Fortune = {
  number: number;
  title: string;
  tone: "รุ่ง" | "ร่มเย็น" | "ตั้งหลัก";
  poem: string;
  question: string;
  choices: string[];
  answer: number;
  clue: string;
  reading: string;
  action: string;
  symbol: string;
};

const fortunes: Fortune[] = [
  {
    number: 1,
    title: "แสงแรกเหนือขอบฟ้า",
    tone: "รุ่ง",
    poem: "รุ่งอรุณอุ่นฟ้าเมื่อกล้าก้าว\nสิ่งที่เฝ้ารอคอยค่อยเผยผล",
    question: "อะไรเอ่ย ยิ่งแบ่งให้คนอื่น เรายิ่งมีมากขึ้น?",
    choices: ["เงินทอง", "ความรู้", "เงา"],
    answer: 1,
    clue: "สิ่งนี้ไม่ลดลงเมื่อส่งต่อ",
    reading: "โอกาสใหม่กำลังเปิดทาง ความตั้งใจที่ทำต่อเนื่องจะเริ่มเห็นผลชัด",
    action: "เลือกงานสำคัญหนึ่งอย่าง แล้วเริ่มภายในวันนี้",
    symbol: "☀",
  },
  {
    number: 2,
    title: "สายน้ำไม่ย้อนคืน",
    tone: "ร่มเย็น",
    poem: "สายน้ำไหลไม่เร่งยังถึงฝั่ง\nค่อยระวังคำพูดให้เหมาะสม",
    question: "อะไรเอ่ย มีปากแต่พูดไม่ได้ มีเตียงแต่นอนไม่ได้?",
    choices: ["แม่น้ำ", "ถ้ำ", "หนังสือ"],
    answer: 0,
    clue: "ไหลจากที่สูงลงสู่ที่ต่ำ",
    reading: "จังหวะนี้เหมาะกับการค่อย ๆ ทำ อย่าเร่งข้อสรุปจากข้อมูลเพียงด้านเดียว",
    action: "ฟังให้จบก่อนตอบในบทสนทนาสำคัญ",
    symbol: "≈",
  },
  {
    number: 3,
    title: "ประตูแห่งปัญญา",
    tone: "รุ่ง",
    poem: "ประตูหนึ่งเปิดได้ด้วยใจนิ่ง\nเห็นความจริงเมื่อมองต่างมุมกัน",
    question: "อะไรเอ่ย มีกุญแจมากมาย แต่เปิดประตูไม่ได้?",
    choices: ["แผนที่", "เปียโน", "นาฬิกา"],
    answer: 1,
    clue: "กุญแจของสิ่งนี้สร้างเสียงดนตรี",
    reading: "ปัญหาที่ติดอยู่มีทางออก หากลองเปลี่ยนวิธีคิดหรือขอความเห็นจากคนที่ไว้ใจ",
    action: "เขียนทางเลือกใหม่เพิ่มอีกสองทางก่อนตัดสินใจ",
    symbol: "◇",
  },
  {
    number: 4,
    title: "จันทร์เหนือเมฆ",
    tone: "ตั้งหลัก",
    poem: "เมฆบังจันทร์เพียงครู่มิสูญแสง\nอย่าระแวงสิ่งใดยังไม่เห็น",
    question: "อะไรเอ่ย ตามเราไปทุกที่ แต่หายไปเมื่อไร้แสง?",
    choices: ["เวลา", "เงา", "เสียง"],
    answer: 1,
    clue: "ยามแดดแรง สิ่งนี้ยิ่งชัด",
    reading: "ความกังวลอาจทำให้เรื่องเล็กดูใหญ่ ควรแยกข้อเท็จจริงออกจากสิ่งที่คาดเดา",
    action: "จดสิ่งที่รู้จริง 3 ข้อ แล้วค่อยวางแผนขั้นต่อไป",
    symbol: "☾",
  },
  {
    number: 5,
    title: "เมล็ดพันธุ์แห่งหวัง",
    tone: "ร่มเย็น",
    poem: "เมล็ดเล็กฝากหวังไว้ใต้ดิน\nเพียรรดรินไม่นานแตกกิ่งใบ",
    question: "อะไรเอ่ย ต้องแตกก่อน จึงจะนำมาใช้ได้?",
    choices: ["ไข่", "แก้วน้ำ", "รองเท้า"],
    answer: 0,
    clue: "มักอยู่ในครัวและมีเปลือก",
    reading: "สิ่งที่เริ่มไว้ต้องการเวลา อย่าเพิ่งเลิกล้มเพราะผลยังไม่ปรากฏทันที",
    action: "ทำสิ่งเดิมต่ออีกหนึ่งรอบให้ดีกว่าเมื่อวานเล็กน้อย",
    symbol: "✦",
  },
  {
    number: 6,
    title: "ลมส่งข่าวดี",
    tone: "รุ่ง",
    poem: "ลมพัดพาข่าวดีจากไกลใกล้\nคนจริงใจนำทางให้พบกัน",
    question: "อะไรเอ่ย เดินทางรอบโลกได้ทั้งที่อยู่ตรงมุมเดิม?",
    choices: ["เข็มทิศ", "แสตมป์", "ดวงดาว"],
    answer: 1,
    clue: "ติดอยู่ที่มุมซองจดหมาย",
    reading: "การติดต่อหรือความร่วมมือมีแนวโน้มราบรื่น โดยเฉพาะเมื่อสื่อสารให้ชัดเจน",
    action: "ส่งข้อความติดตามเรื่องที่รอด้วยถ้อยคำสุภาพ",
    symbol: "⌁",
  },
  {
    number: 7,
    title: "สะพานแห่งไมตรี",
    tone: "ร่มเย็น",
    poem: "สะพานเชื่อมสองฝั่งด้วยความหมาย\nลดทิฐิลงได้ใจก็เบา",
    question: "อะไรเอ่ย เป็นของเรา แต่คนอื่นใช้บ่อยกว่าเรา?",
    choices: ["ชื่อ", "โทรศัพท์", "กระเป๋า"],
    answer: 0,
    clue: "ผู้อื่นใช้เรียกเรา",
    reading: "ความสัมพันธ์ดีขึ้นได้จากการพูดตรงอย่างอ่อนโยน และยอมรับฟังกัน",
    action: "ขอบคุณคนหนึ่งคนที่เคยช่วยคุณ",
    symbol: "∞",
  },
  {
    number: 8,
    title: "ภูผามั่นคง",
    tone: "ตั้งหลัก",
    poem: "ภูผานิ่งผ่านแดดและพายุ\nใจที่รู้จุดหมายไม่ไหวเอน",
    question: "อะไรเอ่ย ยิ่งเอาออก ยิ่งใหญ่ขึ้น?",
    choices: ["หลุม", "กองทราย", "ต้นไม้"],
    answer: 0,
    clue: "เกิดจากการขุดพื้นดินออก",
    reading: "อย่ารับภาระเพิ่มโดยไม่จำเป็น การตัดสิ่งรบกวนออกจะทำให้เห็นเป้าหมายชัดขึ้น",
    action: "ตัดงานที่ไม่สำคัญออกหนึ่งรายการ",
    symbol: "△",
  },
  {
    number: 9,
    title: "ระฆังแห่งสติ",
    tone: "ร่มเย็น",
    poem: "เสียงระฆังเตือนใจให้หยุดคิด\nก่อนชีวิตเลือกทางอย่างมั่นคง",
    question: "อะไรเอ่ย มีหน้า มีมือ แต่ไม่มีแขนและขา?",
    choices: ["นาฬิกา", "ตุ๊กตา", "กระจก"],
    answer: 0,
    clue: "มีเข็มคอยบอกเวลา",
    reading: "เรื่องสำคัญควรให้เวลาตรวจทานอีกครั้ง ความรอบคอบจะช่วยลดข้อผิดพลาด",
    action: "พักสั้น ๆ แล้วกลับมาตรวจงานด้วยสายตาใหม่",
    symbol: "◉",
  },
  {
    number: 10,
    title: "นกคืนรัง",
    tone: "รุ่ง",
    poem: "นกไกลบ้านยังย้อนคืนรังเก่า\nเรื่องเงียบเหงามีวันกลับสดใส",
    question: "อะไรเอ่ย มีเมืองแต่ไม่มีคน มีป่าแต่ไม่มีต้นไม้?",
    choices: ["ความฝัน", "แผนที่", "ภาพถ่าย"],
    answer: 1,
    clue: "ใช้ดูเส้นทางและสถานที่",
    reading: "สิ่งที่ห่างหายอาจกลับมาในรูปแบบใหม่ เหมาะกับการรื้อฟื้นแผนที่เคยหยุดไว้",
    action: "เปิดดูไอเดียเก่าหนึ่งเรื่อง แล้วหาวิธีปรับให้เข้ากับวันนี้",
    symbol: "⌂",
  },
  {
    number: 11,
    title: "โคมไฟกลางคืน",
    tone: "ตั้งหลัก",
    poem: "โคมดวงน้อยยังส่องกลางคืนมืด\nจงยึดความถูกต้องเป็นแสงนำ",
    question: "อะไรเอ่ย ยิ่งเช็ดก็ยิ่งเปียก?",
    choices: ["กระจก", "ผ้าเช็ดตัว", "พื้นบ้าน"],
    answer: 1,
    clue: "ใช้หลังอาบน้ำ",
    reading: "คำตอบอยู่ในเรื่องพื้นฐาน อย่าปล่อยให้ความซับซ้อนทำให้ลืมหลักสำคัญ",
    action: "กลับไปตรวจเงื่อนไขตั้งต้นก่อนแก้ปัญหาต่อ",
    symbol: "✧",
  },
  {
    number: 12,
    title: "ดอกบัวพ้นน้ำ",
    tone: "รุ่ง",
    poem: "ดอกบัวบานผ่านโคลนมิหม่นสี\nทำความดีด้วยใจไม่หวังคำ",
    question: "อะไรเอ่ย มีใบแต่ไม่ใช่ต้นไม้ มีหน้าแต่ไม่ใช่คน?",
    choices: ["หนังสือ", "พัดลม", "หน้าต่าง"],
    answer: 0,
    clue: "เปิดอ่านได้ทีละหน้า",
    reading: "ความพยายามที่สุจริตจะสร้างความน่าเชื่อถือ แม้ผลจะค่อยเป็นค่อยไป",
    action: "ทำเรื่องเล็กที่เป็นประโยชน์โดยไม่ต้องรอคำชม",
    symbol: "❋",
  },
];

type Phase = "welcome" | "shaking" | "riddle" | "result";

function playTone(kind: "shake" | "reveal" | "correct" | "wrong") {
  if (typeof window === "undefined") return;
  const AudioContextClass = window.AudioContext ||
    (window as typeof window & { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
  if (!AudioContextClass) return;
  const ctx = new AudioContextClass();
  const notes = kind === "shake" ? [220, 260, 220] : kind === "reveal" ? [392, 523] : kind === "correct" ? [523, 659, 784] : [280, 220];
  notes.forEach((frequency, index) => {
    const oscillator = ctx.createOscillator();
    const gain = ctx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.value = frequency;
    gain.gain.setValueAtTime(0.0001, ctx.currentTime + index * 0.1);
    gain.gain.exponentialRampToValueAtTime(0.07, ctx.currentTime + index * 0.1 + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + index * 0.1 + 0.18);
    oscillator.connect(gain).connect(ctx.destination);
    oscillator.start(ctx.currentTime + index * 0.1);
    oscillator.stop(ctx.currentTime + index * 0.1 + 0.2);
  });
  window.setTimeout(() => ctx.close(), 700);
}

export default function Home() {
  const [phase, setPhase] = useState<Phase>("welcome");
  const [fortuneIndex, setFortuneIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [soundOn, setSoundOn] = useState(true);
  const [showClue, setShowClue] = useState(false);
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);
  const fortune = fortunes[fortuneIndex];

  useEffect(() => {
    const saved = Number(window.localStorage.getItem("siamsi-best") || 0);
    const savedSound = window.localStorage.getItem("siamsi-sound");
    const frame = window.requestAnimationFrame(() => {
      setBest(saved);
      if (savedSound !== null) setSoundOn(savedSound === "on");
    });
    return () => {
      window.cancelAnimationFrame(frame);
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, []);

  const progressLabel = useMemo(() => {
    if (phase === "welcome") return "พร้อมเสี่ยงเซียมซี";
    if (phase === "shaking") return "กำลังเขย่ากระบอก";
    if (phase === "riddle") return "ไขปริศนาเพื่อเปิดคำทำนาย";
    return "เปิดคำทำนายสำเร็จ";
  }, [phase]);

  function toggleSound() {
    const next = !soundOn;
    setSoundOn(next);
    window.localStorage.setItem("siamsi-sound", next ? "on" : "off");
    if (next) playTone("reveal");
  }

  function drawFortune() {
    if (phase === "shaking") return;
    setPhase("shaking");
    setSelected(null);
    setShowClue(false);
    setCopied(false);
    if (soundOn) playTone("shake");
    timer.current = window.setTimeout(() => {
      setFortuneIndex((current) => {
        let next = Math.floor(Math.random() * fortunes.length);
        if (next === current) next = (next + 1) % fortunes.length;
        return next;
      });
      setPhase("riddle");
      if (soundOn) playTone("reveal");
    }, 1250);
  }

  function answerRiddle(index: number) {
    if (selected !== null) return;
    setSelected(index);
    const correct = index === fortune.answer;
    const nextStreak = correct ? streak + 1 : 0;
    const earned = correct ? 10 + Math.min(nextStreak * 2, 10) : 2;
    const nextScore = score + earned;
    setScore(nextScore);
    setStreak(nextStreak);
    if (nextScore > best) {
      setBest(nextScore);
      window.localStorage.setItem("siamsi-best", String(nextScore));
    }
    if (soundOn) playTone(correct ? "correct" : "wrong");
    timer.current = window.setTimeout(() => setPhase("result"), 750);
  }

  async function shareResult() {
    const text = `เซียมซีใบที่ ${fortune.number} — ${fortune.title}\n${fortune.reading}\nคะแนน ${score} แต้ม`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "เสี่ยงเซียมซีไขปริศนา", text, url: window.location.href });
      } else {
        await navigator.clipboard.writeText(`${text}\n${window.location.href}`);
        setCopied(true);
      }
    } catch {
      // The user can cancel the native share dialog without affecting the game.
    }
  }

  return (
    <main className="game-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <header className="topbar">
        <a className="brand" href="#top" aria-label="กลับด้านบน">
          <span className="brand-mark">เซียมซี</span>
          <span>ไขปริศนา</span>
        </a>
        <div className="top-actions">
          <div className="score-chip" title="คะแนนปัจจุบัน">
            <span>แต้ม</span><strong>{score}</strong>
          </div>
          <button className="icon-button" onClick={toggleSound} aria-label={soundOn ? "ปิดเสียง" : "เปิดเสียง"}>
            {soundOn ? "♪" : "×"}
          </button>
        </div>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow"><span /> มงคล • ปริศนา • สติ <span /></div>
        <h1>เสี่ยงเซียมซี<br /><em>ไขปริศนา</em></h1>
        <p className="intro">ตั้งจิตให้สบาย เขย่ากระบอก แล้วใช้ปัญญาเปิดความหมายของเซียมซี</p>
      </section>

      <section className={`game-card phase-${phase}`} aria-live="polite">
        <div className="status-row">
          <span className="status-dot" />
          <span>{progressLabel}</span>
          <span className="best-score">สถิติสูงสุด {best}</span>
        </div>

        {(phase === "welcome" || phase === "shaking") && (
          <div className="draw-stage">
            <div className={`fortune-tube ${phase === "shaking" ? "is-shaking" : ""}`} aria-hidden="true">
              <div className="sticks">
                {[0, 1, 2, 3, 4, 5, 6].map((stick) => <i key={stick} style={{ "--stick": stick } as React.CSSProperties} />)}
              </div>
              <div className="tube-rim" />
              <div className="tube-body"><span>福</span></div>
              <div className="tube-base" />
            </div>
            <div className="draw-copy">
              <p className="step-label">ขั้นที่ 1</p>
              <h2>{phase === "shaking" ? "ฟังเสียงไม้เซียมซี…" : "อธิษฐานหนึ่งเรื่องในใจ"}</h2>
              <p>{phase === "shaking" ? "เซียมซีกำลังเลือกข้อความที่เหมาะกับช่วงเวลานี้" : "เมื่อพร้อมแล้ว แตะปุ่มเพื่อเขย่ากระบอกเซียมซี"}</p>
              <button className="primary-button" onClick={drawFortune} disabled={phase === "shaking"}>
                <span>{phase === "shaking" ? "กำลังเสี่ยง…" : "เขย่าเซียมซี"}</span>
                <b aria-hidden="true">→</b>
              </button>
            </div>
          </div>
        )}

        {phase === "riddle" && (
          <div className="riddle-stage">
            <div className="lot-preview">
              <span className="lot-symbol">{fortune.symbol}</span>
              <span>เซียมซี</span>
              <strong>{String(fortune.number).padStart(2, "0")}</strong>
            </div>
            <div className="riddle-content">
              <p className="step-label">ขั้นที่ 2 • ประตูปัญญา</p>
              <h2>{fortune.question}</h2>
              <div className="choices" role="group" aria-label="ตัวเลือกคำตอบ">
                {fortune.choices.map((choice, index) => {
                  const state = selected === null ? "" : index === fortune.answer ? "correct" : index === selected ? "wrong" : "muted";
                  return (
                    <button key={choice} className={`choice ${state}`} onClick={() => answerRiddle(index)} disabled={selected !== null}>
                      <span>{["ก", "ข", "ค"][index]}.</span>{choice}
                    </button>
                  );
                })}
              </div>
              {showClue ? <p className="clue">คำใบ้: {fortune.clue}</p> : (
                <button className="text-button" onClick={() => setShowClue(true)}>ดูคำใบ้</button>
              )}
            </div>
          </div>
        )}

        {phase === "result" && (
          <div className="result-stage">
            <div className="result-lot" aria-hidden="true">
              <span className="result-ornament">{fortune.symbol}</span>
              <span>ใบที่</span>
              <strong>{String(fortune.number).padStart(2, "0")}</strong>
              <small>{fortune.tone}</small>
            </div>
            <article className="reading">
              <p className="step-label">คำทำนายของคุณ</p>
              <h2>{fortune.title}</h2>
              <blockquote>{fortune.poem.split("\n").map((line) => <span key={line}>{line}</span>)}</blockquote>
              <p className="reading-text">{fortune.reading}</p>
              <div className="action-card">
                <span>คำแนะนำวันนี้</span>
                <strong>{fortune.action}</strong>
              </div>
              <div className="result-actions">
                <button className="primary-button" onClick={drawFortune}><span>เสี่ยงอีกครั้ง</span><b>↻</b></button>
                <button className="secondary-button" onClick={shareResult}>{copied ? "คัดลอกแล้ว" : "แชร์คำทำนาย"}</button>
              </div>
              <p className="answer-note">ปริศนาข้อนี้ตอบ “{fortune.choices[fortune.answer]}” • {selected === fortune.answer ? `ตอบถูก รับโบนัสต่อเนื่อง ${streak}` : "ครั้งหน้าลองใหม่ได้"}</p>
            </article>
          </div>
        )}
      </section>

      <section className="how-to">
        <div><span>01</span><strong>ตั้งใจ</strong><p>นึกถึงหนึ่งเรื่องที่อยากได้แนวคิด</p></div>
        <div><span>02</span><strong>ไขปริศนา</strong><p>เลือกคำตอบด้วยสติและไหวพริบ</p></div>
        <div><span>03</span><strong>รับข้อคิด</strong><p>นำคำแนะนำไปปรับใช้ตามความเหมาะสม</p></div>
      </section>

      <footer>
        <p>สร้างขึ้นเพื่อความบันเทิงและเป็นข้อคิดส่วนบุคคล ไม่ใช่คำรับรองอนาคต การเงิน หรือสุขภาพ</p>
        <span>© 2026 เสี่ยงเซียมซีไขปริศนา</span>
      </footer>
    </main>
  );
}
