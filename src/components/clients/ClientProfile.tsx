import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Client } from "@/types/client";
import { ClientProfileHeader } from "./ClientProfileHeader";
import { ClientBioSection } from "./ClientBioSection";
import { ClientMetricsGrid } from "./ClientMetricsGrid";
import { ClientRecentBookings } from "./ClientRecentBookings";
import { RiskProfileResponses } from "./RiskProfileResponses";
import { AdvisoryAgreement } from "./AdvisoryAgreement";
import { KYCDocuments } from "./KYCDocuments";

interface ClientProfileProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

export function ClientProfile({ client, isOpen, onClose }: ClientProfileProps) {
  const [activeTab, setActiveTab] = useState("summary");

  useEffect(() => {
    if (isOpen) {
      // Disable scrolling on body when popup is open
      document.body.style.overflow = 'hidden';
    } else {
      // Re-enable scrolling when popup is closed
      document.body.style.overflow = 'unset';
    }

    // Cleanup function to ensure scrolling is re-enabled when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 overflow-hidden" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, width: '100vw', height: '100vh', zIndex: 99999 }}>
      <div className="bg-background rounded-lg shadow-xl w-full max-w-7xl h-[90vh] flex flex-col overflow-hidden">
        <ClientProfileHeader client={client} onClose={onClose} />

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="mx-6 mt-4 w-fit flex-shrink-0">
            <TabsTrigger value="summary">Summary View</TabsTrigger>
            <TabsTrigger value="notes">Meeting Notes</TabsTrigger>
            <TabsTrigger value="tasks">Pending Tasks</TabsTrigger>
            <TabsTrigger value="info">General Info</TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-hidden min-h-0">
            <TabsContent value="summary" className="mt-0 h-full overflow-hidden">
              <ScrollArea className="h-full">
                <div className="p-6 space-y-6">
                  <ClientBioSection />
                  <ClientMetricsGrid client={client} />
                  <ClientRecentBookings client={client} />
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="notes" className="mt-0 h-full overflow-hidden">
              <ScrollArea className="h-full">
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

            <TabsContent value="tasks" className="mt-0 h-full overflow-hidden">
              <ScrollArea className="h-full">
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

            <TabsContent value="info" className="mt-0 h-full overflow-hidden">
              <ScrollArea className="h-full">
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
    </div>
  );
}
