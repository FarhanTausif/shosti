"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  const [step, setStep] = useState(1);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!role || !email) return alert("Please fill all fields");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot/forgot-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, email }),
    });

    const data = await res.json();
    if (res.ok) {
      localStorage.setItem("otp", data.otp);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      setStep(2);
    } else {
      alert(data.error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded">
          <h2 className="text-xl font-bold">Forgot Password</h2>
          <select value={role} onChange={(e) => setRole(e.target.value)} className="p-2 border">
            <option value="">Select Role</option>
            <option value="attendee">Attendee</option>
            <option value="mhp">Mental Health Professional</option>
          </select>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="p-2 border"
            required
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">Submit</button>
        </form>
      ) : (
        <OTPVerification />
      )}
    </div>
  );
}

function OTPVerification() {
  const [otp, setOtp] = useState("");
  const router = useRouter();

  const handleVerify = async (e) => {
    e.preventDefault();
    if (otp !== localStorage.getItem("otp")) return alert("Invalid OTP");

    router.push("/reset-password");
  };

  return (
    <form onSubmit={handleVerify} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded">
      <h2 className="text-xl font-bold">Enter OTP</h2>
      <input
        type="text"
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
        className="p-2 border"
        required
      />
      <button type="submit" className="p-2 bg-green-500 text-white rounded">Verify</button>
    </form>
  );
}
