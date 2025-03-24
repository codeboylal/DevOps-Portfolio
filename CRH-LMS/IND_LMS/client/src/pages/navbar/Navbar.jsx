import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi"; // Import icons

import logo from "../../assets/LMS.svg";
import AuthModal from "../../components/modals/AuthModal";
import SignupModal from "../../components/modals/Signup";
import LoginModal from "../../components/modals/loginModal";
import ForgetPasswordModal from "../../components/modals/forgetPassword";
import signupImg from "../../assets/Signup/signup.png";
import loginImg from "../../assets/Login/LoginImage.svg";
import forgetImg from "../../assets/forgetPassword/forgotPassword.svg";
import Button from "../../components/button/button";

const Navbar = ({ links }) => {
  const [isOpen, setIsOpen] = useState(false); // Mobile menu state
  const [formType, setFormType] = useState(null); // Modal state
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if a token exists in localStorage
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  const handleProfileClick = () => {
    navigate("/profile");
  };

  const form = {
    signup: { image: signupImg, modal: <SignupModal setFormType={setFormType} /> },
    login: { image: loginImg, modal: <LoginModal setFormType={setFormType} /> },
    forget: { image: forgetImg, modal: <ForgetPasswordModal setFormType={setFormType} /> },
  };

  return (
    <nav className="bg-white shadow-md w-full top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img className="max-w-[101px] max-h-[52px]" src={logo} alt="Logo" />
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex gap-10">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="text-black font-inter font-bold text-[18px] hover:text-orange-500 transition-all"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth/Profile Button (Desktop) */}
        <div className="hidden md:flex space-x-4">
          {isAuthenticated ? (
            <Button
              type="button"
              onClick={handleProfileClick}
              className="bg-orange-500 text-white px-4 py-2 rounded-lg"
            >
              Profile
            </Button>
          ) : (
            <>
              <Button
                type="button"
                onClick={() => setFormType("login")}
                className="bg-orange-500 text-white px-4 py-2 rounded-lg"
              >
                Login
              </Button>
              <Button
                type="button"
                onClick={() => setFormType("signup")}
                className="border border-orange-500 text-orange-500 px-4 py-2 rounded-lg"
              >
                Signup
              </Button>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-black text-2xl"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden fixed top-0 p-2 h-auto w-full bg-white shadow-lg transform ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        } transition-transform duration-300`}
      >
        <div className="flex justify-between items-center p-4">
          <img className="max-w-[80px]" src={logo} alt="Logo" />
          <button className="text-black text-2xl" onClick={() => setIsOpen(false)}>
            <FiX />
          </button>
        </div>

        <ul className="flex flex-col items-start space-y-4 px-6 pt-4">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.path}
                className="text-black text-lg hover:text-orange-500 block"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Auth/Profile Button (Mobile) */}
        <div className="flex gap-2 mt-6 mb-2 px-4">
          {isAuthenticated ? (
            <Button
              type="button"
              onClick={handleProfileClick}
              className="bg-[#FF702D] text-white w-full max-w-[117px] max-h-[39px] lg:font-[500] lg:font-inter lg:text-[16px] rounded-[10px] py-2"
            >
              Profile
            </Button>
          ) : (
            <>
              <Button
                type="button"
                onClick={() => setFormType("login")}
                className="bg-[#FF702D] text-white w-full max-w-[117px] max-h-[39px] lg:font-[500] lg:font-inter lg:text-[16px] rounded-[10px] py-2"
              >
                Login
              </Button>
              <Button
                type="button"
                onClick={() => setFormType("signup")}
                className="bg-transparent text-[#FF702D] border-2 border-[#FF702D] w-full max-w-[117px] max-h-[39px] lg:font-[500] lg:font-inter lg:text-[16px] rounded-[10px] py-2"
              >
                Signup
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Modal */}
      {formType && (
        <AuthModal img={form[formType].image} onClose={() => setFormType(null)}>
          {form[formType].modal}
        </AuthModal>
      )}
    </nav>
  );
};

export default Navbar;
