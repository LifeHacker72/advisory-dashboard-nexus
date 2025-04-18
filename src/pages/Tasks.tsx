
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  Users, 
  UserCog, 
  ClipboardList, 
  FileText 
} from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Task {
  id: number;
  client: string;
  advisor: string;
  meetingNumber: number;
  actionItems: string[];
  detailedNotes: string;
  dueDate: string;
  priority: "high" | "medium" | "low";
  status: "pending" | "in_progress" | "completed" | "overdue";
}

const tasks: Task[] = [
  {
    id: 1,
    client: "Thomas Anderson",
    advisor: "Emily Richardson",
    meetingNumber: 3,
    actionItems: [
      "Review investment portfolio allocation",
      "Prepare tax planning documents",
      "Schedule follow-up call for next quarter"
    ],
    detailedNotes: "Client expressed interest in sustainable investing options. Discussed potential reallocation of 30% of portfolio to ESG funds. Need to prepare comparison report of performance for similar ESG vs. traditional funds.",
    dueDate: "2023-07-15",
    priority: "high",
    status: "pending"
  },
  {
    id: 2,
    client: "Sarah Williams",
    advisor: "Daniel Morgan",
    meetingNumber: 5,
    actionItems: [
      "Update retirement projections",
      "Research college savings options for children",
      "Review insurance coverage"
    ],
    detailedNotes: "Client concerned about rising education costs. Recommended 529 plan for two children (ages 10 and 12). Spouse recently changed jobs, so need to review new benefits package and identify any coverage gaps.",
    dueDate: "2023-07-20",
    priority: "medium",
    status: "in_progress"
  },
  {
    id: 3,
    client: "Michael Brown",
    advisor: "James Wilson",
    meetingNumber: 1,
    actionItems: [
      "Complete risk assessment questionnaire",
      "Gather existing financial documents",
      "Set up client portal access"
    ],
    detailedNotes: "Initial meeting with new client. Recently divorced and needs comprehensive financial plan update. Current priorities include reassessing retirement goals and updating estate planning documents.",
    dueDate: "2023-07-10",
    priority: "high",
    status: "overdue"
  },
  {
    id: 4,
    client: "Jennifer Davis",
    advisor: "Sophia Chen",
    meetingNumber: 7,
    actionItems: [
      "Update beneficiary information",
      "Review recent portfolio performance",
      "Discuss charitable giving strategies"
    ],
    detailedNotes: "Client interested in establishing donor-advised fund for charitable giving. Recently received inheritance and wants to discuss tax-efficient strategies for managing these additional assets.",
    dueDate: "2023-07-25",
    priority: "medium",
    status: "pending"
  },
  {
    id: 5,
    client: "Lisa Anderson",
    advisor: "Robert Johnson",
    meetingNumber: 2,
    actionItems: [
      "Create cash flow projection",
      "Review debt reduction strategies",
      "Evaluate employee stock options"
    ],
    detailedNotes: "Client recently promoted to executive position with significant stock compensation. Need to develop strategy for diversification while minimizing tax impact. Also concerned about educational funding for teenager planning to attend college in 3 years.",
    dueDate: "2023-07-18",
    priority: "medium",
    status: "in_progress"
  },
  {
    id: 6,
    client: "David Brown",
    advisor: "Olivia Martinez",
    meetingNumber: 4,
    actionItems: [
      "Update estate planning documents",
      "Review life insurance needs",
      "Discuss long-term care options"
    ],
    detailedNotes: "Client recently turned 60 and wants to revisit estate plan. Has concerns about aging parents and potential caregiving responsibilities. Discussed importance of having proper legal documents in place for both client and parents.",
    dueDate: "2023-07-05",
    priority: "high",
    status: "overdue"
  },
  {
    id: 7,
    client: "Robert Davis",
    advisor: "Daniel Morgan",
    meetingNumber: 6,
    actionItems: [
      "Rebalance investment portfolio",
      "Review tax loss harvesting opportunities",
      "Update retirement income projections"
    ],
    detailedNotes: "Annual review meeting. Portfolio has drifted from target allocation due to market performance. Identified several tax loss harvesting opportunities to offset capital gains from business sale earlier in the year.",
    dueDate: "2023-07-12",
    priority: "low",
    status: "completed"
  },
  {
    id: 8,
    client: "Walter White",
    advisor: "Emily Richardson",
    meetingNumber: 1,
    actionItems: [
      "Complete risk profile assessment",
      "Gather existing financial statements",
      "Set up automatic investments"
    ],
    detailedNotes: "Initial meeting with new client. Recently retired and rolled over 401(k) to IRA. Primary concern is generating reliable retirement income while preserving principal. Conservative risk tolerance - prioritizes capital preservation over growth.",
    dueDate: "2023-07-22",
    priority: "medium",
    status: "pending"
  },
  {
    id: 9,
    client: "Elizabeth Wilson",
    advisor: "James Wilson",
    meetingNumber: 8,
    actionItems: [
      "Update financial plan projections",
      "Review asset allocation strategy",
      "Discuss Roth conversion opportunities"
    ],
    detailedNotes: "Client planning early retirement in 2 years. Discussed Roth conversion ladder strategy to optimize tax situation before required minimum distributions begin. Needs updated cash flow projections based on new retirement date.",
    dueDate: "2023-07-28",
    priority: "medium",
    status: "pending"
  },
  {
    id: 10,
    client: "Multiple",
    advisor: "Sophia Chen",
    meetingNumber: 2,
    actionItems: [
      "Update contact information",
      "Verify account preferences",
      "Send welcome package materials"
    ],
    detailedNotes: "Administrative follow-up for recently onboarded clients. Need to verify all paperwork is complete and that clients have successfully accessed their online portals. Schedule individual welcome calls for next week.",
    dueDate: "2023-07-14",
    priority: "low",
    status: "completed"
  }
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
      key: "client",
      title: "Client",
      sortable: true,
    },
    {
      key: "advisor",
      title: "Advisor",
      sortable: true,
    },
    {
      key: "meetingNumber",
      title: "Meeting Number",
      sortable: true,
      render: (task: Task) => (
        <div className="text-center">{task.meetingNumber}</div>
      ),
    },
    {
      key: "actionItems",
      title: "Action Items",
      render: (task: Task) => {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-primary hover:underline">
                <ClipboardList className="h-4 w-4" /> {task.actionItems.length} items
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Action Items for {task.client}</DialogTitle>
              </DialogHeader>
              <div className="mt-4">
                <ul className="list-disc pl-5 space-y-2">
                  {task.actionItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    },
    {
      key: "detailedNotes",
      title: "Detailed Notes",
      render: (task: Task) => {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-primary hover:underline">
                <FileText className="h-4 w-4" /> View Notes
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Detailed Notes for {task.client}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 bg-muted/30 p-4 rounded-md">
                <p>{task.detailedNotes}</p>
              </div>
            </DialogContent>
          </Dialog>
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
                <Clock className="h-5 w-5 mr-2 text-primary" />
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
