import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useEffect } from "react";
import { loginUser } from "../services/userService";
import { loginSchema } from "../validations/userSchema";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import { useNavigate, Link } from "react-router-dom";
import "../components/styles/UserRegistrationForm.css";
import { useAuth } from "../contexts/AuthContext";
import Shop from "../assets/shop.jpg";

const Login = () => {
  const navigate = useNavigate();
  const { user, login } = useAuth();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? "/admin-dashboard" : "/userdashboard");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { message, token, user } = await loginUser(data);
      toast.success(message);
      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify(user));
      login(user);
      reset();
      navigate(user.isAdmin ? "/admin-dashboard" : "/userdashboard");
    } catch (error) {
      toast.error(typeof error === "string" ? error : error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left section with image */}
      <div className="flex bg-[#CC5500]  justify-center items-center  md:block md:w-1/2 h-full">
        <img
          src={Shop}
          alt="Shop"
          className="w-100 h-100 object-contain md:w-full md:h-full rounded-l-xl shadow-lg transition-transform transform md:rounded-none"
        />
      </div>

      {/* Right section with form */}
      <div className="flex flex-col justify-center items-center md:w-1/2 w-full px-6 bg-gray-50">
        <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg transition-transform transform hover:scale-[1.01]">
          <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <InputField
              name="email"
              control={control}
              label="Email"
              error={errors.email?.message}
            />
            <InputField
              name="password"
              control={control}
              label="Password"
              type="password"
              error={errors.password?.message}
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 bg-[#CC5500] text-white font-semibold rounded-lg hover:opacity-70 transition-all duration-200 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <p className="text-center text-sm text-gray-600 mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/register")}
                className="text-[#CC5500] cursor-pointer hover:underline"
              >
                <Link to="/register">
                Register here
                </Link>
              </span>
              </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
