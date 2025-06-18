
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

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

interface RiskProfileDialogProps {
  profile: RiskProfileResponse | null;
  isOpen: boolean;
  isEditing: boolean;
  onClose: () => void;
  onSave: (profile: RiskProfileResponse) => void;
}

const emptyProfile: RiskProfileResponse = {
  id: 0,
  submittedAt: new Date().toISOString().split('T')[0],
  riskProfile: "Moderate",
  responses: {
    fullName: "",
    panNumber: "",
    addressLine1: "",
    addressLine2: "",
    phoneNumber: "",
    emailAddress: "",
    gender: "",
    maritalStatus: "",
    dateOfBirth: "",
    sons: "",
    daughters: "",
    dependentParents: "",
    dependentSiblings: "",
    dependentParentInLaws: "",
    sourceOfIncome: "",
    parentsSourceOfIncome: "",
    currency: "",
    monthlyIncome: "",
    monthlyExpenses: "",
    overallInvestment: "",
    totalEmis: "",
    investmentHorizon: "",
    equityUnderstanding: "",
    incomeSourcesNature: "",
    investmentObjective: "",
    poorPerformanceResponse: "",
    valueDeclineResponse: ""
  }
};

export function RiskProfileDialog({ profile, isOpen, isEditing, onClose, onSave }: RiskProfileDialogProps) {
  const [formData, setFormData] = useState<RiskProfileResponse>(emptyProfile);

  useEffect(() => {
    if (profile) {
      setFormData(profile);
    } else {
      setFormData(emptyProfile);
    }
  }, [profile]);

  const handleSave = () => {
    onSave(formData);
  };

  const updateResponse = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      responses: {
        ...prev.responses,
        [field]: value
      }
    }));
  };

  const updateRiskProfile = (value: "Conservative" | "Moderate" | "Aggressive") => {
    setFormData(prev => ({
      ...prev,
      riskProfile: value
    }));
  };

  const questions = [
    { key: 'fullName', label: 'Full Name' },
    { key: 'panNumber', label: 'PAN number' },
    { key: 'addressLine1', label: 'Address line 1' },
    { key: 'addressLine2', label: 'Address line 2' },
    { key: 'phoneNumber', label: 'Phone Number' },
    { key: 'emailAddress', label: 'Email Address' },
    { key: 'gender', label: 'Gender' },
    { key: 'maritalStatus', label: 'Marital Status' },
    { key: 'dateOfBirth', label: 'Date of Birth' },
    { key: 'sons', label: 'Son(s)' },
    { key: 'daughters', label: 'Daughter(s)' },
    { key: 'dependentParents', label: 'Dependent Parent(s)' },
    { key: 'dependentSiblings', label: 'Dependent Sibling(s)' },
    { key: 'dependentParentInLaws', label: 'Dependent Parent-in-law(s)' },
    { key: 'sourceOfIncome', label: 'Source of Income' },
    { key: 'parentsSourceOfIncome', label: "Parent's source of income" },
    { key: 'currency', label: 'What Currency would you like to share primary numbers in?' },
    { key: 'monthlyIncome', label: 'What is your current monthly income?' },
    { key: 'monthlyExpenses', label: 'What is your current monthly expenses?' },
    { key: 'overallInvestment', label: 'What is the approx. sum of your overall investment (total of EPF/Mutual Funds/PPF, FD etc)?' },
    { key: 'totalEmis', label: 'What is the sum total of all your EMIs (monthly numbers)?' },
    { key: 'investmentHorizon', label: 'What is your investment horizon, i.e., how long can you keep your money invested in the market before needing access to it?' },
    { key: 'equityUnderstanding', label: 'How well do you understand investing in the equity markets?' },
    { key: 'incomeSourcesNature', label: 'Nature of your current and future income sources are' },
    { key: 'investmentObjective', label: 'From the following 5 possible investment scenarios, please select the option that defines your investment objective.' },
    { key: 'poorPerformanceResponse', label: 'If your investment outlook is long-term (more than five years), how long will you hold on to a poorly performing portfolio before cashing in?' },
    { key: 'valueDeclineResponse', label: 'If a few months after investing, the value of your investments declines by 20%, what would you do?' }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditing ? (profile ? 'Edit Risk Profile Response' : 'Add New Risk Profile Response') : 'View Risk Profile Response'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Submitted At</Label>
              <Input
                type="date"
                value={formData.submittedAt}
                onChange={(e) => setFormData(prev => ({ ...prev, submittedAt: e.target.value }))}
                disabled={!isEditing}
              />
            </div>
            <div>
              <Label>Risk Profile</Label>
              <Select
                value={formData.riskProfile}
                onValueChange={updateRiskProfile}
                disabled={!isEditing}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Conservative">Conservative</SelectItem>
                  <SelectItem value="Moderate">Moderate</SelectItem>
                  <SelectItem value="Aggressive">Aggressive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {questions.map((question, index) => (
              <div key={question.key}>
                <Label>{index + 1}. {question.label}</Label>
                {question.key === 'investmentObjective' || question.key === 'poorPerformanceResponse' || question.key === 'valueDeclineResponse' ? (
                  <Textarea
                    value={formData.responses[question.key as keyof typeof formData.responses]}
                    onChange={(e) => updateResponse(question.key, e.target.value)}
                    disabled={!isEditing}
                    className="min-h-[80px]"
                  />
                ) : (
                  <Input
                    type={question.key === 'dateOfBirth' ? 'date' : question.key === 'emailAddress' ? 'email' : 'text'}
                    value={formData.responses[question.key as keyof typeof formData.responses]}
                    onChange={(e) => updateResponse(question.key, e.target.value)}
                    disabled={!isEditing}
                  />
                )}
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
