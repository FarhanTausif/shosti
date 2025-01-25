import Link from "next/link";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-slate-50 via-blue-50 to-teal-75">
      <h1 className="text-4xl font-bold mb-8">Sign Up</h1>
      <div className="flex space-x-6">
        <Link href="/signup/attendee">
          <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg shadow-lg hover:bg-indigo-700">
            I'm an Attendee
          </button>
        </Link>
        <Link href="/signup/mhp">
          <button className="px-6 py-3 bg-teal-600 text-white rounded-lg shadow-lg hover:bg-teal-700">
            I'm a Mental Health Professional
          </button>
        </Link>
      </div>
    </div>
  );
}
