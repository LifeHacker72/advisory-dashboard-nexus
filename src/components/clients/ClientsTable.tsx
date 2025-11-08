
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Eye, Edit } from "lucide-react";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscriptionDate: string;
  subscriptionStatus: "active" | "expired" | "dormant" | "deadpooled" | "upForRenewal";
  daysSinceLastCall: number;
}

interface ClientsTableProps {
  clients: Client[];
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
}

export function ClientsTable({ clients, onViewClient, onEditClient }: ClientsTableProps) {
  const filterOptions = [
    { label: "All Status", value: "all" },
    { label: "Active", value: "active" },
    { label: "Expired", value: "expired" },
    { label: "Dormant", value: "dormant" },
    { label: "Deadpooled", value: "deadpooled" },
    { label: "Up for Renewal", value: "upForRenewal" },
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
            client.subscriptionStatus === "upForRenewal" ? "warning" :
            client.subscriptionStatus === "deadpooled" ? "default" :
            "warning"
          }
        >
          {client.subscriptionStatus === "upForRenewal" ? "Up for Renewal" : 
           client.subscriptionStatus.charAt(0).toUpperCase() + client.subscriptionStatus.slice(1)}
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
            onClick={() => onViewClient(client)}
            className="h-8 w-8 p-0"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onEditClient(client)}
            className="h-8 w-8 p-0"
          >
            <Edit className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <DataTable
      columns={columns}
      data={clients}
      keyExtractor={(client) => client.id}
      onRowClick={onViewClient}
      searchPlaceholder="Search members..."
      filterOptions={filterOptions}
      sortOptions={sortOptions}
    />
  );
}
