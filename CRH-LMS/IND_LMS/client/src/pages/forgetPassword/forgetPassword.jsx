import React, { useState,useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import forgetPassword from "../../assets/forgetPassword/forgotPassword.svg";
import InputField from "../../components/input/input";
import useApi from "../../hooks/useApi";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// Validation Schema using Yup
const schema = yup.object().shape({
   password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
});

const ForgetPassword = () => {
    const { request, loading, error } = useApi();
    const { id } = useParams();

    console.log(id);

    const navigate = useNavigate();

    const [count,setCount] = useState(5)


    const [message,setMessage] = useState('')
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async(data) => {

    const response = await request("POST", `/auth/reset-password/${id}`, data);
    if (response) {
      setMessage(`Password reset successfully.`);
      
      // Start countdown timer
      setCount(5);
    }

  }

    useEffect(() => {
      if (count > 0 && message) {
        const timer = setInterval(() => {
          setCount((prevCount) => {
            if (prevCount === 1) {
              clearInterval(timer);
              navigate("/profile"); // Redirect when count reaches 0
            }
            return prevCount - 1;
          });
        }, 1000);
        return () => clearInterval(timer);
      }
    }, [count, message, navigate]);

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4 backdrop-blur-md">
      <div className="bg-white w-[90%] md:w-[60%] lg:w-[50%] flex shadow-lg rounded-3xl max-w-[900px] h-auto">
        
        {/* Left Image Section */}
        <div className="md:flex items-center justify-center bg-gray-100 p-6 hidden w-1/2 rounded-l-3xl">
          <img src={forgetPassword} alt="Forget Password Illustration" className="object-cover" />
        </div>

        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-6 relative">

          {/* Header */}
          <h2 className="text-2xl font-semibold text-gray-700 text-center">Forget Password</h2>
          <p className="text-gray-500 text-center mt-2">
            Don't worry, happens to all of us. Enter your email below to recover your password.
          </p>

          {/* Form (Handled Manually) */}
          <div className="mt-6">
            <div className="flex flex-col gap-2">
              <InputField
                type="password"
                placeholder="Reset your password"
                {...register("password")}
                className="w-full p-3 border text-[#FF702D] rounded-lg bg-gray-100 focus:outline-none"
              />
              <p className="text-red-500 text-sm">{errors.email?.message}</p>
            </div>

            <p className="text-red-700 font-bold text-center">{message ? <p className="text-green-700 font-bold">{message +`Redirecting you to profile in ${count}s`}</p> : error}</p>

            {/* Submit Button (Calls handleSubmit Manually) */}
            <button
              onClick={handleSubmit(onSubmit)} // Call submit manually to avoid nesting forms
              className="w-full bg-orange-500 text-white font-semibold py-3 mt-4 rounded-lg hover:bg-orange-600 transition"
            >
              {loading ? "Restting..." :"Reset"}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
