import express from 'express';
import { supabase } from '../../lib/supabaseClient.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const { data, error } = await supabase.from('Major').select('id, name');
  if (error) return res.status(500).json({ error });
  res.json(data);
});

export default router;