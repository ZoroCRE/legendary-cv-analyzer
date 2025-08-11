import { Router, Request, Response } from 'express';

  const router = Router();

  router.get('/:userId', async (req: Request, res: Response) => {
    const { userId } = req.params;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      return res.status(500).json({ error: 'Supabase configuration missing' });
    }

    const response = await fetch(`${supabaseUrl}/rest/v1/cv_results?user_id=eq.${userId}`, {
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      return res.status(response.status).json({ error: 'Failed to fetch results' });
    }

    const data = await response.json();
    res.json({ data, error: null });
  });

  export default router;
