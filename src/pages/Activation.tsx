import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CheckCircle2, UserPlus, Calendar, Search, X } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useForm } from "react-hook-form";

interface PendingClient {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  paymentDate: string;
  status: "Payment Complete" | "Onboarding Ongoing";
}

interface RenewalClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  expiryDate: string;
  membershipType: string;
}

interface BookingClient {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
}

interface Advisor {
  id: number;
  name: string;
  email: string;
  category: string;
}

const pendingClients: PendingClient[] = [
  {
    id: 1,
    name: "Thomas Anderson",
    company: "Matrix Technologies",
    email: "thomas.anderson@example.com",
    phone: "(555) 123-4567",
    paymentDate: "Apr 15, 2025",
    status: "Payment Complete",
  },
  {
    id: 2,
    name: "Rachel Green",
    company: "Central Perk Inc.",
    email: "rachel.green@example.com",
    phone: "(555) 234-5678",
    paymentDate: "Apr 20, 2025",
    status: "Onboarding Ongoing",
  },
  {
    id: 3,
    name: "Walter White",
    company: "White Enterprises",
    email: "walter.white@example.com",
    phone: "(555) 345-6789",
    paymentDate: "Apr 25, 2025",
    status: "Payment Complete",
  },
];

const renewalClients: RenewalClient[] = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "(555) 111-2222",
    expiryDate: "Jun 15, 2025",
    membershipType: "Premium",
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "(555) 333-4444",
    expiryDate: "Jul 10, 2025",
    membershipType: "Standard",
  },
  {
    id: 3,
    name: "Mike Davis",
    email: "mike.davis@example.com",
    phone: "(555) 555-6666",
    expiryDate: "Jul 25, 2025",
    membershipType: "Premium",
  },
];

const bookingClients: BookingClient[] = [
  {
    id: 1,
    name: "Alice Brown",
    email: "alice.brown@example.com",
    phone: "(555) 777-8888",
    bookingDate: "Apr 30, 2025",
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob.wilson@example.com",
    phone: "(555) 999-0000",
    bookingDate: "May 2, 2025",
  },
];

const advisors: Advisor[] = [
  { id: 1, name: "Emily Richardson", email: "emily@example.com", category: "CA" },
  { id: 2, name: "Daniel Morgan", email: "daniel@example.com", category: "Financial Planner" },
  { id: 3, name: "Sophia Chen", email: "sophia@example.com", category: "Insurance Advisor" },
  { id: 4, name: "James Wilson", email: "james@example.com", category: "Estate Planner" },
  { id: 5, name: "Olivia Martinez", email: "olivia@example.com", category: "Credit Card Advisor" },
  { id: 6, name: "Robert Taylor", email: "robert@example.com", category: "Banking and Compliance" },
  { id: 7, name: "Lisa Anderson", email: "lisa@example.com", category: "CA" },
  { id: 8, name: "Mark Thompson", email: "mark@example.com", category: "Financial Planner" },
];

const advisorCategories = [
  "CA",
  "Financial Planner", 
  "Insurance Advisor",
  "Estate Planner",
  "Credit Card Advisor",
  "Banking and Compliance"
];

interface ManualEntryForm {
  name: string;
  email: string;
  phone: string;
  caseType: "NRI" | "Resident Indian";
  password: string;
}

interface BookingClientForm {
  caseType: "NRI" | "Resident Indian";
  password: string;
}

