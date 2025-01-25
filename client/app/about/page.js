import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

export default function AboutPage() {
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
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700 transition-colors duration-300"
                >
                  About
                </Link>
                <Link
                  href="/contact" 
                  className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-300"
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
              About Shosti
            </span>
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Revolutionizing mental health support through technology and compassion
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Our Mission</h3>
            <p className="text-slate-600 leading-relaxed">
              At Shosti, we believe everyone deserves accessible mental health support. 
              Our platform bridges the gap between professional care and immediate needs, 
              offering a holistic approach to mental wellness through innovative technology 
              and human-centered design.
            </p>
          </Card>

          <Card className="p-8 bg-white/90 backdrop-blur-sm border border-slate-200/60">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">Our Team</h3>
            <p className="text-slate-600 leading-relaxed">
              A diverse team of mental health professionals, technologists, and designers 
              working together to create meaningful solutions. We combine clinical expertise 
              with cutting-edge AI to deliver personalized support when you need it most.
            </p>
          </Card>
        </div>

        <div className="mt-16 text-center">
          <Button
            size="lg"
            className="bg-gradient-to-r from-indigo-600 to-teal-500 text-white hover:from-indigo-700 hover:to-teal-600 px-8 py-4 text-lg"
            asChild
          >
            <Link href="/">Get in Touch</Link>
          </Button>
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