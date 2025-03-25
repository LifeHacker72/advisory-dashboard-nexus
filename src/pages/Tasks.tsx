
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CheckCircle2, AlertCircle, Clock, Calendar, Users, UserCog } from "lucide-react";

interface Task {
  id: number;
  title: string;
  description: string;
  assignedTo: string;
  client: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "overdue";
  category: "client_onboarding" | "document_review" | "meeting" | "follow_up" | "administrative";
}

const tasks: Task[] = [
  {
    id: 1,
    title: "Complete financial assessment",
    description: "Conduct comprehensive financial assessment for new client",
    assignedTo: "Emily Richardson",
    client: "Thomas Anderson",
    dueDate: "2023-07-15",
    priority: "high",
    status: "pending",
    category: "client_onboarding",
  },
  {
    id: 2,
    title: "Review investment portfolio",
    description: "Quarterly review of client's investment portfolio",
    assignedTo: "Daniel Morgan",
    client: "Sarah Williams",
    dueDate: "2023-07-20",
    priority: "medium",
    status: "in_progress",
    category: "document_review",
  },
  {
    id: 3,
    title: "Annual planning meeting",
    description: "Schedule and prepare for annual planning meeting",
    assignedTo: "James Wilson",
    client: "Michael Brown",
    dueDate: "2023-07-10",
    priority: "high",
    status: "overdue",
    category: "meeting",
  },
  {
    id: 4,
    title: "Update retirement plan",
    description: "Update client's retirement plan with new information",
    assignedTo: "Sophia Chen",
    client: "Jennifer Davis",
    dueDate: "2023-07-25",
    priority: "medium",
    status: "pending",
    category: "document_review",
  },
  {
    id: 5,
    title: "Tax planning session",
    description: "Prepare for and conduct tax planning session",
    assignedTo: "Robert Johnson",
    client: "Lisa Anderson",
    dueDate: "2023-07-18",
    priority: "medium",
    status: "in_progress",
    category: "meeting",
  },
  {
    id: 6,
    title: "Contract renewal",
    description: "Process client's annual contract renewal",
    assignedTo: "Olivia Martinez",
    client: "David Brown",
    dueDate: "2023-07-05",
    priority: "high",
    status: "overdue",
    category: "administrative",
  },
  {
    id: 7,
    title: "Follow-up call",
    description: "Schedule follow-up call regarding recent changes",
    assignedTo: "Daniel Morgan",
    client: "Robert Davis",
    dueDate: "2023-07-12",
    priority: "low",
    status: "completed",
    category: "follow_up",
  },
  {
    id: 8,
    title: "Document collection",
    description: "Collect and review necessary documents for onboarding",
    assignedTo: "Emily Richardson",
    client: "Walter White",
    dueDate: "2023-07-22",
    priority: "medium",
    status: "pending",
    category: "client_onboarding",
  },
  {
    id: 9,
    title: "Insurance policy review",
    description: "Review client's insurance policies and recommend changes",
    assignedTo: "James Wilson",
    client: "Elizabeth Wilson",
    dueDate: "2023-07-28",
    priority: "medium",
    status: "pending",
    category: "document_review",
  },
  {
    id: 10,
    title: "CRM data update",
    description: "Update client information in CRM system",
    assignedTo: "Sophia Chen",
    client: "Multiple",
    dueDate: "2023-07-14",
    priority: "low",
    status: "completed",
    category: "administrative",
  },
];

