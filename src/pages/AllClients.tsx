
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { DataTable } from "@/components/shared/DataTable";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
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
import { useForm } from "react-hook-form";

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  firstBookingDate: string;
}

interface NewContactForm {
  name: string;
  email: string;
  phone: string;
  firstBookingDate: string;
}

const contacts: Contact[] = [
  {
    id: 1,
    name: "Alex Thompson",
    email: "alex.thompson@example.com",
    phone: "(555) 111-2222",
    firstBookingDate: "Jan 15, 2024",
  },
  {
    id: 2,
    name: "Maria Rodriguez",
    email: "maria.rodriguez@example.com",
    phone: "(555) 333-4444",
    firstBookingDate: "Jan 18, 2024",
  },
  {
    id: 3,
    name: "James Wilson",
    email: "james.wilson@example.com",
    phone: "(555) 555-6666",
    firstBookingDate: "Jan 20, 2024",
  },
  {
    id: 4,
    name: "Emma Davis",
    email: "emma.davis@example.com",
    phone: "(555) 777-8888",
    firstBookingDate: "Jan 22, 2024",
  },
  {
    id: 5,
    name: "Michael Chang",
    email: "michael.chang@example.com",
    phone: "(555) 999-0000",
    firstBookingDate: "Jan 25, 2024",
  },
  {
    id: 6,
    name: "Sophie Miller",
    email: "sophie.miller@example.com",
    phone: "(555) 123-9876",
    firstBookingDate: "Jan 28, 2024",
  },
];

export default function AllClients() {
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [showNewContactDialog, setShowNewContactDialog] = useState(false);
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<NewContactForm>();

  const columns = [
    {
      key: "name",
      title: "Name",
      sortable: true,
    },
    {
      key: "email",
      title: "Email ID",
      sortable: true,
    },
    {
      key: "phone",
      title: "Phone Number",
    },
    {
      key: "firstBookingDate",
      title: "First Booking Date",
      sortable: true,
    },
  ];

  const handleRowClick = (contact: Contact) => {
    setSelectedContact(contact);
  };

  const onSubmitNewContact = (data: NewContactForm) => {
    console.log("New contact data:", data);
    // Here you would typically add the contact to your data source
    setShowNewContactDialog(false);
    reset();
  };

  const handleCloseNewContactDialog = () => {
    setShowNewContactDialog(false);
    reset();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Contact Management</h2>
            <p className="text-muted-foreground">
              View and manage all contacts who have booked calls with Turtle.
            </p>
          </div>
          <Button 
            className="bg-primary text-black"
            onClick={() => setShowNewContactDialog(true)}
          >
            Add New Contact
          </Button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Total Contacts</CardTitle>
              <CardDescription>All contacts who booked calls</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{contacts.length}</div>
            </CardContent>
          </Card>
          
          <Card className="glass-card">
            <CardHeader className="pb-2">
              <CardTitle>Added This Month</CardTitle>
              <CardDescription>New contacts this month</CardDescription>
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
          data={contacts}
          keyExtractor={(contact) => contact.id}
          onRowClick={handleRowClick}
          searchPlaceholder="Search contacts..."
        />

        {/* Add New Contact Dialog */}
        <Dialog open={showNewContactDialog} onOpenChange={setShowNewContactDialog}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Add New Contact</DialogTitle>
              <DialogDescription>
                Enter the contact details to add a new contact.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmitNewContact)}>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">Name</Label>
                  <div className="col-span-3">
                    <Input 
                      id="name" 
                      placeholder="Full name"
                      {...register("name", { required: "Name is required" })}
                    />
                    {errors.name && (
                      <p className="text-sm text-destructive mt-1">{errors.name.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="email" className="text-right">Email ID</Label>
                  <div className="col-span-3">
                    <Input 
                      id="email" 
                      type="email" 
                      placeholder="Email address"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invalid email address"
                        }
                      })}
                    />
                    {errors.email && (
                      <p className="text-sm text-destructive mt-1">{errors.email.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="phone" className="text-right">Phone Number</Label>
                  <div className="col-span-3">
                    <Input 
                      id="phone" 
                      type="tel" 
                      placeholder="Phone number"
                      {...register("phone", { required: "Phone number is required" })}
                    />
                    {errors.phone && (
                      <p className="text-sm text-destructive mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="firstBookingDate" className="text-right">First Booking Date</Label>
                  <div className="col-span-3">
                    <Input 
                      id="firstBookingDate" 
                      type="date"
                      {...register("firstBookingDate", { required: "First booking date is required" })}
                    />
                    {errors.firstBookingDate && (
                      <p className="text-sm text-destructive mt-1">{errors.firstBookingDate.message}</p>
                    )}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" type="button" onClick={handleCloseNewContactDialog}>
                  Cancel
                </Button>
                <Button type="submit" className="bg-primary text-black">
                  Add Contact
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {selectedContact && (
          <Card className="mt-6 border border-primary/20 shadow-md animate-scale-in">
            <CardHeader>
              <CardTitle>{selectedContact.name}</CardTitle>
              <CardDescription>Contact Details</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Contact Information</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Email:</p>
                      <p className="text-sm col-span-2">{selectedContact.email}</p>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">Phone:</p>
                      <p className="text-sm col-span-2">{selectedContact.phone}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-2">Booking Information</h4>
                  <div className="space-y-2">
                    <div className="grid grid-cols-3 gap-2">
                      <p className="text-sm font-medium">First Booking:</p>
                      <p className="text-sm col-span-2">{selectedContact.firstBookingDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                onClick={() => setSelectedContact(null)}
              >
                Close
              </Button>
              <div className="flex space-x-2">
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                  Schedule Call
                </Button>
                <Button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                  View History
                </Button>
              </div>
            </CardFooter>
          </Card>
        )}
      </div>
    </DashboardLayout>
  );
}
