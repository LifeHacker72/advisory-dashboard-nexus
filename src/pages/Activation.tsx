
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CheckCircle2, UserPlus, Users, Calendar } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface PendingClient {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  advisor: string;
  paymentDate: string;
}

const pendingClients: PendingClient[] = [
  {
    id: 1,
    name: "Thomas Anderson",
    company: "Matrix Technologies",
    email: "thomas.anderson@example.com",
    phone: "(555) 123-4567",
    advisor: "Emily Richardson",
    paymentDate: "Apr 15, 2025",
  },
  {
    id: 2,
    name: "Rachel Green",
    company: "Central Perk Inc.",
    email: "rachel.green@example.com",
    phone: "(555) 234-5678",
    advisor: "Daniel Morgan",
    paymentDate: "Apr 20, 2025",
  },
  {
    id: 3,
    name: "Walter White",
    company: "White Enterprises",
    email: "walter.white@example.com",
    phone: "(555) 345-6789",
    advisor: "Sophia Chen",
    paymentDate: "Apr 25, 2025",
  },
];

interface Advisor {
  id: number;
  name: string;
  email: string;
  phone: string;
  clients: number;
}

const advisors: Advisor[] = [
  {
    id: 1,
    name: "Emily Richardson",
    email: "emily.richardson@example.com",
    phone: "(555) 123-4567",
    clients: 28,
  },
  {
    id: 2,
    name: "Daniel Morgan",
    email: "daniel.morgan@example.com",
    phone: "(555) 234-5678",
    clients: 22,
  },
  {
    id: 3,
    name: "Sophia Chen",
    email: "sophia.chen@example.com",
    phone: "(555) 345-6789",
    clients: 19,
  },
  {
    id: 4,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 456-7890",
    clients: 26,
  },
  {
    id: 5,
    name: "Olivia Martinez",
    email: "olivia.martinez@example.com",
    phone: "(555) 567-8901",
    clients: 24,
  },
];

export default function Activation() {
  const [selectedClient, setSelectedClient] = useState<PendingClient | null>(null);
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [showAdvisorRevisionDialog, setShowAdvisorRevisionDialog] = useState(false);
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Member Activation</h2>
            <p className="text-muted-foreground">
              Manage the onboarding process for new members.
            </p>
          </div>
          <Button 
            className="bg-primary text-black"
            onClick={() => setShowNewClientDialog(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Onboard New Member
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Pending Activations */}
          <Card className="h-full glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Pending Activations</CardTitle>
                  <CardDescription>Members awaiting full onboarding</CardDescription>
                </div>
                <div className="flex items-center text-sm">
                  <StatusBadge variant="warning">
                    {pendingClients.length} Pending
                  </StatusBadge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {pendingClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-4 hover:bg-accent/30 hover-highlight transition-colors cursor-pointer"
                    onClick={() => setSelectedClient(client)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium clickable">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {client.company}
                        </p>
                      </div>
                      <div className="text-sm">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                          <span>Payment: {client.paymentDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      Assigned to: <span className="clickable">{client.advisor}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Advisor Revision */}
          <Card className="h-full glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Advisor Revision</CardTitle>
                  <CardDescription>Manage advisor assignments</CardDescription>
                </div>
                <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => setShowAdvisorRevisionDialog(true)}
                >
                  Manage Assignments
                </Button>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {advisors.slice(0, 4).map((advisor) => (
                  <div
                    key={advisor.id}
                    className="p-4 hover:bg-accent/30 hover-highlight transition-colors cursor-pointer"
                    onClick={() => setSelectedAdvisor(advisor)}
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium clickable">{advisor.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {advisor.email}
                        </p>
                      </div>
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1.5 text-muted-foreground" />
                        <span className="text-sm">{advisor.clients} members</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="border-t py-3 px-4">
              <div className="w-full text-center">
                <Button 
                  variant="ghost" 
                  className="text-sm text-muted-foreground"
                  onClick={() => setShowAdvisorRevisionDialog(true)}
                >
                  View All Advisors
                </Button>
              </div>
            </CardFooter>
          </Card>
        </div>

        {/* New Member Dialog */}
        <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Onboard New Member</DialogTitle>
              <DialogDescription>
                Enter the details of the new member to begin the onboarding process.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client-name" className="text-right">
                  Name
                </Label>
                <Input
                  id="client-name"
                  placeholder="Full name"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client-type" className="text-right">
                  Type
                </Label>
                <Select defaultValue="indian">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select member type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="indian">Indian</SelectItem>
                    <SelectItem value="nri">NRI</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client-email" className="text-right">
                  Email
                </Label>
                <Input
                  id="client-email"
                  type="email"
                  placeholder="Email address"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client-phone" className="text-right">
                  Phone
                </Label>
                <Input
                  id="client-phone"
                  type="tel"
                  placeholder="Phone number"
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="spouse-name" className="text-right">
                  Spouse Name
                </Label>
                <Input
                  id="spouse-name"
                  placeholder="Spouse name (optional)"
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowNewClientDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-black"
                onClick={() => {
                  console.log("Send onboarding details");
                  setShowNewClientDialog(false);
                }}
              >
                Send Onboarding Details
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Advisor Revision Dialog */}
        <Dialog open={showAdvisorRevisionDialog} onOpenChange={setShowAdvisorRevisionDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Advisor Assignment Revision</DialogTitle>
              <DialogDescription>
                Manage advisor assignments and add new advisors.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <div className="mb-4 flex justify-between items-center">
                <h3 className="text-sm font-medium">Current Advisors</h3>
                <Button size="sm" variant="outline">
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add New Advisor
                </Button>
              </div>
              <div className="border rounded-md overflow-hidden divide-y">
                {advisors.map((advisor) => (
                  <div key={advisor.id} className="p-3 flex justify-between items-center hover:bg-accent/30 hover-highlight">
                    <div>
                      <p className="font-medium clickable">{advisor.name}</p>
                      <p className="text-sm text-muted-foreground">{advisor.email}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm">{advisor.clients} members</span>
                      <Button size="sm" variant="ghost">Edit</Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-3">Member-Advisor Assignments</h3>
                <div className="border rounded-md overflow-hidden divide-y">
                  {pendingClients.map((client) => (
                    <div key={client.id} className="p-3 flex justify-between items-center hover:bg-accent/30 hover-highlight">
                      <div>
                        <p className="font-medium clickable">{client.name}</p>
                        <p className="text-sm text-muted-foreground">{client.company}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Select defaultValue={client.advisor}>
                          <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select advisor" />
                          </SelectTrigger>
                          <SelectContent>
                            {advisors.map((advisor) => (
                              <SelectItem key={advisor.id} value={advisor.name}>
                                {advisor.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button size="sm" variant="outline">
                          <CheckCircle2 className="h-4 w-4" />
                          <span className="sr-only">Save</span>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button onClick={() => setShowAdvisorRevisionDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
