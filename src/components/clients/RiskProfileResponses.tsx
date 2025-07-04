import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit3, Trash2, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { RiskProfileDialog } from "./RiskProfileDialog";

interface RiskProfileResponse {
  id: number;
  submittedAt: string;
  riskProfile: "Conservative" | "Moderate" | "Aggressive";
  responses: {
    fullName: string;
    panNumber: string;
    addressLine1: string;
    addressLine2: string;
    phoneNumber: string;
    emailAddress: string;
    gender: string;
    maritalStatus: string;
    dateOfBirth: string;
    sons: string;
    daughters: string;
    dependentParents: string;
    dependentSiblings: string;
    dependentParentInLaws: string;
    sourceOfIncome: string;
    parentsSourceOfIncome: string;
    currency: string;
    monthlyIncome: string;
    monthlyExpenses: string;
    overallInvestment: string;
    totalEmis: string;
    investmentHorizon: string;
    equityUnderstanding: string;
    incomeSourcesNature: string;
    investmentObjective: string;
    poorPerformanceResponse: string;
    valueDeclineResponse: string;
  };
}

const mockRiskProfiles: RiskProfileResponse[] = [
  {
    id: 1,
    submittedAt: "2024-01-15",
    riskProfile: "Moderate",
    responses: {
      fullName: "Michael Johnson",
      panNumber: "ABCDE1234F",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      phoneNumber: "(555) 123-4567",
      emailAddress: "michael.johnson@example.com",
      gender: "Male",
      maritalStatus: "Married",
      dateOfBirth: "1985-03-20",
      sons: "1",
      daughters: "0",
      dependentParents: "2",
      dependentSiblings: "0",
      dependentParentInLaws: "1",
      sourceOfIncome: "Salary",
      parentsSourceOfIncome: "Pension",
      currency: "USD",
      monthlyIncome: "$8,000",
      monthlyExpenses: "$5,500",
      overallInvestment: "$50,000",
      totalEmis: "$1,200",
      investmentHorizon: "5-10 years",
      equityUnderstanding: "Good",
      incomeSourcesNature: "Stable",
      investmentObjective: "Wealth accumulation",
      poorPerformanceResponse: "Hold for 2-3 years",
      valueDeclineResponse: "Buy more at lower prices"
    }
  },
  {
    id: 2,
    submittedAt: "2023-08-22",
    riskProfile: "Conservative",
    responses: {
      fullName: "Michael Johnson",
      panNumber: "ABCDE1234F",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      phoneNumber: "(555) 123-4567",
      emailAddress: "michael.johnson@example.com",
      gender: "Male",
      maritalStatus: "Married",
      dateOfBirth: "1985-03-20",
      sons: "1",
      daughters: "0",
      dependentParents: "2",
      dependentSiblings: "0",
      dependentParentInLaws: "1",
      sourceOfIncome: "Salary",
      parentsSourceOfIncome: "Pension",
      currency: "USD",
      monthlyIncome: "$7,000",
      monthlyExpenses: "$5,000",
      overallInvestment: "$30,000",
      totalEmis: "$1,000",
      investmentHorizon: "3-5 years",
      equityUnderstanding: "Basic",
      incomeSourcesNature: "Stable",
      investmentObjective: "Capital preservation",
      poorPerformanceResponse: "Sell after 1 year",
      valueDeclineResponse: "Panic and sell"
    }
  }
];

export function RiskProfileResponses() {
  const [profiles, setProfiles] = useState<RiskProfileResponse[]>(mockRiskProfiles);
  const [selectedProfile, setSelectedProfile] = useState<RiskProfileResponse | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showOlder, setShowOlder] = useState(false);

  const handleView = (profile: RiskProfileResponse) => {
    setSelectedProfile(profile);
    setIsEditing(false);
    setIsDialogOpen(true);
  };

  const handleEdit = (profile: RiskProfileResponse) => {
    setSelectedProfile(profile);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setProfiles(profiles.filter(p => p.id !== id));
  };

  const handleAdd = () => {
    setSelectedProfile(null);
    setIsEditing(true);
    setIsDialogOpen(true);
  };

  const handleSave = (profile: RiskProfileResponse) => {
    if (profile.id) {
      setProfiles(profiles.map(p => p.id === profile.id ? profile : p));
    } else {
      const newProfile = { ...profile, id: Date.now() };
      setProfiles([...profiles, newProfile]);
    }
    setIsDialogOpen(false);
  };

  const sortedProfiles = profiles.sort((a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime());
  const latestProfile = sortedProfiles[0];
  const displayedProfiles = showOlder ? sortedProfiles : sortedProfiles.slice(0, 1);

  return (
    <>
      <Card>
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-sm">Risk Profile Responses</CardTitle>
              {latestProfile && (
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">Current:</span>
                  <Badge 
                    variant={
                      latestProfile.riskProfile === "Conservative" ? "secondary" :
                      latestProfile.riskProfile === "Moderate" ? "default" : 
                      "destructive"
                    }
                  >
                    {latestProfile.riskProfile}
                  </Badge>
                </div>
              )}
            </div>
            <Button onClick={handleAdd} size="sm" className="h-7 px-2 text-xs">
              <Plus className="h-3 w-3 mr-1" />
              Add
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-1">
            {displayedProfiles.map((profile) => (
              <div key={profile.id} className="flex items-center justify-between p-1.5 border rounded text-xs">
                <div className="flex items-center gap-2">
                  <div>
                    <p className="font-medium">{profile.submittedAt}</p>
                    <Badge 
                      variant={
                        profile.riskProfile === "Conservative" ? "secondary" :
                        profile.riskProfile === "Moderate" ? "default" : 
                        "destructive"
                      }
                      className="text-xs px-1 py-0"
                    >
                      {profile.riskProfile}
                    </Badge>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button variant="ghost" size="sm" onClick={() => handleView(profile)} className="h-6 w-6 p-0">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(profile)} className="h-6 w-6 p-0">
                    <Edit3 className="h-3 w-3" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(profile.id)} className="h-6 w-6 p-0">
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {profiles.length > 1 && (
            <div className="flex justify-end mt-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowOlder(!showOlder)}
                className="h-6 px-2 text-xs"
              >
                {showOlder ? (
                  <>
                    <ChevronUp className="h-3 w-3 mr-1" />
                    View Less
                  </>
                ) : (
                  <>
                    <ChevronDown className="h-3 w-3 mr-1" />
                    View Older
                  </>
                )}
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      <RiskProfileDialog
        profile={selectedProfile}
        isOpen={isDialogOpen}
        isEditing={isEditing}
        onClose={() => setIsDialogOpen(false)}
        onSave={handleSave}
      />
    </>
  );
}
