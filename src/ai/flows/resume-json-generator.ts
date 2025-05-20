'use server';

/**
 * @fileOverview A resume JSON generator AI agent.
 *
 * - resumeJsonGenerator - A function that handles the resume JSON generation process.
 * - ResumeJsonGeneratorInput - The input type for the resumeJsonGenerator function.
 * - ResumeJsonGeneratorOutput - The return type for the resumeJsonGenerator function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';

const ResumeJsonGeneratorInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume to be parsed.'),
});
export type ResumeJsonGeneratorInput = z.infer<typeof ResumeJsonGeneratorInputSchema>;

const ResumeJsonGeneratorOutputSchema = z.object({
  name: z.string().describe('The name of the candidate.'),
  email: z.string().email().describe('The email address of the candidate.'),
  education: z.array(z.string()).describe('The education history of the candidate.'),
  experience: z.array(z.string()).describe('The work experience of the candidate.'),
  skills: z.array(z.string()).describe('The skills of the candidate.'),
});
export type ResumeJsonGeneratorOutput = z.infer<typeof ResumeJsonGeneratorOutputSchema>;

// export async function resumeJsonGenerator(input: ResumeJsonGeneratorInput): Promise<ResumeJsonGeneratorOutput> {
//   return resumeJsonGeneratorFlow(input);
// }

// const resumeJsonGeneratorPrompt = ai.definePrompt({
//   name: 'resumeJsonGeneratorPrompt',
//   input: {
//     schema: z.object({
//       resumeText: z.string().describe('The text content of the resume to be parsed.'),
//     }),
//   },
//   output: {
//     schema: z.object({
//       name: z.string().describe('The name of the candidate.'),
//       email: z.string().email().describe('The email address of the candidate.'),
//       education: z.array(z.string()).describe('The education history of the candidate.'),
//       experience: z.array(z.string()).describe('The work experience of the candidate.'),
//       skills: z.array(z.string()).describe('The skills of the candidate.'),
//     }),
//   },
//   prompt: `You are an expert AI resume parser. Given the text of a resume, extract the following information into a JSON format. Correct any errors or fill in any gaps in the extracted information to ensure the highest quality data.

// Resume Text:
// {{resumeText}}`,
// });

// const resumeJsonGeneratorFlow = ai.defineFlow<
//   typeof ResumeJsonGeneratorInputSchema,
//   typeof ResumeJsonGeneratorOutputSchema
// >(
//   {
//     name: 'resumeJsonGeneratorFlow',
//     inputSchema: ResumeJsonGeneratorInputSchema,
//     outputSchema: ResumeJsonGeneratorOutputSchema,
//   },
//   async input => {
//     const {output} = await resumeJsonGeneratorPrompt(input);
//     return output!;
//   }
// );
