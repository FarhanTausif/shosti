import express from 'express';
import { addRecommendations, approveSession, completeSession, getAllSessions, getSessionsByAttendee, getSessionsByProfessional, initiateSessionPayment, requestSession, updatePaymentStatus } from '../controllers/sessionController.js';

const router = express.Router();

router.get('/all', getAllSessions);
router.get('/', getSessionsByProfessional);
router.get('/attendee', getSessionsByAttendee);
router.post('/request', requestSession);
router.post('/approve/:sessionId', approveSession);
router.post('/complete/:sessionId', completeSession);
router.post('/recommendations/:sessionId', addRecommendations);
router.post('/updatePaymentStatus/:sessionId',updatePaymentStatus);
router.post('/initiatePayment', initiateSessionPayment);

export default router;
