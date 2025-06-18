
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
        <CardHeader className="pb-3">
          <CardTitle className="text-base">KYC Documents</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="space-y-3">
            {/* PAN Card Section */}
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">PAN Card</h4>
                <Button 
                  onClick={() => handleUpload("PAN")} 
                  size="sm"
                  variant={panDocument ? "outline" : "default"}
                >
                  <Upload className="h-3 w-3 mr-1" />
                  {panDocument ? "Replace" : "Upload"}
                </Button>
              </div>
              
              {panDocument ? (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {getDocumentIcon(panDocument.fileType)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{panDocument.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded: {panDocument.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleView(panDocument)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(panDocument.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">No PAN card uploaded</p>
              )}
            </div>

            {/* Aadhaar Card Section */}
            <div className="border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h4 className="text-sm font-medium">Aadhaar Card</h4>
                <Button 
                  onClick={() => handleUpload("Aadhaar")} 
                  size="sm"
                  variant={aadhaarDocument ? "outline" : "default"}
                >
                  <Upload className="h-3 w-3 mr-1" />
                  {aadhaarDocument ? "Replace" : "Upload"}
                </Button>
              </div>
              
              {aadhaarDocument ? (
                <div className="flex items-center justify-between p-2 bg-gray-50 rounded">
                  <div className="flex items-center gap-2 min-w-0 flex-1">
                    {getDocumentIcon(aadhaarDocument.fileType)}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium truncate">{aadhaarDocument.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        Uploaded: {aadhaarDocument.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleView(aadhaarDocument)}>
                      <Eye className="h-3 w-3" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(aadhaarDocument.id)}>
                      <Trash2 className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">No Aadhaar card uploaded</p>
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
