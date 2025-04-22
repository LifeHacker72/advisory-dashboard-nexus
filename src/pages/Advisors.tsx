import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Mail, Phone, Users, Calendar, Award, Star, ThumbsUp, Edit, Eye } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

interface Advisor {
  id: number;
  name: string;
  position: string;
  avatar: string;
  email: string;
  phone: string;
  activeClients: number;
  totalClients: number;
  totalCalls: number;
  pendingTasks: number;
  specialties: string[];
  status: "active" | "on leave" | "training";
  joinDate: string;
  bio?: string;
}

const advisors: Advisor[] = [
  {
    id: 1,
    name: "Emily Richardson",
    position: "Senior Financial Advisor",
    avatar: "ER",
    email: "emily.richardson@example.com",
    phone: "(555) 123-4567",
    activeClients: 28,
    totalClients: 35,
    totalCalls: 145,
    pendingTasks: 8,
    specialties: ["Retirement Planning", "Investment Management", "Estate Planning"],
    status: "active",
    joinDate: "Mar 15, 2020",
    bio: "Emily has over 10 years of experience in financial advisory and wealth management services. She specializes in retirement planning and estate strategies for high-net-worth individuals."
  },
  {
    id: 2,
    name: "Daniel Morgan",
    position: "Wealth Management Advisor",
    avatar: "DM",
    email: "daniel.morgan@example.com",
    phone: "(555) 234-5678",
    activeClients: 22,
    totalClients: 28,
    totalCalls: 112,
    pendingTasks: 5,
    specialties: ["Tax Planning", "Portfolio Management", "Wealth Preservation"],
    status: "active",
    joinDate: "Jun 8, 2020",
    bio: "Daniel is an expert in tax planning and portfolio management with a background in accounting and investment banking. He helps clients optimize their tax strategies while growing their wealth."
  },
  {
    id: 3,
    name: "Sophia Chen",
    position: "Investment Advisor",
    avatar: "SC",
    email: "sophia.chen@example.com",
    phone: "(555) 345-6789",
    activeClients: 19,
    totalClients: 23,
    totalCalls: 98,
    pendingTasks: 12,
    specialties: ["Risk Management", "Asset Allocation", "College Planning"],
    status: "training",
    joinDate: "Nov 22, 2021",
    bio: "Sophia combines her technical background in finance with a client-first approach to financial planning. She specializes in helping families plan for educational expenses and risk management."
  },
  {
    id: 4,
    name: "James Wilson",
    position: "Financial Planner",
    avatar: "JW",
    email: "james.wilson@example.com",
    phone: "(555) 456-7890",
    activeClients: 26,
    totalClients: 30,
    totalCalls: 127,
    pendingTasks: 9,
    specialties: ["Retirement Income", "Insurance Planning", "Estate Strategies"],
    status: "active",
    joinDate: "Sep 5, 2020",
    bio: "James focuses on creating sustainable retirement income strategies for clients nearing or in retirement. He takes a holistic approach to financial planning that integrates insurance and estate needs."
  },
  {
    id: 5,
    name: "Olivia Martinez",
    position: "Retirement Specialist",
    avatar: "OM",
    email: "olivia.martinez@example.com",
    phone: "(555) 567-8901",
    activeClients: 24,
    totalClients: 29,
    totalCalls: 118,
    pendingTasks: 6,
    specialties: ["Retirement Income", "Social Security", "Medicare Planning"],
    status: "on leave",
    joinDate: "Feb 14, 2021",
    bio: "Olivia specializes in retirement planning with particular expertise in Social Security optimization and Medicare planning. She helps clients navigate the complexities of government benefits in retirement."
  },
  {
    id: 6,
    name: "Robert Johnson",
    position: "Estate Planning Advisor",
    avatar: "RJ",
    email: "robert.johnson@example.com",
    phone: "(555) 678-9012",
    activeClients: 21,
    totalClients: 27,
    totalCalls: 105,
    pendingTasks: 7,
    specialties: ["Trust Creation", "Legacy Planning", "Business Succession"],
    status: "active",
    joinDate: "May 3, 2021",
    bio: "Robert has extensive experience in estate planning and business succession strategies. He helps clients preserve and transfer wealth across generations while minimizing tax implications."
  },
];

