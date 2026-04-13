import React from "react";
import { cn } from "@/src/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "inverted";
  size?: "sm" | "md" | "lg" | "icon";
  children?: React.ReactNode;
  className?: string;
}

export const Button = ({ 
  children, 
  className, 
  variant = "primary", 
  size = "md", 
  ...props 
}: ButtonProps) => {
  const variants = {
    primary: "bg-primary text-white hover:bg-primary/90",
    secondary: "bg-secondary text-white hover:bg-secondary/90",
    outline: "border border-black/10 hover:bg-black/5",
    ghost: "hover:bg-black/5",
    inverted: "bg-[#1A1C1E] text-white hover:bg-[#1A1C1E]/90",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3",
    lg: "px-8 py-4 text-lg",
    icon: "p-3",
  };

  return (
    <button 
      className={cn(
        "rounded-2xl font-medium transition-all active:scale-95 flex items-center justify-center gap-2",
        variants[variant],
        sizes[size],
        className
      )} 
      {...props}
    >
      {children}
    </button>
  );
};
