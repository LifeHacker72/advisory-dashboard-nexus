import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { CalendarIcon, Check, ChevronsUpDown } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Mock data
const mockMembers = [
  {
    id: 1,
    name: "Michael Johnson",
    email: ["michael.j@email.com", "mjohnson@work.com"],
    phone: ["+1 (555) 123-4567", "+1 (555) 987-6543"],
    availability: "Mon-Fri, 9 AM - 5 PM",
    advisors: ["Emily Richardson", "Daniel Morgan"],
    bookings: [
      { date: "2025-05-15", time: "10:30", advisor: "Emily Richardson" }
    ]
  },
  {
    id: 2,
    name: "Sarah Williams",
    email: ["sarah.w@email.com"],
    phone: ["+1 (555) 234-5678"],
    availability: "Tue-Thu, 10 AM - 4 PM",
    advisors: ["Daniel Morgan"],
    bookings: []
  },
  {
    id: 3,
    name: "David Brown",
    email: ["david.brown@email.com"],
    phone: ["+1 (555) 345-6789"],
    availability: "Mon-Wed, 2 PM - 6 PM",
    advisors: ["Sophia Chen"],
    bookings: []
  },
];

const mockAdvisors = [
  {
    id: 1,
    name: "Emily Richardson",
    email: "emily.r@company.com",
    phone: "+1 (555) 111-2222",
    availability: "Mon-Fri, 8 AM - 6 PM",
    bookings: [
      { date: "2025-05-15", time: "10:30", member: "Michael Johnson" }
    ]
  },
  {
    id: 2,
    name: "Daniel Morgan",
    email: "daniel.m@company.com",
    phone: "+1 (555) 222-3333",
    availability: "Mon-Thu, 9 AM - 5 PM",
    bookings: []
  },
  {
    id: 3,
    name: "Sophia Chen",
    email: "sophia.c@company.com",
    phone: "+1 (555) 333-4444",
    availability: "Tue-Sat, 10 AM - 7 PM",
    bookings: []
  },
];

const agendaOptions = [
  "Financial Planning Review",
  "Investment Strategy Discussion",
  "Tax Planning Session",
  "Insurance Consultation",
  "Retirement Planning",
  "Estate Planning",
  "Portfolio Rebalancing",
];

interface NewBookingFormProps {
  onClose: () => void;
}

