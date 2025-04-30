import { useState } from "react";
import { format } from "date-fns";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  Calendar, 
  User,
  UserCog, 
  Edit, 
  Trash2,
  LayoutGrid,
  List
} from "lucide-react";
import { cn } from "@/lib/utils";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface Task {
  id: number;
  task: string;
  client: string;
  advisor: string;
  owner: string;
  status: "pending" | "overdue" | "completed";
  dueDate: string;
  meetingId?: number;
  meetingNumber?: number;
}

const tasks: Task[] = [
  {
    id: 1,
    task: "Review investment portfolio allocation",
    client: "Thomas Anderson",
    advisor: "Emily Richardson",
    owner: "Emily Richardson",
    status: "pending",
    dueDate: "2024-04-15",
    meetingId: 1,
    meetingNumber: 3
  },
  {
    id: 2,
    task: "Prepare tax planning documents",
    client: "Thomas Anderson",
    advisor: "Emily Richardson",
    owner: "Michael Scott",
    status: "overdue",
    dueDate: "2024-04-01",
    meetingId: 1,
    meetingNumber: 3
  },
  {
    id: 3,
    task: "Update retirement projections",
    client: "Sarah Williams",
    advisor: "Daniel Morgan",
    owner: "Daniel Morgan",
    status: "pending",
    dueDate: "2024-04-20",
    meetingId: 2,
    meetingNumber: 5
  },
  {
    id: 4,
    task: "Research college savings options",
    client: "Sarah Williams",
    advisor: "Daniel Morgan",
    owner: "Lisa Williams",
    status: "completed",
    dueDate: "2024-03-28",
    meetingId: 2,
    meetingNumber: 5
  },
  {
    id: 5,
    task: "Complete risk assessment questionnaire",
    client: "Michael Brown",
    advisor: "James Wilson",
    owner: "James Wilson",
    status: "pending",
    dueDate: "2024-04-10",
    meetingId: 3,
    meetingNumber: 1
  },
  {
    id: 6,
    task: "Update beneficiary information",
    client: "Jennifer Davis",
    advisor: "Sophia Chen",
    owner: "Sophia Chen",
    status: "pending",
    dueDate: "2024-04-25",
    meetingId: 4,
    meetingNumber: 7
  },
  {
    id: 7,
    task: "Create cash flow projection",
    client: "Lisa Anderson",
    advisor: "Robert Johnson",
    owner: "Robert Johnson",
    status: "overdue",
    dueDate: "2024-03-15",
    meetingId: 5,
    meetingNumber: 2
  },
  {
    id: 8,
    task: "Update estate planning documents",
    client: "David Brown",
    advisor: "Olivia Martinez",
    owner: "John Smith",
    status: "completed",
    dueDate: "2024-03-05",
    meetingId: 6,
    meetingNumber: 4
  },
  {
    id: 9,
    task: "Review tax loss harvesting opportunities",
    client: "Robert Davis",
    advisor: "Daniel Morgan",
    owner: "Daniel Morgan",
    status: "pending",
    dueDate: "2024-04-12",
    meetingId: 7,
    meetingNumber: 6
  },
  {
    id: 10,
    task: "Verify account preferences",
    client: "Multiple",
    advisor: "Sophia Chen",
    owner: "Sophia Chen",
    status: "completed",
    dueDate: "2024-03-14",
    meetingId: 10,
    meetingNumber: 2
  },
  {
    id: 11,
    task: "Finalize quarterly report",
    client: "Walter White",
    advisor: "Emily Richardson",
    owner: "Michael Scott",
    status: "pending",
    dueDate: "2024-04-30"
  },
  {
    id: 12,
    task: "Schedule client review meeting",
    client: "Elizabeth Wilson",
    advisor: "James Wilson",
    owner: "James Wilson",
    status: "overdue",
    dueDate: "2024-04-02"
  }
];

type ViewMode = "table" | "cards";
type GroupBy = "none" | "owner" | "dueDate" | "advisor" | "client";

interface TaskFormData {
  task: string;
  client: string;
  advisor: string;
  owner: string;
  dueDate: string;
}

