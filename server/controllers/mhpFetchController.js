import MHP from '../models/MHP.js';

export const getAllProfessionals = async (req, res) => {
  try {
    const professionals = await MHP.find();
    res.status(200).json(professionals);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch professionals' });
  }
};
