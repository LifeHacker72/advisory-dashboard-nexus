
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Download, Edit3, Trash2, Plus, FileText, ExternalLink } from "lucide-react";

interface Agreement {
  id: number;
  name: string;
  url: string;
  pdfFile: string;
  uploadedAt: string;
}

const mockAgreements: Agreement[] = [
  {
    id: 1,
    name: "Investment Advisory Agreement 2024",
    url: "https://example.com/agreement-2024",
    pdfFile: "investment-advisory-2024.pdf",
    uploadedAt: "2024-01-15"
  },
  {
    id: 2,
    name: "Portfolio Management Agreement",
    url: "https://example.com/portfolio-management",
    pdfFile: "portfolio-management.pdf",
    uploadedAt: "2023-12-10"
  }
];

export function AdvisoryAgreement() {
  const [agreements, setAgreements] = useState<Agreement[]>(mockAgreements);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAgreement, setEditingAgreement] = useState<Agreement | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    url: "",
    pdfFile: ""
  });

  const handleAdd = () => {
    setEditingAgreement(null);
    setFormData({ name: "", url: "", pdfFile: "" });
    setIsDialogOpen(true);
  };

  const handleEdit = (agreement: Agreement) => {
    setEditingAgreement(agreement);
    setFormData({
      name: agreement.name,
      url: agreement.url,
      pdfFile: agreement.pdfFile
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setAgreements(agreements.filter(a => a.id !== id));
  };

  const handleSave = () => {
    if (editingAgreement) {
      setAgreements(agreements.map(a => 
        a.id === editingAgreement.id 
          ? { ...a, ...formData }
          : a
      ));
    } else {
      const newAgreement: Agreement = {
        id: Date.now(),
        ...formData,
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      setAgreements([...agreements, newAgreement]);
    }
    setIsDialogOpen(false);
  };

  const handleDownload = (agreement: Agreement) => {
    // Simulate PDF download
    console.log(`Downloading ${agreement.pdfFile}`);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, pdfFile: file.name }));
    }
  };

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg">Advisory Agreement</CardTitle>
            <Button onClick={handleAdd} size="sm">
              <Plus className="h-4 w-4 mr-2" />
              Add New
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {agreements.map((agreement) => (
              <div key={agreement.id} className="flex items-center justify-between p-3 border rounded-lg">
                <div className="flex items-center gap-3">
                  <FileText className="h-5 w-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{agreement.name}</p>
                    <p className="text-sm text-muted-foreground">Uploaded: {agreement.uploadedAt}</p>
                    {agreement.url && (
                      <a 
                        href={agreement.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-800 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        View Online
                      </a>
                    )}
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleDownload(agreement)}>
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(agreement)}>
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(agreement.id)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingAgreement ? 'Edit Agreement' : 'Add New Agreement'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <Label>Agreement Name</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                placeholder="Enter agreement name"
              />
            </div>
            
            <div>
              <Label>URL (Optional)</Label>
              <Input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData(prev => ({ ...prev, url: e.target.value }))}
                placeholder="https://example.com/agreement"
              />
            </div>
            
            <div>
              <Label>PDF File</Label>
              <Input
                type="file"
                accept=".pdf"
                onChange={handleFileUpload}
              />
              {formData.pdfFile && (
                <p className="text-sm text-muted-foreground mt-1">
                  Current file: {formData.pdfFile}
                </p>
              )}
            </div>

            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSave}>
                Save
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
