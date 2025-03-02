import express from 'express';
import MHP from '../models/MHP.js';

const router = express.Router();

// Route to fetch all professionals
router.get('/', async (req, res) => {
  try {
    const professionals = await MHP.find();
    res.status(200).json(professionals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch professionals' });
  }
});

export default router;
