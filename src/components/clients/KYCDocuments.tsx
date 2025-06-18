
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
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">KYC Documents</CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* PAN Card Section */}
            <div className="border rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-medium">PAN Card</h4>
                <Button 
                  onClick={() => handleUpload("PAN")} 
                  size="sm"
                  variant={panDocument ? "outline" : "default"}
                  className="h-6 px-2 text-xs"
                >
                  <Upload className="h-2 w-2 mr-1" />
                  {panDocument ? "Replace" : "Upload"}
                </Button>
              </div>
              
              {panDocument ? (
                <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {getDocumentIcon(panDocument.fileType)}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{panDocument.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {panDocument.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleView(panDocument)} className="h-5 w-5 p-0">
                      <Eye className="h-2.5 w-2.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(panDocument.id)} className="h-5 w-5 p-0">
                      <Trash2 className="h-2.5 w-2.5" />
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-muted-foreground text-xs">No PAN card uploaded</p>
              )}
            </div>

            {/* Aadhaar Card Section */}
            <div className="border rounded-lg p-2">
              <div className="flex items-center justify-between mb-1">
                <h4 className="text-xs font-medium">Aadhaar Card</h4>
                <Button 
                  onClick={() => handleUpload("Aadhaar")} 
                  size="sm"
                  variant={aadhaarDocument ? "outline" : "default"}
                  className="h-6 px-2 text-xs"
                >
                  <Upload className="h-2 w-2 mr-1" />
                  {aadhaarDocument ? "Replace" : "Upload"}
                </Button>
              </div>
              
              {aadhaarDocument ? (
                <div className="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                  <div className="flex items-center gap-1.5 min-w-0 flex-1">
                    {getDocumentIcon(aadhaarDocument.fileType)}
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-medium truncate">{aadhaarDocument.fileName}</p>
                      <p className="text-xs text-muted-foreground">
                        {aadhaarDocument.uploadedAt}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-0.5 flex-shrink-0">
                    <Button variant="ghost" size="sm" onClick={() => handleView(aadhaarDocument)} className="h-5 w-5 p-0">
                      <Eye className="h-2.5 w-2.5" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleDelete(aadhaarDocument.id)} className="h-5 w-5 p-0">
                      <Trash2 className="h-2.5 w-2.5" />
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
