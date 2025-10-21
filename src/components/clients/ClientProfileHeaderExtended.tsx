import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Edit3 } from "lucide-react";
import { Client } from "@/types/client";

interface ClientProfileHeaderExtendedProps {
  client: Client;
}

export function ClientProfileHeaderExtended({ client }: ClientProfileHeaderExtendedProps) {
  const [isEditingAvailability, setIsEditingAvailability] = useState(false);
  const [availability, setAvailability] = useState("Mon-Fri, 9AM-5PM IST");
  
  const [isEditingRiskProfile, setIsEditingRiskProfile] = useState(false);
  const [riskProfile, setRiskProfile] = useState("Moderate");
  
  const [isEditingReturnDate, setIsEditingReturnDate] = useState(false);
  const [returnDate, setReturnDate] = useState("2026-12-15");

  return (
    <div className="flex items-start gap-6 p-6 border-b">
      <div className="flex-1 min-w-0">
        <h2 className="text-2xl font-bold">{client.name}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground mt-1">
          <span>{client.email}</span>
          <span>•</span>
          <span>{client.phone}</span>
        </div>
      </div>

      {/* Availability */}
      <div className="flex flex-col gap-1 min-w-[200px]">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Availability:</span>
          {!isEditingAvailability && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingAvailability(true)}
              className="h-4 w-4 p-0"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          )}
        </div>
        {isEditingAvailability ? (
          <div className="space-y-2">
            <Input
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
              className="text-xs h-7 w-full"
            />
            <div className="flex gap-1">
              <Button onClick={() => setIsEditingAvailability(false)} size="sm" className="h-6 text-xs px-2">Save</Button>
              <Button variant="outline" onClick={() => setIsEditingAvailability(false)} size="sm" className="h-6 text-xs px-2">Cancel</Button>
            </div>
          </div>
        ) : (
          <span className="text-xs">{availability}</span>
        )}
      </div>

      {/* Risk Profile */}
      <div className="flex flex-col gap-1 min-w-[120px]">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Risk:</span>
          {!isEditingRiskProfile && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingRiskProfile(true)}
              className="h-4 w-4 p-0"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          )}
        </div>
        {isEditingRiskProfile ? (
          <div className="space-y-2">
            <Select value={riskProfile} onValueChange={setRiskProfile}>
              <SelectTrigger className="text-xs h-7 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Conservative">Conservative</SelectItem>
                <SelectItem value="Moderate">Moderate</SelectItem>
                <SelectItem value="Aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
            <div className="flex gap-1">
              <Button onClick={() => setIsEditingRiskProfile(false)} size="sm" className="h-6 text-xs px-2">Save</Button>
              <Button variant="outline" onClick={() => setIsEditingRiskProfile(false)} size="sm" className="h-6 text-xs px-2">Cancel</Button>
            </div>
          </div>
        ) : (
          <span className="text-xs font-medium">{riskProfile}</span>
        )}
      </div>

      {/* Return Date */}
      <div className="flex flex-col gap-1 min-w-[120px]">
        <div className="flex items-center gap-1">
          <span className="text-xs font-medium text-muted-foreground whitespace-nowrap">Return:</span>
          {!isEditingReturnDate && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingReturnDate(true)}
              className="h-4 w-4 p-0"
            >
              <Edit3 className="h-3 w-3" />
            </Button>
          )}
        </div>
        {isEditingReturnDate ? (
          <div className="space-y-2">
            <Input
              type="date"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="text-xs h-7 w-full"
            />
            <div className="flex gap-1">
              <Button onClick={() => setIsEditingReturnDate(false)} size="sm" className="h-6 text-xs px-2">Save</Button>
              <Button variant="outline" onClick={() => setIsEditingReturnDate(false)} size="sm" className="h-6 text-xs px-2">Cancel</Button>
            </div>
          </div>
        ) : (
          <span className="text-xs font-medium whitespace-nowrap">
            {new Date(returnDate).toLocaleDateString('en-US', { 
              month: 'short', 
              day: 'numeric',
              year: 'numeric'
            })}
          </span>
        )}
      </div>

      <StatusBadge
        variant={
          client.subscriptionStatus === "active" ? "success" :
          client.subscriptionStatus === "expired" ? "danger" :
          "warning"
        }
      >
        {client.subscriptionStatus.charAt(0).toUpperCase() + client.subscriptionStatus.slice(1)}
      </StatusBadge>
    </div>
  );
}
