
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import Sidebar from "./Sidebar";
import { Bell, User, Search } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

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
        setPageTitle("Client Management");
        break;
      case "/advisors":
        setPageTitle("Advisor Directory");
        break;
      case "/activation":
        setPageTitle("Client Activation");
        break;
      case "/tasks":
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
        <header className="sticky top-0 z-20 flex h-16 items-center gap-4 border-b border-border bg-background/95 backdrop-blur-md px-6">
          <div className="flex-1">
            <h1 className="text-xl font-semibold tracking-tight">{pageTitle}</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-1 md:gap-2">
            <Tabs defaultValue="all">
              <TabsList className="h-8">
                <TabsTrigger value="all" className="text-xs">All</TabsTrigger>
                <TabsTrigger value="active" className="text-xs">Active</TabsTrigger>
                <TabsTrigger value="archived" className="text-xs">Archived</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
          
          <div className="flex items-center gap-2">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <input
                type="search"
                placeholder="Search..."
                className="rounded-md border border-input bg-background pl-8 pr-3 py-1.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            
            <button className="relative rounded-full h-9 w-9 flex items-center justify-center border border-input bg-background hover:bg-accent transition-colors">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1.5 h-2 w-2 rounded-full bg-primary"></span>
            </button>
            
            <button className="rounded-full h-9 w-9 flex items-center justify-center border border-input bg-background overflow-hidden hover:ring-2 hover:ring-ring transition-all">
              <User className="h-5 w-5" />
            </button>
          </div>
        </header>
        
        <div id="main-content" className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}
