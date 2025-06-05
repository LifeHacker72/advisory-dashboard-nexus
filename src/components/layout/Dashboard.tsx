
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();

  useEffect(() => {
    // Add entrance animation to the main content
    const mainContent = document.getElementById("main-content");
    if (mainContent) {
      mainContent.classList.add("animate-fade-in");
      const onAnimationEnd = () => {
        mainContent.classList.remove("animate-fade-in");
        mainContent.removeEventListener("animationend", onAnimationEnd);
      };
      mainContent.addEventListener("animationend", onAnimationEnd);
    }
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      
      <main className="flex-1 overflow-x-hidden">
        <div id="main-content" className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
