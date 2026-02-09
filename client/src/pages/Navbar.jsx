import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white px-8 py-4 flex justify-between">
      <h1 className="font-bold text-xl">AI Review</h1>

      <div className="space-x-6">
        {token ? (
          <>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/history">History</Link>
            <Link to='/analyze'>Analyze</Link>
            <button onClick={handleLogout} className="text-red-400">
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
