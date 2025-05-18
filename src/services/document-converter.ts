/**
 * Converts a document (PDF, DOCX, etc.) to Markdown format.
 */
export interface ConvertDocumentRequest {
  /**
   * The file to convert.
   */
  file: File;
}

export interface ConvertDocumentResponse {
  /**
   * The converted document in Markdown format.
   */
  markdown: string;
}

/**
 * Converts a document to Markdown format.
 * @param request The request to convert the document.
 * @returns The converted document in Markdown format.
 *
 * NOTE: This is a placeholder implementation. In a real application,
 * this function would call a backend API or service capable of
 * performing the actual document conversion.
 */
export async function convertDocument(request: ConvertDocumentRequest): Promise<ConvertDocumentResponse> {
  console.log('Simulating document conversion for:', request.file.name);

  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000)); // Random delay

  // Generate more realistic sample Markdown based on file type (simple example)
  let sampleMarkdown = `# Converted Content: ${request.file.name}\n\n`;
  const fileType = request.file.name.split('.').pop()?.toLowerCase();

  switch (fileType) {
    case 'pdf':
      sampleMarkdown += `## Simulating PDF Conversion

This is simulated Markdown extracted from the PDF file **${request.file.name}**. PDFs can be complex, containing text layers, images, and vector graphics.

### Key Information Extracted

*   **Text Blocks:** Paragraphs are typically extracted well if the PDF has a text layer.
*   *Formatting:* Basic formatting like **bold** and *italics* might be preserved.
*   Lists:
    1.  Numbered lists.
    2.  Can sometimes be identified.
*   Images/Tables: Often skipped or represented poorly in basic text extraction.

\`\`\`javascript
// Code blocks might appear if present in the PDF source
function example() {
  console.log("PDF content simulation");
}
\`\`\`

> Blockquotes could also be part of the structure.

---

*Disclaimer: Actual conversion quality varies greatly.*`;
      break;

    case 'docx':
      sampleMarkdown += `## Simulating DOCX Conversion

This Markdown is a placeholder for the content extracted from the Word document **${request.file.name}**. DOCX files generally convert more reliably to text-based formats like Markdown compared to PDFs.

### Features Often Converted

*   Headings (like this one)
*   Paragraphs with basic formatting (**bold**, *italic*, ~~strikethrough~~).
*   Ordered and unordered lists.
*   Basic tables:

| Feature      | Support Level | Notes                   |
|--------------|---------------|-------------------------|
| Text         | High          | Usually extracted well. |
| Basic Format | Medium        | Bold, italic often OK.  |
| Tables       | Medium        | Simple tables convert.  |
| Images       | Low           | Typically ignored.      |
| Styles       | Low           | Complex styles lost.    |

Links like [Example Link](https://example.com) are often preserved.

*End of simulated DOCX content.*`;
      break;

     case 'txt':
      sampleMarkdown += `## Simulating TXT Conversion

Content from **${request.file.name}**:

Plain text files are straightforward. The content is typically transferred directly into the Markdown output, potentially preserving line breaks.

Example content:
Line 1 of the text file.
Line 2, perhaps with some    spacing.

Special Markdown characters like '*' or '#' in the original text file will appear as literal characters unless further processing is applied.`;
      break;

    default:
      sampleMarkdown += `## Simulating Conversion for Unknown Type

This is simulated Markdown content for the file **${request.file.name}**.

The conversion process would attempt to extract text content and apply basic Markdown formatting based on detected patterns (like line breaks suggesting paragraphs or lists). The success rate depends heavily on the underlying file structure.

*Note: This is generic placeholder text.*`;
  }


  // Simulate a potential error (e.g., 5% chance)
  // if (Math.random() < 0.05) {
  //   throw new Error('Simulated conversion API error: File processing timeout.');
  // }


  return {
    markdown: sampleMarkdown.trim() // Trim any trailing whitespace
  };
}
