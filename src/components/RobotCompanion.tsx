"use client";

import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { motion, AnimatePresence, useMotionValue, useSpring, PanInfo } from "framer-motion";

/* ── Section messages — fun & creative ───────────────────── */

const SECTION_MESSAGES: Record<string, string[]> = {
  hero: [
    "Hey! Welcome! I'm Sam's assistant bot 🤖",
    "Psst... scroll down, the good stuff is below!",
    "Don't just stare at me, explore the portfolio!",
  ],
  about: [
    "Fun fact: Sam codes with coffee ☕ and chaos.",
    "She's cool, trust me. I'm literally her creation.",
    "Yes, she built me. No, I don't get paid.",
  ],
  projects: [
    "Ooh these are the cool ones! Click around!",
    "She didn't sleep for 3 days on that one. Worth it.",
    "I helped with... moral support.",
  ],
  skills: [
    "TypeScript supremacy, fight me.",
    "She knows so many things, it's kinda scary.",
    "I tried to learn Flutter once. I crashed.",
  ],
  experience: [
    "Impressive, right? I trained her well. (jk)",
    "Plot twist: she's been coding since dinosaurs roamed.",
    "This is where the magic happened.",
  ],
  contact: [
    "Go ahead, say hi! She doesn't bite. I might.",
    "Hire her before someone else does! 🚀",
    "Last chance to make a great decision today.",
  ],
};

const DRAG_REACTIONS = [
  "AHHH! Put me down! 😵‍💫",
  "This is NOT in my contract!",
  "I'm a bot, not a stress ball!",
  "Wheeeee... wait, I'm scared!",
  "My circuits are scrambling!",
  "HELP! Bot abuse! 🆘",
  "I'm gonna be sick... do bots get sick?",
  "You think this is funny?? ...okay it kinda is.",
];

const IDLE_MESSAGES = [
  "...",
  "*beep boop*",
  "Still here. Still vibing.",
  "I wonder if AIs dream of electric sheep...",
  "Don't mind me, just floating here.",
  "*pretends to work*",
];

/* ── Pick random from array ──────────────────────────────── */

