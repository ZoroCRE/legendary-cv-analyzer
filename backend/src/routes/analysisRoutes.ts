import { Router, Request, Response } from 'express';
import multer from 'multer';
import { analyzeCV } from '../services/atsService';
import { extractTextFromImage } from '../services/ocrService';
import { logger } from '../utils/logger';
import { validateFile } from '../utils/validateFile';

const router = Router();

// Configure Multer for file uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: validateFile,
  limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
});

// CV analysis endpoint
router.post('/analyze', upload.single('cv'), async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const keywords = req.body.keywords ? req.body.keywords.split(',').map((k: string) => k.trim()) : [];
    if (!keywords.length) {
      return res.status(400).json({ error: 'Keywords are required' });
    }

    let result;

    // Handle different file types
    if (req.file.mimetype.startsWith('image/')) {
      // Use OCR for images
      const text = await extractTextFromImage(req.file.buffer);
      result = await analyzeCV(Buffer.from(text), keywords);
      logger.info(`Image CV analyzed successfully for keywords: ${keywords.join(', ')}`);
    } else {
      // Use atsService for PDF
      result = await analyzeCV(req.file.buffer, keywords);
      logger.info(`CV analyzed successfully for keywords: ${keywords.join(', ')}`);
    }

    // Send results to Supabase API
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (supabaseUrl && supabaseKey) {
      const response = await fetch(`${supabaseUrl}/rest/v1/cv_analyses`, {
        method: 'POST',
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: req.body.user_id || 'anonymous', // Adjust based on your needs
          keywords: keywords,
          matches: result.matches,
          score: result.score,
          created_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        logger.warn(`Failed to send to Supabase: ${await response.text()}`);
      }
    }

    return res.json(result);
  } catch (error: any) {
    logger.error(`Error analyzing CV: ${error.message}`);
    res.status(500).json({ error: 'Failed to analyze CV' });
  }
});

export default router;
