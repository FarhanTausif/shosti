/* eslint-disable react/no-unescaped-entities */
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
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

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)]">
          <Card className="w-full max-w-md p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
            <div className="space-y-8 text-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Create Account
              </h2>
              <p className="text-slate-600 mb-8">
                Join our community to start your wellness journey
              </p>

              <div className="flex flex-col md:flex-row gap-6 justify-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-indigo-200/40 px-8 py-6 text-lg"
                >
                  <Link href="/signup/attendee">
                    I'm an Attendee
                  </Link>
                </Button>

                <Button
                  asChild
                  className="bg-gradient-to-r from-teal-600 to-indigo-500 text-white hover:from-teal-700 hover:to-indigo-600 transition-all transform hover:scale-[1.02] shadow-lg hover:shadow-teal-200/40 px-8 py-6 text-lg"
                >
                  <Link href="/signup/mhp">
                    I'm a Professional
                  </Link>
                </Button>
              </div>

              <p className="text-center text-sm text-slate-600 mt-8">
                Already have an account?{" "}
                <Link href="/signin" className="text-indigo-600 hover:underline">
                  Sign in
                </Link>
              </p>
            </div>
          </Card>
        </div>
      </main>

      {/* Footer */}
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