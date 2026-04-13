import React, { useState } from "react";
import { LayoutDashboard, Timer, BarChart2, Settings, Menu, X } from "lucide-react";
import { cn } from "@/src/lib/utils";
import { View } from "@/src/types";
import { Button } from "@/src/components/ui/Button";

interface SidebarProps {
  currentView: View;
  onViewChange: (view: View) => void;
}

export const Sidebar = ({ currentView, onViewChange }: SidebarProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "focus", label: "Focus Mode", icon: Timer },
    { id: "stats", label: "Stats", icon: BarChart2 },
  ] as const;

  const handleViewChange = (view: View) => {
    onViewChange(view);
    setIsOpen(false);
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 p-2 bg-white rounded-xl shadow-sm border border-black/5"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      <aside className={cn(
        "fixed lg:sticky top-0 left-0 z-40 w-64 bg-[#E8E9ED] h-screen flex flex-col p-6 transition-transform duration-300 lg:translate-x-0",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm" />
          </div>
          <h1 className="text-xl font-display font-bold text-primary">Kinetic</h1>
        </div>

        <div className="flex items-center gap-3 mb-10 p-2">
          <div className="w-10 h-10 rounded-full bg-neutral/20 overflow-hidden">
            <img 
              src="https://picsum.photos/seed/user/100/100" 
              alt="User" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Focus Curator</p>
            <p className="text-xs text-neutral">Stay Kinetic</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleViewChange(item.id as View)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all",
                currentView === item.id 
                  ? "bg-white text-primary shadow-sm" 
                  : "text-neutral hover:bg-white/50"
              )}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto space-y-4">
          <Button variant="primary" className="w-full">
            Check-in
          </Button>
          <button 
            onClick={() => handleViewChange("settings")}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-neutral hover:bg-white/50 transition-all",
              currentView === "settings" && "bg-white text-primary shadow-sm"
            )}
          >
            <Settings size={20} />
            <span className="font-medium">Settings</span>
          </button>
        </div>
      </aside>
    </>
  );
};
