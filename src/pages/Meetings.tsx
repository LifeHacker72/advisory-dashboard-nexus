
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
  FileText,
  Link as LinkIcon
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

interface Meeting {
  id: number;
  client: string;
  advisor: string;
  meetingNumber: number;
  actionItems: string[];
  detailedNotes: string;
  recordingLink?: string;
}

const meetings: Meeting[] = [
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
    recordingLink: "https://example.com/recordings/meeting-1"
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
    recordingLink: "https://example.com/recordings/meeting-2"
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
    detailedNotes: "Initial meeting with new client. Recently divorced and needs comprehensive financial plan update. Current priorities include reassessing retirement goals and updating estate planning documents."
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
    recordingLink: "https://example.com/recordings/meeting-4"
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
    recordingLink: "https://example.com/recordings/meeting-5"
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
    detailedNotes: "Client recently turned 60 and wants to revisit estate plan. Has concerns about aging parents and potential caregiving responsibilities. Discussed importance of having proper legal documents in place for both client and parents."
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
    recordingLink: "https://example.com/recordings/meeting-7"
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
    recordingLink: "https://example.com/recordings/meeting-8"
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
    detailedNotes: "Client planning early retirement in 2 years. Discussed Roth conversion ladder strategy to optimize tax situation before required minimum distributions begin. Needs updated cash flow projections based on new retirement date."
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
    recordingLink: "https://example.com/recordings/meeting-10"
  }
];

export default function Meetings() {
  const [selectedAdvisorFilter, setSelectedAdvisorFilter] = useState<string>("all");
  const [selectedClientFilter, setSelectedClientFilter] = useState<string>("all");
  
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
                <ul className="list-disc pl-5 space-y-2">
                  {meeting.actionItems.map((item, index) => (
                    <li key={index} className="flex justify-between items-start gap-2">
                      <span>{item}</span>
                      <div className="flex gap-1">
                        <button className="text-primary hover:text-primary/80 p-1">
                          <CheckCircle2 className="h-4 w-4" />
                        </button>
                        <button className="text-primary hover:text-primary/80 p-1">
                          <FileText className="h-4 w-4" />
                        </button>
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
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto">
            Record New Meeting
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
        />
      </div>
    </DashboardLayout>
  );
}
