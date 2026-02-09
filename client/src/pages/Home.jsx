// src/components/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 py-24 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            AI-Powered Code Reviews
          </h1>
          <p className="text-lg md:text-xl mb-8">
            Improve your code quality, catch bugs early, and follow best practices automatically.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Get Started
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Automated Reviews</h3>
            <p>Get AI-powered feedback instantly on your code, covering quality, best practices, performance, and security.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Multi-Language Support</h3>
            <p>Supports Java, JavaScript, Python, and more. Write in your preferred language, and our AI understands it.</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <h3 className="text-xl font-semibold mb-2">Analytics Dashboard</h3>
            <p>Track your coding performance, see historical feedback, and improve continuously with visual insights.</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-indigo-600 text-white py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Start Improving Your Code Today
          </h2>
          <p className="mb-8">
            Sign up, submit your code, and let AI provide actionable feedback.
          </p>
          <Link
            to="/dashboard"
            className="inline-block bg-white text-indigo-600 font-semibold py-3 px-6 rounded-lg shadow-md hover:bg-gray-100 transition"
          >
            Go to Dashboard
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-100 py-6 mt-12 text-center text-gray-600">
        © 2026 AI Code Review Platform. All rights reserved.
      </footer>
    </div>
  );
};

export default Home;
