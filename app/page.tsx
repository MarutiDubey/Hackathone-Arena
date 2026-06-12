"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  Terminal,
  Clock,
  ChevronRight,
  Shield,
  Sparkles,
  Trophy,
  Users,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGameStore } from "@/store/gameStore";
import { playMutedClick, playSubtleHover } from "@/lib/sound";
import { PROBLEMS } from "@/data/problems";
import { JUDGES } from "@/data/judges";
import { TECH_POOL } from "@/data/techItems";
import { Magnetic } from "@/components/ui/Magnetic";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};

export default function LandingPage() {
  const router = useRouter();
  const resetGame = useGameStore((s) => s.resetGame);
  const setGameMode = useGameStore((s) => s.setGameMode);

  const [isLocal, setIsLocal] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsLocal(
        window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1"
      );
    }
  }, []);

  const handleLaunch = () => {
    playMutedClick();
    resetGame();
    setGameMode("classic");
    router.push("/game");
  };

  const handleDebugSkip = () => {
    playMutedClick();
    
    // Pick a random problem
    const randomProblem = PROBLEMS[Math.floor(Math.random() * PROBLEMS.length)];
    
    // Mock tech
    const nextTech = TECH_POOL.find(t => t.id === 'tech-next') || {
      id: 'tech-next', name: 'Next.js', icon: 'layers', category: 'frontend', difficulty: 2, synergies: [],
    };
    const nodeTech = TECH_POOL.find(t => t.id === 'tech-node') || {
      id: 'tech-node', name: 'Node.js', icon: 'server', category: 'backend', difficulty: 2, synergies: [],
    };
    const vercelTech = TECH_POOL.find(t => t.id === 'tech-vercel') || {
      id: 'tech-vercel', name: 'Vercel', icon: 'cloud', category: 'devops', difficulty: 1, synergies: [],
    };
    const postgresTech = TECH_POOL.find(t => t.id === 'tech-postgres') || {
      id: 'tech-postgres', name: 'PostgreSQL', icon: 'database', category: 'database', difficulty: 3, synergies: [],
    };

    const mockTechStack = [nextTech, nodeTech, vercelTech, postgresTech] as any[];

    // Pick a judge
    const mockJudge = JUDGES[0] || {
      id: 'judge-builder', name: 'Manthan Dubey', avatar: '🔥', title: 'Developer', personality: 'technical',
    };

    // Features
    const mockFeatures = [
      { id: 'feat-1', name: 'Core Adaptation Engine', description: 'Dynamically adapts user experience.', effort: 'high', impact: 'high' },
      { id: 'feat-2', name: 'Real-Time Telemetry Dashboard', description: 'Sleek visual representation.', effort: 'medium', impact: 'high' },
    ] as any[];

    // Update the Zustand store
    useGameStore.setState({
      stage: 'results',
      phase: 'RESULTS',
      isGameStarted: true,
      isGameOver: true,
      isTimerPaused: true,
      selectedProblem: randomProblem,
      solutionDirection: `We built a web application powered by a Next.js frontend combined with a robust Node.js server.`,
      techStack: mockTechStack,
      usp: 'Ultra-low latency real-time telemetry rendering.',
      features: mockFeatures,
      mentorName: 'Dr. Priya Kapoor',
      businessModel: 'SaaS monthly subscriptions.',
      pitchText: `Our product solves the core problems of ${randomProblem.title}.`,
      score: { innovation: 23, execution: 24, design: 21, pitch: 22, bonus: 5, total: 95 },
      currentJudge: mockJudge as any,
      judgeFeedback: [{ judgeId: mockJudge.id, score: 95, comment: `Superb execution!`, highlight: 'Outstanding code quality.' }],
      chaosHistory: ['api-rate-limit-resolved'],
      difficulty: 'easy',
      gameMode: 'classic',
      activeModifiers: []
    });

    router.push("/game");
  };

  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);

  return (
    <div className="relative min-h-screen flex flex-col overflow-x-hidden bg-[#050505] text-neutral-100 font-sans selection:bg-neutral-800 selection:text-white">
      <AnimatedBackground />

      {/* Navigation Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 backdrop-blur-md bg-[#050505]/40 border-b border-white/5 select-none transition-all duration-300">
        <Magnetic strength={0.2}>
          <Link href="/" className="flex items-center gap-3 group cursor-hover-target">
            <div className="p-2 rounded-xl bg-white/5 border border-white/10 text-white group-hover:bg-white/10 group-hover:border-white/20 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(255,255,255,0.1)]">
              <Terminal className="w-5 h-5" />
            </div>
            <span className="font-sans font-extrabold text-sm tracking-[0.2em] text-white">
              HACKATHON ARENA
            </span>
          </Link>
        </Magnetic>
        <Magnetic strength={0.2}>
          <div className="cursor-hover-target px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="text-[10px] text-neutral-400 font-mono tracking-widest font-bold">
              v2.4.0 <span className="text-emerald-400 mx-1">•</span> STABLE
            </span>
          </div>
        </Magnetic>
      </nav>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-start px-6 pt-36 pb-24 max-w-6xl mx-auto w-full space-y-24">
        
        {/* Core Hero Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-4xl mx-auto space-y-8 flex flex-col items-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center">
            <Magnetic strength={0.1}>
              <div className="cursor-hover-target inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-neutral-300 text-[10px] font-bold tracking-[0.2em] uppercase select-none shadow-[0_0_30px_rgba(255,255,255,0.03)] hover:bg-white/10 transition-colors">
                <Sparkles className="w-3.5 h-3.5 text-neutral-100" />
                <span>Next-Gen Strategy Simulator</span>
              </div>
            </Magnetic>
          </motion.div>

          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-7xl lg:text-8xl font-black font-sans tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/30 uppercase leading-[1.1] pb-2"
          >
            Build. Ship.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-neutral-400 to-neutral-600 font-light italic tracking-tight">Survive.</span>
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-sm sm:text-base lg:text-lg text-neutral-400 font-sans font-light leading-relaxed max-w-2xl mx-auto"
          >
            Experience a complete hackathon journey from problem discovery to final judging. 
            Build your project under time pressure, collaborate with AI-powered teammates, 
            survive mentor reviews, and defend your decisions.
          </motion.p>

          <motion.div variants={itemVariants} className="pt-6 flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
            <Magnetic strength={0.3}>
              <Button
                onClick={handleLaunch}
                onMouseEnter={playSubtleHover}
                className="cursor-hover-target h-14 px-8 bg-white text-black hover:bg-neutral-200 font-bold tracking-[0.1em] text-sm rounded-full focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none flex items-center justify-center gap-3 transition-all shadow-[0_0_40px_rgba(255,255,255,0.15)] hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] hover:scale-105 active:scale-95 w-full sm:w-auto"
              >
                START BUILDING
                <ChevronRight className="w-4 h-4" />
              </Button>
            </Magnetic>

            {isLocal && (
              <Magnetic strength={0.2}>
                <button
                  onClick={handleDebugSkip}
                  className="cursor-hover-target h-14 px-8 text-neutral-400 hover:text-white font-mono text-[10px] uppercase font-bold tracking-widest rounded-full border border-white/10 hover:border-white/30 hover:bg-white/5 transition-all w-full sm:w-auto flex items-center justify-center gap-2"
                >
                  <Terminal className="w-4 h-4" />
                  Skip to Demo
                </button>
              </Magnetic>
            )}
          </motion.div>
        </motion.div>

        {/* Bento Grid Section */}
        <div className="w-full relative z-20">
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-4 auto-rows-[280px]"
          >
            {/* Bento 1: Large Feature */}
            <Magnetic strength={0.05} className="md:col-span-2 md:row-span-2 w-full h-full block">
              <div className="cursor-hover-target relative w-full h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group hover:bg-white/[0.07] transition-all duration-500 flex flex-col justify-between">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-[80px] -mr-20 -mt-20 group-hover:bg-white/10 transition-colors duration-500" />
                <div className="relative z-10 space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center border border-white/20 mb-6">
                    <Clock className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold tracking-tight text-white">Real-Time Pressure</h3>
                  <p className="text-neutral-400 font-light leading-relaxed max-w-md text-sm">
                    Navigate the core loop: Problem Selection → Tech Stack → USP → Backlog → Pitch Deck → Mentor Review. The clock is always ticking. Every decision impacts your final score.
                  </p>
                </div>
                
                {/* Decorative element */}
                <div className="relative w-full h-32 mt-8 rounded-xl border border-white/10 bg-black/40 overflow-hidden">
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] w-[200%] animate-[slide_3s_linear_infinite]" />
                  <div className="absolute top-1/2 left-4 right-4 h-0.5 bg-white/10">
                    <div className="h-full bg-white/50 w-1/3 rounded-full" />
                  </div>
                </div>
              </div>
            </Magnetic>

            {/* Bento 2 */}
            <Magnetic strength={0.05} className="w-full h-full block">
              <div className="cursor-hover-target w-full h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group hover:bg-white/[0.07] transition-all duration-500 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 mb-4">
                  <Users className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white mb-2">AI Teammates</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-xs">
                  Collaborate with specialists who review your architecture, critique your designs, and challenge your business model.
                </p>
              </div>
            </Magnetic>

            {/* Bento 3 */}
            <Magnetic strength={0.05} className="w-full h-full block">
              <div className="cursor-hover-target w-full h-full p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md overflow-hidden group hover:bg-white/[0.07] transition-all duration-500 flex flex-col">
                <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center border border-white/20 mb-4">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <h3 className="text-lg font-bold tracking-tight text-white mb-2">Final Judging</h3>
                <p className="text-neutral-400 font-light leading-relaxed text-xs">
                  Face unique judges who evaluate your technical execution, market fit, and presentation flow.
                </p>
              </div>
            </Magnetic>

            {/* Bento 4: Wide feature */}
            <Magnetic strength={0.05} className="md:col-span-3 w-full h-[200px] block">
              <div className="cursor-hover-target w-full h-full p-8 rounded-3xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-md overflow-hidden group hover:from-white/10 hover:to-white/15 transition-all duration-500 flex flex-col md:flex-row items-center justify-between">
                <div className="space-y-4 max-w-2xl">
                  <div className="flex items-center gap-3">
                    <Trophy className="w-6 h-6 text-white" />
                    <h3 className="text-2xl font-bold tracking-tight text-white">Dynamic Project Builder</h3>
                  </div>
                  <p className="text-neutral-400 font-light leading-relaxed text-sm">
                    Generate problems, USPs, feature backlogs, business models, and pitch structures perfectly tailored to your strategy. Over 100+ tech combinations.
                  </p>
                </div>
                <div className="hidden md:flex gap-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className={`w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center ${i === 2 ? '-translate-y-4' : ''}`}>
                      <Layers className="w-6 h-6 text-white/40" />
                    </div>
                  ))}
                </div>
              </div>
            </Magnetic>
          </motion.div>
        </div>

      </main>

      {/* Footer */}
      <footer className="relative z-10 w-full py-8 text-center border-t border-white/10 bg-[#050505]/80 backdrop-blur-xl select-none mt-auto">
        <div className="flex items-center justify-center gap-3">
          <Terminal className="w-4 h-4 text-neutral-500" />
          <span className="text-[10px] tracking-[0.2em] text-neutral-500 uppercase font-bold">
            Hackathon Arena <span className="opacity-50">v2.4</span> — Client-Side Engine
          </span>
        </div>
      </footer>
    </div>
  );
}
