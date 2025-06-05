
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { X, Calendar, Users, Phone, Clock, CheckSquare, AlertTriangle, Edit3, ExternalLink } from "lucide-react";
import { Client } from "@/types/client";

interface ClientProfileProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function ClientProfile({ client, isOpen, onClose }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState("summary");
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [clientBio, setClientBio] = useState("John is a seasoned financial advisor with over 15 years of experience in wealth management. He specializes in retirement planning and has helped numerous clients achieve their financial goals through strategic investment planning.");
  const [linkedinProfile, setLinkedinProfile] = useState("https://linkedin.com/in/michael-johnson");

  if (!isOpen) return null;

  // Mock data for demonstration - this would come from your data source
  const profileData = {
    membershipExpiryDate: "Mar 15, 2024",
    advisorsAssigned: ["Sarah Johnson", "Michael Brown", "David Wilson", "Jennifer Smith"],
    callsCompleted: 12,
    tasksPending: 3,
    tasksOverdue: 1
  };

  // Mock recent bookings data
  const recentBookings = [
    { id: 1, advisor: "Sarah Johnson", date: "2024-01-15", status: "completed" },
    { id: 2, advisor: "Michael Brown", date: "2024-01-12", status: "completed" },
    { id: 3, advisor: "David Wilson", date: "2024-01-08", status: "cancelled" },
    { id: 4, advisor: "Sarah Johnson", date: "2024-01-05", status: "completed" },
    { id: 5, advisor: "Jennifer Smith", date: "2024-01-03", status: "completed" },
  ];

  const handleSaveBio = () => {
    setIsEditingBio(false);
    // TODO: Save bio to backend
    console.log("Saving bio:", clientBio, "LinkedIn:", linkedinProfile);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-4">
            <div>
              <h2 className="text-2xl font-bold">{client.name}</h2>
              <p className="text-muted-foreground">{client.email}</p>
            </div>
            <StatusBadge
              variant={
                client.subscriptionStatus === "active" ? "success" :
                client.subscriptionStatus === "expired" ? "danger" :
                "warning"
              }
            >
              {client.subscriptionStatus.charAt(0).toUpperCase() + client.subscriptionStatus.slice(1)}
            </StatusBadge>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="h-8 w-8 p-0"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
          <TabsList className="mx-6 mt-4 w-fit">
            <TabsTrigger value="summary">Summary View</TabsTrigger>
            <TabsTrigger value="notes">Meeting Notes</TabsTrigger>
            <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
            <TabsTrigger value="info">General Info</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-auto p-6">
            <TabsContent value="summary" className="mt-0 space-y-6">
              {/* Client Bio Section */}
              <Card>
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Client Bio</CardTitle>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsEditingBio(!isEditingBio)}
                      className="h-8 w-8 p-0"
                    >
                      <Edit3 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  {isEditingBio ? (
                    <div className="space-y-4">
                      <Textarea
                        value={clientBio}
                        onChange={(e) => setClientBio(e.target.value)}
                        placeholder="Enter client bio..."
                        className="min-h-[100px]"
                      />
                      <div className="space-y-2">
                        <label className="text-sm font-medium">LinkedIn Profile</label>
                        <input
                          type="url"
                          value={linkedinProfile}
                          onChange={(e) => setLinkedinProfile(e.target.value)}
                          placeholder="https://linkedin.com/in/..."
                          className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background"
                        />
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleSaveBio} size="sm">Save</Button>
                        <Button variant="outline" onClick={() => setIsEditingBio(false)} size="sm">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm leading-relaxed">{clientBio}</p>
                      {linkedinProfile && (
                        <a
                          href={linkedinProfile}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                        >
                          <ExternalLink className="h-4 w-4" />
                          LinkedIn Profile
                        </a>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Metrics Grid */}
              <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
                {/* Membership Expiry Date - Smaller */}
                <Card className="col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-blue-600" />
                      Membership Expiry
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{profileData.membershipExpiryDate}</div>
                  </CardContent>
                </Card>

                {/* Advisors Assigned - Larger */}
                <Card className="col-span-2">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium flex items-center gap-1">
                      <Users className="h-3 w-3 text-green-600" />
                      Advisors Assigned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold mb-1">{profileData.advisorsAssigned.length}</div>
                    <div className="text-xs text-muted-foreground grid grid-cols-2 gap-1">
                      {profileData.advisorsAssigned.map((advisor, index) => (
                        <div key={index} className="truncate">{advisor}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Calls Completed - Smaller */}
                <Card className="col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium flex items-center gap-1">
                      <Phone className="h-3 w-3 text-purple-600" />
                      Calls
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{profileData.callsCompleted}</div>
                    <p className="text-xs text-muted-foreground">completed</p>
                  </CardContent>
                </Card>

                {/* Days Since Last Call - Smaller */}
                <Card className="col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium flex items-center gap-1">
                      <Clock className="h-3 w-3 text-orange-600" />
                      Last Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-lg font-bold ${client.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                      {client.daysSinceLastCall}
                    </div>
                    <p className="text-xs text-muted-foreground">days ago</p>
                  </CardContent>
                </Card>

                {/* Tasks Pending - Smaller */}
                <Card className="col-span-1">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xs font-medium flex items-center gap-1">
                      <CheckSquare className="h-3 w-3 text-blue-600" />
                      Pending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-lg font-bold">{profileData.tasksPending}</div>
                    <p className="text-xs text-muted-foreground">tasks</p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Bookings Table */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Recent Bookings</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="max-h-[300px] overflow-y-auto">
                    <table className="w-full">
                      <thead className="sticky top-0 bg-background border-b">
                        <tr>
                          <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">Advisor</th>
                          <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">Date</th>
                          <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {recentBookings.map((booking) => (
                          <tr key={booking.id} className="hover:bg-muted/50">
                            <td className="py-3 text-sm">{booking.advisor}</td>
                            <td className="py-3 text-sm">{booking.date}</td>
                            <td className="py-3">
                              <StatusBadge
                                variant={
                                  booking.status === "completed" ? "success" :
                                  booking.status === "cancelled" ? "danger" :
                                  "warning"
                                }
                              >
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </StatusBadge>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notes" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Meeting Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Meeting notes functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tasks" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>Pending Tasks</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">Pending tasks functionality will be implemented here.</p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="info" className="mt-0">
              <Card>
                <CardHeader>
                  <CardTitle>General Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium">Email:</p>
                          <p className="text-sm col-span-2">{client.email}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium">Phone:</p>
                          <p className="text-sm col-span-2">{client.phone}</p>
                        </div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-sm font-medium text-muted-foreground mb-2">Subscription Details</h4>
                      <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium">Status:</p>
                          <div className="col-span-2">
                            <StatusBadge
                              variant={
                                client.subscriptionStatus === "active" ? "success" :
                                client.subscriptionStatus === "expired" ? "danger" :
                                "warning"
                              }
                            >
                              {client.subscriptionStatus.charAt(0).toUpperCase() + client.subscriptionStatus.slice(1)}
                            </StatusBadge>
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                          <p className="text-sm font-medium">Subscription Date:</p>
                          <p className="text-sm col-span-2">{client.subscriptionDate}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
