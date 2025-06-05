
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { X, Calendar, Users, Phone, Clock, CheckSquare, AlertTriangle } from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscriptionDate: string;
  subscriptionStatus: "active" | "expired" | "dormant";
  daysSinceLastCall: number;
}

interface ClientProfileProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function ClientProfile({ client, isOpen, onClose }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState("summary");

  if (!isOpen) return null;

  // Mock data for demonstration - this would come from your data source
  const profileData = {
    membershipExpiryDate: "Mar 15, 2024",
    advisorsAssigned: ["Sarah Johnson", "Michael Brown"],
    callsCompleted: 12,
    tasksPending: 3,
    tasksOverdue: 1
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
      <div className="bg-background rounded-lg shadow-xl w-full max-w-6xl h-[90vh] flex flex-col overflow-hidden">
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
            <TabsContent value="summary" className="mt-0">
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* Membership Expiry Date */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-blue-600" />
                      Membership Expiry Date
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{profileData.membershipExpiryDate}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {client.subscriptionStatus === "active" ? "Active subscription" : "Subscription ended"}
                    </p>
                  </CardContent>
                </Card>

                {/* Advisors Assigned */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Users className="h-4 w-4 text-green-600" />
                      Advisors Assigned
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{profileData.advisorsAssigned.length}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {profileData.advisorsAssigned.map((advisor, index) => (
                        <div key={index}>{advisor}</div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* No. Of Calls Completed */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-purple-600" />
                      No. Of Calls Completed
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{profileData.callsCompleted}</div>
                    <p className="text-xs text-muted-foreground mt-1">Total calls this year</p>
                  </CardContent>
                </Card>

                {/* Days Since Last Call */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <Clock className="h-4 w-4 text-orange-600" />
                      Days Since Last Call
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${client.daysSinceLastCall > 30 ? "text-red-600" : ""}`}>
                      {client.daysSinceLastCall}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {client.daysSinceLastCall > 30 ? "Requires attention" : "Recent contact"}
                    </p>
                  </CardContent>
                </Card>

                {/* Number of Tasks Pending */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <CheckSquare className="h-4 w-4 text-blue-600" />
                      Number of Tasks Pending
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{profileData.tasksPending}</div>
                    <p className="text-xs text-muted-foreground mt-1">Active tasks</p>
                  </CardContent>
                </Card>

                {/* Number of Tasks Overdue */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-2">
                      <AlertTriangle className="h-4 w-4 text-red-600" />
                      Number of Tasks Overdue
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-red-600">{profileData.tasksOverdue}</div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {profileData.tasksOverdue > 0 ? "Needs immediate attention" : "All tasks on track"}
                    </p>
                  </CardContent>
                </Card>
              </div>
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

        {/* Footer */}
        <div className="flex justify-between items-center p-6 border-t bg-muted/20">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              Edit Profile
            </Button>
            <Button>
              Schedule Call
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
