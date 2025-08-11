import { Router } from 'express';
import { supabase } from '../services/supabaseService';

const router = Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const { data, error } = await supabase
    .from('cv_results')
    .select('*')
    .eq('user_id', userId);

  res.json({ data, error });
});

export default router;
