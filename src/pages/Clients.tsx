
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Button } from "@/components/ui/button";
import { ClientProfile } from "@/components/clients/ClientProfile";
import { ClientMetrics } from "@/components/clients/ClientMetrics";
import { ClientsTable } from "@/components/clients/ClientsTable";
import { Client } from "@/types/client";

const clients: Client[] = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "(555) 123-4567",
    subscriptionDate: "Jan 15, 2023",
    subscriptionStatus: "active",
    daysSinceLastCall: 5,
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 234-5678",
    subscriptionDate: "Feb 3, 2023",
    subscriptionStatus: "active",
    daysSinceLastCall: 12,
  },
  {
    id: 3,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "(555) 345-6789",
    subscriptionDate: "Mar 20, 2023",
    subscriptionStatus: "expired",
    daysSinceLastCall: 45,
  },
  {
    id: 4,
    name: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    phone: "(555) 456-7890",
    subscriptionDate: "Apr 11, 2023",
    subscriptionStatus: "active",
    daysSinceLastCall: 3,
  },
  {
    id: 5,
    name: "Robert Davis",
    email: "robert.davis@example.com",
    phone: "(555) 567-8901",
    subscriptionDate: "May 7, 2023",
    subscriptionStatus: "dormant",
    daysSinceLastCall: 28,
  },
  {
    id: 6,
    name: "Elizabeth Wilson",
    email: "elizabeth.wilson@example.com",
    phone: "(555) 678-9012",
    subscriptionDate: "Jun 22, 2023",
    subscriptionStatus: "active",
    daysSinceLastCall: 8,
  },
  {
    id: 7,
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    phone: "(555) 789-0123",
    subscriptionDate: "Jul 9, 2023",
    subscriptionStatus: "expired",
    daysSinceLastCall: 67,
  },
];

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setIsProfileOpen(true);
  };

  const handleEditClient = (client: Client) => {
    console.log("Edit client:", client);
    // TODO: Implement edit functionality
  };

  const handleCloseProfile = () => {
    setIsProfileOpen(false);
    setSelectedClient(null);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Members</h2>
            <p className="text-muted-foreground">
              Manage member subscriptions and track engagement.
            </p>
          </div>
          <Button>
            Add New Member
          </Button>
        </div>

        <ClientMetrics clients={clients} />

        <ClientsTable
          clients={clients}
          onViewClient={handleViewClient}
          onEditClient={handleEditClient}
        />

        {selectedClient && (
          <ClientProfile
            client={selectedClient}
            isOpen={isProfileOpen}
            onClose={handleCloseProfile}
          />
        )}
      </div>
    </DashboardLayout>
  );
}