export default function PendingTasks() {
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<string>("all");
  const [viewMode, setViewMode] = useState<ViewMode>("table");
  const [groupBy, setGroupBy] = useState<GroupBy>("none");
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filterBy, setFilterBy] = useState<{type: string, value: string} | null>(null);
  
  const form = useForm<TaskFormData>({
    defaultValues: {
      task: "",
      client: "",
      advisor: "",
      owner: "",
      dueDate: new Date().toISOString().split('T')[0]
    }
  });

  const resetForm = (task?: Task) => {
    if (task) {
      form.reset({
        task: task.task,
        client: task.client,
        advisor: task.advisor,
        owner: task.owner,
        dueDate: task.dueDate
      });
    } else {
      form.reset({
        task: "",
        client: "",
        advisor: "",
        owner: "",
        dueDate: new Date().toISOString().split('T')[0]
      });
    }
  };
  
  const getFilteredTasks = () => {
    return tasks.filter((task) => {
      // Status filter
      const statusMatch = selectedStatusFilter === "all" || task.status === selectedStatusFilter;
      
      // Additional filters
      if (filterBy) {
        if (filterBy.type === "advisor" && task.advisor !== filterBy.value) return false;
        if (filterBy.type === "client" && task.client !== filterBy.value) return false;
        if (filterBy.type === "owner" && task.owner !== filterBy.value) return false;
      }
      
      return statusMatch;
    });
  };
  
  const filteredTasks = getFilteredTasks();
  
  const pendingTasks = tasks.filter((task) => task.status === "pending").length;
  const overdueTasks = tasks.filter((task) => task.status === "overdue").length;
  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };
  
  const clearFilter = () => {
    setFilterBy(null);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    resetForm(task);
  };

  const onStatusCardClick = (status: string) => {
    setSelectedStatusFilter(status);
  };
  
  const { toast } = useToast();
  
  const handleStatusChange = (taskId: number, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Task #${taskId} status changed to ${newStatus}`,
    });
  };

  const columns = [
    {
      key: "task",
      title: "Task",
      sortable: true,
      onClick: (task: Task) => setSelectedTask(task),
      render: (task: Task) => (
        <span className="cursor-pointer hover:underline">{task.task}</span>
      ),
    },
    {
      key: "client",
      title: "Client",
      sortable: true,
      onClick: (task: Task) => setFilterBy({ type: "client", value: task.client }),
      render: (task: Task) => (
        <span className="cursor-pointer hover:underline">{task.client}</span>
      ),
    },
    {
      key: "advisor",
      title: "Advisor",
      sortable: true,
      onClick: (task: Task) => setFilterBy({ type: "advisor", value: task.advisor }),
      render: (task: Task) => (
        <span className="cursor-pointer hover:underline">{task.advisor}</span>
      ),
    },
    {
      key: "owner",
      title: "Owner",
      sortable: true,
      onClick: (task: Task) => setFilterBy({ type: "owner", value: task.owner }),
      render: (task: Task) => (
        <span className="cursor-pointer hover:underline">{task.owner}</span>
      ),
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
          <StatusBadge 
            variant={variant} 
            icon={icon} 
            selectable={true}
            onStatusChange={(status) => handleStatusChange(task.id, status)}
            currentStatus={task.status}
          >
            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
          </StatusBadge>
        );
      },
    },
    {
      key: "dueDate",
      title: "Due Date",
      sortable: true,
      render: (task: Task) => (
        <div>{formatDate(task.dueDate)}</div>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (task: Task) => (
        <div className="flex items-center gap-2">
          {task.meetingNumber && (
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <Calendar className="h-4 w-4" />
              <span className="sr-only">Meeting {task.meetingNumber}</span>
            </Button>
          )}
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={(e) => {
            e.stopPropagation();
            handleEditTask(task);
          }}>
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </Button>
          
          <Button variant="outline" size="sm" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete</span>
          </Button>
        </div>
      ),
    },
  ];

  // Group tasks by the selected groupBy option
  const getGroupedTasks = () => {
    if (groupBy === "none") return { "All Tasks": filteredTasks };
    
    const grouped: Record<string, Task[]> = {};
    
    filteredTasks.forEach(task => {
      let groupKey = "";
      
      switch (groupBy) {
        case "owner":
          groupKey = task.owner;
          break;
        case "dueDate":
          // Group by month/year
          const date = new Date(task.dueDate);
          groupKey = format(date, "MMMM yyyy");
          break;
        case "advisor":
          groupKey = task.advisor;
          break;
        case "client":
          groupKey = task.client;
          break;
      }
      
      if (!grouped[groupKey]) {
        grouped[groupKey] = [];
      }
      
      grouped[groupKey].push(task);
    });
    
    return grouped;
  };
  
  const groupedTasks = getGroupedTasks();
  
  // A list of unique clients, advisors and owners for the form
  const clients = [...new Set(tasks.map(task => task.client))];
  const advisors = [...new Set(tasks.map(task => task.advisor))];
  const owners = [...new Set(tasks.map(task => task.owner))];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Pending Tasks</h2>
            <p className="text-muted-foreground">
              Manage and track tasks for clients and advisors
            </p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto" 
            onClick={() => {
              resetForm();
              setEditingTask({} as Task);
            }}>
            Create New Task
          </button>
        </div>
        
        <div className="grid gap-4 md:grid-cols-3">
          <Card 
            className={cn(
              "glass-card cursor-pointer hover-highlight",
              selectedStatusFilter === "overdue" && "outline outline-1 outline-[#2edebe]"
            )}
            onClick={() => onStatusCardClick("overdue")}
          >
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
          
          <Card 
            className={cn(
              "glass-card cursor-pointer hover-highlight",
              selectedStatusFilter === "pending" && "outline outline-1 outline-[#2edebe]"
            )}
            onClick={() => onStatusCardClick("pending")}
          >
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
          
          <Card 
            className={cn(
              "glass-card cursor-pointer hover-highlight",
              selectedStatusFilter === "completed" && "outline outline-1 outline-[#2edebe]"
            )}
            onClick={() => onStatusCardClick("completed")}
          >
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center">
                <CheckCircle2 className="h-5 w-5 mr-2 text-emerald-500" />
                Completed
              </CardTitle>
              <CardDescription>Tasks finished</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{completedTasks}</div>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex flex-wrap gap-2 justify-between mb-4">
          <div className="flex flex-wrap gap-2">
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
                <option value="overdue">Overdue</option>
                <option value="completed">Completed</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="group-by" className="text-sm font-medium mr-2">
                Group By:
              </label>
              <select
                id="group-by"
                className="rounded-md border border-input bg-background px-3 py-1 text-sm"
                value={groupBy}
                onChange={(e) => setGroupBy(e.target.value as GroupBy)}
              >
                <option value="none">No Grouping</option>
                <option value="owner">Owner</option>
                <option value="dueDate">Due Date</option>
                <option value="advisor">Advisor</option>
                <option value="client">Client</option>
              </select>
            </div>
            
            {filterBy && (
              <div className="flex items-center gap-2">
                <div className="text-sm bg-accent px-3 py-1 rounded-md flex items-center">
                  Filtered by {filterBy.type}: <span className="font-medium ml-1">{filterBy.value}</span>
                  <button 
                    onClick={clearFilter}
                    className="ml-2 text-muted-foreground hover:text-foreground"
                  >
                    ✕
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <button 
              className={cn(
                "h-8 w-8 rounded-md flex items-center justify-center",
                viewMode === "table" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
              onClick={() => setViewMode("table")}
            >
              <List className="h-4 w-4" />
              <span className="sr-only">Table View</span>
            </button>
            <button 
              className={cn(
                "h-8 w-8 rounded-md flex items-center justify-center",
                viewMode === "cards" ? "bg-primary text-primary-foreground" : "hover:bg-accent"
              )}
              onClick={() => setViewMode("cards")}
            >
              <LayoutGrid className="h-4 w-4" />
              <span className="sr-only">Card View</span>
            </button>
          </div>
        </div>
        
        {viewMode === "table" ? (
          <DataTable
            columns={columns}
            data={filteredTasks}
            keyExtractor={(task) => task.id}
            searchPlaceholder="Search tasks..."
            onRowClick={(task) => setSelectedTask(task)}
            className="space-y-1" // Add spacing between rows
            rowClassName="hover:outline hover:outline-1 hover:outline-[#2edebe] rounded-md" // Add hover highlight
          />
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedTasks).map(([group, tasks]) => (
              <div key={group} className="space-y-4">
                <h3 className="text-lg font-medium">{group}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {tasks.map((task) => (
                    <Card 
                      key={task.id} 
                      className="overflow-hidden hover:outline hover:outline-1 hover:outline-[#2edebe] cursor-pointer" 
                      onClick={() => setSelectedTask(task)}
                    >
                      <CardHeader className="pb-2">
                        <CardTitle 
                          className="text-base truncate cursor-pointer hover:underline"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedTask(task);
                          }}
                        >
                          {task.task}
                        </CardTitle>
                        <CardDescription className="flex justify-between">
                          <span 
                            className="cursor-pointer hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFilterBy({ type: "client", value: task.client })
                            }}
                          >
                            {task.client}
                          </span>
                          <StatusBadge 
                            variant={
                              task.status === "completed" ? "success" : 
                              task.status === "pending" ? "warning" : 
                              "danger"
                            }
                            icon={
                              task.status === "completed" ? <CheckCircle2 className="h-3 w-3 mr-1" /> : 
                              task.status === "pending" ? <Clock className="h-3 w-3 mr-1" /> : 
                              <AlertCircle className="h-3 w-3 mr-1" />
                            }
                            selectable={true}
                            onStatusChange={(status) => {
                              handleStatusChange(task.id, status);
                              setSelectedTask({...task, status: status as "pending" | "overdue" | "completed"});
                            }}
                            currentStatus={task.status}
                            onClick={(e) => e.stopPropagation()}
                          >
                            {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                          </StatusBadge>
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div 
                            className="flex items-center cursor-pointer hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFilterBy({ type: "advisor", value: task.advisor })
                            }}
                          >
                            <UserCog className="h-4 w-4 mr-2 text-muted-foreground" />
                            {task.advisor}
                          </div>
                          <div 
                            className="flex items-center cursor-pointer hover:underline"
                            onClick={(e) => {
                              e.stopPropagation();
                              setFilterBy({ type: "owner", value: task.owner })
                            }}
                          >
                            <User className="h-4 w-4 mr-2 text-muted-foreground" />
                            {task.owner}
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                            {formatDate(task.dueDate)}
                          </div>
                          {task.meetingNumber && (
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-2 text-muted-foreground" />
                              Meeting #{task.meetingNumber}
                            </div>
                          )}
                        </div>
                      </CardContent>
                      <div className="flex border-t">
                        <button 
                          className="flex-1 p-2 hover:bg-accent transition-colors flex items-center justify-center text-primary"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditTask(task);
                          }}
                        >
                          <Edit className="h-4 w-4 mr-1" />
                          Edit
                        </button>
                        <div className="w-px bg-border" />
                        <button 
                          className="flex-1 p-2 hover:bg-accent transition-colors flex items-center justify-center text-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="h-4 w-4 mr-1" />
                          Delete
                        </button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Task Detail Dialog */}
        <Dialog open={!!selectedTask} onOpenChange={(open) => !open && setSelectedTask(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Task Details</DialogTitle>
            </DialogHeader>
            {selectedTask && (
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold text-lg">{selectedTask.task}</h3>
                  <StatusBadge 
                    variant={
                      selectedTask.status === "completed" ? "success" : 
                      selectedTask.status === "pending" ? "warning" : 
                      "danger"
                    }
                    icon={
                      selectedTask.status === "completed" ? <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> : 
                      selectedTask.status === "pending" ? <Clock className="h-3.5 w-3.5 mr-1" /> : 
                      <AlertCircle className="h-3.5 w-3.5 mr-1" />
                    }
                    selectable={true}
                    onStatusChange={(status) => {
                      handleStatusChange(selectedTask.id, status);
                      setSelectedTask({...selectedTask, status: status as "pending" | "overdue" | "completed"});
                    }}
                    currentStatus={selectedTask.status}
                  >
                    {selectedTask.status.charAt(0).toUpperCase() + selectedTask.status.slice(1)}
                  </StatusBadge>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">Client:</span>
                    <span 
                      className="hover:underline cursor-pointer"
                      onClick={() => {
                        setFilterBy({ type: "client", value: selectedTask.client });
                        setSelectedTask(null);
                      }}
                    >
                      {selectedTask.client}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">Advisor:</span>
                    <span 
                      className="hover:underline cursor-pointer"
                      onClick={() => {
                        setFilterBy({ type: "advisor", value: selectedTask.advisor });
                        setSelectedTask(null);
                      }}
                    >
                      {selectedTask.advisor}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">Owner:</span>
                    <span 
                      className="hover:underline cursor-pointer"
                      onClick={() => {
                        setFilterBy({ type: "owner", value: selectedTask.owner });
                        setSelectedTask(null);
                      }}
                    >
                      {selectedTask.owner}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground w-20">Due Date:</span>
                    <span>{formatDate(selectedTask.dueDate)}</span>
                  </div>
                  {selectedTask.meetingNumber && (
                    <div className="flex items-center gap-2">
                      <span className="text-muted-foreground w-20">Meeting:</span>
                      <span>#{selectedTask.meetingNumber}</span>
                    </div>
                  )}
                </div>
                
                <DialogFooter>
                  <Button variant="outline" size="sm" onClick={() => {
                    handleEditTask(selectedTask);
                    setSelectedTask(null);
                  }}>
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                  <Button variant="outline" size="sm">
                    <Trash2 className="h-4 w-4 mr-1" /> Delete
                  </Button>
                </DialogFooter>
              </div>
            )}
          </DialogContent>
        </Dialog>
        
        {/* Task Edit Dialog */}
        <Dialog open={!!editingTask} onOpenChange={(open) => !open && setEditingTask(null)}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>{editingTask?.id ? "Edit Task" : "Create New Task"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form className="space-y-4">
                <FormField
                  control={form.control}
                  name="task"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Task</FormLabel>
                      <FormControl>
                        <Input placeholder="Task description" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="client"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Client</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full justify-between">
                              {field.value || "Select client"}
                              <span>▼</span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <div className="space-y-1 p-2">
                            <Input
                              placeholder="Search clients..."
                              className="mb-2"
                            />
                            {clients.map(client => (
                              <Button
                                key={client}
                                variant="ghost"
                                className="w-full justify-start font-normal"
                                onClick={() => {
                                  form.setValue("client", client);
                                }}
                              >
                                {client}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="advisor"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Advisor</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full justify-between">
                              {field.value || "Select advisor"}
                              <span>▼</span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <div className="space-y-1 p-2">
                            <Input
                              placeholder="Search advisors..."
                              className="mb-2"
                            />
                            {advisors.map(advisor => (
                              <Button
                                key={advisor}
                                variant="ghost"
                                className="w-full justify-start font-normal"
                                onClick={() => {
                                  form.setValue("advisor", advisor);
                                }}
                              >
                                {advisor}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="owner"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Owner</FormLabel>
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button variant="outline" className="w-full justify-between">
                              {field.value || "Select owner"}
                              <span>▼</span>
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                          <div className="space-y-1 p-2">
                            <Input
                              placeholder="Search owners..."
                              className="mb-2"
                            />
                            {owners.map(owner => (
                              <Button
                                key={owner}
                                variant="ghost"
                                className="w-full justify-start font-normal"
                                onClick={() => {
                                  form.setValue("owner", owner);
                                }}
                              >
                                {owner}
                              </Button>
                            ))}
                          </div>
                        </PopoverContent>
                      </Popover>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="dueDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setEditingTask(null)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    {editingTask?.id ? "Update Task" : "Create Task"}
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
      </div>
    </DashboardLayout>
  );
}
