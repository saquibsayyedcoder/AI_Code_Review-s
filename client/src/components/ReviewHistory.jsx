import { useEffect, useState } from "react";
import API from "../api/axios";

export default function ReviewHistory() {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      const { data } = await API.get("/review/my-reviews");
      setReviews(data.reviews);
    };

    fetchReviews();
  }, []);

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <h1 className="text-2xl mb-6">Review History</h1>

      {reviews.map((r) => (
        <div key={r.id} className="bg-gray-800 p-4 mb-4 rounded">
          <p>Score: {r.score}</p>
          <p>Language: {r.language}</p>
        </div>
      ))}
    </div>
  );
}
