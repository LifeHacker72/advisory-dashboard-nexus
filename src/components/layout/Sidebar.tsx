
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Users, 
  UserCog, 
  UserPlus, 
  ListTodo, 
  LayoutDashboard, 
  ChevronLeft, 
  ChevronRight, 
  LogOut,
  Calendar,
  BookOpen,
  Contact
} from "lucide-react";
import { cn } from "@/lib/utils";

type NavItem = {
  title: string;
  path: string;
  icon: React.ElementType;
  badge?: number;
};

const navItems: NavItem[] = [
  {
    title: "Members",
    path: "/clients",
    icon: Users,
    badge: 24,
  },
  {
    title: "Advisors",
    path: "/advisors",
    icon: UserCog,
  },
  {
    title: "Member Activation",
    path: "/activation",
    icon: UserPlus,
    badge: 3,
  },
  {
    title: "Pending Tasks",
    path: "/pending-tasks",
    icon: ListTodo,
    badge: 12,
  },
  {
    title: "Meetings",
    path: "/meetings",
    icon: Calendar,
    badge: 10,
  },
  {
    title: "Bookings",
    path: "/bookings",
    icon: BookOpen,
    badge: 7,
  },
  {
    title: "Contacts",
    path: "/all-clients",
    icon: Contact,
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <aside 
      className={cn(
        "h-screen sticky top-0 z-30 flex flex-col bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex h-16 items-center border-b border-sidebar-border px-4">
        <div className={cn("flex items-center gap-2 transition-all", 
          collapsed ? "opacity-0 invisible" : "opacity-100 visible")}>
          <img 
            src="/lovable-uploads/41ecb4d5-7496-44d5-b398-b0b1022b150f.png" 
            alt="Turtle Logo" 
            className="h-8" 
          />
        </div>
        <button 
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "h-8 w-8 rounded-md hover:bg-sidebar-accent flex items-center justify-center transition-transform",
            collapsed ? "ml-auto rotate-180" : "ml-auto"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>
      
      <nav className="flex-1 overflow-y-auto p-2 pt-5">
        <ul className="space-y-2">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={cn(
                  "flex items-center rounded-md px-3 py-2 text-sm transition-colors",
                  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  location.pathname === item.path ? 
                    "bg-sidebar-accent text-sidebar-accent-foreground font-medium" : 
                    "text-sidebar-foreground",
                  collapsed ? "justify-center" : "justify-start"
                )}
              >
                <item.icon className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-2")} />
                {!collapsed && (
                  <span className="animate-slide-in">{item.title}</span>
                )}
                {!collapsed && item.badge && (
                  <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-black">
                    {item.badge}
                  </span>
                )}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="mt-auto border-t border-sidebar-border p-2">
        <div className="space-y-2">
          <button 
            className={cn(
              "w-full flex items-center rounded-md px-3 py-2 text-sm transition-colors",
              "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              "text-sidebar-foreground",
              collapsed ? "justify-center" : "justify-start"
            )}
          >
            <LogOut className={cn("h-5 w-5", collapsed ? "mx-0" : "mr-2")} />
            {!collapsed && <span>Log Out</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
