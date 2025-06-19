
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { ChevronLeft } from "lucide-react";
import { Client } from "@/types/client";

interface ClientRecentBookingsProps {
  client: Client;
}

export function ClientRecentBookings({ client }: ClientRecentBookingsProps) {
  const [showAllBookings, setShowAllBookings] = useState(false);

  // Mock recent bookings data
  const recentBookings = [
    { id: 1, advisor: "Sarah Johnson", date: "2024-01-15", status: "completed" },
    { id: 2, advisor: "Michael Brown", date: "2024-01-12", status: "completed" },
    { id: 3, advisor: "David Wilson", date: "2024-01-08", status: "cancelled" },
    { id: 4, advisor: "Sarah Johnson", date: "2024-01-05", status: "completed" },
    { id: 5, advisor: "Jennifer Smith", date: "2024-01-03", status: "completed" },
    { id: 6, advisor: "Michael Brown", date: "2024-01-01", status: "completed" },
    { id: 7, advisor: "David Wilson", date: "2023-12-28", status: "cancelled" },
    { id: 8, advisor: "Sarah Johnson", date: "2023-12-25", status: "completed" },
  ];

  if (showAllBookings) {
    return (
      <Card>
        <CardHeader>
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAllBookings(false)}
              className="h-8 w-8 p-0"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-lg">All Bookings - {client.name}</CardTitle>
          </div>
        </CardHeader>
        <CardContent>
          <div className="max-h-[400px] overflow-y-auto">
            <table className="w-full">
              <thead className="sticky top-0 bg-background border-b">
                <tr>
                  <th className="text-left text-sm font-medium text-muted-foreground uppercase tracking-wider py-3">Advisor</th>
                  <th className="text-left text-sm font-medium text-muted-foreground uppercase tracking-wider py-3">Date</th>
                  <th className="text-left text-sm font-medium text-muted-foreground uppercase tracking-wider py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentBookings.map((booking) => (
                  <tr key={booking.id} className="hover:bg-muted/50">
                    <td className="py-4 text-sm">{booking.advisor}</td>
                    <td className="py-4 text-sm">{booking.date}</td>
                    <td className="py-4">
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
    );
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Recent Bookings</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setShowAllBookings(true)}
          >
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="min-h-[180px] overflow-y-auto">
          <table className="w-full">
            <thead className="sticky top-0 bg-background border-b">
              <tr>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">Advisor</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">Date</th>
                <th className="text-left text-xs font-medium text-muted-foreground uppercase tracking-wider py-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {recentBookings.slice(0, 3).map((booking) => (
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
  );
}
