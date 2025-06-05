
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscriptionDate: string;
  subscriptionStatus: "active" | "expired" | "dormant";
  daysSinceLastCall: number;
}

interface ClientMetricsProps {
  clients: Client[];
}

export function ClientMetrics({ clients }: ClientMetricsProps) {
  // Calculate metrics
  const totalMembers = clients.length;
  const activeMembers = clients.filter(c => c.subscriptionStatus === "active").length;
  const expiredMembers = clients.filter(c => c.subscriptionStatus === "expired").length;
  const dormantMembers = clients.filter(c => c.subscriptionStatus === "dormant").length;

  return (
    <div className="grid gap-6 md:grid-cols-4">
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Total Members</CardTitle>
          <CardDescription>All registered members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">{totalMembers}</div>
        </CardContent>
      </Card>
      
      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Active</CardTitle>
          <CardDescription>Currently active subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-green-600">{activeMembers}</div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Expired</CardTitle>
          <CardDescription>Expired subscriptions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-red-600">{expiredMembers}</div>
        </CardContent>
      </Card>

      <Card className="glass-card">
        <CardHeader className="pb-2">
          <CardTitle>Dormant</CardTitle>
          <CardDescription>Inactive members</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-amber-600">{dormantMembers}</div>
        </CardContent>
      </Card>
    </div>
  );
}
