import nlp from 'compromise';
  import pdfParse from 'pdf-parse';

  export async function analyzeCV(fileBuffer: Buffer, keywords: string[]): Promise<{ matches: { keyword: string, count: number }[], score: number }> {
    try {
      let text = '';

      // Extract text from PDF
      if (fileBuffer) {
        const data = await pdfParse(fileBuffer);
        text = data.text.toLowerCase();
      }

      // Analyze text using compromise
      const doc = nlp(text);
      const matches = keywords.map(keyword => {
        const count = doc.match(keyword.toLowerCase()).length;
        return { keyword, count };
      });

      // Calculate score
      const totalMatches = matches.reduce((sum, match) => sum + match.count, 0);
      const score = Math.min((totalMatches / keywords.length) * 100, 100);

      return { matches, score };
    } catch (error: any) {
      throw new Error(`Failed to analyze CV: ${error.message}`);
    }
  }
