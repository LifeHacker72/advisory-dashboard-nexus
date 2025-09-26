import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Shield, CreditCard, Building2, 
  Scale, FileText, MoreHorizontal, ChevronRight, Phone, User,
  CalendarIcon, Plus, X, CheckCircle2, ClipboardList
} from "lucide-react";
import { format } from "date-fns";
import { Client } from "@/types/client";
import { FRDSubsection } from "./FRDSubsection";
import { cn } from "@/lib/utils";

interface Task {
  id: string;
  title: string;
  actionDate: Date;
  status: 'pending' | 'completed';
  agendaItemId?: string;
  vertical: string;
}

interface AgendaItem {
  id: string;
  title: string;
  completed: boolean;
  date: Date;
}

interface FRDDocumentProps {
  client: Client;
}

// Define the 7 subsections + overview
const subsections = [
  { id: "overview", title: "Overview", icon: FileText, color: "bg-slate-500" },
  { id: "financial", title: "Financial Planning", icon: TrendingUp, color: "bg-blue-500" },
  { id: "tax", title: "Tax Planning", icon: FileText, color: "bg-green-500" },
  { id: "insurance", title: "Insurance", icon: Shield, color: "bg-red-500" },
  { id: "credit", title: "Credit Cards", icon: CreditCard, color: "bg-purple-500" },
  { id: "banking", title: "Banking ++", icon: Building2, color: "bg-orange-500" },
  { id: "estate", title: "Estate Planning", icon: Scale, color: "bg-indigo-500" },
  { id: "others", title: "Others", icon: MoreHorizontal, color: "bg-gray-500" }
];

// Mock data for task options
const taskOptions = [
  "Review investment portfolio",
  "Update insurance coverage", 
  "Tax planning consultation",
  "Estate planning review",
  "Retirement planning discussion",
  "Credit score analysis",
  "Banking relationship optimization",
  "Financial goal reassessment",
  "Risk assessment update",
  "Document collection"
];

