import React, { useState, useEffect } from "react";
import { Play, Pause, RotateCcw, SkipForward, CheckCircle2, Music, Zap } from "lucide-react";
import { ProgressRing } from "@/src/components/ui/ProgressRing";
import { Button } from "@/src/components/ui/Button";
import { Card } from "@/src/components/ui/Card";
import { motion } from "motion/react";

export const FocusMode = () => {
  const [timeLeft, setTimeLeft] = useState(25 * 60);
  const [isActive, setIsActive] = useState(false);
  const [session, setSession] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      // Handle session completion
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const toggleTimer = () => setIsActive(!isActive);
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(25 * 60);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const progress = ((25 * 60 - timeLeft) / (25 * 60)) * 100;

  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-12">
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
          <Zap size={14} fill="currentColor" />
          Deep Cognitive Flow
        </div>
        <h3 className="text-5xl font-display font-extrabold mb-2">Self-study Programming</h3>
        <p className="text-neutral">Python Algorithms & Data Structures</p>
      </div>

      <div className="relative mb-16">
        <ProgressRing value={progress} size={400} strokeWidth={12} color="#2E7D32">
          <div className="text-center">
            <span className="text-8xl font-display font-medium tracking-tighter">
              {formatTime(timeLeft)}
            </span>
            <p className="text-neutral mt-2 font-medium">Session {session} of 4</p>
          </div>
        </ProgressRing>
      </div>

      <div className="flex items-center gap-8 mb-16">
        <div className="flex flex-col items-center gap-2">
          <button onClick={resetTimer} className="p-4 rounded-full bg-gray-100 text-neutral hover:bg-gray-200 transition-all">
            <RotateCcw size={24} />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral">Reset</span>
        </div>

        <button 
          onClick={toggleTimer}
          className="w-24 h-24 rounded-full bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all"
        >
          {isActive ? <Pause size={40} fill="currentColor" /> : <Play size={40} fill="currentColor" className="ml-2" />}
        </button>

        <div className="flex flex-col items-center gap-2">
          <button className="p-4 rounded-full bg-gray-100 text-neutral hover:bg-gray-200 transition-all">
            <SkipForward size={24} />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-neutral">Skip</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        <Card className="p-8">
          <h4 className="font-bold mb-6">Session Goal</h4>
          <ul className="space-y-4">
            <li className="flex items-center gap-3 text-sm">
              <CheckCircle2 size={20} className="text-secondary" fill="currentColor" />
              <span className="line-through text-neutral">Complete Linked List reverse function</span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
              <span>Update project README</span>
            </li>
          </ul>
        </Card>

        <Card className="p-8">
          <div className="flex items-center justify-between mb-6">
            <h4 className="font-bold">Daily Progress</h4>
            <span className="text-xs font-bold text-secondary">75%</span>
          </div>
          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden mb-6">
            <div className="h-full bg-secondary w-3/4" />
          </div>
          <p className="text-xs text-neutral leading-relaxed">
            You've completed 4.5 hours of deep focus today. Almost at your target!
          </p>
        </Card>
      </div>

      <div className="mt-12 flex items-center gap-4">
        <Button variant="outline" size="sm" className="bg-white">
          <Music size={16} />
          Lo-fi Chill
        </Button>
        <Button variant="outline" size="sm" className="bg-white">
          <Zap size={16} />
          Zen Mode
        </Button>
      </div>
    </div>
  );
};
