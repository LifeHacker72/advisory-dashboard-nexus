
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Edit3, ExternalLink } from "lucide-react";

export function ClientBioSection() {
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [clientBio, setClientBio] = useState("John is a seasoned financial advisor with over 15 years of experience in wealth management. He specializes in retirement planning and has helped numerous clients achieve their financial goals through strategic investment planning.");
  const [linkedinProfile, setLinkedinProfile] = useState("https://linkedin.com/in/michael-johnson");

  const handleSaveBio = () => {
    setIsEditingBio(false);
    // TODO: Save bio to backend
    console.log("Saving bio:", clientBio, "LinkedIn:", linkedinProfile);
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base">Client Bio</CardTitle>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditingBio(!isEditingBio)}
            className="h-7 w-7 p-0"
          >
            <Edit3 className="h-3.5 w-3.5" />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {isEditingBio ? (
          <div className="space-y-3">
            <Textarea
              value={clientBio}
              onChange={(e) => setClientBio(e.target.value)}
              placeholder="Enter client bio..."
              className="min-h-[60px] text-sm"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn Profile</label>
              <input
                type="url"
                value={linkedinProfile}
                onChange={(e) => setLinkedinProfile(e.target.value)}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 text-sm rounded-md border border-input bg-background"
              />
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSaveBio} size="sm">Save</Button>
              <Button variant="outline" onClick={() => setIsEditingBio(false)} size="sm">Cancel</Button>
            </div>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-sm leading-relaxed">{clientBio}</p>
            {linkedinProfile && (
              <a
                href={linkedinProfile}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
              >
                <ExternalLink className="h-3.5 w-3.5" />
                LinkedIn Profile
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
