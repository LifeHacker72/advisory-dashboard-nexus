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
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [availability, setAvailability] = useState("Monday to Friday, 9:00 AM - 5:00 PM IST. Prefer email for initial contact.");
  
  const [isEditingNotes, setIsEditingNotes] = useState(false);
  const [importantNotes, setImportantNotes] = useState("Client prefers quarterly reviews. Has specific interest in sustainable investments.");
  
  const [isEditingRiskProfile, setIsEditingRiskProfile] = useState(false);
  const [riskProfile, setRiskProfile] = useState("Moderate");
  
  const [isEditingReturnDate, setIsEditingReturnDate] = useState(false);
  const [returnDate, setReturnDate] = useState("2026-12-15");

  const handleSaveAvailability = () => {
    setIsEditingAvailability(false);
    // TODO: Save to backend
  };

  const handleSaveNotes = () => {
    setIsEditingNotes(false);
    // TODO: Save to backend
  };

  const handleSaveRiskProfile = () => {
    setIsEditingRiskProfile(false);
    // TODO: Save to backend
  };

  const handleSaveReturnDate = () => {
    setIsEditingReturnDate(false);
    // TODO: Save to backend
  };

  return (
    <div className="space-y-4">
      {/* Metrics Row on Top */}
      <ClientMetricsGrid client={client} />

      {/* Information Grid Below */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Client Bio - Spans 2 columns */}
        <div className="lg:col-span-2">
          <ClientBioSection />
        </div>

        {/* Risk Profile */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Risk Profile</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingRiskProfile(!isEditingRiskProfile)}
                className="h-7 w-7 p-0"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditingRiskProfile ? (
              <div className="space-y-3">
                <Select value={riskProfile} onValueChange={setRiskProfile}>
                  <SelectTrigger className="text-sm">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Conservative">Conservative</SelectItem>
                    <SelectItem value="Moderate">Moderate</SelectItem>
                    <SelectItem value="Aggressive">Aggressive</SelectItem>
                  </SelectContent>
                </Select>
                <div className="flex gap-2">
                  <Button onClick={handleSaveRiskProfile} size="sm">Save</Button>
                  <Button variant="outline" onClick={() => setIsEditingRiskProfile(false)} size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm font-medium">{riskProfile}</p>
            )}
          </CardContent>
        </Card>

        {/* Availability & How to Contact - Spans 2 columns */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">Availability (IST) & How to Contact</CardTitle>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsEditingAvailability(!isEditingAvailability)}
                  className="h-7 w-7 p-0"
                >
                  <Edit3 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {isEditingAvailability ? (
                <div className="space-y-3">
                  <Textarea
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                    placeholder="Enter availability and contact preferences..."
                    className="min-h-[60px] text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveAvailability} size="sm">Save</Button>
                    <Button variant="outline" onClick={() => setIsEditingAvailability(false)} size="sm">Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{availability}</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Planned Return Date */}
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base">Return to India</CardTitle>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsEditingReturnDate(!isEditingReturnDate)}
                className="h-7 w-7 p-0"
              >
                <Edit3 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {isEditingReturnDate ? (
              <div className="space-y-3">
                <Input
                  type="date"
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="text-sm"
                />
                <div className="flex gap-2">
                  <Button onClick={handleSaveReturnDate} size="sm">Save</Button>
                  <Button variant="outline" onClick={() => setIsEditingReturnDate(false)} size="sm">Cancel</Button>
                </div>
              </div>
            ) : (
              <p className="text-sm font-medium">
                {new Date(returnDate).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'short', 
                  day: 'numeric' 
                })}
              </p>
            )}
          </CardContent>
        </Card>

        {/* Important Notes - Spans 3 columns */}
        <div className="lg:col-span-3">
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
                    className="min-h-[60px] text-sm"
                  />
                  <div className="flex gap-2">
                    <Button onClick={handleSaveNotes} size="sm">Save</Button>
                    <Button variant="outline" onClick={() => setIsEditingNotes(false)} size="sm">Cancel</Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed">{importantNotes}</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
