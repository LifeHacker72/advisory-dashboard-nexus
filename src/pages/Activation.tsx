
import { useState } from "react";
import DashboardLayout from "@/components/layout/Dashboard";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { CheckCircle2, XCircle, Circle, ArrowRight } from "lucide-react";

interface ActivationStep {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  optional: boolean;
}

interface PendingClient {
  id: number;
  name: string;
  company: string;
  email: string;
  phone: string;
  advisor: string;
  status: "pending" | "in_progress" | "on_hold" | "completed";
  progress: number;
  steps: ActivationStep[];
}

const pendingClients: PendingClient[] = [
  {
    id: 1,
    name: "Thomas Anderson",
    company: "Matrix Technologies",
    email: "thomas.anderson@example.com",
    phone: "(555) 123-4567",
    advisor: "Emily Richardson",
    status: "in_progress",
    progress: 50,
    steps: [
      {
        id: 1,
        title: "Initial Consultation",
        description: "Introductory meeting to discuss needs and goals",
        completed: true,
        optional: false,
      },
      {
        id: 2,
        title: "Financial Assessment",
        description: "Comprehensive review of current financial situation",
        completed: true,
        optional: false,
      },
      {
        id: 3,
        title: "Contract Signing",
        description: "Review and signature of advisory agreement",
        completed: false,
        optional: false,
      },
      {
        id: 4,
        title: "Payment Processing",
        description: "Setup of payment method and initial invoice",
        completed: false,
        optional: false,
      },
      {
        id: 5,
        title: "Resource Access",
        description: "Provision of client portal access and resources",
        completed: false,
        optional: false,
      },
      {
        id: 6,
        title: "Additional Services",
        description: "Discussion of optional additional services",
        completed: false,
        optional: true,
      },
    ],
  },
  {
    id: 2,
    name: "Rachel Green",
    company: "Central Perk Inc.",
    email: "rachel.green@example.com",
    phone: "(555) 234-5678",
    advisor: "Daniel Morgan",
    status: "pending",
    progress: 0,
    steps: [
      {
        id: 1,
        title: "Initial Consultation",
        description: "Introductory meeting to discuss needs and goals",
        completed: false,
        optional: false,
      },
      {
        id: 2,
        title: "Financial Assessment",
        description: "Comprehensive review of current financial situation",
        completed: false,
        optional: false,
      },
      {
        id: 3,
        title: "Contract Signing",
        description: "Review and signature of advisory agreement",
        completed: false,
        optional: false,
      },
      {
        id: 4,
        title: "Payment Processing",
        description: "Setup of payment method and initial invoice",
        completed: false,
        optional: false,
      },
      {
        id: 5,
        title: "Resource Access",
        description: "Provision of client portal access and resources",
        completed: false,
        optional: false,
      },
      {
        id: 6,
        title: "Additional Services",
        description: "Discussion of optional additional services",
        completed: false,
        optional: true,
      },
    ],
  },
  {
    id: 3,
    name: "Walter White",
    company: "White Enterprises",
    email: "walter.white@example.com",
    phone: "(555) 345-6789",
    advisor: "Sophia Chen",
    status: "on_hold",
    progress: 33,
    steps: [
      {
        id: 1,
        title: "Initial Consultation",
        description: "Introductory meeting to discuss needs and goals",
        completed: true,
        optional: false,
      },
      {
        id: 2,
        title: "Financial Assessment",
        description: "Comprehensive review of current financial situation",
        completed: true,
        optional: false,
      },
      {
        id: 3,
        title: "Contract Signing",
        description: "Review and signature of advisory agreement",
        completed: false,
        optional: false,
      },
      {
        id: 4,
        title: "Payment Processing",
        description: "Setup of payment method and initial invoice",
        completed: false,
        optional: false,
      },
      {
        id: 5,
        title: "Resource Access",
        description: "Provision of client portal access and resources",
        completed: false,
        optional: false,
      },
      {
        id: 6,
        title: "Additional Services",
        description: "Discussion of optional additional services",
        completed: false,
        optional: true,
      },
    ],
  },
];

