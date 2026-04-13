import React from "react";
import { Settings, Flame } from "lucide-react";
import { Button } from "@/src/components/ui/Button";

interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => {
  return (
    <header className="flex items-center justify-between mb-8 pl-14 lg:pl-0">
      <h2 className="text-2xl font-display font-bold text-primary">{title}</h2>
      
      <div className="flex items-center gap-4">
        <button className="p-2 text-neutral hover:bg-black/5 rounded-full transition-all">
          <Settings size={20} />
        </button>
        
        <div className="flex items-center gap-2 bg-[#E7F3E8] text-secondary px-4 py-2 rounded-full font-semibold text-sm">
          <Flame size={16} fill="currentColor" />
          <span>12 Day Streak</span>
        </div>
      </div>
    </header>
  );
};
