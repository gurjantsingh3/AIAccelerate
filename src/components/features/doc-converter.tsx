'use client';

import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Download, ClipboardCopy, FileText } from 'lucide-react'; // Re-added FileText
import { convertDocument, type ConvertDocumentResponse } from '@/services/document-converter';
import { cn } from "@/lib/utils"; // Import cn

export default function DocConverter() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ConvertDocumentResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Allow any file type for conversion, let the service handle validation if needed
      setSelectedFile(file);
      setError(null);
      setResult(null); // Reset result
      toast({ title: 'File Selected', description: file.name });
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      toast({ title: 'No File Selected', description: 'Please select a document to convert.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const conversionResult = await convertDocument({ file: selectedFile });
      setResult(conversionResult);
      toast({ title: 'Conversion Successful', description: 'Document converted to Markdown.' });
    } catch (err) {
      console.error('Error converting document:', err);
       const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred during conversion.';
      setError(`Failed to convert document: ${errorMessage}`);
      toast({ title: 'Conversion Failed', description: `Could not convert the document. ${errorMessage}`, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownloadMarkdown = () => {
    if (!result || !result.markdown) return; // Check if markdown exists
    const blob = new Blob([result.markdown], { type: 'text/markdown;charset=utf-8' }); // Specify charset
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    // Sanitize filename: replace non-alphanumeric chars (except dot) with underscore
    const safeFilename = (selectedFile?.name || 'document').replace(/[^a-z0-9.]/gi, '_').replace(/_+/g, '_');
    link.download = `${safeFilename.split('.')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
     toast({ title: 'Markdown Downloaded', description: 'Converted file saved.' });
  };

   const handleCopyToClipboard = () => {
    if (!result || !result.markdown) return; // Check if markdown exists
    navigator.clipboard.writeText(result.markdown)
      .then(() => {
        toast({ title: 'Copied to Clipboard', description: 'Markdown content copied.' });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({ title: 'Copy Failed', description: 'Could not copy Markdown to clipboard.', variant: 'destructive'});
      });
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-5 flex flex-col flex-grow"> {/* Increased spacing */}
       <Input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        // Consider adding specific accept types if needed, e.g., ".pdf,.docx,.txt"
        className="hidden"
      />
       {/* Styled Upload Area */}
        <button
         onClick={triggerFileInput}
         disabled={isLoading}
         className={cn(
           "w-full border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:border-accent transition-colors duration-200",
           selectedFile ? "border-accent/80 bg-accent/5" : "bg-muted/20",
           isLoading ? "cursor-not-allowed opacity-60" : ""
         )}
       >
         <Upload className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-accent mb-2" />
         <p className="text-sm font-medium text-foreground">
           {selectedFile ? selectedFile.name : 'Click or Drag Document File'}
         </p>
         <p className="text-xs text-muted-foreground">
           Supports PDF, DOCX, TXT, etc.
         </p>
       </button>


      <Button onClick={handleConvert} disabled={!selectedFile || isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground py-3 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md"> {/* Primary color button */}
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileText className="mr-2 h-5 w-5"/>}
        {isLoading ? 'Converting...' : 'Convert to Markdown'}
      </Button>

      {error && <p className="text-sm text-destructive text-center px-2">{error}</p>}

      {result && !isLoading && (
        <div className="space-y-3 flex-grow flex flex-col animate-fadeIn"> {/* Added animation */}
           <h3 className="text-lg font-semibold text-primary">Converted Markdown:</h3>
           <Textarea
            readOnly
            value={result.markdown}
             className="flex-grow min-h-[250px] text-sm bg-muted/40 font-mono border border-border rounded-md shadow-inner" // Enhanced styling
            aria-label="Converted Markdown"
          />
          <div className="flex justify-end gap-2 mt-2"> {/* Align buttons right */}
            <Button onClick={handleCopyToClipboard} variant="outline" size="sm" className="transition-transform hover:scale-105">
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copy Markdown
            </Button>
            <Button onClick={handleDownloadMarkdown} variant="secondary" size="sm" className="transition-transform hover:scale-105">
              <Download className="mr-2 h-4 w-4" /> Download .md
            </Button>
          </div>
        </div>
      )}
       {!result && !isLoading && <div className="flex-grow min-h-[50px]"></div>} {/* Placeholder */}
    </div>
  );
}
