
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Upload, Trash2, Eye, FileText, Image } from "lucide-react";

interface KYCDocument {
  id: number;
  type: "PAN" | "Aadhaar";
  fileName: string;
  fileType: "pdf" | "image";
  uploadedAt: string;
}

const mockDocuments: KYCDocument[] = [
  {
    id: 1,
    type: "PAN",
    fileName: "pan-card.pdf",
    fileType: "pdf",
    uploadedAt: "2024-01-15"
  },
  {
    id: 2,
    type: "Aadhaar",
    fileName: "aadhaar-front.jpg",
    fileType: "image",
    uploadedAt: "2024-01-15"
  }
];

export function KYCDocuments() {
  const [documents, setDocuments] = useState<KYCDocument[]>(mockDocuments);
  const [isUploadDialogOpen, setIsUploadDialogOpen] = useState(false);
  const [uploadType, setUploadType] = useState<"PAN" | "Aadhaar">("PAN");

  const handleUpload = (type: "PAN" | "Aadhaar") => {
    setUploadType(type);
    setIsUploadDialogOpen(true);
  };

  const handleDelete = (id: number) => {
    setDocuments(documents.filter(d => d.id !== id));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const fileType = file.type.includes('pdf') ? 'pdf' : 'image';
      const newDocument: KYCDocument = {
        id: Date.now(),
        type: uploadType,
        fileName: file.name,
        fileType,
        uploadedAt: new Date().toISOString().split('T')[0]
      };
      
      // Remove existing document of the same type
      setDocuments(prev => prev.filter(d => d.type !== uploadType));
      setDocuments(prev => [...prev, newDocument]);
      setIsUploadDialogOpen(false);
    }
  };

  const handleView = (document: KYCDocument) => {
    // Simulate document viewing
    console.log(`Viewing ${document.fileName}`);
  };

  const getDocumentIcon = (fileType: string) => {
    return fileType === 'pdf' ? <FileText className="h-5 w-5 text-red-600" /> : <Image className="h-5 w-5 text-blue-600" />;
  };

  const panDocument = documents.find(d => d.type === "PAN");
  const aadhaarDocument = documents.find(d => d.type === "Aadhaar");

  return (
    <>
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg">KYC Documents</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* PAN Card Section */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">PAN Card</h4>
                <Button 
                  onClick={() => handleUpload("PAN")} 
                  size="sm"
                  variant={panDocument ? "outline" : "default"}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {panDocument ? "Replace" : "Upload"}
                </Button>
              </div>
              
              {panDocument ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    {getDocumentIcon(panDocument.fileType)}
                    <div>
                      <p className="font-medium">{panDocument.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded: {panDocument.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(panDocument)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(panDocument.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No PAN card uploaded</p>
              )}
            </div>

            {/* Aadhaar Card Section */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-medium">Aadhaar Card</h4>
                <Button 
                  onClick={() => handleUpload("Aadhaar")} 
                  size="sm"
                  variant={aadhaarDocument ? "outline" : "default"}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  {aadhaarDocument ? "Replace" : "Uploa
                </Button>
              </div>
              
              {aadhaarDocument ? (
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
                  <div className="flex items-center gap-3">
                    {getDocumentIcon(aadhaarDocument.fileType)}
                    <div>
                      <p className="font-medium">{aadhaarDocument.fileName}</p>
                      <p className="text-sm text-muted-foreground">
                        Uploaded: {aadhaarDocument.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm" onClick={() => handleView(aadhaarDocument)}>
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(aadhaarDocument.id)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-sm">No Aadhaar card uploaded</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <Dialog open={isUploadDialogOpen} onOpenChange={setIsUploadDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload {uploadType} Card</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Select {uploadType} Card (PDF or Image)
              </label>
              <input
                type="file"
                accept=".pdf,.jpg,.jpeg,.png"
                onChange={handleFileUpload}
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>
            
            <div className="text-sm text-muted-foreground">
              <p>Accepted formats: PDF, JPG, JPEG, PNG</p>
              <p>Maximum file size: 10MB</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