export default function Advisors() {
  const [selectedAdvisor, setSelectedAdvisor] = useState<Advisor | null>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [timeframe, setTimeframe] = useState("lifetime");

  const handleViewDetails = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowDetailsDialog(true);
  };

  const handleEditProfile = (advisor: Advisor) => {
    setSelectedAdvisor(advisor);
    setShowEditDialog(true);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Turtle Advisors</h2>
            <p className="text-muted-foreground">
              View and manage all financial advisors on your team.
            </p>
          </div>
          <Button className="bg-primary text-black h-10 px-4 py-2">
            Add New Advisor
          </Button>
        </div>
        
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {advisors.map((advisor) => (
            <Card key={advisor.id} className="overflow-hidden glass-card hover:shadow-md transition-all hover:translate-y-[-2px] hover-highlight">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <div className="flex items-center space-x-4">
                    <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                      {advisor.avatar}
                    </div>
                    <div>
                      <CardTitle className="text-lg">{advisor.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{advisor.position}</p>
                    </div>
                  </div>
                  <StatusBadge
                    variant={
                      advisor.status === "active"
                        ? "success"
                        : advisor.status === "on leave"
                        ? "warning"
                        : "info"
                    }
                  >
                    {advisor.status === "active"
                      ? "Active"
                      : advisor.status === "on leave"
                      ? "On Leave"
                      : "Training"}
                  </StatusBadge>
                </div>
              </CardHeader>
              <CardContent className="pb-0">
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-3">
                    <div className="flex items-center text-sm clickable">
                      <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{advisor.email}</span>
                    </div>
                    <div className="flex items-center text-sm clickable">
                      <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{advisor.phone}</span>
                    </div>
                    <div className="flex items-center text-sm clickable">
                      <Users className="h-4 w-4 mr-2 text-muted-foreground" />
                      <span>{advisor.activeClients} active members</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between pt-4">
                <Button 
                  variant="outline"
                  onClick={() => handleEditProfile(advisor)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Profile
                </Button>
                <Button 
                  className="bg-primary text-black"
                  onClick={() => handleViewDetails(advisor)}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Advisor Details</DialogTitle>
              <DialogDescription>
                Comprehensive overview of the advisor's performance and assignments.
              </DialogDescription>
            </DialogHeader>
            {selectedAdvisor && (
              <div className="py-4">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-xl">
                    {selectedAdvisor.avatar}
                  </div>
                  <div>
                    <h2 className="text-xl font-bold">{selectedAdvisor.name}</h2>
                    <p className="text-muted-foreground">{selectedAdvisor.position}</p>
                  </div>
                </div>

                <Tabs defaultValue="lifetime" className="mb-4">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-sm font-medium">Performance Metrics</h3>
                    <TabsList>
                      <TabsTrigger 
                        value="week" 
                        onClick={() => setTimeframe("week")}
                      >
                        Week
                      </TabsTrigger>
                      <TabsTrigger 
                        value="month" 
                        onClick={() => setTimeframe("month")}
                      >
                        Month
                      </TabsTrigger>
                      <TabsTrigger 
                        value="quarter" 
                        onClick={() => setTimeframe("quarter")}
                      >
                        Quarter
                      </TabsTrigger>
                      <TabsTrigger 
                        value="year" 
                        onClick={() => setTimeframe("year")}
                      >
                        Year
                      </TabsTrigger>
                      <TabsTrigger 
                        value="lifetime" 
                        onClick={() => setTimeframe("lifetime")}
                      >
                        Lifetime
                      </TabsTrigger>
                    </TabsList>
                  </div>

                  <TabsContent value="lifetime" className="mt-0">
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      <Card>
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm">Total Members Assigned</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">{selectedAdvisor.totalClients}</div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm">Active Members Assigned</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">{selectedAdvisor.activeClients}</div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm">Total Calls Taken</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">{selectedAdvisor.totalCalls}</div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader className="py-2">
                          <CardTitle className="text-sm">Total Pending Tasks</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex justify-between items-center">
                            <div className="text-2xl font-bold">{selectedAdvisor.pendingTasks}</div>
                            <Button size="sm" variant="outline">
                              <Eye className="h-3.5 w-3.5 mr-1" />
                              View
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="week">
                    <div className="text-center py-10 text-muted-foreground">
                      Weekly data for {selectedAdvisor.name}
                    </div>
                  </TabsContent>
                  <TabsContent value="month">
                    <div className="text-center py-10 text-muted-foreground">
                      Monthly data for {selectedAdvisor.name}
                    </div>
                  </TabsContent>
                  <TabsContent value="quarter">
                    <div className="text-center py-10 text-muted-foreground">
                      Quarterly data for {selectedAdvisor.name}
                    </div>
                  </TabsContent>
                  <TabsContent value="year">
                    <div className="text-center py-10 text-muted-foreground">
                      Yearly data for {selectedAdvisor.name}
                    </div>
                  </TabsContent>
                </Tabs>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium mb-2">Specialties</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedAdvisor.specialties.map((specialty, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium transition-colors bg-secondary text-secondary-foreground"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Bio</h3>
                    <p className="text-sm text-muted-foreground">
                      {selectedAdvisor.bio || "No bio available."}
                    </p>
                  </div>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button onClick={() => setShowDetailsDialog(false)}>
                Close
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Advisor Profile</DialogTitle>
              <DialogDescription>
                Update the advisor's contact information and bio.
              </DialogDescription>
            </DialogHeader>
            {selectedAdvisor && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-email" className="text-right">
                    Email
                  </Label>
                  <Input
                    id="edit-email"
                    defaultValue={selectedAdvisor.email}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-phone" className="text-right">
                    Phone
                  </Label>
                  <Input
                    id="edit-phone"
                    defaultValue={selectedAdvisor.phone}
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-picture" className="text-right">
                    Picture
                  </Label>
                  <Input
                    id="edit-picture"
                    type="file"
                    accept="image/*"
                    className="col-span-3"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="edit-bio" className="text-right pt-2">
                    Bio
                  </Label>
                  <Textarea
                    id="edit-bio"
                    defaultValue={selectedAdvisor.bio}
                    rows={5}
                    className="col-span-3"
                  />
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-black"
                onClick={() => {
                  console.log("Profile updated");
                  setShowEditDialog(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
