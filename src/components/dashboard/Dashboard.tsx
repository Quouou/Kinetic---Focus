import React, { useEffect, useState } from "react";
import { Play, Plus, Code, PenTool, Braces, BookOpen } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { Button } from "@/src/components/ui/Button";
import { ProgressRing } from "@/src/components/ui/ProgressRing";
import { DashboardData } from "@/src/types";
import { motion } from "motion/react";
import { cn } from "@/src/lib/utils";

export const Dashboard = () => {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    fetch("/api/dashboard")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8">Loading dashboard...</div>;

  const getIcon = (name: string) => {
    switch (name) {
      case "code": return <Code size={20} className="text-primary" />;
      case "pen-tool": return <PenTool size={20} className="text-secondary" />;
      case "braces": return <Braces size={20} className="text-tertiary" />;
      default: return <BookOpen size={20} />;
    }
  };

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Current Session Hero */}
        <Card className="lg:col-span-8 bg-gradient-to-br from-primary to-[#003B91] text-white p-8 relative overflow-hidden flex flex-col justify-between min-h-[300px]">
          <div className="relative z-10">
            <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-2">Current Session</p>
            <h3 className="text-4xl font-display font-bold mb-6">Programming - 2 hours</h3>
            <div className="flex items-center gap-4">
              <Button variant="outline" className="bg-white text-primary border-none hover:bg-white/90">
                <Play size={16} fill="currentColor" />
                Resume Focus
              </Button>
              <p className="text-sm opacity-80">1h 12m completed today</p>
            </div>
          </div>
          
          {/* Decorative background curves */}
          <div className="absolute top-0 right-0 w-1/2 h-full opacity-20">
            <svg viewBox="0 0 200 200" className="w-full h-full">
              <path d="M0,100 C50,150 150,50 200,100 L200,0 L0,0 Z" fill="white" />
            </svg>
          </div>
        </Card>

        {/* Focus Score */}
        <Card className="lg:col-span-4 flex flex-col items-center justify-center text-center p-8">
          <h4 className="text-lg font-semibold mb-6">Focus Score</h4>
          <ProgressRing value={data.focusScore} size={180} strokeWidth={16} color="#2E7D32">
            <span className="text-4xl font-display font-bold">{data.focusScore}</span>
            <span className="text-xs font-bold text-secondary uppercase tracking-widest">Excellent</span>
          </ProgressRing>
          <p className="text-sm text-neutral mt-6 max-w-[200px]">
            You've maintained deep focus for 4 sessions without interruption.
          </p>
          <Button variant="outline" size="sm" className="mt-6 w-full">
            View Detailed Insights
          </Button>
        </Card>
      </div>

      {/* Daily Momentum */}
      <Card className="p-8">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h4 className="text-lg font-semibold">Daily Momentum</h4>
            <p className="text-sm text-neutral">You're 72% of the way to your goal.</p>
          </div>
          <p className="text-2xl font-display font-bold text-secondary">
            {data.dailyMomentum.current} / {data.dailyMomentum.target} hrs
          </p>
        </div>
        <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <motion.div 
            className="h-full bg-gradient-to-r from-secondary to-[#4CAF50]"
            initial={{ width: 0 }}
            animate={{ width: `${(data.dailyMomentum.current / data.dailyMomentum.target) * 100}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </Card>

      {/* Upcoming Tracks */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h4 className="text-xl font-display font-bold">Upcoming Tracks</h4>
          <button className="flex items-center gap-2 text-primary font-semibold hover:underline">
            Add New Subject <Plus size={18} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.upcomingTracks.map((track) => (
            <Card key={track.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer group">
              <div className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center mb-4",
                track.icon === "code" ? "bg-primary/10" : 
                track.icon === "pen-tool" ? "bg-secondary/10" : "bg-tertiary/10"
              )}>
                {getIcon(track.icon)}
              </div>
              <h5 className="font-bold mb-1 group-hover:text-primary transition-colors">{track.title}</h5>
              <p className="text-xs text-neutral mb-6">{track.subtitle}</p>
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-gray-100 px-2 py-1 rounded-md">
                  {track.day}
                </span>
                <span className="text-sm font-bold text-primary">{track.time}</span>
              </div>
            </Card>
          ))}
          <Card className="p-6 border-dashed border-2 bg-transparent flex flex-col items-center justify-center text-center opacity-60 hover:opacity-100 transition-opacity cursor-pointer">
            <BookOpen size={24} className="text-neutral mb-2" />
            <p className="text-sm font-medium">Plan Free Block</p>
          </Card>
        </div>
      </div>
    </div>
  );
};
