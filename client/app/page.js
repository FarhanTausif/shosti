import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-indigo-50 via-blue-100 to-teal-100 text-gray-800">
      {/* Header */}
      {/* <header className="flex justify-between items-center p-6 bg-indigo-600 text-white shadow-lg">
        <h1 className="text-3xl font-semibold">Shosti</h1>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="/" className="hover:text-indigo-200">Home</a></li>
            <li><a href="/about" className="hover:text-indigo-200">About</a></li>
            <li><a href="/contact" className="hover:text-indigo-200">Contact</a></li>
            <li><a href="/signin" className="hover:text-indigo-200"><Button>Sign in</Button></a></li> 
          </ul>
        </nav>
      </header> */}

      <header className="flex justify-between items-center p-6 bg-indigo-600 text-white shadow-lg">
        <h1 className="text-3xl font-bold tracking-tight">Shosti</h1>
        <nav>
          <ul className="flex items-center gap-8">
            <li>
              <a href="/" className="text-sm font-medium hover:text-indigo-200 transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="text-sm font-medium hover:text-indigo-200 transition-colors">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="text-sm font-medium hover:text-indigo-200 transition-colors">
                Contact
              </a>
            </li>
            <li>
              <Button
                variant="secondary"
                size="sm"
                className="rounded-full px-6 font-semibold hover:bg-indigo-700 hover:text-white transition-all"
                asChild
              >
                <a href="/signin">
                  Sign in
                </a>
              </Button>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-500 to-teal-400 text-white text-center py-20 rounded-b-3xl shadow-2xl">
        <h2 className="text-5xl font-extrabold mb-4">Welcome to Shosti</h2>
        <p className="text-xl mb-6">Your space for mental health support and resources</p>
        <Button variant="outline" className="text-blue-600 bg-white py-2 px-6 rounded-lg shadow-lg hover:bg-blue-100 transform hover:scale-105 transition-all">Get Started</Button>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 text-center">
        <h3 className="text-3xl font-semibold mb-8">Our Features</h3>
        <Container className="grid md:grid-cols-3 gap-8">
          <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-semibold mb-4 text-teal-500">Resources</h4>
            <p>Access a curated library of mental health articles, podcasts, and videos.</p>
          </Card>
          <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-semibold mb-4 text-teal-500">Sessions</h4>
            <p>Book online or offline sessions with experienced mental health professionals.</p>
          </Card>
          <Card className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow">
            <h4 className="text-xl font-semibold mb-4 text-teal-500">Mindfulness</h4>
            <p>Guided mindfulness exercises to help you relax and focus.</p>
          </Card>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-indigo-600 text-white text-center py-6 mt-12 rounded-t-3xl">
        <p>© 2025 Shosti. All rights reserved.</p>
        <div className="space-x-4 mt-4">
          <a href="https://twitter.com" className="hover:text-indigo-200">Twitter</a>
          <a href="https://facebook.com" className="hover:text-indigo-200">Facebook</a>
          <a href="https://instagram.com" className="hover:text-indigo-200">Instagram</a>
        </div>
      </footer>
    </div>
  );
}
