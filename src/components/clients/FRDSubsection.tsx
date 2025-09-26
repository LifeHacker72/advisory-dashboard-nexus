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
import { CalendarIcon, Plus, X, CheckCircle2, User, ClipboardList, Phone } from "lucide-react";
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

export function FRDSubsection({ client, vertical, onBack }: FRDSubsectionProps) {
  const [advisors] = useState(["Priya Sharma", "Rajesh Kumar"]); // Mock data
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "Review investment portfolio", actionDate: new Date(2024, 8, 15), status: 'pending' },
    { id: "2", title: "Update insurance coverage", actionDate: new Date(2024, 8, 20), status: 'pending' }
  ]);
  const [agendaItems, setAgendaItems] = useState<AgendaItem[]>([
    { id: "1", title: "Gather current investment statements", completed: true },
    { id: "2", title: "Review risk tolerance", completed: false },
    { id: "3", title: "Discuss retirement timeline", completed: false }
  ]);
  
  // New task form state
  const [showAddTask, setShowAddTask] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDate, setNewTaskDate] = useState<Date>();
  const [showAddAgenda, setShowAddAgenda] = useState(false);
  const [newAgendaTitle, setNewAgendaTitle] = useState("");

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

  // Mock stats data
  const stats = {
    totalCalls: 8,
    lastCallDate: new Date(2024, 8, 15),
    daysSinceLastCall: 11
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

  return (
    <div className="h-full flex flex-col space-y-3">
      {/* Fixed Header Area - Client Name, Vertical, and Back Button */}
      <div className="flex-shrink-0">
        <div className="flex items-center gap-2 mb-2">
          <Button variant="outline" size="sm" onClick={onBack}>← Back</Button>
          <h3 className="text-lg font-semibold">{client.name} - {vertical}</h3>
        </div>
      </div>

      {/* Main Content Grid */}
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
          {/* Call Statistics - Match height with Advisors */}
          <Card className="flex-shrink-0" style={{ height: '120px' }}>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Call Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center gap-4">
                <div className="text-center">
                  <div className="text-xl font-bold">{stats.totalCalls}</div>
                  <p className="text-xs text-muted-foreground">Calls</p>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold">{format(stats.lastCallDate, "dd MMM")}</div>
                  <p className="text-xs text-muted-foreground">Last Call</p>
                </div>
                <div className="text-center">
                  <div className={`text-lg font-bold ${stats.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                    {stats.daysSinceLastCall}d
                  </div>
                  <p className="text-xs text-muted-foreground">Since</p>
                </div>
              </div>
            </CardContent>
          </Card>

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