export default function Activation() {
  const [selectedClient, setSelectedClient] = useState<PendingClient | null>(null);
  const [showNewClientDialog, setShowNewClientDialog] = useState(false);
  const [showAdvisorAssignmentDialog, setShowAdvisorAssignmentDialog] = useState(false);
  const [onboardingType, setOnboardingType] = useState<"booking" | "manual" | null>(null);
  const [selectedBookingClient, setSelectedBookingClient] = useState<BookingClient | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [advisorSearchTerm, setAdvisorSearchTerm] = useState("");
  const [assignedAdvisors, setAssignedAdvisors] = useState<Record<string, Advisor[]>>({});

  const { register: registerManual, handleSubmit: handleSubmitManual, reset: resetManual, formState: { errors: errorsManual } } = useForm<ManualEntryForm>();
  const { register: registerBooking, handleSubmit: handleSubmitBooking, reset: resetBooking, formState: { errors: errorsBooking } } = useForm<BookingClientForm>();

  const handleClientActivate = (client: PendingClient) => {
    setSelectedClient(client);
    setShowAdvisorAssignmentDialog(true);
    setAssignedAdvisors({});
  };

  const handleAssignAdvisor = (category: string, advisor: Advisor) => {
    setAssignedAdvisors(prev => ({
      ...prev,
      [category]: [...(prev[category] || []), advisor]
    }));
  };

  const handleRemoveAdvisor = (category: string, advisorId: number) => {
    setAssignedAdvisors(prev => ({
      ...prev,
      [category]: (prev[category] || []).filter(advisor => advisor.id !== advisorId)
    }));
  };

  const getTotalAssignedAdvisors = () => {
    return Object.values(assignedAdvisors).flat().length;
  };

  const canActivate = getTotalAssignedAdvisors() >= 3;

  const handleActivateMembership = () => {
    console.log("Activating membership for:", selectedClient?.name);
    console.log("Assigned advisors:", assignedAdvisors);
    setShowAdvisorAssignmentDialog(false);
    setSelectedClient(null);
  };

  const filteredBookingClients = bookingClients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    client.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAdvisors = advisors.filter(advisor =>
    advisor.name.toLowerCase().includes(advisorSearchTerm.toLowerCase()) ||
    advisor.email.toLowerCase().includes(advisorSearchTerm.toLowerCase())
  );

  const getAvailableAdvisors = (category: string) => {
    const assignedIds = (assignedAdvisors[category] || []).map(a => a.id);
    return filteredAdvisors.filter(advisor => 
      advisor.category === category && 
      !assignedIds.includes(advisor.id)
    );
  };

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Payment Complete":
        return "success";
      case "Onboarding Ongoing":
        return "warning";
      default:
        return "default";
    }
  };

  const onSubmitManualEntry = (data: ManualEntryForm) => {
    console.log("Manual entry data:", data);
    setShowNewClientDialog(false);
    setOnboardingType(null);
    resetManual();
  };

  const onSubmitBookingClient = (data: BookingClientForm) => {
    console.log("Booking client data:", { ...selectedBookingClient, ...data });
    setShowNewClientDialog(false);
    setOnboardingType(null);
    setSelectedBookingClient(null);
    setSearchTerm("");
    resetBooking();
  };

  const handleCloseNewClientDialog = () => {
    setShowNewClientDialog(false);
    setOnboardingType(null);
    setSelectedBookingClient(null);
    setSearchTerm("");
    resetManual();
    resetBooking();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Member Activation</h2>
            <p className="text-muted-foreground">
              Manage the onboarding process for new members.
            </p>
          </div>
          <Button 
            className="bg-primary text-black"
            onClick={() => setShowNewClientDialog(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Onboard New Member
          </Button>
        </div>

        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {/* Pending Activations */}
          <Card className="h-full glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Pending Activations</CardTitle>
                  <CardDescription>Members who have completed payment</CardDescription>
                </div>
                <div className="flex items-center text-sm">
                  <StatusBadge variant="warning">
                    {pendingClients.length} Pending
                  </StatusBadge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {pendingClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-4 hover:bg-accent/30 hover-highlight transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {client.company}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <div className="text-sm text-muted-foreground">
                          {client.status}
                        </div>
                        <Button 
                          size="sm" 
                          className="bg-primary text-black"
                          onClick={() => handleClientActivate(client)}
                        >
                          Activate
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {client.email} • {client.phone}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Renewal Upcoming */}
          <Card className="h-full glass-card">
            <CardHeader>
              <div className="flex justify-between items-center">
                <div>
                  <CardTitle>Renewal Upcoming</CardTitle>
                  <CardDescription>Memberships expiring in next 2 months</CardDescription>
                </div>
                <StatusBadge variant="info">
                  {renewalClients.length} Expiring
                </StatusBadge>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {renewalClients.map((client) => (
                  <div
                    key={client.id}
                    className="p-4 hover:bg-accent/30 hover-highlight transition-colors"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{client.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {client.membershipType} Member
                        </p>
                      </div>
                      <div className="text-sm text-right">
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1.5 text-muted-foreground" />
                          <span>Expires: {client.expiryDate}</span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-2 text-xs text-muted-foreground">
                      {client.email} • {client.phone}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Advisor Assignment Dialog */}
        <Dialog open={showAdvisorAssignmentDialog} onOpenChange={setShowAdvisorAssignmentDialog}>
          <DialogContent className="sm:max-w-[900px] max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Assign Advisors - {selectedClient?.name}</DialogTitle>
              <DialogDescription>
                Assign advisors to complete the onboarding process. At least 3 advisors must be assigned.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4 space-y-6">
              <div className="mb-4">
                <Label htmlFor="advisor-search">Search Advisors</Label>
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="advisor-search"
                    placeholder="Search by advisor name..."
                    value={advisorSearchTerm}
                    onChange={(e) => setAdvisorSearchTerm(e.target.value)}
                    className="pl-9"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                {advisorCategories.map((category) => (
                  <div key={category} className="space-y-3 border rounded-lg p-4">
                    <div className="flex items-center justify-between">
                      <Label className="font-medium text-sm">{category}</Label>
                      <Badge variant="outline" className="text-xs">
                        {(assignedAdvisors[category] || []).length} assigned
                      </Badge>
                    </div>
                    
                    {/* Assigned Advisors */}
                    {(assignedAdvisors[category] || []).length > 0 && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {(assignedAdvisors[category] || []).map((advisor) => (
                          <Badge key={advisor.id} variant="secondary" className="flex items-center gap-1 text-xs">
                            {advisor.name}
                            <X 
                              className="h-3 w-3 cursor-pointer" 
                              onClick={() => handleRemoveAdvisor(category, advisor.id)}
                            />
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    {/* Available Advisors */}
                    <Select onValueChange={(value) => {
                      const advisor = advisors.find(a => a.id === parseInt(value));
                      if (advisor) handleAssignAdvisor(category, advisor);
                    }}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder={`Select ${category}`} />
                      </SelectTrigger>
                      <SelectContent>
                        {getAvailableAdvisors(category).map((advisor) => (
                          <SelectItem key={advisor.id} value={advisor.id.toString()}>
                            <div className="text-xs">
                              <div>{advisor.name}</div>
                              <div className="text-muted-foreground">{advisor.email}</div>
                            </div>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">
                    Total Advisors Assigned: {getTotalAssignedAdvisors()}
                  </span>
                  {!canActivate && (
                    <span className="text-sm text-destructive">
                      Minimum 3 advisors required
                    </span>
                  )}
                </div>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowAdvisorAssignmentDialog(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-black"
                onClick={handleActivateMembership}
                disabled={!canActivate}
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Activate Membership
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* New Member Dialog */}
        <Dialog open={showNewClientDialog} onOpenChange={setShowNewClientDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Onboard New Member</DialogTitle>
              <DialogDescription>
                Choose how you want to onboard the new member.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => setOnboardingType("booking")}
                >
                  <UserPlus className="h-6 w-6" />
                  From KC Booking
                </Button>
                <Button
                  variant="outline"
                  className="h-24 flex flex-col items-center justify-center gap-2"
                  onClick={() => setOnboardingType("manual")}
                >
                  <Calendar className="h-6 w-6" />
                  Manual Entry
                </Button>
              </div>

              {onboardingType === "booking" && (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="booking-search">Search Booking Clients</Label>
                    <div className="relative">
                      <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="booking-search"
                        placeholder="Search by name or email..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-9"
                      />
                    </div>
                  </div>
                  <div className="max-h-48 overflow-y-auto border rounded-md">
                    {filteredBookingClients.map((client) => (
                      <div
                        key={client.id}
                        className={`p-3 cursor-pointer hover:bg-accent/30 hover-highlight transition-colors border-b last:border-b-0 ${
                          selectedBookingClient?.id === client.id ? 'bg-accent' : ''
                        }`}
                        onClick={() => setSelectedBookingClient(client)}
                      >
                        <div className="font-medium">{client.name}</div>
                        <div className="text-sm text-muted-foreground">{client.email}</div>
                        <div className="text-sm text-muted-foreground">{client.phone}</div>
                      </div>
                    ))}
                  </div>
                  
                  {selectedBookingClient && (
                    <form onSubmit={handleSubmitBooking(onSubmitBookingClient)} className="space-y-4 border-t pt-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="booking-case-type" className="text-right">Case Type</Label>
                        <div className="col-span-3">
                          <Select onValueChange={(value) => registerBooking("caseType", { value })}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select case type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="NRI">NRI</SelectItem>
                              <SelectItem value="Resident Indian">Resident Indian</SelectItem>
                            </SelectContent>
                          </Select>
                          {errorsBooking.caseType && (
                            <p className="text-sm text-destructive mt-1">{errorsBooking.caseType.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="booking-password" className="text-right">Password</Label>
                        <div className="col-span-3">
                          <Input 
                            id="booking-password" 
                            type="password" 
                            placeholder="Enter password"
                            {...registerBooking("password", { required: "Password is required" })}
                          />
                          {errorsBooking.password && (
                            <p className="text-sm text-destructive mt-1">{errorsBooking.password.message}</p>
                          )}
                        </div>
                      </div>
                      <div className="flex justify-end space-x-2">
                        <Button variant="outline" type="button" onClick={handleCloseNewClientDialog}>
                          Cancel
                        </Button>
                        <Button type="submit" className="bg-primary text-black">
                          Send Onboarding Details
                        </Button>
                      </div>
                    </form>
                  )}
                </div>
              )}

              {onboardingType === "manual" && (
                <form onSubmit={handleSubmitManual(onSubmitManualEntry)} className="space-y-4">
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manual-name" className="text-right">Name</Label>
                    <div className="col-span-3">
                      <Input 
                        id="manual-name" 
                        placeholder="Full name"
                        {...registerManual("name", { required: "Name is required" })}
                      />
                      {errorsManual.name && (
                        <p className="text-sm text-destructive mt-1">{errorsManual.name.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manual-email" className="text-right">Email</Label>
                    <div className="col-span-3">
                      <Input 
                        id="manual-email" 
                        type="email" 
                        placeholder="Email address"
                        {...registerManual("email", { 
                          required: "Email is required",
                          pattern: {
                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                            message: "Invalid email address"
                          }
                        })}
                      />
                      {errorsManual.email && (
                        <p className="text-sm text-destructive mt-1">{errorsManual.email.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manual-phone" className="text-right">Phone</Label>
                    <div className="col-span-3">
                      <Input 
                        id="manual-phone" 
                        type="tel" 
                        placeholder="Phone number"
                        {...registerManual("phone", { required: "Phone number is required" })}
                      />
                      {errorsManual.phone && (
                        <p className="text-sm text-destructive mt-1">{errorsManual.phone.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manual-case-type" className="text-right">Case Type</Label>
                    <div className="col-span-3">
                      <Select onValueChange={(value) => registerManual("caseType", { value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select case type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="NRI">NRI</SelectItem>
                          <SelectItem value="Resident Indian">Resident Indian</SelectItem>
                        </SelectContent>
                      </Select>
                      {errorsManual.caseType && (
                        <p className="text-sm text-destructive mt-1">{errorsManual.caseType.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="manual-password" className="text-right">Password</Label>
                    <div className="col-span-3">
                      <Input 
                        id="manual-password" 
                        type="password" 
                        placeholder="Enter password"
                        {...registerManual("password", { required: "Password is required" })}
                      />
                      {errorsManual.password && (
                        <p className="text-sm text-destructive mt-1">{errorsManual.password.message}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex justify-end space-x-2">
                    <Button variant="outline" type="button" onClick={handleCloseNewClientDialog}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-primary text-black">
                      Send Onboarding Details
                    </Button>
                  </div>
                </form>
              )}

              {!onboardingType && (
                <DialogFooter>
                  <Button variant="outline" onClick={handleCloseNewClientDialog}>
                    Cancel
                  </Button>
                </DialogFooter>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
