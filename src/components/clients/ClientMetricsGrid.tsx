
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Phone, Clock, CheckSquare } from "lucide-react";
import { Client } from "@/types/client";

interface ClientMetricsGridProps {
  client: Client;
}

export function ClientMetricsGrid({ client }: ClientMetricsGridProps) {
  // Mock data for demonstration - this would come from your data source
  const profileData = {
    membershipExpiryDate: "Mar 15, 2024",
    advisorsAssigned: ["Sarah Johnson", "Michael Brown", "David Wilson", "Jennifer Smith"],
    callsCompleted: 12,
    tasksPending: 3,
    tasksOverdue: 1
  };

  return (
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
            Advisors Assigned ({profileData.advisorsAssigned.length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-1">
            {profileData.advisorsAssigned.map((advisor, index) => (
              <div key={index} className="bg-muted px-2 py-1 rounded text-xs font-medium">
                {advisor}
              </div>
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

      {/* Tasks Combined - Smaller */}
      <Card className="col-span-1">
        <CardHeader className="pb-2">
          <CardTitle className="text-xs font-medium flex items-center gap-1">
            <CheckSquare className="h-3 w-3 text-blue-600" />
            Tasks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Pending:</span>
              <span className="font-bold">{profileData.tasksPending}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">Overdue:</span>
              <span className={`font-bold ${profileData.tasksOverdue > 0 ? "text-red-600" : ""}`}>
                {profileData.tasksOverdue}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
