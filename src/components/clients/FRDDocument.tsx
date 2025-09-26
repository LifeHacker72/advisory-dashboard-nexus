import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  TrendingUp, Shield, CreditCard, Building2, 
  Scale, FileText, MoreHorizontal, ChevronRight 
} from "lucide-react";
import { Client } from "@/types/client";
import { FRDSubsection } from "./FRDSubsection";

interface FRDDocumentProps {
  client: Client;
}

// Define the 7 subsections
const subsections = [
  { id: "financial", title: "Financial Planning", icon: TrendingUp, color: "bg-blue-500" },
  { id: "tax", title: "Tax Planning", icon: FileText, color: "bg-green-500" },
  { id: "insurance", title: "Insurance", icon: Shield, color: "bg-red-500" },
  { id: "credit", title: "Credit Cards", icon: CreditCard, color: "bg-purple-500" },
  { id: "banking", title: "Banking & Compliance", icon: Building2, color: "bg-orange-500" },
  { id: "estate", title: "Estate Planning", icon: Scale, color: "bg-indigo-500" },
  { id: "others", title: "Others", icon: MoreHorizontal, color: "bg-gray-500" }
];

export function FRDDocument({ client }: FRDDocumentProps) {
  const [selectedSubsection, setSelectedSubsection] = useState<string | null>(null);

  if (selectedSubsection) {
    const subsection = subsections.find(s => s.id === selectedSubsection);
    
    return (
      <div className="space-y-6">
        {/* Other subsections as tabs */}
        <div className="border-b">
          <Tabs value={selectedSubsection} onValueChange={setSelectedSubsection}>
            <TabsList className="grid w-full grid-cols-7">
              {subsections.map((subsection) => (
                <TabsTrigger key={subsection.id} value={subsection.id} className="text-xs">
                  {subsection.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Expanded subsection view */}
        <FRDSubsection
          client={client}
          vertical={subsection?.title || ""}
          onBack={() => setSelectedSubsection(null)}
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-semibold">Financial Record Document (FRD)</h2>
        <p className="text-muted-foreground">Select a vertical to manage client's financial journey</p>
      </div>

      {/* Client Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Client Overview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Client Name</p>
              <p className="font-medium">{client.name}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Risk Profile</p>
              <Badge variant="outline">Moderate Aggressive</Badge>
            </div>
            <div>
              <p className="text-muted-foreground">Client Bio</p>
              <p>Entrepreneur, Tech Industry</p>
            </div>
            <div>
              <p className="text-muted-foreground">Linked Profile</p>
              <Badge variant="secondary">Premium Portfolio</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Subsections Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subsections.map((subsection) => {
          const Icon = subsection.icon;
          return (
            <Card 
              key={subsection.id} 
              className="cursor-pointer hover:shadow-md transition-shadow group"
              onClick={() => setSelectedSubsection(subsection.id)}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${subsection.color} text-white`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-medium">{subsection.title}</h3>
                      <p className="text-sm text-muted-foreground">Manage vertical</p>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
