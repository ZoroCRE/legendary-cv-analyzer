import { Router } from 'express';
import { supabase } from '../services/supabaseService';

const router = Router();

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from('keyword_lists')
    .select('*')
    .eq('user_id', userId);
  res.json({ data, error });
});

router.post('/', async (req, res) => {
  const { userId, listName, keywords } = req.body;
  const { data, error } = await supabase
    .from('keyword_lists')
    .insert([{ user_id: userId, list_name: listName, keywords }]);
  res.json({ data, error });
});

export default router;
