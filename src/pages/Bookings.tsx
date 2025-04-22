
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
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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
      onClick: (booking: Booking) => console.log(`Filter by member: ${booking.client}`),
    },
    {
      key: "advisor",
      title: "Advisor",
      sortable: true,
      onClick: (booking: Booking) => console.log(`Filter by advisor: ${booking.advisor}`),
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
      onClick: (booking: Booking) => console.log(`Filter by status: ${booking.status}`),
    },
    {
      key: "records",
      title: "Records",
      render: (booking: Booking) => (
        <span className={`${booking.status !== "completed" ? "text-muted-foreground" : ""}`}>
          {booking.records === "available" ? "Available" : 
           booking.records === "unavailable" ? "Unavailable" : "-"}
        </span>
      ),
    },
    {
      key: "actions",
      title: "Actions",
      render: (booking: Booking) => (
        <div className="flex space-x-2">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(booking);
            }}
            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
          >
            <Edit className="h-4 w-4" />
            <span className="sr-only">Edit</span>
          </button>
          <button 
            className="h-8 w-8 p-0 inline-flex items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground"
            onClick={(e) => {
              e.stopPropagation();
              console.log("View booking details", booking);
            }}
          >
            <Eye className="h-4 w-4" />
            <span className="sr-only">View</span>
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Bookings</h2>
            <p className="text-muted-foreground">
              Schedule and manage all member-advisor meetings.
            </p>
          </div>
          <Button 
            className="bg-primary text-black" 
            onClick={() => setOpenNewBooking(true)}
          >
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
        />

        {/* Add New Booking Dialog */}
        <Dialog open={openNewBooking} onOpenChange={setOpenNewBooking}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Booking</DialogTitle>
              <DialogDescription>
                Create a new meeting between a member and an advisor.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="client" className="text-right">
                  Member
                </Label>
                <Input id="client" placeholder="Search member..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="advisor" className="text-right">
                  Advisor
                </Label>
                <Input id="advisor" placeholder="Search advisor..." className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                <Input id="date" type="datetime-local" className="col-span-3" />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select defaultValue="upcoming">
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no_show">No Show</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenNewBooking(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-black"
                onClick={() => {
                  console.log("New booking created");
                  setOpenNewBooking(false);
                }}
              >
                Create Booking
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Booking Dialog */}
        <Dialog open={openEditBooking} onOpenChange={setOpenEditBooking}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Edit Booking</DialogTitle>
              <DialogDescription>
                Update booking details and status.
              </DialogDescription>
            </DialogHeader>
            {selectedBooking && (
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-client" className="text-right">
                    Member
                  </Label>
                  <Input 
                    id="edit-client" 
                    defaultValue={selectedBooking.client}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-advisor" className="text-right">
                    Advisor
                  </Label>
                  <Input 
                    id="edit-advisor" 
                    defaultValue={selectedBooking.advisor}
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-date" className="text-right">
                    Date
                  </Label>
                  <Input 
                    id="edit-date" 
                    type="datetime-local"
                    className="col-span-3" 
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-status" className="text-right">
                    Status
                  </Label>
                  <Select defaultValue={selectedBooking.status}>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                      <SelectItem value="no_show">No Show</SelectItem>
                      <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="edit-records" className="text-right">
                    Records
                  </Label>
                  <Select 
                    defaultValue={selectedBooking.records}
                    disabled={selectedBooking.status !== "completed"}
                  >
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select record status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="-">-</SelectItem>
                      <SelectItem value="available">Available</SelectItem>
                      <SelectItem value="unavailable">Unavailable</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpenEditBooking(false)}>
                Cancel
              </Button>
              <Button 
                className="bg-primary text-black"
                onClick={() => {
                  console.log("Booking updated");
                  setOpenEditBooking(false);
                }}
              >
                Save Changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
