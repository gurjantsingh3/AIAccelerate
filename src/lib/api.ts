// src/lib/api.ts

export const uploadResumeAndParse = async (file: File): Promise<any> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("https://fastapi.dsbitteam.in/resume/upload-and-parse-json", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to parse resume on server');
    }
  
    return await response.json();
  };


  export interface ResumeUploadResponse {
    markdown_content: string;
  }
  
  export const uploadResumeAndMarkdown = async (file: File): Promise<ResumeUploadResponse> => {
    const formData = new FormData();
    formData.append("file", file);
  
    const response = await fetch("https://fastapi.dsbitteam.in/resume/upload", {
      method: "POST",
      body: formData,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to parse resume on server');
    }
  
    return await response.json();
  };


  export interface ScoreSummary {
    totalScore: number;
    experience: string;
    requiredSkills: string;
    educationAndCertification: string;
    languageProficiency: string;
    reasonForDeduction: string[];
  }
  
  export interface ScoreResponse {
    skillsScore: number;
    educationScore: number;
    totalScore: number;
    summary: ScoreSummary;
  }
  
  export const uploadResumeAndScore = async (
    resumeFile: File,
    jobDescription: string
  ): Promise<ScoreResponse> => {
    const formData = new FormData();
    formData.append('file', resumeFile);
    formData.append('job_description', jobDescription);
  
    const response = await fetch('https://fastapi.dsbitteam.in/resume/upload-and-score', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText || 'Failed to calculate score on server');
    }
  
    return await response.json();
  };
  