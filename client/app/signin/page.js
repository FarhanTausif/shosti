"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function SignInPage() {
    const [formData, setFormData] = useState({ email: "", password: "" });
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalMessage, setModalMessage] = useState("");
    const [isError, setIsError] = useState(false);
    const router = useRouter();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const attendeeRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/attendees/signin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (attendeeRes.ok) {
                const data = await attendeeRes.json();
                localStorage.setItem("userType", "attendee");
                localStorage.setItem("token", data.token);
                localStorage.setItem("userName", data.userName);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("email", data.email);
                router.push(`/dashboard/attendee/${data.userName}`);
                return;
            }

            const mhpRes = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/mhps/signin`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formData),
                }
            );

            if (mhpRes.ok) {
                const data = await mhpRes.json();
                localStorage.setItem("userType", "mhp");
                localStorage.setItem("token", data.token);
                localStorage.setItem("userId", data.userId);
                localStorage.setItem("userName", data.userName);
                localStorage.setItem("email", data.email);

                const status = data.status;
                if (status === "pending") {
                    setModalMessage("You can't sign in now. Wait for MHA Approval!");
                    setIsError(true);
                    setIsModalOpen(true);
                } else if (status === "rejected") {
                    setModalMessage("Your registration has been rejected!");
                    setIsError(true);
                    setIsModalOpen(true);
                } else if (status === "approved") {
                    router.push(`/dashboard/mhp/${data.userName}`);
                } else {
                    setModalMessage("Unknown account status");
                    setIsError(true);
                    setIsModalOpen(true);
                }
                return;
            }

            const mhpError = await mhpRes.json();
            setError(mhpError.message || "Invalid credentials");

        } catch (err) {
            console.error(err);
            setError("Something went wrong. Please try again.");
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className={`p-6 rounded-lg shadow-xl ${
                        isError ? "bg-red-50 border border-red-200" : "bg-green-50 border border-green-200"
                    }`}>
                        <p className={`text-center mb-4 ${
                            isError ? "text-red-600" : "text-green-600"
                        }`}>{modalMessage}</p>
                        <Button
                            onClick={() => setIsModalOpen(false)}
                            className={`w-full ${
                                isError 
                                    ? "bg-red-600 hover:bg-red-700" 
                                    : "bg-green-600 hover:bg-green-700"
                            }`}
                        >
                            Close
                        </Button>
                    </div>
                </div>
            )}

            {/* Rest of the component remains unchanged */}
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

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
                    <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
                        <div className="space-y-6">
                            <div className="text-center space-y-2">
                                <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                                    Welcome Back
                                </h2>
                                <p className="text-slate-600">Sign in to continue your wellness journey</p>
                            </div>

                            {error && (
                                <div className="py-3 px-4 text-sm border-red-400/50 bg-red-500/10 text-red-200 rounded-lg">
                                    {error}
                                </div>
                            )}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="email" className="text-slate-700">Email</Label>
                                        <Input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            className="bg-white/50 focus:bg-white/70 border-slate-200/60 focus:ring-2 focus:ring-indigo-500/50"
                                            required
                                        />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="password" className="text-slate-700">Password</Label>
                                        <Input
                                            type="password"
                                            name="password"
                                            onChange={handleChange}
                                            className="bg-white/50 focus:bg-white/70 border-slate-200/60 focus:ring-2 focus:ring-indigo-500/50"
                                            required
                                        />
                                    </div>
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-200/40"
                                >
                                    Sign In
                                </Button>
                            </form>
                            <button onClick={() => router.push('/forgot-password')} className="text-indigo-600 hover:underline text-sm">
                                Forgot Password?      
                            </button>
                            <p className="text-center text-sm text-slate-600">
                                Do not have an account?{" "}
                                <Link href="/signup" className="text-indigo-600 hover:underline">
                                    Create account
                                </Link>
                            </p>
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