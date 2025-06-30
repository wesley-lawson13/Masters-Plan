import express from 'express';
import { supabase } from '../../lib/supabaseClient.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { planName, schoolId, majorIds, minorIds, userId } = req.body;

  const { data, error } = await supabase
    .from('UserPlan')
    .insert({
      title: planName,
      schoolId,
      userId,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    })
    .select();

  if (error) return res.status(500).json({ error });

  const userPlan = data[0];

  // Insert into join tables for majors/minors
  for (const majorId of majorIds) {
    await supabase.from('UserPlanMajors').insert({
      userPlanId: userPlan.id,
      majorId,
    });
  }

  for (const minorId of minorIds) {
    await supabase.from('UserPlanMinors').insert({
      userPlanId: userPlan.id,
      minorId,
    });
  }

  res.json({ planId: userPlan.id });
});

export default router;