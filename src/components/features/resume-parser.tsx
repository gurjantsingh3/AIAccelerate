'use client';

import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, Download, ClipboardCopy, FileScan } from 'lucide-react'; // Added FileScan icon
import { resumeJsonGenerator, type ResumeJsonGeneratorOutput } from '@/ai/flows/resume-json-generator';
import { convertDocument } from '@/services/document-converter';
import { cn } from "@/lib/utils"; // Import cn utility function

export default function ResumeParser() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<ResumeJsonGeneratorOutput | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setSelectedFile(file);
        setError(null);
        setResult(null); // Reset result when a new file is selected
        toast({ title: 'File Selected', description: file.name });
      } else {
        setError('Invalid file type. Please upload a PDF or DOCX file.');
        setSelectedFile(null);
        toast({
          title: 'Invalid File Type',
          description: 'Please upload a PDF or DOCX file.',
          variant: 'destructive',
        });
      }
    }
  };

  const handleParse = async () => {
    if (!selectedFile) {
      setError('Please select a file first.');
      toast({ title: 'No File Selected', description: 'Please select a resume file to parse.', variant: 'destructive' });
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const conversionResponse = await convertDocument({ file: selectedFile });
      const resumeText = conversionResponse.markdown;

      if (!resumeText || resumeText.trim().length === 0) {
        throw new Error('Could not extract text from the resume file.');
      }

      const aiResult = await resumeJsonGenerator({ resumeText });
      setResult(aiResult);
      toast({ title: 'Resume Parsed Successfully', description: 'Extracted information is displayed below.' });

    } catch (err) {
      console.error('Error parsing resume:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to parse resume: ${errorMessage}`);
      toast({ title: 'Parsing Failed', description: `Could not parse the resume. ${errorMessage}`, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };

   const handleDownloadJson = () => {
    if (!result) return;
    const jsonString = JSON.stringify(result, null, 2);
    const blob = new Blob([jsonString], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${selectedFile?.name.split('.')[0] || 'resume'}_parsed.json`; // Default name
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    toast({ title: 'JSON Downloaded', description: 'Parsed data saved.' });
  };

  const handleCopyToClipboard = () => {
    if (!result) return;
    const jsonString = JSON.stringify(result, null, 2);
    navigator.clipboard.writeText(jsonString)
      .then(() => {
        toast({ title: 'Copied to Clipboard', description: 'Parsed JSON data copied.' });
      })
      .catch(err => {
        console.error('Failed to copy:', err);
        toast({ title: 'Copy Failed', description: 'Could not copy data to clipboard.', variant: 'destructive'});
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
        accept=".pdf,.docx"
        className="hidden" // Hide the default input
      />
       {/* Styled Upload Area */}
       <button
         onClick={triggerFileInput}
         disabled={isLoading}
         className={cn(
           "w-full border-2 border-dashed border-muted-foreground/50 rounded-lg p-6 text-center cursor-pointer hover:border-primary transition-colors duration-200",
           selectedFile ? "border-primary/80 bg-primary/5" : "bg-muted/20",
           isLoading ? "cursor-not-allowed opacity-60" : ""
         )}
       >
         <Upload className="mx-auto h-8 w-8 text-muted-foreground group-hover:text-primary mb-2" />
         <p className="text-sm font-medium text-foreground">
           {selectedFile ? selectedFile.name : 'Click or Drag PDF/DOCX Resume'}
         </p>
         <p className="text-xs text-muted-foreground">
           Max file size: 2MB
         </p>
       </button>

       <Button onClick={handleParse} disabled={!selectedFile || isLoading} className="w-full bg-accent-gradient hover:bg-accent-gradient-hover text-accent-foreground py-3 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
         {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <FileScan className="mr-2 h-5 w-5"/>}
         {isLoading ? 'Parsing...' : 'Parse Resume with AI'}
       </Button>

      {error && <p className="text-sm text-destructive text-center px-2">{error}</p>}

      {result && !isLoading && (
        <div className="space-y-3 flex-grow flex flex-col animate-fadeIn"> {/* Added animation */}
          <h3 className="text-lg font-semibold text-primary">Parsed Result (JSON):</h3>
           <Textarea
             readOnly
             value={JSON.stringify(result, null, 2)}
             className="flex-grow min-h-[250px] text-xs bg-muted/40 font-mono border border-border rounded-md shadow-inner" // Enhanced styling
             aria-label="Parsed Resume JSON"
           />
          <div className="flex justify-end gap-2 mt-2"> {/* Align buttons right */}
             <Button onClick={handleCopyToClipboard} variant="outline" size="sm" className="transition-transform hover:scale-105">
              <ClipboardCopy className="mr-2 h-4 w-4" /> Copy JSON
            </Button>
            <Button onClick={handleDownloadJson} variant="secondary" size="sm" className="transition-transform hover:scale-105">
              <Download className="mr-2 h-4 w-4" /> Download JSON
            </Button>
          </div>
        </div>
      )}
      {!result && !isLoading && <div className="flex-grow min-h-[50px]"></div>} {/* Placeholder to maintain height */}

    </div>
  );
}