export default function Tasks() {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [selectedPriorityFilter, setSelectedPriorityFilter] = useState<string>("all");
  
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      const statusMatch = selectedStatusFilter === "all" || task.status === selectedStatusFilter;
      const priorityMatch = selectedPriorityFilter === "all" || task.priority === selectedPriorityFilter;
      return statusMatch && priorityMatch;
    });
  };
  
  const filteredTasks = getFilteredTasks();
  
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress").length;
  const overdueTasks = tasks.filter((task) => task.status === "overdue").length;
  
  const columns = [
    {
      key: "title",
      title: "Task",
      sortable: true,
      render: (task: Task) => (
        <div>
          <div className="font-medium">{task.title}</div>
          <div className="text-xs text-muted-foreground">{task.description}</div>
        </div>
      ),
    },
    {
      key: "client",
      title: "Client",
      sortable: true,
    },
    {
      key: "assignedTo",
      title: "Assigned To",
      sortable: true,
    },
    {
      key: "dueDate",
      title: "Due Date",
      sortable: true,
      render: (task: Task) => {
        const dueDate = new Date(task.dueDate);
        const today = new Date();
        const isOverdue = dueDate < today && task.status !== "completed";
        
        return (
          <div className={isOverdue ? "text-destructive" : ""}>
            {dueDate.toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </div>
        );
      },
    },
    {
      key: "priority",
      title: "Priority",
      render: (task: Task) => {
        let variant:
          | "default"
          | "primary"
          | "success"
          | "warning"
          | "danger"
          | "info"
          | "outline" = "default";
        
        switch (task.priority) {
          case "high":
            variant = "danger";
            break;
          case "medium":
            variant = "warning";
            break;
          case "low":
            variant = "success";
            break;
        }
        
        return (
          <StatusBadge variant={variant}>
            {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
          </StatusBadge>
        );
      },
    },
    {
      key: "status",
      title: "Status",
      render: (task: Task) => {
        let variant:
          | "default"
          | "primary"
          | "success"
          | "warning"
          | "danger"
          | "info"
          | "outline" = "default";
        let icon = null;
        
        switch (task.status) {
          case "completed":
            variant = "success";
            icon = <CheckCircle2 className="h-3.5 w-3.5 mr-1" />;
            break;
          case "in_progress":
            variant = "info";
            icon = <Clock className="h-3.5 w-3.5 mr-1" />;
            break;
          case "overdue":
            variant = "danger";
            icon = <AlertCircle className="h-3.5 w-3.5 mr-1" />;
            break;
          case "pending":
            variant = "warning";
            icon = <Clock className="h-3.5 w-3.5 mr-1" />;
            break;
        }
        
        return (
          <StatusBadge variant={variant} icon={icon}>
            {task.status === "in_progress"
              ? "In Progress"
              : task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </StatusBadge>
        );
      },
    },
    {
      key: "category",
      title: "Category",
      render: (task: Task) => {
        let label = "";
        let icon = null;
        
        switch (task.category) {
          case "client_onboarding":
            label = "Onboarding";
            icon = <Users className="h-3.5 w-3.5 mr-1" />;
            break;
          case "document_review":
            label = "Review";
            break;
          case "meeting":
            label = "Meeting";
            icon = <Calendar className="h-3.5 w-3.5 mr-1" />;
            break;
          case "follow_up":
            label = "Follow-up";
            break;
          case "administrative":
            label = "Admin";
            icon = <UserCog className="h-3.5 w-3.5 mr-1" />;
            break;
        }
        
        return <StatusBadge variant="outline" icon={icon}>{label}</StatusBadge>;
      },
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Pending Tasks</h2>
            <p className="text-muted-foreground">
              Manage and track tasks for clients and advisors.
            </p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto">
            Create New Task
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <AlertCircle className="h-5 w-5 mr-2 text-destructive" />
                Overdue
              </CardTitle>
              <CardDescription>Tasks past due date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{overdueTasks}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-amber-500" />
                Pending
              </CardTitle>
              <CardDescription>Tasks awaiting action</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{pendingTasks}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-blue-500" />
                In Progress
              </CardTitle>
              <CardDescription>Tasks being worked on</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{inProgressTasks}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div>
            <label htmlFor="status-filter" className="text-sm font-medium mr-2">
              Status:
            </label>
            <select
              id="status-filter"
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="in_progress">In Progress</option>
              <option value="completed">Completed</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="priority-filter" className="text-sm font-medium mr-2">
              Priority:
            </label>
            <select
              id="priority-filter"
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={selectedPriorityFilter}
              onChange={(e) => setSelectedPriorityFilter(e.target.value)}
            >
              <option value="all">All Priorities</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={filteredTasks}
          keyExtractor={(task) => task.id}
          searchPlaceholder="Search tasks..."
        />
      </div>
    </DashboardLayout>
  );
}