function pickRandom(arr: string[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

/* ── 3D Robot model ──────────────────────────────────────── */

function RobotModel({ mousePos, isDragging, wiggleIntensity }: {
  mousePos: { x: number; y: number };
  isDragging: boolean;
  wiggleIntensity: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const { scene } = useGLTF("/ai_robot.glb");
  const clonedScene = useMemo(() => scene.clone(true), [scene]);

  const currentRotY = useRef(0);
  const currentRotX = useRef(0);

  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;

    // Floating bob (faster when dragged)
    const bobSpeed = isDragging ? 6 : 1.5;
    const bobAmount = isDragging ? 0.15 : 0.08;
    groupRef.current.position.y = Math.sin(t * bobSpeed) * bobAmount - 0.5;

    if (isDragging) {
      // Dizzy spin when being dragged!
      groupRef.current.rotation.y += 0.15;
      groupRef.current.rotation.z = Math.sin(t * 8) * 0.3;
      groupRef.current.rotation.x = Math.cos(t * 6) * 0.2;
    } else {
      // Follow mouse with gaze — mousePos is normalized (-1 to 1)
      const targetRotY = mousePos.x * 0.6;
      const targetRotX = mousePos.y * -0.4;

      currentRotY.current += (targetRotY - currentRotY.current) * 0.06;
      currentRotX.current += (targetRotX - currentRotX.current) * 0.06;

      groupRef.current.rotation.y = currentRotY.current;
      groupRef.current.rotation.x = currentRotX.current;

      // Post-drag wiggle (decreasing)
      if (wiggleIntensity > 0.01) {
        groupRef.current.rotation.z = Math.sin(t * 10) * wiggleIntensity * 0.3;
      } else {
        groupRef.current.rotation.z = Math.sin(t * 0.8) * 0.03;
      }
    }
  });

  return (
    <group ref={groupRef} scale={3.2} position={[0, -0.5, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

/* ── Speech bubble ───────────────────────────────────────── */

function SpeechBubble({ message, visible }: { message: string; visible: boolean }) {
  return (
    <AnimatePresence mode="wait">
      {visible && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 8, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.9 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-0 right-full mr-[-2rem] w-52"
        >
          <div className="relative px-3 py-2 rounded-xl bg-surface-light/90 backdrop-blur-md border border-cyan/20 shadow-[0_0_20px_rgba(0,229,255,0.1)]">
            <span className="text-[11px] font-[family-name:var(--font-mono)] text-text leading-relaxed">
              {message}
            </span>
            {/* Tail — pointing right toward robot */}
            <div className="absolute bottom-3 -right-1.5 w-3 h-3 rotate-45 bg-surface-light/90 border-r border-t border-cyan/20" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ── Main companion component ────────────────────────────── */

export default function RobotCompanion() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("hero");
  const [currentMessage, setCurrentMessage] = useState(SECTION_MESSAGES.hero[0]);
  const [showBubble, setShowBubble] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [wiggleIntensity, setWiggleIntensity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const lastSection = useRef("hero");
  const bubbleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const idleTimer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const wiggleDecay = useRef<ReturnType<typeof setInterval>>(undefined);

  // Schedule idle message
  const scheduleIdle = useCallback(() => {
    clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => {
      setCurrentMessage(pickRandom(IDLE_MESSAGES));
      setShowBubble(true);
      clearTimeout(bubbleTimer.current);
      bubbleTimer.current = setTimeout(() => setShowBubble(false), 3000);
    }, 12000 + Math.random() * 8000); // 12-20s idle
  }, []);

  // Track scroll position and active section
  useEffect(() => {
    const sections = ["hero", "about", "projects", "skills", "experience", "contact"];

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      setScrollProgress(progress);

      for (const id of sections) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.5 && rect.bottom >= window.innerHeight * 0.3) {
          if (id !== lastSection.current) {
            lastSection.current = id;
            setActiveSection(id);
            const msgs = SECTION_MESSAGES[id];
            setCurrentMessage(pickRandom(msgs ?? ["Hey!"]));
            setShowBubble(true);
            clearTimeout(bubbleTimer.current);
            bubbleTimer.current = setTimeout(() => setShowBubble(false), 4000);
            scheduleIdle();
          }
          break;
        }
      }
    };

    bubbleTimer.current = setTimeout(() => setShowBubble(false), 4000);
    scheduleIdle();

    // Track mouse relative to robot position (bottom-right corner)
    const handleMouseMove = (e: MouseEvent) => {
      // Robot is at bottom-right: approximate center position
      const robotX = window.innerWidth - 100;
      const robotY = window.innerHeight - 100;
      const dx = e.clientX - robotX;
      const dy = e.clientY - robotY;
      // Normalize to -1..1 range, clamped
      const maxDist = 600;
      const nx = Math.max(-1, Math.min(1, dx / maxDist));
      const ny = Math.max(-1, Math.min(1, -dy / maxDist));
      setMousePos({ x: nx, y: ny });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      clearTimeout(bubbleTimer.current);
      clearTimeout(idleTimer.current);
      clearInterval(wiggleDecay.current);
    };
  }, [scheduleIdle]);

  // Hover handlers
  const handleMouseEnter = () => {
    setIsHovered(true);
    if (!isDragging) {
      const msgs = SECTION_MESSAGES[activeSection];
      setCurrentMessage(pickRandom(msgs ?? ["Hey!"]));
      setShowBubble(true);
      clearTimeout(bubbleTimer.current);
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (!isDragging) {
      bubbleTimer.current = setTimeout(() => setShowBubble(false), 3000);
    }
  };

  // Drag handlers
  const handleDragStart = () => {
    setIsDragging(true);
    setCurrentMessage(pickRandom(DRAG_REACTIONS));
    setShowBubble(true);
    clearTimeout(bubbleTimer.current);
    clearTimeout(idleTimer.current);
  };

  const handleDrag = (_: unknown, info: PanInfo) => {
    // Change message during drag occasionally based on velocity
    const speed = Math.sqrt(info.velocity.x ** 2 + info.velocity.y ** 2);
    if (speed > 800 && Math.random() > 0.85) {
      setCurrentMessage(pickRandom(DRAG_REACTIONS));
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setCurrentMessage("I'm DIZZY... 😵‍💫");
    setShowBubble(true);

    // Start post-drag wiggle that decays
    setWiggleIntensity(1);
    clearInterval(wiggleDecay.current);
    wiggleDecay.current = setInterval(() => {
      setWiggleIntensity((prev) => {
        const next = prev * 0.92;
        if (next < 0.01) {
          clearInterval(wiggleDecay.current);
          return 0;
        }
        return next;
      });
    }, 50);

    // Recovery message after wobble settles
    bubbleTimer.current = setTimeout(() => {
      setCurrentMessage("Okay... I'm fine. I'm fine. 🫠");
      setTimeout(() => setShowBubble(false), 3000);
      scheduleIdle();
    }, 2500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2.5, duration: 0.8, ease: "easeOut" }}
      className="fixed bottom-4 right-4 z-50 flex flex-col items-center"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Speech bubble */}
      <SpeechBubble message={currentMessage} visible={showBubble || isHovered} />

      {/* Draggable robot container */}
      <motion.div
        drag
        dragSnapToOrigin
        dragElastic={0.6}
        dragTransition={{ bounceStiffness: 300, bounceDamping: 15 }}
        onDragStart={handleDragStart}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        animate={isHovered && !isDragging ? { scale: 1.08 } : { scale: 1 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative w-48 h-48 cursor-grab active:cursor-grabbing"
      >
        <Canvas
          camera={{ position: [0, 0.5, 4], fov: 40 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent", pointerEvents: "none" }}
        >
          <ambientLight intensity={0.6} />
          <directionalLight position={[3, 3, 5]} intensity={1.2} color="#ffffff" />
          <directionalLight position={[-2, 1, -3]} intensity={0.4} color="#00e5ff" />
          <pointLight position={[0, -1, 2]} intensity={0.5} color="#7c3aed" />
          <RobotModel
            mousePos={mousePos}
            isDragging={isDragging}
            wiggleIntensity={wiggleIntensity}
          />
        </Canvas>

        {/* Glow ring */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-32 h-5 rounded-full bg-cyan/15 blur-lg pointer-events-none" />

        {/* Dare label */}
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.3 }}
          transition={{ delay: 4, duration: 1.5 }}
          className="absolute -top-1 left-1/2 -translate-x-1/2 text-[9px] font-[family-name:var(--font-mono)] text-cyan whitespace-nowrap pointer-events-none select-none tracking-wider"
        >
          psst... try dragging me
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

useGLTF.preload("/ai_robot.glb");
