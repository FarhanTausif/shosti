/* eslint-disable react/no-unescaped-entities */
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      {/* Reusable Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/60">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="group">
              <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent transition-all duration-300 group-hover:from-indigo-700 group-hover:to-teal-600">
                Shosti
              </h1>
            </Link>
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/about" 
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  href="/contact" 
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  Contact
                </Link>
              </nav>
              <Button 
                asChild
                className="rounded-full px-8 bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-200/40"
              >
                <Link href="/signin">Sign in</Link>
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Main Content */}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            We're here to help! Reach out to us through any of these channels
          </p>
        </div>

        {/* Centered Contact Card */}
        <div className="flex justify-center">
          <div className="w-full max-w-md">
            <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60">
              <div className="space-y-6">
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">Contact Details</h3>
                  <p className="text-slate-600">We're available 24/7 for urgent mental health support</p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-indigo-100/50 rounded-lg">
                      <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Email</p>
                      <a href="mailto:support@shosti.com" className="text-indigo-600 hover:underline">
                        mustakim.mohsin7210@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-teal-100/50 rounded-lg">
                      <svg className="w-6 h-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Emergency Support</p>
                      <a href="tel:+11234567890" className="text-indigo-600 hover:underline">
                        01740790455
                      </a>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-blue-100/50 rounded-lg">
                      <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Office Hours</p>
                      <p className="text-slate-600">Mon-Fri: 9 AM - 7 PM (GMT)</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>

      {/* Reusable Footer */}
      <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-md mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center text-slate-500 text-sm">
            © 2025 Shosti. Compassion in every connection.
          </div>
        </div>
      </footer>
    </div>
  );
}