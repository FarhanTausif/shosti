"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function MHPSignup() {
  const [formData, setFormData] = useState({
    username: "",
    bmdcRegNo: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/auth/signup/mhp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (res.ok) alert("Signup successful!");
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("An error occurred.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg space-y-4"
    >
      <h2 className="text-2xl font-semibold mb-4">Mental Health Professional Signup</h2>
      <div>
        <Label htmlFor="username">Username</Label>
        <Input type="text" name="username" onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="bmdcRegNo">BMDC Registration Number</Label>
        <Input type="text" name="bmdcRegNo" onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" name="email" onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input type="password" name="password" onChange={handleChange} required />
      </div>
      <Button type="submit" className="w-full">
        Sign Up
      </Button>
    </form>
  );
}
