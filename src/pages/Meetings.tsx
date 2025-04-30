import { useState } from "react";
import { format } from "date-fns";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { 
  CheckCircle2, 
  Clock, 
  Calendar, 
  UserCog, 
  ClipboardList, 
  FileText,
  Link as LinkIcon,
  CalendarPlus,
  Plus,
  AlertCircle,
  Edit
} from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger, 
  DialogFooter 
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

interface ActionItem {
  id: number;
  text: string;
  status: "pending" | "overdue" | "completed";
}

interface Meeting {
  id: number;
  client: string;
  advisor: string;
  meetingNumber: number;
  date: string;
  actionItems: ActionItem[];
  detailedNotes: string;
  recordingLink?: string;
}

interface MeetingFormData {
  client: string;
  advisor: string;
  date: string;
  detailedNotes: string;
  actionItems: string;
}

// Convert the existing meetings data to use the new ActionItem structure
const meetings: Meeting[] = [
  {
    id: 1,
    client: "Thomas Anderson",
    advisor: "Emily Richardson",
    date: "2024-03-15",
    meetingNumber: 3,
    actionItems: [
      { id: 1, text: "Review investment portfolio allocation", status: "pending" },
      { id: 2, text: "Prepare tax planning documents", status: "overdue" },
      { id: 3, text: "Schedule follow-up call for next quarter", status: "pending" }
    ],
    detailedNotes: "Client expressed interest in sustainable investing options. Discussed potential reallocation of 30% of portfolio to ESG funds. Need to prepare comparison report of performance for similar ESG vs. traditional funds.",
    recordingLink: "https://example.com/recordings/meeting-1"
  },
  {
    id: 2,
    client: "Sarah Williams",
    advisor: "Daniel Morgan",
    date: "2024-03-20",
    meetingNumber: 5,
    actionItems: [
      { id: 4, text: "Update retirement projections", status: "pending" },
      { id: 5, text: "Research college savings options for children", status: "completed" },
      { id: 6, text: "Review insurance coverage", status: "pending" }
    ],
    detailedNotes: "Client concerned about rising education costs. Recommended 529 plan for two children (ages 10 and 12). Spouse recently changed jobs, so need to review new benefits package and identify any coverage gaps.",
    recordingLink: "https://example.com/recordings/meeting-2"
  },
  {
    id: 3,
    client: "Michael Brown",
    advisor: "James Wilson",
    date: "2024-03-25",
    meetingNumber: 1,
    actionItems: [
      { id: 7, text: "Complete risk assessment questionnaire", status: "pending" },
      { id: 8, text: "Gather existing financial documents", status: "pending" },
      { id: 9, text: "Set up client portal access", status: "pending" }
    ],
    detailedNotes: "Initial meeting with new client. Recently divorced and needs comprehensive financial plan update. Current priorities include reassessing retirement goals and updating estate planning documents."
  },
  {
    id: 4,
    client: "Jennifer Davis",
    advisor: "Sophia Chen",
    date: "2024-03-28",
    meetingNumber: 7,
    actionItems: [
      { id: 10, text: "Update beneficiary information", status: "pending" },
      { id: 11, text: "Review recent portfolio performance", status: "pending" },
      { id: 12, text: "Discuss charitable giving strategies", status: "pending" }
    ],
    detailedNotes: "Client interested in establishing donor-advised fund for charitable giving. Recently received inheritance and wants to discuss tax-efficient strategies for managing these additional assets.",
    recordingLink: "https://example.com/recordings/meeting-4"
  },
  {
    id: 5,
    client: "Lisa Anderson",
    advisor: "Robert Johnson",
    date: "2024-04-01",
    meetingNumber: 2,
    actionItems: [
      { id: 13, text: "Create cash flow projection", status: "pending" },
      { id: 14, text: "Review debt reduction strategies", status: "pending" },
      { id: 15, text: "Evaluate employee stock options", status: "pending" }
    ],
    detailedNotes: "Client recently promoted to executive position with significant stock compensation. Need to develop strategy for diversification while minimizing tax impact. Also concerned about educational funding for teenager planning to attend college in 3 years.",
    recordingLink: "https://example.com/recordings/meeting-5"
  },
  {
    id: 6,
    client: "David Brown",
    advisor: "Olivia Martinez",
    date: "2024-04-05",
    meetingNumber: 4,
    actionItems: [
      { id: 16, text: "Update estate planning documents", status: "pending" },
      { id: 17, text: "Review life insurance needs", status: "pending" },
      { id: 18, text: "Discuss long-term care options", status: "pending" }
    ],
    detailedNotes: "Client recently turned 60 and wants to revisit estate plan. Has concerns about aging parents and potential caregiving responsibilities. Discussed importance of having proper legal documents in place for both client and parents."
  },
  {
    id: 7,
    client: "Robert Davis",
    advisor: "Daniel Morgan",
    date: "2024-04-08",
    meetingNumber: 6,
    actionItems: [
      { id: 19, text: "Rebalance investment portfolio", status: "pending" },
      { id: 20, text: "Review tax loss harvesting opportunities", status: "pending" },
      { id: 21, text: "Update retirement income projections", status: "pending" }
    ],
    detailedNotes: "Annual review meeting. Portfolio has drifted from target allocation due to market performance. Identified several tax loss harvesting opportunities to offset capital gains from business sale earlier in the year.",
    recordingLink: "https://example.com/recordings/meeting-7"
  },
  {
    id: 8,
    client: "Walter White",
    advisor: "Emily Richardson",
    date: "2024-04-10",
    meetingNumber: 1,
    actionItems: [
      { id: 22, text: "Complete risk profile assessment", status: "pending" },
      { id: 23, text: "Gather existing financial statements", status: "pending" },
      { id: 24, text: "Set up automatic investments", status: "pending" }
    ],
    detailedNotes: "Initial meeting with new client. Recently retired and rolled over 401(k) to IRA. Primary concern is generating reliable retirement income while preserving principal. Conservative risk tolerance - prioritizes capital preservation over growth.",
    recordingLink: "https://example.com/recordings/meeting-8"
  },
  {
    id: 9,
    client: "Elizabeth Wilson",
    advisor: "James Wilson",
    date: "2024-04-12",
    meetingNumber: 8,
    actionItems: [
      { id: 25, text: "Update financial plan projections", status: "pending" },
      { id: 26, text: "Review asset allocation strategy", status: "pending" },
      { id: 27, text: "Discuss Roth conversion opportunities", status: "pending" }
    ],
    detailedNotes: "Client planning early retirement in 2 years. Discussed Roth conversion ladder strategy to optimize tax situation before required minimum distributions begin. Needs updated cash flow projections based on new retirement date."
  },
  {
    id: 10,
    client: "Multiple",
    advisor: "Sophia Chen",
    date: "2024-04-15",
    meetingNumber: 2,
    actionItems: [
      { id: 28, text: "Update contact information", status: "pending" },
      { id: 29, text: "Verify account preferences", status: "pending" },
      { id: 30, text: "Send welcome package materials", status: "pending" }
    ],
    detailedNotes: "Administrative follow-up for recently onboarded clients. Need to verify all paperwork is complete and that clients have successfully accessed their online portals. Schedule individual welcome calls for next week.",
    recordingLink: "https://example.com/recordings/meeting-10"
  }
];

