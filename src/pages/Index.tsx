
import { Users, UserCog, UserPlus, ListTodo, CalendarDays, DollarSign, TrendingUp, Users2 } from "lucide-react";
import DashboardLayout from "@/components/layout/Dashboard";
import { MetricCard } from "@/components/shared/MetricCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";

const recentActivities = [
  {
    id: 1,
    user: "John Smith",
    action: "New client activated",
    time: "2 hours ago",
    status: "success",
  },
  {
    id: 2,
    user: "Sarah Johnson",
    action: "Added as new advisor",
    time: "4 hours ago",
    status: "info",
  },
  {
    id: 3,
    user: "Robert Davis",
    action: "Completed onboarding",
    time: "1 day ago",
    status: "success",
  },
  {
    id: 4,
    user: "Michael Wilson",
    action: "Membership renewal",
    time: "2 days ago",
    status: "warning",
  },
  {
    id: 5,
    user: "Lisa Anderson",
    action: "Meeting scheduled",
    time: "3 days ago",
    status: "info",
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
            title="Pending Activations" 
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
              <CardTitle>Monthly Overview</CardTitle>
              <CardDescription>Client acquisitions and renewals</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                Chart will be displayed here
              </div>
            </CardContent>
          </Card>
          
          <Card className="md:col-span-3 glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest updates from your team</CardDescription>
            </CardHeader>
            <CardContent className="px-2">
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-start p-2 hover:bg-accent/50 rounded-md transition-colors">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center mr-3 mt-0.5">
                      {activity.status === "success" && <Users2 className="h-5 w-5 text-green-600" />}
                      {activity.status === "info" && <CalendarDays className="h-5 w-5 text-blue-600" />}
                      {activity.status === "warning" && <DollarSign className="h-5 w-5 text-amber-600" />}
                    </div>
                    <div className="space-y-1 flex-1">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">{activity.user}</p>
                        <StatusBadge 
                          variant={
                            activity.status === "success" ? "success" : 
                            activity.status === "info" ? "info" : "warning"
                          }
                        >
                          {activity.status === "success" ? "New" : 
                           activity.status === "info" ? "Update" : "Renewal"}
                        </StatusBadge>
                      </div>
                      <p className="text-sm text-muted-foreground">{activity.action}</p>
                      <p className="text-xs text-muted-foreground">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <CalendarDays className="h-5 w-5 mr-2 text-primary" />
                Upcoming Sessions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="rounded-lg border border-border p-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Client Onboarding</p>
                    <StatusBadge variant="primary">Today</StatusBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">James Wilson • 11:00 AM</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Quarterly Review</p>
                    <StatusBadge variant="outline">Tomorrow</StatusBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">Emma Thompson • 2:30 PM</p>
                </div>
                <div className="rounded-lg border border-border p-3">
                  <div className="flex justify-between">
                    <p className="font-medium">Investment Planning</p>
                    <StatusBadge variant="outline">Wed, Jul 12</StatusBadge>
                  </div>
                  <p className="text-sm text-muted-foreground">Michael Scott • 10:00 AM</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Client Retention</p>
                  <p className="text-sm font-medium">92%</p>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-green-500" style={{ width: "92%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Advisor Productivity</p>
                  <p className="text-sm font-medium">85%</p>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-blue-500" style={{ width: "85%" }}></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <p className="text-sm">Client Satisfaction</p>
                  <p className="text-sm font-medium">96%</p>
                </div>
                <div className="h-2 rounded-full bg-secondary">
                  <div className="h-2 rounded-full bg-primary" style={{ width: "96%" }}></div>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-amber-600" />
                Revenue Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Monthly Recurring</p>
                  <p className="text-xl font-semibold">$52,400</p>
                </div>
                <div className="rounded-full p-2 bg-green-500/10">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Annual Growth</p>
                  <p className="text-xl font-semibold">23%</p>
                </div>
                <div className="rounded-full p-2 bg-green-500/10">
                  <TrendingUp className="h-4 w-4 text-green-600" />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Average Contract</p>
                  <p className="text-xl font-semibold">$9,840</p>
                </div>
                <div className="rounded-full p-2 bg-amber-500/10">
                  <TrendingUp className="h-4 w-4 text-amber-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}
