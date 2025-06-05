
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { X } from "lucide-react";
import { Client } from "@/types/client";

interface ClientProfileHeaderProps {
  client: Client;
  onClose: () => void;
}

export function ClientProfileHeader({ client, onClose }: ClientProfileHeaderProps) {
  return (
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
  );
}
