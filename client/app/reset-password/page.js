"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const router = useRouter();

  const handleReset = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem("email");
    const role = localStorage.getItem("role");

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/forgot/reset-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role, email, newPassword }),
    });

    if (res.ok) {
      alert("Password updated");
      localStorage.removeItem("otp");
      localStorage.removeItem("email");
      localStorage.removeItem("role");
      router.push("/signin");
    } else {
      alert("Error updating password");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <form onSubmit={handleReset} className="flex flex-col gap-4 p-6 bg-white shadow-md rounded">
        <h2 className="text-xl font-bold">Reset Password</h2>
        <input
          type="password"
          placeholder="Enter new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="p-2 border"
          required
        />
        <button type="submit" className="p-2 bg-blue-500 text-white rounded">Save Password</button>
      </form>
    </div>
  );
}