export default function Activation() {
  const [selectedClient, setSelectedClient] = useState<PendingClient | null>(null);
  const [localClients, setLocalClients] = useState<PendingClient[]>(pendingClients);

  const handleClientSelect = (client: PendingClient) => {
    setSelectedClient(client);
  };

  const handleStepToggle = (clientId: number, stepId: number) => {
    setLocalClients((prevClients) => {
      return prevClients.map((client) => {
        if (client.id === clientId) {
          const updatedSteps = client.steps.map((step) => {
            if (step.id === stepId) {
              return { ...step, completed: !step.completed };
            }
            return step;
          });
          
          const completedSteps = updatedSteps.filter(
            (step) => step.completed && !step.optional
          ).length;
          const totalRequiredSteps = updatedSteps.filter(
            (step) => !step.optional
          ).length;
          
          const progress = Math.round(
            (completedSteps / totalRequiredSteps) * 100
          );
          
          return {
            ...client,
            steps: updatedSteps,
            progress,
            status:
              progress === 100
                ? "completed"
                : progress > 0
                ? "in_progress"
                : client.status,
          };
        }
        return client;
      });
    });
    
    // Also update the selected client
    setSelectedClient((prev) => {
      if (prev && prev.id === clientId) {
        const updatedSteps = prev.steps.map((step) => {
          if (step.id === stepId) {
            return { ...step, completed: !step.completed };
          }
          return step;
        });
        
        const completedSteps = updatedSteps.filter(
          (step) => step.completed && !step.optional
        ).length;
        const totalRequiredSteps = updatedSteps.filter(
          (step) => !step.optional
        ).length;
        
        const progress = Math.round(
          (completedSteps / totalRequiredSteps) * 100
        );
        
        return {
          ...prev,
          steps: updatedSteps,
          progress,
          status:
            progress === 100
              ? "completed"
              : progress > 0
              ? "in_progress"
              : prev.status,
        };
      }
      return prev;
    });
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Client Activation</h2>
            <p className="text-muted-foreground">
              Manage the onboarding process for new clients.
            </p>
          </div>
          <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 w-full md:w-auto">
            Add New Client
          </button>
        </div>

        <div className="grid gap-6 grid-cols-1 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Card className="h-full glass-card">
              <CardHeader>
                <CardTitle>Pending Activations</CardTitle>
                <CardDescription>Clients awaiting full onboarding</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="divide-y">
                  {localClients.map((client) => (
                    <div
                      key={client.id}
                      className={`p-4 hover:bg-accent/30 transition-colors cursor-pointer ${
                        selectedClient?.id === client.id ? "bg-accent/50" : ""
                      }`}
                      onClick={() => handleClientSelect(client)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">
                            {client.company}
                          </p>
                        </div>
                        <StatusBadge
                          variant={
                            client.status === "completed"
                              ? "success"
                              : client.status === "in_progress"
                              ? "info"
                              : client.status === "on_hold"
                              ? "warning"
                              : "default"
                          }
                        >
                          {client.status === "in_progress"
                            ? "In Progress"
                            : client.status === "on_hold"
                            ? "On Hold"
                            : client.status === "completed"
                            ? "Completed"
                            : "Pending"}
                        </StatusBadge>
                      </div>
                      <div className="mt-2">
                        <div className="flex justify-between text-xs mb-1">
                          <span>Activation Progress</span>
                          <span>{client.progress}%</span>
                        </div>
                        <div className="h-2 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${
                              client.status === "completed"
                                ? "bg-green-500"
                                : client.status === "on_hold"
                                ? "bg-amber-500"
                                : "bg-blue-500"
                            }`}
                            style={{ width: `${client.progress}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="mt-3 text-xs text-muted-foreground">
                        Assigned to: {client.advisor}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            {selectedClient ? (
              <Card className="h-full glass-card animate-fade-in">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>{selectedClient.name}</span>
                    <StatusBadge
                      variant={
                        selectedClient.status === "completed"
                          ? "success"
                          : selectedClient.status === "in_progress"
                          ? "info"
                          : selectedClient.status === "on_hold"
                          ? "warning"
                          : "default"
                      }
                    >
                      {selectedClient.status === "in_progress"
                        ? "In Progress"
                        : selectedClient.status === "on_hold"
                        ? "On Hold"
                        : selectedClient.status === "completed"
                        ? "Completed"
                        : "Pending"}
                    </StatusBadge>
                  </CardTitle>
                  <CardDescription>{selectedClient.company}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Contact Information
                      </h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Email:</span>{" "}
                          {selectedClient.email}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Phone:</span>{" "}
                          {selectedClient.phone}
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-medium text-muted-foreground">
                        Activation Status
                      </h4>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium">Assigned To:</span>{" "}
                          {selectedClient.advisor}
                        </div>
                        <div className="text-sm">
                          <span className="font-medium">Progress:</span>{" "}
                          {selectedClient.progress}% Complete
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-medium mb-3">Activation Checklist</h4>
                    <div className="space-y-3">
                      {selectedClient.steps.map((step) => (
                        <div
                          key={step.id}
                          className={`p-3 rounded-lg border ${
                            step.completed
                              ? "border-green-500/20 bg-green-500/5"
                              : step.optional
                              ? "border-amber-500/20 bg-amber-500/5"
                              : "border-muted"
                          }`}
                        >
                          <div className="flex items-start">
                            <div
                              className="mt-0.5 cursor-pointer"
                              onClick={() =>
                                handleStepToggle(selectedClient.id, step.id)
                              }
                            >
                              {step.completed ? (
                                <CheckCircle2 className="h-5 w-5 text-green-600" />
                              ) : step.optional ? (
                                <Circle className="h-5 w-5 text-amber-600" />
                              ) : (
                                <Circle className="h-5 w-5 text-muted-foreground" />
                              )}
                            </div>
                            <div className="ml-3 flex-1">
                              <div className="flex items-center justify-between">
                                <h5 className="font-medium">{step.title}</h5>
                                {step.optional && (
                                  <span className="text-xs text-muted-foreground">
                                    Optional
                                  </span>
                                )}
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {step.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between border-t pt-6">
                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2"
                    onClick={() => setSelectedClient(null)}
                  >
                    Cancel
                  </button>
                  
                  <div className="flex gap-2">
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-4 py-2">
                      Save Progress
                    </button>
                    <button className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-9 px-4 py-2">
                      <span>Complete Activation</span>
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </button>
                  </div>
                </CardFooter>
              </Card>
            ) : (
              <Card className="h-full glass-card">
                <div className="flex flex-col items-center justify-center h-full py-12 px-4 text-center">
                  <div className="rounded-full bg-primary/10 p-3 mb-4">
                    <ArrowRight className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Select a Client</h3>
                  <p className="text-muted-foreground max-w-md">
                    Choose a client from the list to view and manage their activation
                    process.
                  </p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
