
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { DataTable } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

interface BookingProspect {
  id: number;
  name: string;
  email: string;
  phone: string;
  bookingDate: string;
}

const bookingProspects: BookingProspect[] = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "(555) 111-2222",
    bookingDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "(555) 333-4444",
    bookingDate: "Jan 18, 2024",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 555-6666",
    bookingDate: "Jan 20, 2024",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "(555) 777-8888",
    bookingDate: "Jan 22, 2024",
  },
  {
    id: 5,
    name: "Michael Chang",
    email: "michael.chang@example.com",
    phone: "(555) 999-0000",
    bookingDate: "Jan 25, 2024",
  },
  {
    id: 6,
    name: "Sophie Miller",
    email: "sophie.miller@example.com",
    phone: "(555) 123-9876",
    bookingDate: "Jan 28, 2024",
  },
];

export default function AllClients() {
  const [selectedProspect, setSelectedProspect] = useState<BookingProspect | null>(null);

  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
    },
    {
      key: "email",
      title: "Email",
      sortable: true,
    },
    {
      key: "phone",
      title: "Phone Number",
    },
    {
      key: "bookingDate",
      title: "Booking Date",
      sortable: true,
    },
  ];

  const handleRowClick = (prospect: BookingProspect) => {
    setSelectedProspect(prospect);
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Prospect Management</h2>
            <p className="text-muted-foreground">
              View and manage all prospects who have booked calls with Turtle.
            </p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
            Add New Prospect
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Total Prospects</CardTitle>
              <CardDescription>All prospects who booked calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{bookingProspects.length}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>This Month</CardTitle>
              <CardDescription>New bookings this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">4</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Pending Calls</CardTitle>
              <CardDescription>Scheduled for upcoming days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">8</div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          columns={columns}
          data={bookingProspects}
          keyExtractor={(prospect) => prospect.id}
          onRowClick={handleRowClick}
          searchPlaceholder="Search prospects..."
        />

        {selectedProspect && (
          <Card className="mt-6 border border-primary/20 shadow-md animate-scale-in">
            <CardHeader>
              <CardTitle>{selectedProspect.name}</CardTitle>
              <CardDescription>Prospect Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Email:</p>
                      <p className="text-sm col-span-2">{selectedProspect.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Phone:</p>
                      <p className="text-sm col-span-2">{selectedProspect.phone}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Booking Information</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Booking Date:</p>
                      <p className="text-sm col-span-2">{selectedProspect.bookingDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                onClick={() => setSelectedProspect(null)}
              >
                Close
              </button>
              <div className="flex space-x-2">
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  Schedule Call
                </button>
                <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                  View History
                </button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
