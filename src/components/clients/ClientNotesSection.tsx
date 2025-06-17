
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit3 } from "lucide-react";

export function ClientNotesSection() {
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [clientNotes, setClientNotes] = useState("Initial consultation completed on Jan 5th. Client interested in retirement planning and risk assessment. Follow-up scheduled for next week to discuss investment portfolio options.\n\nClient prefers morning calls and email communication. Has specific concerns about market volatility and wants conservative approach initially.");

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    // TODO: Save notes to backend
    console.log("Saving client notes:", clientNotes);
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Client Notes</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditingNotes(!isEditingNotes)}
            className="h-8 w-8 p-0"
          >
            <Edit3 className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        {isEditingNotes ? (
          <div className="space-y-4 h-full">
            <Textarea
              value={clientNotes}
              onChange={(e) => setClientNotes(e.target.value)}
              placeholder="Enter client notes..."
              className="min-h-[300px] resize-none"
            />
            <div className="flex gap-2">
              <Button onClick={handleSaveNotes} size="sm">Save</Button>
              <Button variant="outline" onClick={() => setIsEditingNotes(false)} size="sm">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="h-full">
            <pre className="text-sm leading-relaxed whitespace-pre-wrap font-sans text-foreground">
              {clientNotes}
            </pre>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
