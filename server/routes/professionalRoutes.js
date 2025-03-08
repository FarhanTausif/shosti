import express from 'express';
import { getAllProfessionals } from '../controllers/mhpFetchController.js';

const router = express.Router();
// Route to fetch all professionals
router.get('/',getAllProfessionals);

export default router;
