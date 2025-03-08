import Session from "../models/Session.js";
import Attendee from "../models/Attendee.js";

// Handle successful payment
export const handlePaymentSuccess = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Find the session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Update payment status to 'completed'
    session.payment_status = "completed";
    await session.save();

    // Fetch attendee details
    const { attendee_email } = session;
    const attendee = await Attendee.findOne({ email: attendee_email });

    // Redirect to attendee dashboard
    res.redirect(`${process.env.CLIENT_URL}/dashboard/attendee/${attendee.username}#sessions`);
  } catch (error) {
    console.error("Error updating payment status:", error);
    res.status(500).json({ error: "Error updating payment status" });
  }
};

// Handle payment failure
export const handlePaymentFailure = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Find the session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Fetch attendee details
    const { attendee_email } = session;
    const attendee = await Attendee.findOne({ email: attendee_email });

    // Redirect to attendee dashboard
    res.redirect(`${process.env.CLIENT_URL}/dashboard/attendee/${attendee.username}#sessions`);
  } catch (error) {
    console.error("Error handling payment failure:", error);
    res.status(500).json({ error: "Error handling payment failure" });
  }
};

// Handle payment cancellation
export const handlePaymentCancel = async (req, res) => {
  const { sessionId } = req.params;

  try {
    // Find the session
    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ error: "Session not found" });
    }

    // Fetch attendee details
    const { attendee_email } = session;
    const attendee = await Attendee.findOne({ email: attendee_email });

    // Redirect to attendee dashboard
    res.redirect(`${process.env.CLIENT_URL}/dashboard/attendee/${attendee.username}#sessions`);
  } catch (error) {
    console.error("Error handling payment cancellation:", error);
    res.status(500).json({ error: "Error handling payment cancellation" });
  }
};
