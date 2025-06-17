import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { registerUser } from "../services/userService";
import { userSchema } from "../validations/userSchema";
import toast from "react-hot-toast";
import InputField from "../components/InputField";
import { useNavigate } from "react-router-dom";
import Shop from "../assets/shop.jpg";

const UserRegistration = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(userSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      role: "",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const { message, user } = await registerUser(data);
      toast.success(message);
      console.log("Registered User:", user);
  
      localStorage.setItem("user", JSON.stringify(user));
  
      reset();
  
      setTimeout(() => {
        setLoading(false);
        // Redirect to login page after successful registration
        navigate("/login");
      }, 1500);
    } catch (error) {
      const errorMessage = typeof error === "string" ? error : error.message;
      if (errorMessage.includes("Email already in use")) {
        toast.error(
          "This email is already registered. Please use a different email."
        );
      } else {
        toast.error(errorMessage);
      }
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col justify-evenly lg:flex-row md:flex-row h-screen">
  
        <div className="flex bg-[#CC5500]  justify-center items-center  md:block md:w-1/2 h-full">
              <img
                src={Shop}
                alt="Shop"
                className="w-100 h-100 object-contain md:w-full md:h-full rounded-l-xl shadow-lg transition-transform transform hover:scale-[1.01] md:rounded-none"
              />
            </div>
  <div className="w-full mx-auto max-w-lg p-6 md:p-8 bg-white rounded-2xl shadow-lg">
    <h2 className="text-3xl font-bold text-center mb-1">Create an account</h2>
    <p className="text-center mb-6">
      <em>Join LuxeStride now to benefit from our exclusive offers!</em>
    </p>

    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <InputField
        name="fullName"
        control={control}
        label="Full Name"
        error={errors.fullName?.message}
      />
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

      {/* Role selection */}
    
      <button
        type="submit"
        className=" bg-[#CC5500]  cursor-pointer w-full py-3 rounded-lg text-white font-semibold  hover:opacity-70 transition disabled:opacity-50"
        disabled={loading}
      >
        {loading ? "Registering..." : "Register"}
      </button>
    </form>

    <p className="text-sm text-center mt-6">
      Already have an account?{" "}
      <a href="/login" className="text-[#CC5500] font-medium hover:underline">
        Login
      </a>
    </p>
  </div>
</div>

  );
};

export default UserRegistration;