export default function NewBookingForm({ onClose }: NewBookingFormProps) {
  const [selectedMember, setSelectedMember] = useState<typeof mockMembers[0] | null>(null);
  const [selectedAdvisor, setSelectedAdvisor] = useState<typeof mockAdvisors[0] | null>(null);
  const [agenda, setAgenda] = useState("");
  const [meetingTitle, setMeetingTitle] = useState("");
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState("");
  const [openMemberCombo, setOpenMemberCombo] = useState(false);
  const [openAdvisorCombo, setOpenAdvisorCombo] = useState(false);
  const [openAgendaCombo, setOpenAgendaCombo] = useState(false);
  const [customAgenda, setCustomAgenda] = useState(false);

  // Set meeting title when advisor is selected
  useMemo(() => {
    if (selectedAdvisor) {
      setMeetingTitle(`Meeting with ${selectedAdvisor.name}`);
    }
  }, [selectedAdvisor]);

  const conflictInfo = useMemo(() => {
    if (!selectedMember || !selectedAdvisor || !date || !time) {
      return null;
    }

    const dateStr = format(date, "yyyy-MM-dd");
    const memberConflict = selectedMember.bookings.some(
      b => b.date === dateStr && b.time === time
    );
    const advisorConflict = selectedAdvisor.bookings.some(
      b => b.date === dateStr && b.time === time
    );

    if (memberConflict) return "Member";
    if (advisorConflict) return "Advisor";
    return null;
  }, [selectedMember, selectedAdvisor, date, time]);

  const isFormValid = selectedMember && selectedAdvisor && agenda && meetingTitle && date && time && !conflictInfo;

  const handleCreate = () => {
    if (!isFormValid) return;
    console.log("Creating booking:", {
      member: selectedMember?.name,
      advisor: selectedAdvisor?.name,
      meetingTitle,
      agenda,
      date: format(date!, "PPP"),
      time,
    });
    onClose();
  };

  return (
    <div className="grid gap-5 py-4">
      {/* Member Selection */}
      <div className="grid grid-cols-[1fr_1.5fr] gap-4 items-start">
        <div className="space-y-2">
          <Label>Member *</Label>
          <Popover open={openMemberCombo} onOpenChange={setOpenMemberCombo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openMemberCombo}
                className="w-full justify-between"
              >
                {selectedMember ? selectedMember.name : "Select member..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search member..." />
                <CommandList>
                  <CommandEmpty>No member found.</CommandEmpty>
                  <CommandGroup>
                    {mockMembers.map((member) => (
                      <CommandItem
                        key={member.id}
                        value={member.name}
                        onSelect={() => {
                          setSelectedMember(member);
                          setOpenMemberCombo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedMember?.id === member.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {member.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>

          {selectedMember && (
            <div className="space-y-1 pt-2">
              <div className="text-xs font-medium">Current Advisors:</div>
              <div className="flex flex-wrap gap-1">
                {selectedMember.advisors.map((advisor, index) => (
                  <span key={index} className="inline-flex items-center rounded-full bg-secondary px-2.5 py-0.5 text-xs font-medium text-secondary-foreground">
                    {advisor}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {selectedMember && (
          <div className="rounded-md border bg-muted/30 p-3 text-sm space-y-1.5">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Member Information</div>
            <div><span className="font-medium">Availability:</span> <span className="text-muted-foreground">{selectedMember.availability}</span></div>
            <div><span className="font-medium">Email:</span> <span className="text-muted-foreground">{selectedMember.email.join(", ")}</span></div>
            <div><span className="font-medium">Phone:</span> <span className="text-muted-foreground">{selectedMember.phone.join(", ")}</span></div>
          </div>
        )}
      </div>

      {/* Advisor Selection */}
      <div className="grid grid-cols-[1fr_1.5fr] gap-4 items-start">
        <div className="space-y-2">
          <Label>Advisor *</Label>
          <Popover open={openAdvisorCombo} onOpenChange={setOpenAdvisorCombo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAdvisorCombo}
                className="w-full justify-between"
              >
                {selectedAdvisor ? selectedAdvisor.name : "Select advisor..."}
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
              <Command>
                <CommandInput placeholder="Search advisor..." />
                <CommandList>
                  <CommandEmpty>No advisor found.</CommandEmpty>
                  <CommandGroup>
                    {mockAdvisors.map((advisor) => (
                      <CommandItem
                        key={advisor.id}
                        value={advisor.name}
                        onSelect={() => {
                          setSelectedAdvisor(advisor);
                          setOpenAdvisorCombo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            selectedAdvisor?.id === advisor.id ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {advisor.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        </div>

        {selectedAdvisor && (
          <div className="rounded-md border bg-muted/30 p-3 text-sm space-y-1.5">
            <div className="text-xs font-semibold text-muted-foreground mb-2">Advisor Information</div>
            <div><span className="font-medium">Availability:</span> <span className="text-muted-foreground">{selectedAdvisor.availability}</span></div>
            <div><span className="font-medium">Email:</span> <span className="text-muted-foreground">{selectedAdvisor.email}</span></div>
            <div><span className="font-medium">Phone:</span> <span className="text-muted-foreground">{selectedAdvisor.phone}</span></div>
          </div>
        )}
      </div>

      {/* Meeting Title */}
      {selectedAdvisor && (
        <div className="grid gap-2">
          <Label>Meeting Title *</Label>
          <Input
            value={meetingTitle}
            onChange={(e) => setMeetingTitle(e.target.value)}
            placeholder="Enter meeting title..."
          />
        </div>
      )}

      {/* Agenda Selection */}
      <div className="grid gap-2">
        <Label>Agenda *</Label>
        {!customAgenda ? (
          <Popover open={openAgendaCombo} onOpenChange={setOpenAgendaCombo}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={openAgendaCombo}
                className="justify-between h-auto min-h-[80px] items-start text-left"
              >
                <span className="line-clamp-3">{agenda || "Select agenda..."}</span>
                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[500px] p-0">
              <Command>
                <CommandInput placeholder="Search agenda..." />
                <CommandList>
                  <CommandEmpty>No agenda found.</CommandEmpty>
                  <CommandGroup>
                    {agendaOptions.map((option) => (
                      <CommandItem
                        key={option}
                        value={option}
                        onSelect={(value) => {
                          setAgenda(value);
                          setOpenAgendaCombo(false);
                        }}
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            agenda === option ? "opacity-100" : "opacity-0"
                          )}
                        />
                        {option}
                      </CommandItem>
                    ))}
                    <CommandItem
                      value="custom"
                      onSelect={() => {
                        setCustomAgenda(true);
                        setAgenda("");
                        setOpenAgendaCombo(false);
                      }}
                    >
                      <span className="font-medium">+ Custom Agenda</span>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
        ) : (
          <div className="space-y-2">
            <textarea
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Enter custom agenda..."
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              rows={3}
            />
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setCustomAgenda(false);
                setAgenda("");
              }}
            >
              Back to preset options
            </Button>
          </div>
        )}
      </div>

      {/* Date and Time Selection */}
      <div className="grid grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label>Date *</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="grid gap-2">
          <Label>Time *</Label>
          <Input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            placeholder="Select time"
          />
        </div>
      </div>

      {/* Conflict Warning */}
      {conflictInfo && (
        <div className="text-sm text-destructive font-medium">
          {conflictInfo} Unavailable
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-end gap-2">
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button
          disabled={!isFormValid}
          onClick={handleCreate}
          className={cn(!isFormValid && "opacity-50 cursor-not-allowed")}
        >
          Create Booking
        </Button>
      </div>
    </div>
  );
}
