// src/components/Dashboard.jsx
import React, { useEffect, useState } from "react";
import { getMyReviews, getAnalytics } from "../api/review.api";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const Analyze = () => {
  const [reviews, setReviews] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [expandedReview, setExpandedReview] = useState(null);

  useEffect(() => {
    // Fetch reviews
    const fetchReviews = async () => {
      try {
        const res = await getMyReviews();
        if (res.success) setReviews(res.reviews);
      } catch (err) {
        console.error(err);
      }
    };

    // Fetch analytics
    const fetchAnalytics = async () => {
      try {
        const res = await getAnalytics();
        if (res.success) setAnalytics(res.analytics);
      } catch (err) {
        console.error(err);
      }
    };

    fetchReviews();
    fetchAnalytics();
  }, []);

  const toggleReview = (id) => {
    setExpandedReview(expandedReview === id ? null : id);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans text-gray-800">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Code Review Dashboard</h1>
        <p className="text-gray-600">Analyze your code reviews and track your performance over time.</p>
      </header>

      {/* Analytics Card */}
      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Analytics</h2>
        {analytics ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-gray-500">Total Reviews</p>
              <p className="text-2xl font-bold">{analytics.totalReviews}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-gray-500">Average Score</p>
              <p className="text-2xl font-bold">{analytics.averageScore.toFixed(2)}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-gray-500">Highest Score</p>
              <p className="text-2xl font-bold">{analytics.highestScore}</p>
            </div>
            <div className="bg-white p-4 rounded-xl shadow-md">
              <p className="text-gray-500">Lowest Score</p>
              <p className="text-2xl font-bold">{analytics.lowestScore}</p>
            </div>
          </div>
        ) : (
          <p className="text-gray-500">Loading analytics...</p>
        )}
      </section>

      {/* Reviews Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">My Reviews</h2>
        {reviews.length > 0 ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div
                key={review.id}
                className="bg-white rounded-xl shadow-md p-4 transition-all hover:shadow-xl"
              >
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() => toggleReview(review.id)}
                >
                  <div>
                    <p className="font-semibold text-lg">{review.language}</p>
                    <p className="text-gray-500">Score: {review.score}</p>
                  </div>
                  <div className="text-gray-400">
                    {expandedReview === review.id ? <FaChevronUp /> : <FaChevronDown />}
                  </div>
                </div>

                {expandedReview === review.id && (
                  <div className="mt-4 border-t pt-4 prose max-w-none">
                    <div dangerouslySetInnerHTML={{ __html: review.aiFeedback.replace(/\n/g, "<br/>") }} />
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </section>
    </div>
  );
};

export default Analyze;
