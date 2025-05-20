'use client';

import { useState, useRef } from 'react';
import type { ChangeEvent } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Upload, FileText, Briefcase, Merge } from 'lucide-react'; // Added Merge icon
import { summarizeResume, type SummarizeResumeOutput } from '@/ai/flows/resume-summarizer'; // Use the resume summarizer
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'; // Added CardDescription
import { Progress } from '@/components/ui/progress';
import { cn } from "@/lib/utils"; // Import cn
import { uploadResumeAndScore } from '@/lib/api';

// Placeholder for a match score calculation - replace with actual AI logic if available
// For now, we use a simple keyword matching approach as a placeholder.
export interface MatchResult {
  SkillsScore: number;
  EducationScore: number;
  TotalScore: number;
  Summary: {
    TotalScore: number;
    Experience: string;
    RequiredSkills: string;
    EducationAndCertification: string;
    LanguageProficiency: string;
    ReasonForDeduction: string[];
  };
}


export default function JobMatcher() {
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const resumeInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleResumeFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
       if (file.type === 'application/pdf' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        setResumeFile(file);
        setError(null);
        setMatchResult(null); // Reset result
        toast({ title: 'Resume File Selected', description: file.name });
      } else {
        setError('Invalid resume file type. Please upload PDF or DOCX.');
        setResumeFile(null);
         toast({ title: 'Invalid File Type', description: 'Please upload a PDF or DOCX resume.', variant: 'destructive' });
      }
    }
  };

   const triggerResumeInput = () => {
    resumeInputRef.current?.click();
  };

  const handleMatch = async () => {
    if (!resumeFile) {
      setError('Please upload a resume file.');
      toast({ title: 'Missing Resume', description: 'Please upload a resume file.', variant: 'destructive' });
      return;
    }
    if (!jobDescription.trim()) {
      setError('Please enter the job description.');
      toast({ title: 'Missing Job Description', description: 'Please enter the job description.', variant: 'destructive' });
      return;
    }
  
    setIsLoading(true);
    setError(null);
    setMatchResult(null);
  
    try {
      toast({ title: 'Processing...', description: 'Analyzing resume and job description...' });
      const scoreResult = await uploadResumeAndScore(resumeFile, jobDescription);
      console.log(scoreResult)
  
      setMatchResult({
        SkillsScore: scoreResult.SkillsScore,
        EducationScore: scoreResult.EducationScore,
        TotalScore: scoreResult.TotalScore,
        Summary: scoreResult.Summary,
      });
  
      toast({ title: 'Match Calculated', description: 'Resume and job description comparison complete.' });
  
    } catch (err) {
      console.error('Error matching resume and job description:', err);
      const errorMessage = err instanceof Error ? err.message : 'An unknown error occurred.';
      setError(`Failed to calculate match: ${errorMessage}`);
      toast({ title: 'Matching Failed', description: `Could not perform the match. ${errorMessage}`, variant: 'destructive' });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="space-y-5 flex flex-col flex-grow"> {/* Increased spacing */}
       <Input
        type="file"
        ref={resumeInputRef}
        onChange={handleResumeFileChange}
        accept=".pdf,.docx"
        className="hidden"
      />
       {/* Resume Upload Area */}
        <button
         onClick={triggerResumeInput}
         disabled={isLoading}
         className={cn(
           "w-full border-2 border-dashed border-muted-foreground/50 rounded-lg p-4 text-center cursor-pointer hover:border-primary transition-colors duration-200", // Use primary border on hover
           resumeFile ? "border-primary/80 bg-primary/5" : "bg-muted/20",
           isLoading ? "cursor-not-allowed opacity-60" : ""
         )}
       >
         <FileText className="mx-auto h-7 w-7 text-muted-foreground group-hover:text-primary mb-1" />
         <p className="text-sm font-medium text-foreground">
           {resumeFile ? resumeFile.name : 'Upload Resume (PDF/DOCX)'}
         </p>
          <p className="text-xs text-muted-foreground">
           Step 1: Provide the candidate's resume
         </p>
       </button>

      {/* Job Description Input */}
      <div className="relative">
         <Briefcase className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" /> {/* Icon inside textarea */}
         <Textarea
           placeholder="Paste the Job Description here..."
           value={jobDescription}
           onChange={(e) => {
               setJobDescription(e.target.value);
                if (e.target.value.trim()) setError(null); // Clear error when typing
                setMatchResult(null); // Reset result on edit
           }}
           className="min-h-[180px] text-sm pl-10 pt-3 border rounded-lg focus:border-primary" // Padding for icon
           aria-label="Job Description Input"
           disabled={isLoading}
         />
          <p className="text-xs text-muted-foreground text-right mt-1 pr-1">
           Step 2: Paste the job requirements
         </p>
      </div>


      <Button onClick={handleMatch} disabled={!resumeFile || !jobDescription.trim() || isLoading} className="w-full bg-accent-gradient hover:bg-accent-gradient-hover text-accent-foreground py-3 text-base font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-md">
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <Merge className="mr-2 h-5 w-5" />}
        {isLoading ? 'Analyzing...' : 'Calculate Match Score'}
      </Button>

      {error && <p className="text-sm text-destructive text-center px-2">{error}</p>}

      {matchResult && !isLoading && (
        <Card className="mt-4 animate-fadeIn bg-card border shadow-md"> {/* Use card bg */}
           <CardHeader className="pb-3">
             <CardTitle className="text-lg text-primary flex items-center gap-2">
                <Briefcase className="h-5 w-5" /> Match Result
             </CardTitle>
             <CardDescription>AI-generated comparison summary.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-4 pt-2">
  <div>
    <p className="text-sm font-medium text-foreground/80 mb-2">Match Score:</p>
    <div className="flex items-center gap-3">
      <Progress value={matchResult.TotalScore} className="w-full h-3 [&>div]:bg-gradient-to-r [&>div]:from-primary [&>div]:to-accent" />
      <span className="font-semibold text-lg text-primary">{matchResult.TotalScore}%</span>
    </div>
  </div>

  <div className="grid gap-3 bg-muted/10 p-4 rounded-lg">
    <p><strong>Experience:</strong> {matchResult.Summary.Experience}</p>
    <p><strong>Skills:</strong> {matchResult.Summary.RequiredSkills}</p>
    <p><strong>Education:</strong> {matchResult.Summary.EducationAndCertification}</p>
    <p><strong>Language:</strong> {matchResult.Summary.LanguageProficiency}</p>
    {matchResult.Summary.ReasonForDeduction.length > 0 && (
      <div>
        <strong>Reasons for Deduction:</strong>
        <ul className="list-disc ml-5 text-sm">
          {matchResult.Summary.ReasonForDeduction.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      </div>
    )}
  </div>
</CardContent>
        </Card>
      )}
       {!matchResult && !isLoading && <div className="flex-grow min-h-[50px]"></div>} {/* Placeholder */}
    </div>
  );
}

// Update Progress component style inline if needed, or ensure theme handles it
// src/components/ui/progress.tsx adjustment might be needed for gradient:
/*
const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>
>(({ className, value, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-3 w-full overflow-hidden rounded-full bg-secondary", // Adjusted height maybe
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      // Apply gradient here if not done via CSS variables
      className="h-full w-full flex-1 bg-gradient-to-r from-primary to-accent transition-all duration-500 ease-out"
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
*/

// Ensure the progress component in ui/progress.tsx uses the correct classes for the gradient
// Or directly apply style here: style={{ background: 'linear-gradient(to right, hsl(var(--primary)), hsl(var(--accent)))' }}
