import express from 'express';
import Session from '../models/Session.js';
import { initiatePayment } from '../services/paymentService.js';

const router = express.Router();

router.get('/all', async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

router.get('/', async (req, res) => {
  const { professional_email } = req.query;
  try {
    const sessions = await Session.find({ professional_email });
    // console.log("sessions: ", sessions);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

router.get('/attendee', async (req, res) => {
  const { attendee_email } = req.query;
  try {
    const sessions = await Session.find({ attendee_email });
    // console.log("sessions: ", sessions);
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch sessions' });
  }
});

router.post('/request', async (req, res) => {
  const { attendee_email, professional_email, session_type, session_date } = req.body;

  try {
    const newSession = new Session({
      attendee_email,
      professional_email,
      session_type,
      session_date,
    });

    await newSession.save();
    res.status(201).json({ message: 'Session requested successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to request session' });
  }
});

router.post('/approve/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const { status, scheduled_date } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.session_status = status;
    if (status === "approved") {
      session.session_date = new Date(scheduled_date);
    }
    await session.save();
    res.status(200).json({ message: `Session ${status} successfully!` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update session status' });
  }
});

router.post('/complete/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.session_status = 'completed';
    await session.save();
    
    console.log("Session after completion: ", session);
    res.status(200).json({ message: 'Session marked as completed successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to mark session as complete' });
  }
});

router.post('/recommendations/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const { recommendations } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.recommendations = recommendations;
    await session.save();
    
    res.status(200).json({ message: 'Recommendation added successfully!' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to add recommendation' });
  }
});

router.post('/updatePaymentStatus/:sessionId', async (req, res) => {
  const { sessionId } = req.params;
  const { paymentStatus } = req.body;  // Expecting 'completed' or 'pending'

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: 'Session not found' });
    }

    session.payment_status = paymentStatus;
    await session.save();
    res.status(200).json({ message: `Payment status updated to ${paymentStatus}` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update payment status' });
  }
});

// Route to initiate payment
router.post('/initiatePayment', async (req, res) => {
  const { sessionId, amount, cus_name, cus_email, cus_address, cus_city, cus_state, cus_postcode, cus_country, cus_phone, ship_name, ship_address, ship_city, ship_state, ship_postcode, ship_country, product_name, product_category, tran_id, redirect_url } = req.body;

  // Find the session in the database using the sessionId
  const session = await Session.findById(sessionId);
  console.log("Session: ", session);
  if (!session) {
    return res.status(404).json({ error: 'Session not found' });
  }

  try {
    // Prepare the session data
    const sessionData = {
      amount,
      tran_id,
      product_name,
      product_category,
      cus_name,
      cus_email,
      cus_address,
      cus_city,
      cus_state,
      cus_postcode,
      cus_country,
      cus_phone,
      ship_name,
      ship_address,
      ship_city,
      ship_state,
      ship_postcode,
      ship_country,
      redirect_url,
      sessionId,
    };

    // Call the payment service to initiate payment
    const redirectURL = await initiatePayment(sessionData);  // Call the function to initiate the payment
    console.log("Redirect URL:", redirectURL);
    res.status(200).json({ redirectURL });  // Send the redirect URL to the client
  } catch (error) {
    res.status(500).json({ error: 'Failed to initiate payment' });
  }
});

export default router;
