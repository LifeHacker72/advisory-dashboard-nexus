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
import { CalendarIcon, Plus, X, CheckCircle2, User, ClipboardList, Phone, FileText, TrendingUp } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { Client } from "@/types/client";

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
  date: Date;
}

interface FRDSubsectionProps {
  client: Client;
  vertical: string;
  onBack: () => void;
}

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

// Mock different advisors for each vertical
const getVerticalAdvisors = (vertical: string) => {
  const advisorMap: { [key: string]: string[] } = {
    "Financial Planning": ["Priya Sharma", "Vikram Singh"],
    "Tax Planning": ["Rajesh Kumar", "Anita Patel"],
    "Insurance": ["Meera Iyer", "Arjun Nair"],
    "Credit Cards": ["Priya Sharma"],
    "Banking & Compliance": ["Vikram Singh", "Anita Patel"],
    "Estate Planning": ["Rajesh Kumar"],
    "Others": ["Meera Iyer"]
  };
  return advisorMap[vertical] || ["Priya Sharma"];
};

export function FRDSubsection({ client, vertical, onBack }: FRDSubsectionProps) {
  const [advisors] = useState(getVerticalAdvisors(vertical));
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review investment portfolio", actionDate: new Date(2024, 8, 15), status: 'pending' },
    { id: "2", title: "Update insurance coverage", actionDate: new Date(2024, 8, 20), status: 'pending' }
  ]);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    { id: "1", title: "Gather current investment statements", completed: true, date: new Date(2024, 8, 10) },
    { id: "2", title: "Review risk tolerance", completed: false, date: new Date(2024, 8, 12) },
    { id: "3", title: "Discuss retirement timeline", completed: false, date: new Date(2024, 8, 14) }
  ]);
  
  // New task form state
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
  const [editAgendaTitle, setEditAgendaTitle] = useState("");
  const [editAgendaDate, setEditAgendaDate] = useState<Date>();

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
  };

  const saveTaskEdit = () => {
    if (editingTask && editTaskTitle && editTaskDate) {
      setTasks(tasks =>
        tasks.map(task =>
          task.id === editingTask
            ? { ...task, title: editTaskTitle, actionDate: editTaskDate }
            : task
        )
      );
      setEditingTask(null);
      setEditTaskTitle("");
      setEditTaskDate(undefined);
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

  // Mock stats data for this specific vertical
  const stats = {
    totalCalls: 8, // Specific to this vertical
    lastCallDate: new Date(2024, 8, 15),
    daysSinceLastCall: 11
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

  return (
    <div className="h-full flex flex-col space-y-3">
      {/* Main Content Grid */}
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
                  <div key={task.id} className="p-2 border rounded text-sm">
                    {editingTask === task.id ? (
                      <div className="space-y-2">
                        <Input
                          value={editTaskTitle}
                          onChange={(e) => setEditTaskTitle(e.target.value)}
                          className="h-8 text-xs"
                        />
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
                              {editTaskDate ? format(editTaskDate, "dd MMM yyyy") : "Pick date"}
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
                <div className="text-lg font-bold">{stats.totalCalls}</div>
                <p className="text-xs text-muted-foreground">Calls Completed</p>
              </div>
            </Card>
            
            <Card className="flex items-center justify-center h-[88px]">
              <div className="text-center">
                <FileText className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <div className="text-lg font-bold">{format(stats.lastCallDate, "dd MMM")}</div>
                <p className="text-xs text-muted-foreground">Last Call Date</p>
              </div>
            </Card>
            
            <Card className="flex items-center justify-center h-[88px]">
              <div className="text-center">
                <TrendingUp className="h-4 w-4 text-muted-foreground mx-auto mb-1" />
                <div className={`text-lg font-bold ${stats.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                  {stats.daysSinceLastCall}d
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