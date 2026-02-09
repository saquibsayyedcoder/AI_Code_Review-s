import { useState } from "react";
import { loginUser } from "../api/auth.api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

 const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await loginUser(form);

    localStorage.setItem("token", data.token);

    navigate("/dashboard");
  } catch (error) {
    console.error(error);
  }
};


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900 text-white">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl mb-6">Login</h2>

        <input
          placeholder="Email"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          onChange={(e) =>
            setForm({ ...form, email: e.target.value })
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-4 bg-gray-700 rounded"
          onChange={(e) =>
            setForm({ ...form, password: e.target.value })
          }
        />

        <button className="bg-blue-600 w-full py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
