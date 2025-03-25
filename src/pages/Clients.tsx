
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  company: string;
  status: "active" | "inactive" | "pending";
  type: string;
  joinDate: string;
  revenue: number;
}

const clients: Client[] = [
  {
    id: 1,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    phone: "(555) 123-4567",
    company: "Johnson Enterprises",
    status: "active",
    type: "Corporate",
    joinDate: "Jan 15, 2023",
    revenue: 45000,
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    phone: "(555) 234-5678",
    company: "Williams Group",
    status: "active",
    type: "SMB",
    joinDate: "Feb 3, 2023",
    revenue: 28500,
  },
  {
    id: 3,
    name: "David Brown",
    email: "david.brown@example.com",
    phone: "(555) 345-6789",
    company: "Brown Consulting",
    status: "inactive",
    type: "Individual",
    joinDate: "Mar 20, 2023",
    revenue: 12000,
  },
  {
    id: 4,
    name: "Jennifer Smith",
    email: "jennifer.smith@example.com",
    phone: "(555) 456-7890",
    company: "Smith & Associates",
    status: "pending",
    type: "Corporate",
    joinDate: "Apr 11, 2023",
    revenue: 52000,
  },
  {
    id: 5,
    name: "Robert Davis",
    email: "robert.davis@example.com",
    phone: "(555) 567-8901",
    company: "Davis Industries",
    status: "active",
    type: "Corporate",
    joinDate: "May 7, 2023",
    revenue: 67500,
  },
  {
    id: 6,
    name: "Elizabeth Wilson",
    email: "elizabeth.wilson@example.com",
    phone: "(555) 678-9012",
    company: "Wilson Financial",
    status: "active",
    type: "SMB",
    joinDate: "Jun 22, 2023",
    revenue: 31200,
  },
  {
    id: 7,
    name: "Thomas Anderson",
    email: "thomas.anderson@example.com",
    phone: "(555) 789-0123",
    company: "Anderson LLC",
    status: "inactive",
    type: "Individual",
    joinDate: "Jul 9, 2023",
    revenue: 8500,
  },
];

export default function Clients() {
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
    },
    {
      key: "company",
      title: "Company",
      sortable: true,
    },
    {
      key: "type",
      title: "Type",
    },
    {
      key: "email",
      title: "Email",
    },
    {
      key: "joinDate",
      title: "Join Date",
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      render: (client: Client) => (
        <StatusBadge
          variant={
            client.status === "active"
              ? "success"
              : client.status === "inactive"
              ? "danger"
              : "warning"
          }
        >
          {client.status.charAt(0).toUpperCase() + client.status.slice(1)}
        </StatusBadge>
      ),
    },
    {
      key: "revenue",
      title: "Revenue",
      sortable: true,
      render: (client: Client) => `$${client.revenue.toLocaleString()}`,
    },
  ];

  const handleRowClick = (client: Client) => {
    setSelectedClient(client);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Client Management</h2>
            <p className="text-muted-foreground">
              View and manage all client accounts and memberships.
            </p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Client
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Total Clients</CardTitle>
              <CardDescription>All registered clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{clients.length}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Active Memberships</CardTitle>
              <CardDescription>Currently active clients</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {clients.filter(c => c.status === "active").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Total Revenue</CardTitle>
              <CardDescription>From all client contracts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ${clients.reduce((sum, client) => sum + client.revenue, 0).toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          columns={columns}
          data={clients}
          keyExtractor={(client) => client.id}
          onRowClick={handleRowClick}
          searchPlaceholder="Search clients..."
        />

        {selectedClient && (
          <Card className="mt-6 border border-primary/20 shadow-md animate-scale-in">
            <CardHeader>
              <CardTitle>{selectedClient.name}</CardTitle>
              <CardDescription>{selectedClient.company}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Email:</p>
                      <p className="text-sm col-span-2">{selectedClient.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Phone:</p>
                      <p className="text-sm col-span-2">{selectedClient.phone}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Client Type:</p>
                      <p className="text-sm col-span-2">{selectedClient.type}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Membership Details</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Status:</p>
                      <div className="col-span-2">
                        <StatusBadge
                          variant={
                            selectedClient.status === "active"
                              ? "success"
                              : selectedClient.status === "inactive"
                              ? "danger"
                              : "warning"
                          }
                        >
                          {selectedClient.status.charAt(0).toUpperCase() + selectedClient.status.slice(1)}
                        </StatusBadge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Join Date:</p>
                      <p className="text-sm col-span-2">{selectedClient.joinDate}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Annual Revenue:</p>
                      <p className="text-sm col-span-2">${selectedClient.revenue.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                onClick={() => setSelectedClient(null)}
              >
                Close
              </button>
              <div className="flex space-x-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  Edit Profile
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                  View Details
                </button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
