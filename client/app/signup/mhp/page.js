"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MHPSignup() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    bmdcRegNo: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/signup/mhp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Registration failed");

      setIsSuccess(true);
      setModalMessage("Wait for the approval");
      setIsModalOpen(true);
      setTimeout(() => {
        router.push("/signin");
      }, 2500);
      
    } catch (err) {
      setError(err.message);
      setIsSuccess(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      {/* Approval Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="p-6 rounded-lg shadow-xl bg-green-50 border border-green-200">
            <p className="text-center mb-4 text-green-600">{modalMessage}</p>
            {/* <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Close
            </Button> */}
          </div>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-700 group-hover:to-teal-600">
                Shosti
              </h1>
            </Link>
          </div>
        </nav>
      </header>

      {/* Rest of the component remains exactly the same */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
          <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-6">
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                  Professional Sign Up
                </h2>
                <p className="text-slate-600">Join our network of mental health experts</p>
              </div>

              {error && (
                <div className="py-3 px-4 text-sm border-red-400/50 bg-red-500/10 text-red-200 rounded-lg">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-slate-700">
                      Username
                    </Label>
                    <Input
                      type="text"
                      name="username"
                      onChange={handleChange}
                      required
                      className="bg-white/50 focus:bg-white/70 border-slate-200/60 focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bmdcRegNo" className="text-slate-700">
                      BMDC Registration
                    </Label>
                    <Input
                      type="text"
                      name="bmdcRegNo"
                      onChange={handleChange}
                      required
                      className="bg-white/50 focus:bg-white/70 border-slate-200/60 focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-slate-700">
                      Email
                    </Label>
                    <Input
                      type="email"
                      name="email"
                      onChange={handleChange}
                      required
                      className="bg-white/50 focus:bg-white/70 border-slate-200/60 focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-slate-700">
                      Password
                    </Label>
                    <Input
                      type="password"
                      name="password"
                      onChange={handleChange}
                      required
                      className="bg-white/50 focus:bg-white/70 border-slate-200/60 focus:ring-2 focus:ring-indigo-500/50"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-lg"
                  disabled={isSubmitting || isSuccess}
                >
                  {isSuccess ? "Account Created! 🎉" : isSubmitting ? "Registering..." : "Sign Up"}
                </Button>
              </form>

              <div className="space-y-4">
                <p className="text-center text-sm text-slate-600">
                  Already registered?{" "}
                  <Link href="/signin" className="text-indigo-600 hover:underline">
                    Sign in
                  </Link>
                </p>
                <p className="text-center text-sm text-slate-600">
                  Are you an Attendee?{" "}
                  <Link href="/signup/attendee" className="text-teal-600 hover:underline">
                    Sign up here
                  </Link>
                </p>
              </div>
            </div>
          </Card>
        </div>
      </main>

      <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-500 text-sm">
            © 2025 Shosti. Compassion in every connection.
          </div>
        </div>
      </footer>
    </div>
  );
}