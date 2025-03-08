import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import Link from "next/link";

export default function Home() {
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
            <div className="flex items-center space-x-8">
              <nav className="hidden md:flex items-center space-x-8">
                <Link 
                  href="/about" 
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-300 hover:-translate-y-0.5"
                >
                  About
                </Link>
                <Link
                  href="/contact" 
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-300 hover:-translate-y-0.5"
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

      {/* Hero Section */}
      <section className="relative py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="relative z-10 space-y-8">
            <h1 className="text-6xl font-bold tracking-tighter bg-gradient-to-r from-slate-900 to-slate-800 bg-clip-text text-transparent mb-6 animate-float">
              <span className="block mb-4">Mental Wellness</span>
              <span className="text-4xl font-medium bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
                Redefined
              </span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Empowering your journey to mental health with compassionate support and expert resources
            </p>
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 transition-all transform hover:scale-105 shadow-lg hover:shadow-indigo-200/40 px-12 py-6 text-lg"
            >
              <Link href="/signup">Start Your Journey</Link>
            </Button>
          </div>
          {/* <div className="absolute inset-0 opacity-15 [mask-image:radial-gradient(ellipse_at_center,white,transparent)]">
            <div className="absolute inset-0 bg-[url(/grid.svg)] bg-center [mask-image:linear-gradient(180deg,white,transparent)]" />
          </div> */}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gradient-to-b from-white/30 to-transparent">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h3 className="text-4xl font-bold text-center text-slate-900 mb-16">
            <span className="bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Why Choose Shosti?
            </span>
          </h3>
          <div className="grid md:grid-cols-3 gap-12">
            {/* Professional Support */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60 hover:border-indigo-200/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-indigo-100/80 rounded-2xl mb-4 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold text-slate-900 mb-2">Professional Support</h4>
                <p className="text-slate-600 leading-relaxed">
                  Connect with licensed therapists and mental health experts through secure video sessions
                </p>
              </div>
            </Card>

            {/* Guided Resources */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60 hover:border-teal-200/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-teal-100/80 rounded-2xl mb-4 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold text-slate-900 mb-2">Guided Resources</h4>
                <p className="text-slate-600 leading-relaxed">
                  Access curated mindfulness exercises, articles, podcasts and videos
                </p>
              </div>
            </Card>

            {/* 24/7 AI Support */}
            <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60 hover:border-blue-200/80 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="flex flex-col items-center text-center space-y-6">
                <div className="w-20 h-20 bg-blue-100/80 rounded-2xl mb-4 flex items-center justify-center backdrop-blur-sm">
                  <svg className="w-10 h-10 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6.715 6.711a4.5 4.5 0 010 6.364M9.172 9.172l5.656-5.656M14.828 9.172l-5.656 5.656"/>
                  </svg>
                </div>
                <h4 className="text-2xl font-semibold text-slate-900 mb-2">24/7 AI Support</h4>
                <p className="text-slate-600 leading-relaxed">
                  Instant mental health assistance powered by AI, available round-the-clock for immediate guidance
                </p>
              </div>
            </Card>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/80 backdrop-blur-md">
        <Container className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
            <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-teal-500 bg-clip-text text-transparent">
              Shosti
            </Link>
             <div className="mt-8 text-center text-slate-500 text-sm">
            © 2025 Shosti. Compassion in every connection.
          </div>
          </div>
         
        </Container>
      </footer>
    </div>
  );
}