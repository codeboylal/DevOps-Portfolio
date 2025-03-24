import React from "react";
import { GiCrossMark } from "react-icons/gi";

const AuthModal = ({ img, children, onClose }) => {
  const closeModal = () => {
    onClose && onClose();
  };
  return (
    <div className="fixed inset-0 flex justify-center bg-black overflow-scroll bg-opacity-50 z-50 p-[48px] w-screen h-screen backdrop-blur-md">
      <div className="bg-white max-w-[1258px] max-h-[844px] w-auto flex shadow-lg rounded-[70px] h-auto  relative overflow-hidden">
        <div className="md:block hidden items-center max-h-[748px] m-8 mr-2 rounded-[28px]">
          <img
            src={img}
            alt="Signup Illustration"
            className=" object-cover rounded-xl h-full w-full"
          />
        </div>
        <button
          onClick={closeModal}
          className="text-end absolute right-8 top-8"
        >
          <GiCrossMark className="hover:rotate-180 transition-transform duration-300 delay-200" />
        </button>
        <div className="overflow-x-hidden overflow-y-auto scrollbar-hidden flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
