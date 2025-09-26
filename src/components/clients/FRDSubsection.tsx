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
import { CalendarIcon, Plus, X, CheckCircle2, User, ClipboardList } from "lucide-react";
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

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <Button variant="outline" onClick={onBack}>← Back</Button>
        <div>
          <h2 className="text-2xl font-semibold">{client.name} - {vertical}</h2>
          <p className="text-muted-foreground">Financial planning vertical management</p>
        </div>
      </div>

      {/* Advisor Assignment */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Advisor(s) Assigned
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            {advisors.map((advisor, index) => (
              <Badge key={index} variant="secondary">{advisor}</Badge>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Tasks Section */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="h-5 w-5" />
              Tasks Pending ({tasks.filter(t => t.status === 'pending').length})
            </CardTitle>
            <Button 
              onClick={() => setShowAddTask(true)} 
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Task
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex-1">
                  <p className="font-medium">{task.title}</p>
                  <p className="text-sm text-muted-foreground">
                    Action date: {format(task.actionDate, "PPP")}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant={task.status === 'completed' ? 'default' : 'secondary'}>
                    {task.status}
                  </Badge>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeTask(task.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
            {tasks.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No tasks pending</p>
            )}
          </div>

          {/* Add Task Form */}
          {showAddTask && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <div className="space-y-4">
                <div>
                  <Label>Task</Label>
                  <Select
                    value={newTaskTitle}
                    onValueChange={setNewTaskTitle}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select or type a task..." />
                    </SelectTrigger>
                    <SelectContent>
                      {taskOptions.map((option, index) => (
                        <SelectItem key={index} value={option}>
                          {option}
                        </SelectItem>
                      ))}
                      <SelectItem value="custom">Custom Task</SelectItem>
                    </SelectContent>
                  </Select>
                  {newTaskTitle === "custom" && (
                    <Input
                      className="mt-2"
                      placeholder="Enter custom task..."
                      onChange={(e) => setNewTaskTitle(e.target.value)}
                    />
                  )}
                </div>
                
                <div>
                  <Label>Action Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !newTaskDate && "text-muted-foreground"
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {newTaskDate ? format(newTaskDate, "PPP") : "Pick a date"}
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
                  <Button onClick={handleAddTask} size="sm">Add Task</Button>
                  <Button 
                    onClick={() => setShowAddTask(false)} 
                    variant="outline" 
                    size="sm"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Agenda Items */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5" />
              Agenda Items ({agendaItems.filter(item => !item.completed).length} remaining)
            </CardTitle>
            <Button 
              onClick={() => setShowAddAgenda(true)} 
              size="sm"
              className="flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {agendaItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 p-3 border rounded-lg">
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
                  onClick={() => removeAgendaItem(item.id)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            {agendaItems.length === 0 && (
              <p className="text-center text-muted-foreground py-4">No agenda items</p>
            )}
          </div>

          {/* Add Agenda Item Form */}
          {showAddAgenda && (
            <div className="mt-4 p-4 border rounded-lg bg-muted/50">
              <div className="space-y-4">
                <div>
                  <Label>Agenda Item</Label>
                  <Input
                    value={newAgendaTitle}
                    onChange={(e) => setNewAgendaTitle(e.target.value)}
                    placeholder="Enter agenda item..."
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={handleAddAgendaItem} size="sm">Add Item</Button>
                  <Button 
                    onClick={() => setShowAddAgenda(false)} 
                    variant="outline" 
                    size="sm"
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
  );
}