export default function Meetings() {
  const [selectedAdvisorFilter, setSelectedAdvisorFilter] = useState<string>("all");
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("all");
  const [isAddingMeeting, setIsAddingMeeting] = useState(false);
  const [editingActionItem, setEditingActionItem] = useState<{meetingId: number, itemId: number} | null>(null);
  
  const { toast } = useToast();
  
  const form = useForm<MeetingFormData>({
    defaultValues: {
      client: "",
      advisor: "",
      date: new Date().toISOString().split('T')[0],
      detailedNotes: "",
      actionItems: ""
    }
  });
  
  // Handle status change for action items
  const handleActionItemStatusChange = (meetingId: number, itemId: number, newStatus: string) => {
    // In a real app, this would update the database
    // For now, we'll just show a toast notification
    toast({
      title: "Action item status updated",
      description: `Action item #${itemId} status changed to ${newStatus}`,
    });
  };
  
  // Get filtered meetings based on filters
  const getFilteredMeetings = () => {
    return meetings.filter((meeting) => {
      const advisorMatch = selectedAdvisorFilter === "all" || meeting.advisor === selectedAdvisorFilter;
      const clientMatch = selectedClientFilter === "all" || meeting.client === selectedClientFilter;
      return advisorMatch && clientMatch;
    });
  };
  
  const filteredMeetings = getFilteredMeetings();
  
  // Get unique advisor and client names for filters
  const advisors = [...new Set(meetings.map(meeting => meeting.advisor))];
  const clients = [...new Set(meetings.map(meeting => meeting.client))];
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return format(date, "MMM dd, yyyy");
  };
  
  const columns = [
    {
      key: "client",
      title: "Client",
      sortable: true,
      render: (meeting: Meeting) => (
        <span className="hover:underline cursor-pointer" onClick={() => setSelectedClientFilter(meeting.client)}>
          {meeting.client}
        </span>
      )
    },
    {
      key: "advisor",
      title: "Advisor",
      sortable: true,
      render: (meeting: Meeting) => (
        <span className="hover:underline cursor-pointer" onClick={() => setSelectedAdvisorFilter(meeting.advisor)}>
          {meeting.advisor}
        </span>
      )
    },
    {
      key: "date",
      title: "Date",
      sortable: true,
      render: (meeting: Meeting) => (
        <div>{formatDate(meeting.date)}</div>
      ),
    },
    {
      key: "meetingNumber",
      title: "Meeting Number",
      sortable: true,
      render: (meeting: Meeting) => (
        <div className="text-center">{meeting.meetingNumber}</div>
      ),
    },
    {
      key: "actionItems",
      title: "Action Items",
      render: (meeting: Meeting) => {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-primary hover:underline">
                <ClipboardList className="h-4 w-4" /> {meeting.actionItems.length} items
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Action Items for {meeting.client}</DialogTitle>
                <DialogDescription>
                  Tasks that need to be completed based on this meeting
                </DialogDescription>
              </DialogHeader>
              <div className="mt-4">
                <ul className="list-disc pl-5 space-y-3">
                  {meeting.actionItems.map((item) => (
                    <li key={item.id} className="flex justify-between items-start gap-2">
                      <span>{item.text}</span>
                      <div className="flex gap-1">
                        <StatusBadge 
                          variant={
                            item.status === "completed" ? "success" : 
                            item.status === "pending" ? "warning" : 
                            "danger"
                          }
                          icon={
                            item.status === "completed" ? <CheckCircle2 className="h-3.5 w-3.5 mr-1" /> : 
                            item.status === "pending" ? <Clock className="h-3.5 w-3.5 mr-1" /> : 
                            <AlertCircle className="h-3.5 w-3.5 mr-1" />
                          }
                          selectable={true}
                          onStatusChange={(status) => handleActionItemStatusChange(meeting.id, item.id, status)}
                          currentStatus={item.status}
                          className="mr-2"
                        >
                          {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                        </StatusBadge>
                        
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="h-7 w-7 p-0 flex items-center justify-center rounded-md hover:bg-accent"
                          onClick={() => setEditingActionItem({ meetingId: meeting.id, itemId: item.id })}
                        >
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit action item</span>
                        </Button>
                      </div>
                    </li>
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
      render: (meeting: Meeting) => {
        return (
          <Dialog>
            <DialogTrigger asChild>
              <button className="flex items-center gap-1 text-primary hover:underline">
                <FileText className="h-4 w-4" /> View Notes
              </button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-lg">
              <DialogHeader>
                <DialogTitle>Detailed Notes for {meeting.client}</DialogTitle>
              </DialogHeader>
              <div className="mt-4 space-y-4">
                <div className="bg-muted/30 p-4 rounded-md">
                  <p>{meeting.detailedNotes}</p>
                </div>
                {meeting.recordingLink && (
                  <div className="mt-4">
                    <a 
                      href={meeting.recordingLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-primary hover:underline"
                    >
                      <LinkIcon className="h-4 w-4" />
                      View Meeting Recording
                    </a>
                  </div>
                )}
              </div>
            </DialogContent>
          </Dialog>
        );
      },
    }
  ];

  const handleSubmit = (data: MeetingFormData) => {
    console.log("Creating new meeting:", data);
    setIsAddingMeeting(false);
    form.reset();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Meetings</h2>
            <p className="text-muted-foreground">
              Review past client meetings and their action items
            </p>
          </div>
          <button 
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto"
            onClick={() => setIsAddingMeeting(true)}
          >
            <CalendarPlus className="mr-2 h-4 w-4" />
            Add New Meeting
          </button>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
          <div>
            <label htmlFor="advisor-filter" className="text-sm font-medium mr-2">
              Advisor:
            </label>
            <select
              id="advisor-filter"
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={selectedAdvisorFilter}
              onChange={(e) => setSelectedAdvisorFilter(e.target.value)}
            >
              <option value="all">All Advisors</option>
              {advisors.map(advisor => (
                <option key={advisor} value={advisor}>{advisor}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="client-filter" className="text-sm font-medium mr-2">
              Client:
            </label>
            <select
              id="client-filter"
              className="rounded-md border border-input bg-background px-3 py-1 text-sm"
              value={selectedClientFilter}
              onChange={(e) => setSelectedClientFilter(e.target.value)}
            >
              <option value="all">All Clients</option>
              {clients.map(client => (
                <option key={client} value={client}>{client}</option>
              ))}
            </select>
          </div>
        </div>
        
        <DataTable
          columns={columns}
          data={filteredMeetings}
          keyExtractor={(meeting) => meeting.id}
          searchPlaceholder="Search meetings..."
          className="space-y-1" // Add spacing between rows
          rowClassName="hover:outline hover:outline-1 hover:outline-[#2edebe] rounded-md" // Add hover highlight
        />
        
        {/* Add Meeting Dialog */}
        <Dialog open={isAddingMeeting} onOpenChange={setIsAddingMeeting}>
          <DialogContent className="sm:max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Meeting</DialogTitle>
              <DialogDescription>
                Record details of a client meeting
              </DialogDescription>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
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
                  name="date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Meeting Date</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="detailedNotes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detailed Notes</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Enter meeting notes"
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="actionItems"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Action Items</FormLabel>
                      <FormControl>
                        <div className="space-y-2">
                          <Textarea 
                            placeholder="Enter action items, one per line"
                            className="min-h-[80px]"
                            {...field}
                          />
                          <p className="text-xs text-muted-foreground">Enter each action item on a new line. These will be converted to tasks.</p>
                        </div>
                      </FormControl>
                    </FormItem>
                  )}
                />
                
                <DialogFooter>
                  <Button type="button" variant="outline" onClick={() => setIsAddingMeeting(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Create Meeting
                  </Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
        
        {/* Action Item Edit Dialog */}
        {editingActionItem && (
          <Dialog open={!!editingActionItem} onOpenChange={(open) => !open && setEditingActionItem(null)}>
            <DialogContent className="sm:max-w-md">
              <DialogHeader>
                <DialogTitle>Edit Action Item</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium" htmlFor="action-text">Action Item Text</label>
                  <Input 
                    id="action-text"
                    defaultValue={meetings
                      .find(m => m.id === editingActionItem.meetingId)?.actionItems
                      .find(item => item.id === editingActionItem.itemId)?.text} 
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <div className="flex gap-2">
                    {["pending", "overdue", "completed"].map(status => {
                      const currentStatus = meetings
                        .find(m => m.id === editingActionItem.meetingId)?.actionItems
                        .find(item => item.id === editingActionItem.itemId)?.status;
                        
                      return (
                        <button
                          key={status}
                          className={cn(
                            "px-3 py-1 rounded-md text-sm",
                            status === "pending" && "bg-amber-500/15 text-amber-600 border border-amber-500/20",
                            status === "overdue" && "bg-destructive/15 text-destructive border border-destructive/20",
                            status === "completed" && "bg-green-500/15 text-green-600 border border-green-500/20",
                            currentStatus === status && "ring-2 ring-offset-1 ring-ring"
                          )}
                          onClick={() => {
                            handleActionItemStatusChange(editingActionItem.meetingId, editingActionItem.itemId, status);
                          }}
                        >
                          {status.charAt(0).toUpperCase() + status.slice(1)}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setEditingActionItem(null)}>
                  Cancel
                </Button>
                <Button onClick={() => {
                  toast({
                    title: "Action item updated",
                    description: "The action item has been updated successfully."
                  });
                  setEditingActionItem(null);
                }}>
                  Save Changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </DashboardLayout>
  );
}
