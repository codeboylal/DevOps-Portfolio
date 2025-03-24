import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FaFacebook, FaGoogle, FaApple } from "react-icons/fa";
import { GiCrossMark } from "react-icons/gi";
import InputField from "../input/input";
import Button from "../button/button";
import useApi from "../../hooks/useApi";

const schema = yup.object().shape({
  email: yup.string().email("Invalid email").required("Email is required"),
});

const ForgetPasswordModal = () => {
  const { request, loading, error } = useApi();
  const [message, setMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const onSubmit = async (data) => {
    const response = await request("POST", "/auth/forgot-password", data);
    if (response) {
      setMessage("Email sent successfully, You may close the window!");
    }
  };

  return (
    

        <div className="w-full mt-24 p-6">
          <div className="flex flex-col gap-[24px]">
            <h2 className="text-xl lg:text-[48px] font-poppins lg:font-[500] text-[#4B4B4B]">
              Forget Password
            </h2>
            <p className="text-sm font-poppins lg:font-[500] text-[#FF702D] mb-10 mt-3">
              Don’t worry, happens to all of us. Enter your email below to
              recover your password
            </p>
          </div>

          <div className="flex gap-2 flex-col items-start w-full">
            <InputField
              type="email"
              placeholder="Enter your email"
              {...register("email")}
              className="p-3 max-h-[72px] text-[#4B4B4B] rounded-[18px] w-full bg-[#F5F7F9]"
            />
            <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
          </div>

          <p className="text-red-700 font-bold text-center pb-6">
            {message ? (
              <span className="text-green-700 font-bold">{message}</span>
            ) : (
              error
            )}
          </p>

          <Button
            onClick={handleSubmit(onSubmit)}
            className="w-full bg-[#FF702D] text-white font-semibold py-3 rounded-[18px] hover:bg-orange-600 transition-all"
          >
            {loading ? "Submitting..." : "Submit"}
          </Button>

          <div className="text-center mt-4">
            <div className="flex items-center justify-center my-2">
              <div className="border-t border-gray-300 w-1/4"></div>
              <p className="mx-2 text-gray-500">Or Login with</p>
              <div className="border-t border-gray-300 w-1/4"></div>
            </div>

            <div className="flex justify-center gap-4 mt-2">
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
        </div>
    
  );
};

export default ForgetPasswordModal;
