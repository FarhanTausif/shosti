import express from 'express';
import Session from '../models/Session.js';

const router = express.Router();
// In your sessions routes file (e.g., routes/session.js)

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
    console.log("sessions: ", sessions);
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

// router.post('/recommendations/:sessionId', async (req, res) => {
//   const { sessionId } = req.params;
//   const { recommendations } = req.body;

//   try {
//     const session = await Session.findById(sessionId);
//     if (session) {
//       session.recommendations = recommendations;
//       session.session_status = 'completed';
//       await session.save();
//       res.status(200).json({ message: 'Recommendations added successfully!' });
//     } else {
//       res.status(404).json({ error: 'Session not found' });
//     }
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to add recommendations' });
//   }
// });

export default router;
