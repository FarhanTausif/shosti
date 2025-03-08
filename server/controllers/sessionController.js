import Session from "../models/Session.js";
import { initiatePayment } from "../services/paymentService.js";

// Fetch all sessions
export const getAllSessions = async (req, res) => {
  try {
    const sessions = await Session.find();
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Fetch sessions by professional email
export const getSessionsByProfessional = async (req, res) => {
  const { professional_email } = req.query;
  try {
    const sessions = await Session.find({ professional_email });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Fetch sessions by attendee email
export const getSessionsByAttendee = async (req, res) => {
  const { attendee_email } = req.query;
  try {
    const sessions = await Session.find({ attendee_email });
    res.status(200).json(sessions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch sessions" });
  }
};

// Request a new session
export const requestSession = async (req, res) => {
  const { attendee_email, professional_email, session_type, session_date } = req.body;

  try {
    const newSession = new Session({
      attendee_email,
      professional_email,
      session_type,
      session_date,
    });

    await newSession.save();
    res.status(201).json({ message: "Session requested successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to request session" });
  }
};

// Approve a session
export const approveSession = async (req, res) => {
  const { sessionId } = req.params;
  const { status, scheduled_date } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.session_status = status;
    if (status === "approved") {
      session.session_date = new Date(scheduled_date);
    }
    await session.save();
    res.status(200).json({ message: `Session ${status} successfully!` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update session status" });
  }
};

// Mark a session as complete
export const completeSession = async (req, res) => {
  const { sessionId } = req.params;
  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.session_status = "completed";
    await session.save();

    // console.log("Session after completion: ", session);
    res.status(200).json({ message: "Session marked as completed successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to mark session as complete" });
  }
};

// Add recommendations to a session
export const addRecommendations = async (req, res) => {
  const { sessionId } = req.params;
  const { recommendations } = req.body;

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.recommendations = recommendations;
    await session.save();

    res.status(200).json({ message: "Recommendation added successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to add recommendation" });
  }
};

// Update payment status for a session
export const updatePaymentStatus = async (req, res) => {
  const { sessionId } = req.params;
  const { paymentStatus } = req.body; // Expecting 'completed' or 'pending'

  try {
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    session.payment_status = paymentStatus;
    await session.save();
    res.status(200).json({ message: `Payment status updated to ${paymentStatus}` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update payment status" });
  }
};

// Initiate a payment for a session
export const initiateSessionPayment = async (req, res) => {
  const { sessionId, amount, cus_name, cus_email, cus_address, cus_city, cus_state, cus_postcode, cus_country, cus_phone, ship_name, ship_address, ship_city, ship_state, ship_postcode, ship_country, product_name, product_category, tran_id, redirect_url } = req.body;

  try {
    // Find the session in the database using the sessionId
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

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
    const redirectURL = await initiatePayment(sessionData); // Call the function to initiate the payment
    // console.log("Redirect URL:", redirectURL);
    res.status(200).json({ redirectURL }); // Send the redirect URL to the client
  } catch (error) {
    res.status(500).json({ error: "Failed to initiate payment" });
  }
};