export function FRDDocument({ client }: FRDDocumentProps) {
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);
  
  // Overview section state (combined advisors from all verticals)
  const [advisors] = useState(["Priya Sharma", "Rajesh Kumar", "Anita Patel", "Vikram Singh", "Meera Iyer", "Arjun Nair"]);
  const [showAllAdvisors, setShowAllAdvisors] = useState(false);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review investment portfolio", actionDate: new Date(2024, 8, 15), status: 'pending', vertical: "Financial Planning" },
    { id: "2", title: "Update insurance coverage", actionDate: new Date(2024, 8, 20), status: 'pending', vertical: "Insurance" }
  ]);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    { id: "1", title: "Gather current investment statements", completed: true, date: new Date(2024, 8, 10) },
    { id: "2", title: "Review risk tolerance", completed: false, date: new Date(2024, 8, 12) },
    { id: "3", title: "Discuss retirement timeline", completed: false, date: new Date(2024, 8, 14) }
  ]);
  
  // Form state for adding items
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState<Date>();
  const [showAddAgenda, setShowAddAgenda] = useState(false);
  const [newAgendaTitle, setNewAgendaTitle] = useState("");
  const [newAgendaDate, setNewAgendaDate] = useState<Date>();
  const [agendaFilter, setAgendaFilter] = useState<'all' | 'completed' | 'pending'>('all');
  
  // Edit states
  const [editingTask, setEditingTask] = useState<string | null>(null);
  const [editingAgenda, setEditingAgenda] = useState<string | null>(null);
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskDate, setEditTaskDate] = useState<Date>();
  const [editTaskAgendaItem, setEditTaskAgendaItem] = useState("");
  const [editTaskVertical, setEditTaskVertical] = useState("");
  const [editAgendaTitle, setEditAgendaTitle] = useState("");
  const [editAgendaDate, setEditAgendaDate] = useState<Date>();
  
  // New task form states
  const [newTaskAgendaItem, setNewTaskAgendaItem] = useState("");
  const [newTaskVertical, setNewTaskVertical] = useState("");

  // Mock data for cumulative stats from all verticals combined
  const cumulativeStats = {
    totalCalls: 45, // Combined from all verticals
    lastCallDate: new Date(2024, 8, 18),
    daysSinceLastCall: 8
  };

  // Handler functions for overview section
  const handleAddTask = () => {
    if (newTaskTitle && newTaskDate) {
      const newTask: Task = {
        id: Date.now().toString(),
        title: newTaskTitle,
        actionDate: newTaskDate,
        status: 'pending',
        vertical: 'Overview'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDate(undefined);
      setShowAddTask(false);
    }
  };

  const handleAddAgendaItem = () => {
    if (newAgendaTitle && newAgendaDate) {
      const newItem: AgendaItem = {
        id: Date.now().toString(),
        title: newAgendaTitle,
        completed: false,
        date: newAgendaDate
      };
      setAgendaItems([...agendaItems, newItem]);
      setNewAgendaTitle("");
      setNewAgendaDate(undefined);
      setShowAddAgenda(false);
    }
  };

  const toggleAgendaItem = (id: string) => {
    setAgendaItems(items =>
      items.map(item =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const removeTask = (id: string) => {
    setTasks(tasks => tasks.filter(task => task.id !== id));
  };

  const removeAgendaItem = (id: string) => {
    setAgendaItems(items => items.filter(item => item.id !== id));
  };

  const startEditTask = (task: Task) => {
    setEditingTask(task.id);
    setEditTaskTitle(task.title);
    setEditTaskDate(task.actionDate);
    setEditTaskAgendaItem(task.agendaItemId || "");
    setEditTaskVertical(task.vertical);
  };

  const saveTaskEdit = () => {
    if (editingTask && editTaskTitle && editTaskDate && editTaskVertical) {
      setTasks(tasks =>
        tasks.map(task =>
          task.id === editingTask
            ? { ...task, title: editTaskTitle, actionDate: editTaskDate, agendaItemId: editTaskAgendaItem, vertical: editTaskVertical }
            : task
        )
      );
      setEditingTask(null);
      setEditTaskTitle("");
      setEditTaskDate(undefined);
      setEditTaskAgendaItem("");
      setEditTaskVertical("");
    }
  };

  const startEditAgenda = (item: AgendaItem) => {
    setEditingAgenda(item.id);
    setEditAgendaTitle(item.title);
    setEditAgendaDate(item.date);
  };

  const saveAgendaEdit = () => {
    if (editingAgenda && editAgendaTitle && editAgendaDate) {
      setAgendaItems(items =>
        items.map(item =>
          item.id === editingAgenda
            ? { ...item, title: editAgendaTitle, date: editAgendaDate }
            : item
        )
      );
      setEditingAgenda(null);
      setEditAgendaTitle("");
      setEditAgendaDate(undefined);
    }
  };

  // Filter and sort agenda items
  const filteredAgendaItems = agendaItems.filter(item => {
    if (agendaFilter === 'completed') return item.completed;
    if (agendaFilter === 'pending') return !item.completed;
    return true;
  });

  const sortedAgendaItems = [...filteredAgendaItems].sort((a, b) => {
    if (a.completed === b.completed) return 0;
    return a.completed ? 1 : -1;
  });

  // Mock pending tasks per vertical for color coding
  const pendingTasks = {
    financial: 2,
    tax: 0,
    insurance: 1,
    credit: 3,
    banking: 0,
    estate: 1,
    others: 0
  };

  const getButtonVariant = (verticalId: string) => {
    const tasks = pendingTasks[verticalId as keyof typeof pendingTasks];
    if (tasks > 2) return "destructive";
    if (tasks > 0) return "secondary";
    return "outline";
  };

  if (selectedSubsection && selectedSubsection !== "overview") {
    const subsection = subsections.find(s => s.id === selectedSubsection);
    
    return (
      <div className="h-[70vh] flex flex-col">
        {/* Client Name with Vertical */}
        <div className="flex-shrink-0 mb-3">
          <h3 className="text-lg font-semibold">{client.name} - {subsection?.title}</h3>
        </div>

        {/* Vertical Sections - Horizontal Line */}
        <div className="flex-shrink-0">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {subsections.map((section) => {
              const Icon = section.icon;
              const taskCount = section.id === "overview" ? 0 : pendingTasks[section.id as keyof typeof pendingTasks];
              const isActive = selectedSubsection === section.id;
              
              return (
                <Button
                  key={section.id} 
                  variant="outline"
                  size="sm"
                  className={cn(
                    "h-auto p-2 flex-1 min-w-0 text-xs",
                    isActive && "border-[#2edebe] border-2 font-bold text-[#2edebe]"
                  )}
                  onClick={() => setSelectedSubsection(section.id === "overview" ? null : section.id)}
                >
                  <div className="flex items-center gap-1.5 w-full justify-center">
                    <div className={cn(
                      "p-0.5 rounded flex-shrink-0",
                      isActive ? "bg-[#2edebe] text-white" : "bg-muted text-muted-foreground"
                    )}>
                      <Icon className="h-2.5 w-2.5" />
                    </div>
                    <div className="text-center min-w-0">
                      <div className="text-xs font-medium leading-tight truncate">{section.title}</div>
                      {taskCount > 0 && subsection.id !== "overview" && (
                        <div className="text-xs leading-tight text-red-400">{taskCount} pending</div>
                      )}
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Scrollable Subsection Content */}
        <div className="flex-1 overflow-y-auto pt-3">
          <FRDSubsection
            client={client}
            vertical={subsection?.title || ""}
            onBack={() => setSelectedSubsection(null)}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="h-[70vh] flex flex-col space-y-3">
      {/* Client Name */}
      <div className="flex-shrink-0">
        <h3 className="text-lg font-semibold">{client.name}</h3>
      </div>

      {/* Vertical Sections - Horizontal Line - Moved up */}
      <div className="flex-shrink-0">
        <div className="flex gap-1 overflow-x-auto pb-1">
          {subsections.map((subsection) => {
            const Icon = subsection.icon;
            const taskCount = subsection.id === "overview" ? 0 : pendingTasks[subsection.id as keyof typeof pendingTasks];
            const isActive = (selectedSubsection === null && subsection.id === "overview") || selectedSubsection === subsection.id;
            const hasHighTasks = taskCount > 2;
            const hasTasks = taskCount > 0;
            return (
              <Button
                key={subsection.id} 
                variant="outline"
                size="sm"
                className={cn(
                  "h-auto p-2 flex-1 min-w-0 text-xs",
                  isActive && "border-[#2edebe] border-2 font-bold text-[#2edebe]"
                )}
                onClick={() => setSelectedSubsection(subsection.id === "overview" ? null : subsection.id)}
              >
                <div className="flex items-center gap-1.5 w-full justify-center">
                  <div className={cn(
                    "p-0.5 rounded flex-shrink-0",
                    isActive ? "bg-[#2edebe] text-white" : "bg-muted text-muted-foreground"
                  )}>
                    <Icon className="h-2.5 w-2.5" />
                  </div>
                  <div className="text-center min-w-0">
                    <div className="text-xs font-medium leading-tight truncate">{subsection.title}</div>
                    {taskCount > 0 && subsection.id !== "overview" && (
                      <div className="text-xs leading-tight text-red-400">{taskCount} pending</div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid - Same structure as vertical sections */}
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* Left Column */}
        <div className="space-y-3 h-full flex flex-col">
          {/* Advisor Assignment */}
          <Card className="flex-shrink-0 h-[88px]">
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                Advisors Assigned
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex flex-wrap gap-1">
                {(showAllAdvisors ? advisors : advisors.slice(0, 3)).map((advisor, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{advisor}</Badge>
                ))}
                {advisors.length > 3 && (
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-5 px-2 text-xs"
                    onClick={() => setShowAllAdvisors(!showAllAdvisors)}
                  >
                    {showAllAdvisors ? 'Less' : `+${advisors.length - 3} more`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Tasks Section */}
          <Card className="flex-1 min-h-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <ClipboardList className="h-4 w-4" />
                  Tasks ({tasks.filter(t => t.status === 'pending').length} pending)
                </CardTitle>
                <Button 
                  onClick={() => setShowAddTask(true)} 
                  size="sm"
                  className="h-6 px-2 text-xs"
                >
                  <Plus className="h-3 w-3 mr-1" />
                  Add
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-3rem)] overflow-y-auto">
              <div className="space-y-2">
                {tasks.map((task) => (
                  <div key={task.id} className="p-2 border rounded text-sm">
                     {editingTask === task.id ? (
                       <div className="space-y-3">
                         <div className="grid grid-cols-3 gap-2">
                           <div>
                             <Label className="text-xs">Task</Label>
                             <Select
                               value={editTaskTitle}
                               onValueChange={setEditTaskTitle}
                             >
                               <SelectTrigger className="h-8 text-xs">
                                 <SelectValue placeholder="Select task..." />
                               </SelectTrigger>
                               <SelectContent>
                                 {taskOptions.map((option, index) => (
                                   <SelectItem key={index} value={option} className="text-xs">
                                     {option}
                                   </SelectItem>
                                 ))}
                                 <SelectItem value="custom" className="text-xs">Add Manual Task</SelectItem>
                               </SelectContent>
                             </Select>
                             {editTaskTitle === "custom" && (
                               <Input
                                 className="mt-1 h-8 text-xs"
                                 placeholder="Enter custom task..."
                                 onChange={(e) => setEditTaskTitle(e.target.value)}
                               />
                             )}
                           </div>
                           
                           <div>
                             <Label className="text-xs">Action Date</Label>
                             <Popover>
                               <PopoverTrigger asChild>
                                 <Button
                                   variant="outline"
                                   size="sm"
                                   className={cn(
                                     "w-full justify-start text-left font-normal h-8 text-xs",
                                     !editTaskDate && "text-muted-foreground"
                                   )}
                                 >
                                   <CalendarIcon className="mr-2 h-3 w-3" />
                                   {editTaskDate ? format(editTaskDate, "dd MMM") : "Pick date"}
                                 </Button>
                               </PopoverTrigger>
                               <PopoverContent className="w-auto p-0">
                                 <Calendar
                                   mode="single"
                                   selected={editTaskDate}
                                   onSelect={setEditTaskDate}
                                   initialFocus
                                 />
                               </PopoverContent>
                             </Popover>
                           </div>

                           <div>
                             <Label className="text-xs">Agenda Item</Label>
                             <Select
                               value={editTaskAgendaItem}
                               onValueChange={setEditTaskAgendaItem}
                             >
                               <SelectTrigger className="h-8 text-xs">
                                 <SelectValue placeholder="Select agenda..." />
                               </SelectTrigger>
                               <SelectContent>
                                 {agendaItems.map((item) => (
                                   <SelectItem key={item.id} value={item.id} className="text-xs">
                                     {item.title}
                                   </SelectItem>
                                 ))}
                                 <SelectItem value="new" className="text-xs">Add New Agenda Item</SelectItem>
                               </SelectContent>
                             </Select>
                           </div>
                         </div>
                         
                         <div>
                           <Label className="text-xs">Vertical</Label>
                           <Select
                             value={editTaskVertical}
                             onValueChange={setEditTaskVertical}
                           >
                             <SelectTrigger className="h-8 text-xs">
                               <SelectValue placeholder="Select vertical..." />
                             </SelectTrigger>
                             <SelectContent>
                               <SelectItem value="Financial Planning" className="text-xs">Financial Planning</SelectItem>
                               <SelectItem value="Tax Planning" className="text-xs">Tax Planning</SelectItem>
                               <SelectItem value="Insurance" className="text-xs">Insurance</SelectItem>
                               <SelectItem value="Credit Cards" className="text-xs">Credit Cards</SelectItem>
                               <SelectItem value="Banking ++" className="text-xs">Banking ++</SelectItem>
                               <SelectItem value="Estate Planning" className="text-xs">Estate Planning</SelectItem>
                               <SelectItem value="Others" className="text-xs">Others</SelectItem>
                             </SelectContent>
                           </Select>
                         </div>
                         
                         <div className="flex gap-2">
                           <Button onClick={saveTaskEdit} size="sm" className="h-6 text-xs">Save</Button>
                           <Button onClick={() => setEditingTask(null)} variant="outline" size="sm" className="h-6 text-xs">Cancel</Button>
                         </div>
                       </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="font-medium">{task.title}</div>
                          <p className="text-xs text-muted-foreground">
                            {format(task.actionDate, "dd MMM yyyy")}
                          </p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => startEditTask(task)}
                          >
                            <FileText className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeTask(task.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {tasks.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 text-sm">No tasks</p>
                )}
              </div>

              {/* Add Task Form */}
              {showAddTask && (
                <div className="mt-3 p-3 border rounded bg-muted/50">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Task</Label>
                      <Select
                        value={newTaskTitle}
                        onValueChange={setNewTaskTitle}
                      >
                        <SelectTrigger className="h-8 text-xs">
                          <SelectValue placeholder="Select task..." />
                        </SelectTrigger>
                        <SelectContent>
                          {taskOptions.map((option, index) => (
                            <SelectItem key={index} value={option} className="text-xs">
                              {option}
                            </SelectItem>
                          ))}
                          <SelectItem value="custom" className="text-xs">Custom Task</SelectItem>
                        </SelectContent>
                      </Select>
                      {newTaskTitle === "custom" && (
                        <Input
                          className="mt-2 h-8 text-xs"
                          placeholder="Enter custom task..."
                          onChange={(e) => setNewTaskTitle(e.target.value)}
                        />
                      )}
                    </div>
                    
                    <div>
                      <Label className="text-xs">Action Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "w-full justify-start text-left font-normal h-8 text-xs",
                              !newTaskDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-3 w-3" />
                            {newTaskDate ? format(newTaskDate, "dd MMM") : "Pick date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newTaskDate}
                            onSelect={setNewTaskDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleAddTask} size="sm" className="h-7 text-xs">Add</Button>
                      <Button 
                        onClick={() => setShowAddTask(false)} 
                        variant="outline" 
                        size="sm"
                        className="h-7 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-3 h-full flex flex-col">
          {/* Call Statistics - Three separate boxes with same height as advisors */}
          <div className="grid grid-cols-3 gap-2 flex-shrink-0">
            <Card className="flex items-center justify-center h-[88px]">
              <div className="text-center">
                <Phone className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <div className="text-lg font-bold">{cumulativeStats.totalCalls}</div>
                <p className="text-xs text-muted-foreground">Calls Completed</p>
              </div>
            </Card>
            
            <Card className="flex items-center justify-center h-[88px]">
              <div className="text-center">
                <FileText className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <div className="text-lg font-bold">{format(cumulativeStats.lastCallDate, "dd MMM")}</div>
                <p className="text-xs text-muted-foreground">Last Call Date</p>
              </div>
            </Card>
            
            <Card className="flex items-center justify-center h-[88px]">
              <div className="text-center">
                <TrendingUp className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <div className={`text-lg font-bold ${cumulativeStats.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                  {cumulativeStats.daysSinceLastCall}d
                </div>
                <p className="text-xs text-muted-foreground">Days Since</p>
              </div>
            </Card>
          </div>

          {/* Agenda Items */}
          <Card className="flex-1 min-h-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="h-4 w-4" />
                  Agenda Items ({agendaItems.filter(item => !item.completed).length} active)
                </CardTitle>
                <div className="flex gap-2">
                  <Select value={agendaFilter} onValueChange={(value: 'all' | 'completed' | 'pending') => setAgendaFilter(value)}>
                    <SelectTrigger className="h-6 w-20 text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all" className="text-xs">All</SelectItem>
                      <SelectItem value="pending" className="text-xs">Pending</SelectItem>
                      <SelectItem value="completed" className="text-xs">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button 
                    onClick={() => setShowAddAgenda(true)} 
                    size="sm"
                    className="h-6 px-2 text-xs"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-3rem)] overflow-y-auto">
              <div className="space-y-2">
                {sortedAgendaItems.map((item) => (
                  <div key={item.id} className={cn(
                    "p-2 border rounded text-sm",
                    item.completed && "bg-green-50 border-green-200"
                  )}>
                    {editingAgenda === item.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editAgendaTitle}
                          onChange={(e) => setEditAgendaTitle(e.target.value)}
                          className="h-8 text-xs"
                        />
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              size="sm"
                              className={cn(
                                "w-full justify-start text-left font-normal h-8 text-xs",
                                !editAgendaDate && "text-muted-foreground"
                              )}
                            >
                              <CalendarIcon className="mr-2 h-3 w-3" />
                              {editAgendaDate ? format(editAgendaDate, "dd MMM yyyy") : "Pick date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={editAgendaDate}
                              onSelect={setEditAgendaDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <div className="flex gap-2">
                          <Button onClick={saveAgendaEdit} size="sm" className="h-6 text-xs">Save</Button>
                          <Button onClick={() => setEditingAgenda(null)} variant="outline" size="sm" className="h-6 text-xs">Cancel</Button>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 flex-1">
                          <Checkbox
                            checked={item.completed}
                            onCheckedChange={() => toggleAgendaItem(item.id)}
                          />
                          <div className="flex-1">
                            <div className={cn(
                              "font-medium",
                              item.completed && "text-green-700"
                            )}>
                              {item.title}
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {format(item.date, "dd MMM yyyy")}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => startEditAgenda(item)}
                          >
                            <FileText className="h-3 w-3" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => removeAgendaItem(item.id)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
                {agendaItems.length === 0 && (
                  <p className="text-center text-muted-foreground py-4 text-sm">No agenda items</p>
                )}
              </div>

              {/* Add Agenda Item Form */}
              {showAddAgenda && (
                <div className="mt-3 p-3 border rounded bg-muted/50">
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Agenda Item</Label>
                      <Input
                        value={newAgendaTitle}
                        onChange={(e) => setNewAgendaTitle(e.target.value)}
                        placeholder="Enter agenda item..."
                        className="h-8 text-xs"
                      />
                    </div>
                    <div>
                      <Label className="text-xs">Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className={cn(
                              "w-full justify-start text-left font-normal h-8 text-xs",
                              !newAgendaDate && "text-muted-foreground"
                            )}
                          >
                            <CalendarIcon className="mr-2 h-3 w-3" />
                            {newAgendaDate ? format(newAgendaDate, "dd MMM") : "Pick date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={newAgendaDate}
                            onSelect={setNewAgendaDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <div className="flex gap-2">
                      <Button onClick={handleAddAgendaItem} size="sm" className="h-7 text-xs">Add</Button>
                      <Button 
                        onClick={() => {
                          setShowAddAgenda(false);
                          setNewAgendaTitle("");
                          setNewAgendaDate(undefined);
                        }} 
                        variant="outline" 
                        size="sm"
                        className="h-7 text-xs"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
