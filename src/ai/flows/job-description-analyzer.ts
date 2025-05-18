'use server';

/**
 * @fileOverview Analyzes a job description to extract required skills and experience.
 *
 * - analyzeJobDescription - A function that analyzes the job description and returns required skills and experience.
 * - AnalyzeJobDescriptionInput - The input type for the analyzeJobDescription function.
 * - AnalyzeJobDescriptionOutput - The return type for the analyzeJobDescription function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const AnalyzeJobDescriptionInputSchema = z.object({
  jobDescription: z
    .string()
    .describe('The job description to analyze.'),
});
export type AnalyzeJobDescriptionInput = z.infer<typeof AnalyzeJobDescriptionInputSchema>;

const AnalyzeJobDescriptionOutputSchema = z.object({
  requiredSkills: z.array(z.string()).describe('The list of required skills for the job.'),
  requiredExperience: z.string().describe('The required experience for the job.'),
  summary: z.string().describe('A short summary of the job description analysis.'),
});
export type AnalyzeJobDescriptionOutput = z.infer<typeof AnalyzeJobDescriptionOutputSchema>;

export async function analyzeJobDescription(input: AnalyzeJobDescriptionInput): Promise<AnalyzeJobDescriptionOutput> {
  return analyzeJobDescriptionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'analyzeJobDescriptionPrompt',
  input: {
    schema: z.object({
      jobDescription: z
        .string()
        .describe('The job description to analyze.'),
    }),
  },
  output: {
    schema: z.object({
      requiredSkills: z.array(z.string()).describe('The list of required skills for the job.'),
      requiredExperience: z.string().describe('The required experience for the job.'),
      summary: z.string().describe('A short summary of the job description analysis.'),
    }),
  },
  prompt: `You are an AI expert in analyzing job descriptions. Based on the job description provided, extract the required skills, required experience, and provide a short summary of the analysis.

Job Description: {{{jobDescription}}}

Output the required skills as a JSON array of strings, the required experience as a string, and the summary as a string.
`,
});

const analyzeJobDescriptionFlow = ai.defineFlow<
  typeof AnalyzeJobDescriptionInputSchema,
  typeof AnalyzeJobDescriptionOutputSchema
>(
  {
    name: 'analyzeJobDescriptionFlow',
    inputSchema: AnalyzeJobDescriptionInputSchema,
    outputSchema: AnalyzeJobDescriptionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
