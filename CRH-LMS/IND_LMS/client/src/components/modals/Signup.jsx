import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import InputField from "../input/input";
import Button from "../button/button";
import useApi from "../../hooks/useApi";
import { useState } from "react";

// Validation Schema using Yup
const schema = yup.object().shape({
  firstName: yup
    .string()
    .required("First Name is required")
    .matches(/^[A-Za-z]+$/, "First Name should contain only alphabets"),

  lastName: yup
    .string()
    .matches(/^[A-Za-z]+$/, "Last Name should contain only alphabets")
    .required("Last Name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup
    .string()
    .matches(/^[0-9]{10}$/, "Phone number must be 10 digits")
    .required("Phone Number is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
  agreeTerms: yup
    .bool()
    .oneOf([true], "You must agree to the terms and conditions"),
});

export default function SignupModal({ setFormType }) {
  const { request, loading, error } = useApi();
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
      const response = await request("POST", "/auth/signup", data);
      if (response) {
        setMessage(response.message);
      }
    } catch (err) {
      console.log(error, err);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl">
      {/* Header */}
      <div className="text-start">
        <h2 className="text-3xl font-semibold  text-gray-800">Sign Up</h2>
        <p className="text-orange-500 text-sm mt-1">Let’s get you all st up so you can access your personal account.</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField
            type="text"
            placeholder="First Name"
            {...register("firstName")}
            error={errors.firstName?.message}
          />
          <InputField
            type="text"
            placeholder="Last Name"
            {...register("lastName")}
            error={errors.lastName?.message}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

        <InputField
          type="email"
          placeholder="Email"
          {...register("email")}
          error={errors.email?.message}
        />
        <InputField
          type="text"
          placeholder="Phone Number"
          {...register("phone")}
          error={errors.phone?.message}
        />
        </div>
        <InputField
          type="password"
          className="w-full"
          placeholder="Password"
          {...register("password")}
          error={errors.password?.message}
        />
        <InputField
          type="password"
          className="w-full"
          placeholder="Confirm Password"
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
        />

        <div className="flex items-center space-x-2">
          <input type="checkbox" {...register("agreeTerms")} className="w-4 h-4" />
          <p className="text-sm">
            I agree with the <span className="text-blue-500">Terms and Conditions</span>
          </p>
        </div>
        <p className="text-red-500 text-sm">{errors.agreeTerms?.message}</p>

        <p className="text-red-700 font-bold text-center">{error}</p>
        <p className="text-green-700 font-bold text-center">{message}</p>

        <Button
          type="submit"
          className="w-full bg-orange-500 text-white text-lg font-semibold py-3 rounded-xl hover:bg-orange-600 transition-all"
        >
          {loading ? "Creating Account..." : "Create Account"}
        </Button>
      </form>

      <div className="text-center mt-4">
        <div className="flex items-center my-4">
          <div className="border-t border-gray-300 flex-grow"></div>
          <p className="text-gray-600 text-sm mx-3">Or Sign Up with</p>
          <div className="border-t border-gray-300 flex-grow"></div>
        </div>

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

        <p className="text-sm mt-3 text-gray-600">
          Already a member? 
          <button
            onClick={() => setFormType("login")}
            className="text-orange-500 font-bold ml-1"
          >
            Login
          </button>
        </p>
      </div>
    </div>
  );
}

