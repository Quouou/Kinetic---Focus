/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Sidebar } from "@/src/components/layout/Sidebar";
import { Header } from "@/src/components/layout/Header";
import { Dashboard } from "@/src/components/dashboard/Dashboard";
import { FocusMode } from "@/src/components/focus/FocusMode";
import { Stats } from "@/src/components/stats/Stats";
import { View } from "@/src/types";
import { motion, AnimatePresence } from "motion/react";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");

  const renderView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard />;
      case "focus":
        return <FocusMode />;
      case "stats":
        return <Stats />;
      case "settings":
        return (
          <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
            <h3 className="text-2xl font-display font-bold mb-2">Settings</h3>
            <p className="text-neutral">Configure your kinetic experience.</p>
          </div>
        );
      default:
        return <Dashboard />;
    }
  };

  const getTitle = () => {
    switch (currentView) {
      case "dashboard": return "Dashboard";
      case "focus": return "Focus Mode";
      case "stats": return "Stats";
      case "settings": return "Settings";
      default: return "Dashboard";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#F4F5F7]">
      <Sidebar currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="flex-1 p-8 max-w-7xl mx-auto w-full">
        <Header title={getTitle()} />
        
        <AnimatePresence mode="wait">
          <motion.div
            key={currentView}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {renderView()}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
