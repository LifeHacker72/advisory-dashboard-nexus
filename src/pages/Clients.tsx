import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscriptionDate: string;
  subscriptionStatus: "active" | "expired" | "dormant";
  daysSinceLastCall: number;
}

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
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("none");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  // Calculate metrics
  const totalMembers = clients.length;
  const activeMembers = clients.filter(c => c.subscriptionStatus === "active").length;
  const expiredMembers = clients.filter(c => c.subscriptionStatus === "expired").length;
  const dormantMembers = clients.filter(c => c.subscriptionStatus === "dormant").length;

  // Filter and sort clients
  const getFilteredAndSortedClients = () => {
    let filteredClients = statusFilter === "all" ? clients : clients.filter(client => client.subscriptionStatus === statusFilter);
    
    if (sortBy === "daysSinceLastCall") {
      filteredClients = [...filteredClients].sort((a, b) => {
        const compareResult = a.daysSinceLastCall - b.daysSinceLastCall;
        return sortOrder === "asc" ? compareResult : -compareResult;
      });
    }
    
    return filteredClients;
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
  };

  const handleEditClient = (client: Client) => {
    console.log("Edit client:", client);
    // TODO: Implement edit functionality
  };

  const handleStatusWidgetClick = (status: string) => {
    setStatusFilter(status);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    if (value === "none") {
      setSortOrder("asc");
    }
  };

  const handleSortOrderChange = (order: "asc" | "desc") => {
    setSortOrder(order);
  };

  const filterOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Expired", value: "expired" },
    { label: "Dormant", value: "dormant" },
  ];

  const sortOptions = [
    { label: "None", value: "none" },
    { label: "Days Since Last Call", value: "daysSinceLastCall" },
  ];

  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
    },
    {
      key: "subscriptionDate",
      title: "Subscription Date",
      sortable: true,
    },
    {
      key: "subscriptionStatus",
      title: "Subscription Status",
      render: (client: Client) => (
        <StatusBadge
          variant={
            client.subscriptionStatus === "active" ? "success" :
            client.subscriptionStatus === "expired" ? "danger" :
            "warning"
          }
        >
          {client.subscriptionStatus.charAt(0).toUpperCase() + client.subscriptionStatus.slice(1)}
        </StatusBadge>
      ),
    },
    {
      key: "daysSinceLastCall",
      title: "Days Since Last Call",
      sortable: true,
      render: (client: Client) => (
        <span className={client.daysSinceLastCall > 30 ? "text-red-600 font-medium" : ""}>
          {client.daysSinceLastCall} days
        </span>
      ),
    },
    {
      key: "email",
      title: "Email ID",
    },
    {
      key: "phone",
      title: "Phone Number",
    },
    {
      key: "actions",
      title: "Actions",
      render: (client: Client) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleViewClient(client)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleEditClient(client)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Turtle Members</h2>
            <p className="text-muted-foreground">
              Manage member subscriptions and track engagement.
            </p>
          </div>
          <Button>
            Add New Member
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card 
            className="glass-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleStatusWidgetClick("all")}
          >
            <CardHeader className="pb-2">
              <CardTitle>Total Members</CardTitle>
              <CardDescription>All registered members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{totalMembers}</div>
            </CardContent>
          </Card>
          
          <Card 
            className="glass-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleStatusWidgetClick("active")}
          >
            <CardHeader className="pb-2">
              <CardTitle>Active</CardTitle>
              <CardDescription>Currently active subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{activeMembers}</div>
            </CardContent>
          </Card>

          <Card 
            className="glass-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleStatusWidgetClick("expired")}
          >
            <CardHeader className="pb-2">
              <CardTitle>Expired</CardTitle>
              <CardDescription>Expired subscriptions</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-600">{expiredMembers}</div>
            </CardContent>
          </Card>

          <Card 
            className="glass-card cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => handleStatusWidgetClick("dormant")}
          >
            <CardHeader className="pb-2">
              <CardTitle>Dormant</CardTitle>
              <CardDescription>Inactive members</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-600">{dormantMembers}</div>
            </CardContent>
          </Card>
        </div>

        <div className="flex gap-4 items-center">
          <div>
            <label htmlFor="status-filter" className="text-sm font-medium mr-2">
              Filter by Status:
            </label>
            <select
              id="status-filter"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="dormant">Dormant</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="sort-filter" className="text-sm font-medium mr-2">
              Sort by:
            </label>
            <select
              id="sort-filter"
              className="rounded-md border border-input bg-background px-3 py-2 text-sm"
              value={sortBy}
              onChange={(e) => handleSortChange(e.target.value)}
            >
              <option value="none">None</option>
              <option value="daysSinceLastCall">Days Since Last Call</option>
            </select>
            {sortBy !== "none" && (
              <Button
                variant="outline"
                size="sm"
                className="ml-2"
                onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              >
                {sortOrder === "asc" ? "↑" : "↓"}
              </Button>
            )}
          </div>
        </div>

        <DataTable
          columns={columns}
          data={getFilteredAndSortedClients()}
          keyExtractor={(client) => client.id}
          onRowClick={handleViewClient}
          searchPlaceholder="Search members..."
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          onFilterChange={setStatusFilter}
          onSortChange={handleSortChange}
          currentFilter={statusFilter}
          currentSort={sortBy}
          sortOrder={sortOrder}
          onSortOrderChange={handleSortOrderChange}
        />

        {selectedClient && (
          <Card className="mt-6 border border-primary/20 shadow-md animate-scale-in">
            <CardHeader>
              <CardTitle>{selectedClient.name}</CardTitle>
              <CardDescription>Member Details</CardDescription>
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
                            selectedClient.subscriptionStatus === "active" ? "success" :
                            selectedClient.subscriptionStatus === "expired" ? "danger" :
                            "warning"
                          }
                        >
                          {selectedClient.subscriptionStatus.charAt(0).toUpperCase() + selectedClient.subscriptionStatus.slice(1)}
                        </StatusBadge>
                      </div>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Subscription Date:</p>
                      <p className="text-sm col-span-2">{selectedClient.subscriptionDate}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Days Since Last Call:</p>
                      <p className={`text-sm col-span-2 ${selectedClient.daysSinceLastCall > 30 ? "text-red-600 font-medium" : ""}`}>
                        {selectedClient.daysSinceLastCall} days
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                variant="outline"
                onClick={() => setSelectedClient(null)}
              >
                Close
              </Button>
              <div className="flex space-x-2">
                <Button 
                  variant="outline"
                  onClick={() => handleEditClient(selectedClient)}
                >
                  Edit Profile
                </Button>
                <Button>
                  Schedule Call
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
