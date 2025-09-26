import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Shield, CreditCard, Building2, 
  Scale, FileText, MoreHorizontal, ChevronRight, Phone 
} from "lucide-react";
import { format } from "date-fns";
import { Client } from "@/types/client";
import { FRDSubsection } from "./FRDSubsection";
import { cn } from "@/lib/utils";

interface FRDDocumentProps {
  client: Client;
}

// Define the 7 subsections
const subsections = [
  { id: "financial", title: "Financial Planning", icon: TrendingUp, color: "bg-blue-500" },
  { id: "tax", title: "Tax Planning", icon: FileText, color: "bg-green-500" },
  { id: "insurance", title: "Insurance", icon: Shield, color: "bg-red-500" },
  { id: "credit", title: "Credit Cards", icon: CreditCard, color: "bg-purple-500" },
  { id: "banking", title: "Banking & Compliance", icon: Building2, color: "bg-orange-500" },
  { id: "estate", title: "Estate Planning", icon: Scale, color: "bg-indigo-500" },
  { id: "others", title: "Others", icon: MoreHorizontal, color: "bg-gray-500" }
];

export function FRDDocument({ client }: FRDDocumentProps) {
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);

  // Mock data for cumulative stats and agenda items
  const cumulativeStats = {
    totalCalls: 12,
    lastCallDate: new Date(2024, 8, 18),
    daysSinceLastCall: 8
  };

  const allAgendaItems = [
    { id: "1", title: "Review investment portfolio", vertical: "Financial Planning", completed: false },
    { id: "2", title: "Update insurance coverage", vertical: "Insurance", completed: false },
    { id: "3", title: "File ITR for FY 2023-24", vertical: "Tax Planning", completed: true },
    { id: "4", title: "Optimize credit card usage", vertical: "Credit Cards", completed: false },
    { id: "5", title: "Estate planning documents", vertical: "Estate Planning", completed: true }
  ];

  const activeAgendaItems = allAgendaItems.filter(item => !item.completed);
  const completedAgendaItems = allAgendaItems.filter(item => item.completed);

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

  if (selectedSubsection) {
    const subsection = subsections.find(s => s.id === selectedSubsection);
    
    return (
      <div className="h-[70vh] flex flex-col">
        {/* Fixed Tabs Header with proper spacing */}
        <div className="border-b bg-background z-10 pb-2 pt-3 flex-shrink-0">
          <Tabs value={selectedSubsection} onValueChange={setSelectedSubsection}>
            <TabsList className="grid w-full grid-cols-7 h-8">
              {subsections.map((subsection) => (
                <TabsTrigger key={subsection.id} value={subsection.id} className="text-xs px-2">
                  {subsection.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
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
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {subsections.map((subsection) => {
            const Icon = subsection.icon;
            const taskCount = pendingTasks[subsection.id as keyof typeof pendingTasks];
            const hasHighTasks = taskCount > 2;
            const hasTasks = taskCount > 0;
            return (
              <Button
                key={subsection.id} 
                variant="outline"
                size="sm"
                className={cn(
                  "h-auto p-2 flex-shrink-0 min-w-[85px] text-xs",
                  hasHighTasks && "border-red-500/60 bg-red-50/50",
                  hasTasks && !hasHighTasks && "border-orange-400/60 bg-orange-50/50"
                )}
                onClick={() => setSelectedSubsection(subsection.id)}
              >
                <div className="flex items-center gap-1.5">
                  <div className={`p-0.5 rounded ${subsection.color} text-white`}>
                    <Icon className="h-2.5 w-2.5" />
                  </div>
                  <div className="text-left">
                    <div className="text-xs font-medium leading-tight">{subsection.title}</div>
                    {taskCount > 0 && (
                      <div className="text-xs opacity-75 leading-tight">{taskCount} pending</div>
                    )}
                  </div>
                </div>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="flex-1 grid grid-cols-2 gap-3 min-h-0">
        {/* Left Column */}
        <div className="space-y-3 h-full flex flex-col">
          {/* Call Statistics - Match summary view style */}
          <Card className="flex-shrink-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium">Call Statistics</CardTitle>
            </CardHeader>
            <CardContent className="pt-0">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{cumulativeStats.totalCalls}</div>
                    <p className="text-xs text-muted-foreground">Total Calls</p>
                  </div>
                  <div className="text-center">
                    <div className="text-lg font-bold">{format(cumulativeStats.lastCallDate, "dd MMM")}</div>
                    <p className="text-xs text-muted-foreground">Last Call</p>
                  </div>
                  <div className="text-center">
                    <div className={`text-lg font-bold ${cumulativeStats.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                      {cumulativeStats.daysSinceLastCall}d
                    </div>
                    <p className="text-xs text-muted-foreground">Since</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pending Tasks */}
          <Card className="flex-1 min-h-0">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Pending Tasks</CardTitle>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-3rem)] overflow-y-auto">
              <p className="text-xs text-muted-foreground">Task overview coming soon</p>
            </CardContent>
          </Card>
        </div>

        {/* Right Column */}
        <div className="space-y-3 h-full flex flex-col">
          {/* Agenda Items - Combined with toggles */}
          <Card className="flex-1 min-h-0">
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CardTitle className="text-sm">Agenda Items</CardTitle>
                <div className="flex gap-2">
                  <Badge variant="secondary" className="text-xs">
                    Active: {activeAgendaItems.length}
                  </Badge>
                  <Badge variant="outline" className="text-xs">
                    Completed: {completedAgendaItems.length}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="pt-0 h-[calc(100%-3rem)] overflow-y-auto">
              {/* Active Items */}
              {activeAgendaItems.length > 0 && (
                <div className="mb-4">
                  <h4 className="text-xs font-medium text-green-600 mb-2">Active</h4>
                  <div className="space-y-2">
                    {activeAgendaItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-green-50 rounded">
                        <span>{item.title}</span>
                        <Badge variant="outline" className="text-xs">{item.vertical}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {/* Completed Items */}
              {completedAgendaItems.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-muted-foreground mb-2">Completed</h4>
                  <div className="space-y-2">
                    {completedAgendaItems.map((item) => (
                      <div key={item.id} className="flex justify-between items-center text-xs p-2 bg-muted/30 rounded">
                        <span className="line-through text-muted-foreground">{item.title}</span>
                        <Badge variant="outline" className="text-xs">{item.vertical}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              {activeAgendaItems.length === 0 && completedAgendaItems.length === 0 && (
                <p className="text-xs text-muted-foreground text-center py-4">No agenda items</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
