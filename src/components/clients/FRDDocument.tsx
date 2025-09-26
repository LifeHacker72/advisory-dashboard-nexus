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
}

interface AgendaItem {
  id: string;
  title: string;
  completed: boolean;
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
  { id: "banking", title: "Banking & Compliance", icon: Building2, color: "bg-orange-500" },
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
  
  // Overview section state (same as vertical sections)
  const [advisors] = useState(["Priya Sharma", "Rajesh Kumar"]);
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review investment portfolio", actionDate: new Date(2024, 8, 15), status: 'pending' },
    { id: "2", title: "Update insurance coverage", actionDate: new Date(2024, 8, 20), status: 'pending' }
  ]);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    { id: "1", title: "Gather current investment statements", completed: true },
    { id: "2", title: "Review risk tolerance", completed: false },
    { id: "3", title: "Discuss retirement timeline", completed: false }
  ]);
  
  // Form state for adding items
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState<Date>();
  const [showAddAgenda, setShowAddAgenda] = useState(false);
  const [newAgendaTitle, setNewAgendaTitle] = useState("");

  // Mock data for cumulative stats and agenda items
  const cumulativeStats = {
    totalCalls: 12,
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
        status: 'pending'
      };
      setTasks([...tasks, newTask]);
      setNewTaskTitle("");
      setNewTaskDate(undefined);
      setShowAddTask(false);
    }
  };

  const handleAddAgendaItem = () => {
    if (newAgendaTitle) {
      const newItem: AgendaItem = {
        id: Date.now().toString(),
        title: newAgendaTitle,
        completed: false
      };
      setAgendaItems([...agendaItems, newItem]);
      setNewAgendaTitle("");
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

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks =>
      tasks.map(task =>
        task.id === id ? { ...task, status: task.status === 'completed' ? 'pending' : 'completed' } : task
      )
    );
  };

  // Sort agenda items: active first, completed last
  const sortedAgendaItems = [...agendaItems].sort((a, b) => {
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
        {/* Client Name */}
        <div className="flex-shrink-0 mb-3">
          <h3 className="text-lg font-semibold">{client.name}</h3>
        </div>

        {/* Fixed Button Navigation */}
        <div className="border-b bg-background z-10 pb-3 flex-shrink-0">
          <div className="flex gap-1 overflow-x-auto pb-1">
            {subsections.map((section) => {
              const Icon = section.icon;
              const taskCount = section.id === "overview" ? 0 : pendingTasks[section.id as keyof typeof pendingTasks];
              const isActive = selectedSubsection === section.id;
              const hasHighTasks = taskCount > 2;
              const hasTasks = taskCount > 0;
              
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
          <Card className="flex-shrink-0" style={{ height: '120px' }}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-sm">
                <User className="h-4 w-4" />
                Advisors Assigned
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex gap-2">
                {advisors.map((advisor, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">{advisor}</Badge>
                ))}
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
                  <div key={task.id} className="flex items-center justify-between p-2 border rounded text-sm">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Checkbox
                          checked={task.status === 'completed'}
                          onCheckedChange={() => toggleTaskCompletion(task.id)}
                        />
                        <span className={task.status === 'completed' ? 'line-through text-muted-foreground' : ''}>{task.title}</span>
                      </div>
                      <p className="text-xs text-muted-foreground ml-6">
                        {format(task.actionDate, "dd MMM yyyy")}
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeTask(task.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
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
          {/* Call Statistics - Three separate boxes */}
          <div className="grid grid-cols-3 gap-2 flex-shrink-0">
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-lg font-bold">{cumulativeStats.totalCalls}</div>
                  <p className="text-xs text-muted-foreground">Calls Completed</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className="text-lg font-bold">{format(cumulativeStats.lastCallDate, "dd MMM")}</div>
                  <p className="text-xs text-muted-foreground">Last Call Date</p>
                </div>
              </div>
            </Card>
            
            <Card className="p-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-muted-foreground" />
                <div>
                  <div className={`text-lg font-bold ${cumulativeStats.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                    {cumulativeStats.daysSinceLastCall}d
                  </div>
                  <p className="text-xs text-muted-foreground">Days Since</p>
                </div>
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
                <Button 
                  onClick={() => setShowAddAgenda(true)} 
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
                {sortedAgendaItems.map((item) => (
                  <div key={item.id} className="flex items-center gap-2 p-2 border rounded text-sm">
                    <Checkbox
                      checked={item.completed}
                      onCheckedChange={() => toggleAgendaItem(item.id)}
                    />
                    <span className={cn(
                      "flex-1",
                      item.completed && "line-through text-muted-foreground"
                    )}>
                      {item.title}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => removeAgendaItem(item.id)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
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
                    <div className="flex gap-2">
                      <Button onClick={handleAddAgendaItem} size="sm" className="h-7 text-xs">Add</Button>
                      <Button 
                        onClick={() => setShowAddAgenda(false)} 
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
