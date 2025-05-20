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
  