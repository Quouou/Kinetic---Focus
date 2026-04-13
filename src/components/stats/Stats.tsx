import React, { useEffect, useState } from "react";
import { TrendingUp, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { Card } from "@/src/components/ui/Card";
import { StatsData } from "@/src/types";
import { cn } from "@/src/lib/utils";
import { motion } from "motion/react";

export const Stats = () => {
  const [data, setData] = useState<StatsData | null>(null);

  useEffect(() => {
    fetch("/api/stats")
      .then((res) => res.json())
      .then(setData);
  }, []);

  if (!data) return <div className="p-8">Loading stats...</div>;

  return (
    <div className="space-y-12">
      <div className="max-w-2xl">
        <h3 className="text-5xl font-display font-extrabold mb-4">Performance Gallery</h3>
        <p className="text-neutral text-lg leading-relaxed">
          Visualize your momentum. Your progress is a collection of intentional moments captured across time.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Stats Summary */}
        <div className="lg:col-span-4 space-y-8">
          <Card className="p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">Monthly Total</p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-7xl font-display font-bold">{data.monthlyTotal}</span>
              <span className="text-2xl font-display font-bold text-neutral opacity-20">h</span>
            </div>
            <div className="flex items-center gap-2 text-secondary font-bold text-sm">
              <TrendingUp size={18} />
              <span>{data.monthlyGrowth}% more than last month</span>
            </div>
          </Card>

          <Card className="p-8">
            <p className="text-[10px] font-bold uppercase tracking-widest text-primary mb-4">Daily Average</p>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-6xl font-display font-bold">{data.dailyAverage}</span>
            </div>
            <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-[#004D40]"
                initial={{ width: 0 }}
                animate={{ width: "65%" }}
                transition={{ duration: 1, ease: "easeOut" }}
              />
            </div>
          </Card>
        </div>

        {/* Right Column: Calendar */}
        <Card className="lg:col-span-8 p-8">
          <div className="flex items-center justify-between mb-12">
            <h4 className="text-xl font-display font-bold">Momentum Calendar</h4>
            <div className="flex items-center gap-4">
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-all"><ChevronLeft size={20} /></button>
              <button className="p-1 hover:bg-gray-100 rounded-lg transition-all"><ChevronRight size={20} /></button>
            </div>
          </div>

          <div className="grid grid-cols-7 gap-4 mb-12">
            {data.calendar.map((item, i) => (
              <div key={i} className="text-center">
                <p className="text-[10px] font-bold text-neutral mb-4 tracking-widest">{item.day}</p>
                <div className={cn(
                  "aspect-square rounded-2xl flex flex-col items-center justify-center transition-all",
                  item.status === "completed" ? "bg-[#B2FF59] text-[#1A1C1E]" : "bg-[#E8E9ED] text-neutral"
                )}>
                  <span className="text-sm font-bold">{item.date}</span>
                  {item.status === "completed" && <div className="w-1 h-1 bg-[#1A1C1E] rounded-full mt-1" />}
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-8 border-top border-gray-100">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-1">
                <div className="w-6 h-6 rounded-full bg-[#B2FF59] flex items-center justify-center border-2 border-white">
                  <CheckCircle2 size={12} fill="currentColor" className="text-[#1A1C1E]" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#B2FF59] flex items-center justify-center border-2 border-white">
                  <CheckCircle2 size={12} fill="currentColor" className="text-[#1A1C1E]" />
                </div>
                <div className="w-6 h-6 rounded-full bg-[#E8E9ED] border-2 border-white" />
              </div>
              <p className="text-sm font-medium text-neutral">
                {data.successfulCheckins} Successful Check-ins this month
              </p>
            </div>
            <button className="text-sm font-bold text-primary flex items-center gap-2 hover:underline">
              View History <ChevronRight size={16} />
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
};
