import express from 'express';
import Badge from './models/Badge.js';

const router = express.Router();

router.get('/:userId', async (req, res) => {
  try {
    const badges = await Badge.find({ userId: req.params.userId });
    res.json(badges);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch badges' });
  }
});

export default router;
