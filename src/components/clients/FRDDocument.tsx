import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Target, Clock, TrendingUp, CheckCircle, Phone } from "lucide-react";
import { Client } from "@/types/client";

interface FRDDocumentProps {
  client: Client;
}

export function FRDDocument({ client }: FRDDocumentProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [managedBy, setManagedBy] = useState("Sarah Johnson");
  const [lastUpdated, setLastUpdated] = useState("2024-07-10");
  const [linkedProfile, setLinkedProfile] = useState("Premium Portfolio");

  // Editable sections state
  const [backgroundContext, setBackgroundContext] = useState("High-net-worth individual with diversified investment portfolio. Recently relocated from Mumbai to Bangalore for business expansion.");
  const [coreFocusAreas, setCoreFocusAreas] = useState("Tax optimization, Real estate investment planning, Retirement corpus building");
  const [timelines, setTimelines] = useState("ITR filing: March 2025\nInsurance renewal: August 2024\nProperty purchase: Q2 2025");
  const [keyChallenges, setKeyChallenges] = useState("Complex tax structure due to multiple income sources\nLack of proper estate planning documentation");
  const [shortTermGoals, setShortTermGoals] = useState("Optimize tax liability for FY 2024-25\nComplete property purchase in Bangalore\nSet up emergency fund (12 months expenses)");
  const [longTermGoals, setLongTermGoals] = useState("Build retirement corpus of ₹5 crores by age 55\nChildren's education planning\nCreate family trust structure");
  const [bigWins, setBigWins] = useState("Saved ₹2.8L in taxes through portfolio restructuring\nIdentified optimal health insurance plan\nSuccessfully guided through first real estate investment");
  const [ongoingThreads, setOngoingThreads] = useState("Review and finalize ELSS investments by Dec 15\nComplete KYC documentation for new mutual fund accounts\nSchedule meeting with tax consultant for advance tax planning");
  const [otherObservations, setOtherObservations] = useState("Prefers digital communication\nAvailable for calls on weekdays after 6 PM\nInterested in ESG investment options");

  // Mock call stats data
  const callStats = [
    { advisor: "Priya Sharma", calls: 12, lastCall: "2024-07-08" },
    { advisor: "Rajesh Kumar", calls: 8, lastCall: "2024-06-28" },
    { advisor: "Anita Desai", calls: 5, lastCall: "2024-07-02" }
  ];

  const handleSave = () => {
    setIsEditing(false);
    // TODO: Save to backend
  };

  const handleCancel = () => {
    setIsEditing(false);
    // TODO: Reset to original values
  };

  return (
    <div className="space-y-6">
      {/* Header Information */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <CardTitle className="text-xl font-semibold">Financial Record Document (FRD)</CardTitle>
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <Button onClick={handleSave} size="sm">Save</Button>
                  <Button onClick={handleCancel} variant="outline" size="sm">Cancel</Button>
                </>
              ) : (
                <Button onClick={() => setIsEditing(true)} size="sm">Edit</Button>
              )}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Client Name</Label>
              <p className="font-medium">{client.name}</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Managed By</Label>
              {isEditing ? (
                <Input value={managedBy} onChange={(e) => setManagedBy(e.target.value)} />
              ) : (
                <p className="font-medium">{managedBy}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Risk Profile</Label>
              <Badge variant="outline">Moderate Aggressive</Badge>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Last Updated</Label>
              {isEditing ? (
                <Input type="date" value={lastUpdated} onChange={(e) => setLastUpdated(e.target.value)} />
              ) : (
                <p className="font-medium">{new Date(lastUpdated).toLocaleDateString()}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Client Bio</Label>
              <p className="text-sm">Entrepreneur, Tech Industry, High Growth Phase</p>
            </div>
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">Linked Profile</Label>
              {isEditing ? (
                <Input value={linkedProfile} onChange={(e) => setLinkedProfile(e.target.value)} />
              ) : (
                <Badge variant="secondary">{linkedProfile}</Badge>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Background and Context Section */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5" />
            Background and Context
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={backgroundContext}
              onChange={(e) => setBackgroundContext(e.target.value)}
              rows={3}
              placeholder="Background and context information..."
            />
          ) : (
            <p className="text-sm leading-relaxed">{backgroundContext}</p>
          )}
        </CardContent>
      </Card>

      {/* Core Focus Areas */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Core Focus Areas and Financial Priorities
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={coreFocusAreas}
              onChange={(e) => setCoreFocusAreas(e.target.value)}
              rows={3}
              placeholder="Core focus areas and financial priorities..."
            />
          ) : (
            <p className="text-sm leading-relaxed">{coreFocusAreas}</p>
          )}
        </CardContent>
      </Card>

      {/* Timelines */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Timelines
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={timelines}
              onChange={(e) => setTimelines(e.target.value)}
              rows={4}
              placeholder="Important timelines (ITR filing, insurance renewals, etc.)"
            />
          ) : (
            <div className="space-y-2">
              {timelines.split('\n').map((timeline, index) => (
                <div key={index} className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  {timeline}
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Key Challenges */}
      <Card>
        <CardHeader>
          <CardTitle>Key Challenges</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={keyChallenges}
              onChange={(e) => setKeyChallenges(e.target.value)}
              rows={3}
              placeholder="What's keeping them up at night?"
            />
          ) : (
            <div className="space-y-2">
              {keyChallenges.split('\n').map((challenge, index) => (
                <div key={index} className="text-sm leading-relaxed">• {challenge}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Goals Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Short-term Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Short-term Goals (&lt; 2 Years)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea 
                value={shortTermGoals}
                onChange={(e) => setShortTermGoals(e.target.value)}
                rows={4}
                placeholder="Short-term goals (< 2 years)"
              />
            ) : (
              <div className="space-y-2">
                {shortTermGoals.split('\n').map((goal, index) => (
                  <div key={index} className="text-sm leading-relaxed">• {goal}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Long-term Goals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Long-term Goals (2+ years)
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <Textarea 
                value={longTermGoals}
                onChange={(e) => setLongTermGoals(e.target.value)}
                rows={4}
                placeholder="Long-term goals (2+ years)"
              />
            ) : (
              <div className="space-y-2">
                {longTermGoals.split('\n').map((goal, index) => (
                  <div key={index} className="text-sm leading-relaxed">• {goal}</div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Big Wins */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5" />
            Some Big Wins with Turtle
          </CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={bigWins}
              onChange={(e) => setBigWins(e.target.value)}
              rows={3}
              placeholder="Things we have helped the client achieve..."
            />
          ) : (
            <div className="space-y-2">
              {bigWins.split('\n').map((win, index) => (
                <div key={index} className="text-sm leading-relaxed">🎉 {win}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Ongoing Threads */}
      <Card>
        <CardHeader>
          <CardTitle>Ongoing Threads/Open Items</CardTitle>
          <p className="text-sm text-muted-foreground">
            Open action items from calls with timelines. 
            <Button variant="link" className="p-0 h-auto font-medium">
              View Pending Tasks →
            </Button>
          </p>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={ongoingThreads}
              onChange={(e) => setOngoingThreads(e.target.value)}
              rows={3}
              placeholder="Open action items with timelines..."
            />
          ) : (
            <div className="space-y-2">
              {ongoingThreads.split('\n').map((thread, index) => (
                <div key={index} className="text-sm leading-relaxed">⏳ {thread}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Other Observations */}
      <Card>
        <CardHeader>
          <CardTitle>Other Observations/Information/Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          {isEditing ? (
            <Textarea 
              value={otherObservations}
              onChange={(e) => setOtherObservations(e.target.value)}
              rows={3}
              placeholder="Additional observations and preferences..."
            />
          ) : (
            <div className="space-y-2">
              {otherObservations.split('\n').map((observation, index) => (
                <div key={index} className="text-sm leading-relaxed">📝 {observation}</div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Call Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Phone className="h-5 w-5" />
            Call Stats
          </CardTitle>
          <p className="text-sm text-muted-foreground">Auto-populated call statistics with each advisor</p>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {callStats.map((stat, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                <div>
                  <p className="font-medium">{stat.advisor}</p>
                  <p className="text-sm text-muted-foreground">Last call: {new Date(stat.lastCall).toLocaleDateString()}</p>
                </div>
                <Badge variant="secondary">{stat.calls} calls</Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
