import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import LoginImage from "../../assets/Login/LoginImage.svg";
import InputField from "../input/input";
import Button from "../button/button";
import useApi from "../../hooks/useApi";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SignupModal from "./Signup";
import { GiCrossMark } from "react-icons/gi";
import ForgetPasswordModal from "./forgetPassword";

// Validation Schema using Yup
const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export default function LoginModal({ setFormType }) {
  const { request, loading, error } = useApi();
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      const response = await request("POST", "/auth/login", data);
      console.log(response)
      if (response.token) {
        setMessage(response.message);
        navigate("/createprofile");
        localStorage.setItem("token", response.token);
      }
    } catch (err) {
      console.log(error, err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto h-full p-6 bg-white shadow-lg rounded-2xl">
      {/* Header */}
      <div className="text-start mt-12">
        <h2 className="text-3xl font-[500] lg:text-[48px] font-poppins">Login</h2>
        <p className="text-orange-500 text-sm mt-4 font-poppins">Login to access your account</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        {/* Email Field */}
        <InputField
          type="email"
          placeholder="Email"
          {...register("email")}
          className="w-full p-3 text-gray-800 font-inter rounded-[18px] bg-gray-100"
          error={errors.email?.message}
        />

        {/* Password Field */}
        <InputField
          type="password"
          placeholder="Password"
          {...register("password")}
          className="w-full p-3 rounded-[18px] font-inter bg-gray-100"
          error={errors.password?.message}
        />

        {/* Forgot Password */}
        <Button
          type="button"
          className="text-gray-600 text-sm font-medium hover:underline"
          onClick={() => setFormType("forget")}
        >
          Forgot Password?
        </Button>

        {/* Error Message */}
        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {/* Login Button */}
        <Button
          type="submit"
          className="w-full bg-orange-500 text-white text-lg font-semibold py-3 rounded-xl hover:bg-orange-600 transition-all"
        >
          {loading ? "Logging in..." : message ? "Logged in" : "Login"}
        </Button>
      </form>

      {/* Sign Up */}
      <div className="text-center mt-4">
        <p className="text-gray-600 text-sm">
          Don't have an account?{" "}
          <button className="text-orange-500 font-medium hover:underline" onClick={() => setFormType("signup")}>
            Sign Up
          </button>
        </p>
      </div>

      {/* Divider */}
      <div className="flex items-center my-4">
        <div className="border-t border-gray-300 flex-grow"></div>
        <p className="text-gray-600 text-sm mx-3">Or Login with</p>
        <div className="border-t border-gray-300 flex-grow"></div>
      </div>

      {/* Social Login */}
      <div className="flex justify-center gap-3">
        <button className="p-3 border rounded-xl hover:bg-gray-100 transition">
          <FaFacebook size={24} className="text-orange-500" />
        </button>
        <button className="p-3 border rounded-xl hover:bg-gray-100 transition">
          <FaGoogle size={24} className="text-orange-500" />
        </button>
        <button className="p-3 border rounded-xl hover:bg-gray-100 transition">
          <FaApple size={24} className="text-black" />
        </button>
      </div>
    </div>
  );
}

