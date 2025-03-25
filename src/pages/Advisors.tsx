
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Mail, Phone, Users, Calendar, Award, Star, ThumbsUp } from "lucide-react";

interface Advisor {
  id: number;
  name: string;
  position: string;
  avatar: string;
  email: string;
  phone: string;
  clients: number;
  rating: number;
  specialties: string[];
  status: "active" | "on leave" | "training";
  joinDate: string;
}

const advisors: Advisor[] = [
  {
    id: 1,
    name: "Emily Richardson",
    position: "Senior Financial Advisor",
    avatar: "ER",
    email: "emily.richardson@example.com",
    phone: "(555) 123-4567",
    clients: 28,
    rating: 4.9,
    specialties: ["Retirement Planning", "Investment Management", "Estate Planning"],
    status: "active",
    joinDate: "Mar 15, 2020",
  },
  {
    id: 2,
    name: "Daniel Morgan",
    position: "Wealth Management Advisor",
    avatar: "DM",
    email: "daniel.morgan@example.com",
    phone: "(555) 234-5678",
    clients: 22,
    rating: 4.7,
    specialties: ["Tax Planning", "Portfolio Management", "Wealth Preservation"],
    status: "active",
    joinDate: "Jun 8, 2020",
  },
  {
    id: 3,
    name: "Sophia Chen",
    position: "Investment Advisor",
    avatar: "SC",
    email: "sophia.chen@example.com",
    phone: "(555) 345-6789",
    clients: 19,
    rating: 4.8,
    specialties: ["Risk Management", "Asset Allocation", "College Planning"],
    status: "training",
    joinDate: "Nov 22, 2021",
  },
  {
    id: 4,
    name: "James Wilson",
    position: "Financial Planner",
    avatar: "JW",
    email: "james.wilson@example.com",
    phone: "(555) 456-7890",
    clients: 26,
    rating: 4.6,
    specialties: ["Retirement Income", "Insurance Planning", "Estate Strategies"],
    status: "active",
    joinDate: "Sep 5, 2020",
  },
  {
    id: 5,
    name: "Olivia Martinez",
    position: "Retirement Specialist",
    avatar: "OM",
    email: "olivia.martinez@example.com",
    phone: "(555) 567-8901",
    clients: 24,
    rating: 4.9,
    specialties: ["Retirement Income", "Social Security", "Medicare Planning"],
    status: "on leave",
    joinDate: "Feb 14, 2021",
  },
  {
    id: 6,
    name: "Robert Johnson",
    position: "Estate Planning Advisor",
    avatar: "RJ",
    email: "robert.johnson@example.com",
    phone: "(555) 678-9012",
    clients: 21,
    rating: 4.8,
    specialties: ["Trust Creation", "Legacy Planning", "Business Succession"],
    status: "active",
    joinDate: "May 3, 2021",
  },
];

export default function Advisors() {
  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Advisor Directory</h2>
            <p className="text-muted-foreground">
              View and manage all financial advisors on your team.
            </p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Advisor
          </button>
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Total Advisors</CardTitle>
              <CardDescription>Current team size</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{advisors.length}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Active Advisors</CardTitle>
              <CardDescription>Currently working</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {advisors.filter(a => a.status === "active").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Client-Advisor Ratio</CardTitle>
              <CardDescription>Average clients per advisor</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {Math.round(advisors.reduce((sum, advisor) => sum + advisor.clients, 0) / advisors.length)}:1
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor) => (
            <Card key={advisor.id} className="overflow-hidden glass-card hover:shadow-md transition-all hover:translate-y-[-2px]">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {advisor.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{advisor.name}</CardTitle>
                      <CardDescription>{advisor.position}</CardDescription>
                    </div>
                  </div>
                  <StatusBadge
                    variant={
                      advisor.status === "active"
                        ? "success"
                        : advisor.status === "on leave"
                        ? "warning"
                        : "info"
                    }
                  >
                    {advisor.status === "active"
                      ? "Active"
                      : advisor.status === "on leave"
                      ? "On Leave"
                      : "Training"}
                  </StatusBadge>
                </div>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{advisor.email}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{advisor.phone}</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{advisor.clients} active clients</span>
                    </div>
                    <div className="flex items-center text-sm">
                      <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>Joined {advisor.joinDate}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <Award className="h-4 w-4 mr-2 text-primary" />
                      <span className="text-sm font-medium">Specialties</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {advisor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors bg-secondary text-secondary-foreground"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <ThumbsUp className="h-4 w-4 mr-1 text-muted-foreground" />
                      <span className="text-sm">Client Satisfaction:</span>
                    </div>
                    <div className="flex items-center">
                      <span className="text-sm font-medium mr-1">{advisor.rating}</span>
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3.5 w-3.5 ${
                              i < Math.floor(advisor.rating)
                                ? "text-amber-500 fill-amber-500"
                                : i < advisor.rating
                                ? "text-amber-500 fill-amber-500 opacity-50"
                                : "text-muted-foreground"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 py-2">
                  View Details
                </button>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9">
                    <Mail className="h-4 w-4" />
                    <span className="sr-only">Email</span>
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 w-9">
                    <Phone className="h-4 w-4" />
                    <span className="sr-only">Call</span>
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-3 py-2">
                    Schedule
                  </button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
