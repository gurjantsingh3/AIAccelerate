'use server';

/**
 * @fileOverview This file defines a Genkit flow for summarizing a resume.
 *
 * - summarizeResume - A function that takes a resume file as input and returns a summary of the skills and experience.
 * - SummarizeResumeInput - The input type for the summarizeResume function.
 * - SummarizeResumeOutput - The return type for the summarizeResume function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {convertDocument} from '@/services/document-converter';

const SummarizeResumeInputSchema = z.object({
  resumeFile: z
    .any()
    .describe('The resume file to summarize. Must be a PDF or DOCX file.'),
});
export type SummarizeResumeInput = z.infer<typeof SummarizeResumeInputSchema>;

const SummarizeResumeOutputSchema = z.object({
  summary: z.string().describe('A summary of the skills and experience in the resume.'),
});
export type SummarizeResumeOutput = z.infer<typeof SummarizeResumeOutputSchema>;

export async function summarizeResume(input: SummarizeResumeInput): Promise<SummarizeResumeOutput> {
  return summarizeResumeFlow(input);
}

const summarizeResumePrompt = ai.definePrompt({
  name: 'summarizeResumePrompt',
  input: {
    schema: z.object({
      resumeText: z.string().describe('The text content of the resume.'),
    }),
  },
  output: {
    schema: z.object({
      summary: z.string().describe('A summary of the skills and experience in the resume.'),
    }),
  },
  prompt: `You are a resume summarization expert. Please provide a concise summary (2-3 sentences) of the following resume, highlighting the key skills and most relevant experiences:

{{{resumeText}}}`, // Added conciseness instruction
});

const summarizeResumeFlow = ai.defineFlow<
  typeof SummarizeResumeInputSchema,
  typeof SummarizeResumeOutputSchema
>(
  {
    name: 'summarizeResumeFlow',
    inputSchema: SummarizeResumeInputSchema,
    outputSchema: SummarizeResumeOutputSchema,
  },
  async input => {
     let markdown: string;
     try {
       const conversionResult = await convertDocument({file: input.resumeFile});
       markdown = conversionResult.markdown;
       console.log('Document converted successfully for summarization.');
     } catch (error) {
       console.error('Error converting document in summarizeResumeFlow:', error);
       // Re-throw a more specific error or handle it as needed
       throw new Error(`Failed to convert resume document: ${error instanceof Error ? error.message : 'Unknown conversion error'}`);
     }

    if (!markdown || markdown.trim().length === 0) {
        console.warn('Converted document text is empty.');
        // Decide how to handle empty text: throw error or return empty summary
        // throw new Error('Could not extract text from the resume file.');
         return { summary: "Could not extract text from the resume file or the file is empty." };
    }

    try {
      const {output} = await summarizeResumePrompt({resumeText: markdown});
       if (!output) {
         throw new Error('AI prompt did not return an output for summarization.');
       }
      console.log('Resume summarized successfully.');
      return output;
    } catch (error) {
       console.error('Error calling summarizeResumePrompt:', error);
       throw new Error(`Failed to generate resume summary: ${error instanceof Error ? error.message : 'Unknown AI error'}`);
    }
  }
);