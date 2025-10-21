import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Edit3 } from "lucide-react";
import { Client } from "@/types/client";
import { ClientBioSection } from "./ClientBioSection";
import { ClientMetricsGrid } from "./ClientMetricsGrid";

interface ClientSummaryViewProps {
  client: Client;
}

export function ClientSummaryView({ client }: ClientSummaryViewProps) {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [importantNotes, setImportantNotes] = useState("Client prefers quarterly reviews. Has specific interest in sustainable investments.");

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    // TODO: Save to backend
  };

  return (
    <div className="space-y-4">
      {/* Metrics Row on Top */}
      <ClientMetricsGrid client={client} />

      {/* Client Bio and Important Notes */}
      <div className="space-y-4">
        <ClientBioSection />

        {/* Important Notes - Full Width with More Space */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Important Notes</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingNotes(!isEditingNotes)}
                className="h-7 w-7 p-0"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditingNotes ? (
              <div className="space-y-3">
                <Textarea
                  value={importantNotes}
                  onChange={(e) => setImportantNotes(e.target.value)}
                  placeholder="Enter important notes about the client..."
                  className="min-h-[120px] text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveNotes} size="sm">Save</Button>
                  <Button variant="outline" onClick={() => setIsEditingNotes(false)} size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{importantNotes}</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
