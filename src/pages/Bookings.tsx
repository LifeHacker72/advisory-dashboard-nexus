import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/shared/DataTable";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Calendar, Edit, Eye, Plus } from "lucide-react";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import NewBookingForm from "@/components/bookings/NewBookingForm";

interface Booking {
  id: number;
  client: string;
  advisor: string;
  date: string;
  status: "upcoming" | "completed" | "cancelled" | "no_show" | "rescheduled";
  records: "available" | "unavailable" | "-";
}

const bookings: Booking[] = [
  {
    id: 1,
    client: "Michael Johnson",
    advisor: "Emily Richardson",
    date: "May 15, 2025 - 10:30 AM",
    status: "upcoming",
    records: "-",
  },
  {
    id: 2,
    client: "Sarah Williams",
    advisor: "Daniel Morgan",
    date: "Apr 28, 2025 - 2:00 PM",
    status: "completed",
    records: "available",
  },
  {
    id: 3,
    client: "David Brown",
    advisor: "Sophia Chen",
    date: "May 10, 2025 - 4:15 PM",
    status: "upcoming",
    records: "-",
  },
  {
    id: 4,
    client: "Jennifer Smith",
    advisor: "Robert Johnson",
    date: "Apr 25, 2025 - 11:00 AM",
    status: "cancelled",
    records: "-",
  },
  {
    id: 5,
    client: "Robert Davis",
    advisor: "Olivia Martinez",
    date: "Apr 20, 2025 - 3:30 PM",
    status: "completed",
    records: "unavailable",
  },
  {
    id: 6,
    client: "Elizabeth Wilson",
    advisor: "James Wilson",
    date: "May 5, 2025 - 9:45 AM",
    status: "rescheduled",
    records: "-",
  },
  {
    id: 7,
    client: "Thomas Anderson",
    advisor: "Emily Richardson",
    date: "Apr 18, 2025 - 1:15 PM",
    status: "no_show",
    records: "-",
  },
];

export default function Bookings() {
  const [openNewBooking, setOpenNewBooking] = useState(false);
  const [openEditBooking, setOpenEditBooking] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);

  const handleEditClick = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenEditBooking(true);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "info";
      case "completed":
        return "success";
      case "cancelled":
        return "danger";
      case "no_show":
        return "danger";
      case "rescheduled":
        return "warning";
      default:
        return "default";
    }
  };

  const columns = [
    {
      key: "client",
      title: "Member",
      sortable: true,
    },
    {
      key: "advisor",
      title: "Advisor",
      sortable: true,
    },
    {
      key: "date",
      title: "Date",
      sortable: true,
    },
    {
      key: "status",
      title: "Status",
      render: (booking: Booking) => (
        <StatusBadge
          variant={getStatusColor(booking.status)}
        >
          {booking.status.charAt(0).toUpperCase() + booking.status.slice(1).replace("_", " ")}
        </StatusBadge>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Bookings</h1>
            <p className="text-muted-foreground">
              Manage and schedule meetings with members and advisors
            </p>
          </div>
          <Button onClick={() => setOpenNewBooking(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add New Booking
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Total Bookings</CardTitle>
              <CardDescription>All scheduled meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{bookings.length}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>Future meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {bookings.filter(b => b.status === "upcoming").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Completed</CardTitle>
              <CardDescription>Successfully held meetings</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {bookings.filter(b => b.status === "completed").length}
              </div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Issues</CardTitle>
              <CardDescription>Cancelled, no-shows, rescheduled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {bookings.filter(b => ["cancelled", "no_show", "rescheduled"].includes(b.status)).length}
              </div>
            </CardContent>
          </Card>
        </div>

        <DataTable
          columns={columns}
          data={bookings}
          keyExtractor={(booking) => booking.id}
          searchPlaceholder="Search bookings..."
          onRowClick={(booking) => handleEditClick(booking)}
        />

        {/* Add New Booking Dialog */}
        <Dialog open={openNewBooking} onOpenChange={setOpenNewBooking}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
              <DialogDescription>
                Create a new meeting between a member and an advisor.
              </DialogDescription>
            </DialogHeader>
            <NewBookingForm onClose={() => setOpenNewBooking(false)} />
          </DialogContent>
        </Dialog>

        {/* Edit Booking Dialog */}
        <Dialog open={openEditBooking} onOpenChange={setOpenEditBooking}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
              <DialogDescription>
                Update booking details for {selectedBooking?.client}.
              </DialogDescription>
            </DialogHeader>
            <NewBookingForm 
              onClose={() => setOpenEditBooking(false)} 
              initialData={selectedBooking}
            />
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
