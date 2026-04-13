import React from "react";
import { cn } from "@/src/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn("bg-white rounded-3xl p-6 shadow-sm border border-black/5", className)} 
      {...props}
    >
      {children}
    </div>
  );
};
