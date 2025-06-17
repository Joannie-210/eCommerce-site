import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const LogoutPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all auth/user data
  // If you store JWT/token
  const { user, login } = useAuth();
    localStorage.removeItem("user");       // If you store user object
    sessionStorage.clear();                // Optional, clear session
    // Add more cleanup if needed

    // Redirect after short delay (optional)
    setTimeout(() => {
      navigate("/login");
    }, 1500);
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-md text-center max-w-md w-full">
        <h1 className="text-2xl font-bold text-red-600 mb-2">Logging Out...</h1>
        <p className="text-gray-600">Please wait while we securely log you out.</p>
        <div className="mt-6 animate-spin inline-block w-6 h-6 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    </div>
  );
};

export default LogoutPage;
