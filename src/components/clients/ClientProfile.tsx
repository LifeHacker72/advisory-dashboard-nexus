
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Client } from "@/types/client";
import { ClientProfileHeaderExtended } from "./ClientProfileHeaderExtended";
import { ClientSummaryView } from "./ClientSummaryView";
import { ClientRecentBookings } from "./ClientRecentBookings";
import { RiskProfileResponses } from "./RiskProfileResponses";
import { AdvisoryAgreement } from "./AdvisoryAgreement";
import { KYCDocuments } from "./KYCDocuments";
import { FRDDocument } from "./FRDDocument";

interface ClientProfileProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function ClientProfile({ client, isOpen, onClose }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState("summary");

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] p-0 overflow-hidden">
        <DialogTitle className="sr-only">Client Profile - {client.name}</DialogTitle>
        <DialogDescription className="sr-only">
          View and manage detailed information about {client.name}
        </DialogDescription>
        <div className="flex flex-col h-full max-h-[90vh]">
          <ClientProfileHeaderExtended client={client} />

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden min-h-0">
            <TabsList className="mx-6 mt-4 w-fit flex-shrink-0">
              <TabsTrigger value="summary">Summary View</TabsTrigger>
              <TabsTrigger value="bookings">Bookings</TabsTrigger>
              <TabsTrigger value="frd">FRD</TabsTrigger>
              <TabsTrigger value="notes">Meeting Notes</TabsTrigger>
              <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
              <TabsTrigger value="info">General Info</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-hidden min-h-0">
              <TabsContent value="summary" className="mt-0 h-full overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-4">
                    <ClientSummaryView client={client} />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="bookings" className="mt-0 h-full overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <ClientRecentBookings client={client} />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="frd" className="mt-0 h-full overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <FRDDocument client={client} />
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="notes" className="mt-0 h-full overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Meeting Notes</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Meeting notes functionality will be implemented here.</p>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="tasks" className="mt-0 h-full overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Pending Tasks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-muted-foreground">Pending tasks functionality will be implemented here.</p>
                      </CardContent>
                    </Card>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="info" className="mt-0 h-full overflow-hidden m-0 data-[state=active]:flex data-[state=active]:flex-col">
                <ScrollArea className="flex-1">
                  <div className="p-6 space-y-4">
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

                    {/* Risk Profile and Advisory Agreement side by side */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <RiskProfileResponses />
                      <AdvisoryAgreement />
                    </div>

                    <KYCDocuments />
                  </div>
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
