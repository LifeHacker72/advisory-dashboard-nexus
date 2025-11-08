
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  subscriptionDate: string;
  subscriptionStatus: "active" | "expired" | "dormant" | "deadpooled" | "upForRenewal";
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
  const deadpooledMembers = clients.filter(c => c.subscriptionStatus === "deadpooled").length;
  const upForRenewalMembers = clients.filter(c => c.subscriptionStatus === "upForRenewal").length;

  return (
    <div className="grid gap-6 md:grid-cols-5">
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
          <CardTitle>Deadpooled</CardTitle>
          <CardDescription>Never expected to renew</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-muted-foreground">{deadpooledMembers}</div>
        </CardContent>
      </Card>

      <Card className="glass-card bg-muted/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-muted-foreground">Up for Renewal</CardTitle>
          <CardDescription>Expiring within 2 months</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold text-muted-foreground">{upForRenewalMembers}</div>
        </CardContent>
      </Card>
    </div>
  );
}
