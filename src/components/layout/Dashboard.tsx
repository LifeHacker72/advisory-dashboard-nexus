
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const location = useLocation();
  const [pageTitle, setPageTitle] = useState("Dashboard");
  
  useEffect(() => {
    switch (location.pathname) {
      case "/":
        setPageTitle("Dashboard");
        break;
      case "/clients":
        setPageTitle("Member Management");
        break;
      case "/all-clients":
        setPageTitle("Contact Management");
        break;
      case "/advisors":
        setPageTitle("Turtle Advisors");
        break;
      case "/activation":
        setPageTitle("Member Activation");
        break;
      case "/meetings":
        setPageTitle("Meetings");
        break;
      case "/bookings":
        setPageTitle("Bookings");
        break;
      case "/pending-tasks":
        setPageTitle("Pending Tasks");
        break;
      default:
        setPageTitle("Dashboard");
    }

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
        <header className="sticky top-0 z-20 flex h-16 items-center border-b border-border bg-background/95 backdrop-blur-md px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold tracking-tight">{pageTitle}</h1>
          </div>
        </header>
        
        <div id="main-content" className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
