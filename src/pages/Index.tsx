
import { Users, UserCog, UserPlus, ListTodo, CalendarDays, PhoneCall, Brain } from "lucide-react";
import DashboardLayout from "@/components/layout/Dashboard";
import { MetricCard } from "@/components/shared/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";

const openTasks = [
  {
    id: 1,
    client: "John Smith",
    summary: "Update investment portfolio based on market changes",
    dueDate: "Jul 12, 2023",
    priority: "high",
  },
  {
    id: 2,
    client: "Sarah Johnson",
    summary: "Review retirement planning options discussed in last call",
    dueDate: "Jul 15, 2023",
    priority: "medium",
  },
  {
    id: 3,
    client: "Robert Davis",
    summary: "Send tax planning document as requested",
    dueDate: "Jul 18, 2023",
    priority: "medium",
  },
  {
    id: 4,
    client: "Michael Wilson",
    summary: "Follow up on insurance policy questions",
    dueDate: "Jul 20, 2023",
    priority: "low",
  },
  {
    id: 5,
    client: "Lisa Anderson",
    summary: "Schedule quarterly review meeting",
    dueDate: "Jul 22, 2023",
    priority: "high",
  },
];

const upcomingCalls = [
  {
    id: 1,
    client: "Emma Thompson",
    type: "Quarterly Review",
    date: "Today",
    time: "11:00 AM",
  },
  {
    id: 2,
    client: "James Wilson",
    type: "Initial Consultation",
    date: "Today",
    time: "2:30 PM",
  },
  {
    id: 3,
    client: "Michael Scott",
    type: "Portfolio Review",
    date: "Tomorrow",
    time: "10:00 AM",
  },
  {
    id: 4,
    client: "Jennifer Davis",
    type: "Retirement Planning",
    date: "Wed, Jul 12",
    time: "1:45 PM",
  },
  {
    id: 5,
    client: "Robert Brown",
    type: "Tax Strategy",
    date: "Thu, Jul 13",
    time: "9:30 AM",
  },
];

export default function Index() {
  return (
    <DashboardLayout>
      <div className="space-y-8 animate-fade-in">
        <div>
          <h2 className="text-xl font-semibold tracking-tight">Welcome back, Jordan</h2>
          <p className="text-muted-foreground">Here's an overview of your advisory services.</p>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MetricCard 
            title="Total Clients" 
            value="164" 
            trend={{ value: 12, isPositive: true, label: "vs last month" }}
            icon={<Users className="h-5 w-5 text-primary" />}
            variant="primary"
          />
          <MetricCard 
            title="Active Advisors" 
            value="27" 
            trend={{ value: 4, isPositive: true, label: "vs last month" }}
            icon={<UserCog className="h-5 w-5 text-green-600" />}
            variant="success"
          />
          <MetricCard 
            title="Pending Onboarding" 
            value="8" 
            trend={{ value: 3, isPositive: false, label: "vs last month" }}
            icon={<UserPlus className="h-5 w-5 text-amber-600" />}
            variant="warning"
          />
          <MetricCard 
            title="Open Tasks" 
            value="34" 
            trend={{ value: 8, isPositive: false, label: "vs last month" }}
            icon={<ListTodo className="h-5 w-5 text-destructive" />}
            variant="danger"
          />
        </div>
        
        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-4 glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <PhoneCall className="h-5 w-5 mr-2 text-primary" />
                Upcoming Calls
              </CardTitle>
              <CardDescription>Next 5 scheduled client calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {upcomingCalls.map((call) => (
                  <div key={call.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent/50 transition-colors">
                    <div className="space-y-1">
                      <p className="font-medium">{call.client}</p>
                      <p className="text-sm text-muted-foreground">{call.type}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge 
                        variant={call.date === "Today" ? "primary" : "outline"}
                      >
                        {call.date}
                      </StatusBadge>
                      <p className="text-sm mt-1">{call.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3 glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Brain className="h-5 w-5 mr-2 text-primary" />
                Open Tasks List
              </CardTitle>
              <CardDescription>AI-generated from call transcripts</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {openTasks.map((task) => (
                  <div key={task.id} className="flex items-start p-2 hover:bg-accent/50 rounded-md transition-colors">
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{task.client}</p>
                        <StatusBadge 
                          variant={
                            task.priority === "high" ? "danger" : 
                            task.priority === "medium" ? "warning" : "success"
                          }
                        >
                          {task.priority === "high" ? "High" : 
                           task.priority === "medium" ? "Medium" : "Low"}
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-muted-foreground">{task.summary}</p>
                      <p className="text-xs text-muted-foreground">Due: {task.dueDate}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
