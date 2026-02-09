import { useState } from "react";
import API from "../api/axios";
import CodeEditor from "../components/CodeEditor";

export default function Dashboard() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState(null);

  const handleReview = async () => {
    const { data } = await API.post("/review", {
      code,
      language: "javascript",
    });

    setResult(data.review);
  };

  return (
    <div className="p-10 bg-gray-900 min-h-screen text-white">
      <CodeEditor code={code} setCode={setCode} />

      <button
        onClick={handleReview}
        className="mt-4 bg-green-600 px-6 py-2 rounded"
      >
        Review Code
      </button>

      {result && (
        <div className="mt-6 bg-gray-800 p-6 rounded-xl">
          <h2>Score: {result.score}</h2>
          <pre className="whitespace-pre-wrap">
            {result.aiFeedback}
          </pre>
        </div>
      )}
    </div>
  );
}
