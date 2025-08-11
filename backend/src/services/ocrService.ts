import { ImageAnnotatorClient } from '@google-cloud/vision';

  export async function extractTextFromImage(buffer: Buffer): Promise<string> {
    try {
      const client = new ImageAnnotatorClient({
        key: process.env.GEMINI_API_KEY,
      });

      const [result] = await client.textDetection({
        image: { content: buffer.toString('base64') },
      });

      const text = result.textAnnotations?.[0]?.description || '';
      return text.toLowerCase();
    } catch (error: any) {
      throw new Error(`OCR processing failed: ${error.message}`);
    }
  }