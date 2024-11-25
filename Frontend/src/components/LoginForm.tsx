import { Eye, EyeOff } from "lucide-react"; // Use Eye and EyeOff for toggle
import React, { useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { useNavigate } from "react-router-dom"; // React Router for navigation

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const navigate = useNavigate(); // Navigation hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Login form submitted");
  };

  // Redirect to the signup page
  const redirectToSignup = () => {
    navigate("/auth/signup");
  };

  // Handle Google login click
  const handleGoogleLogin = () => {
    console.log("Google login clicked");
    // Add your Google login functionality here
  };

  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white bg-opacity-30 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[800px] gap-6 border border-gray-200">
      {/* Left Section: Illustration */}
      <div className="hidden md:flex items-center justify-center w-1/2">
        <img
          src="/india_login_signup.jpg"
          alt="Illustration"
          className="rounded-lg w-full h-auto"
        />
      </div>

      {/* Right Section: Form */}
      <div className="flex flex-col w-full md:w-1/2 items-center">
        {/* Form Header */}
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-sans">
          Welcome Back
        </h2>

        {/* Login Form */}
        <form
          className="w-full flex flex-col gap-4 font-serif"
          onSubmit={handleSubmit}
        >
          {/* Email Field */}
          <input
            type="email"
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-lg text-lg outline-none focus:border-blue-500 bg-white bg-opacity-50"
            required
          />

          {/* Password Field */}
          <div className="relative rounded-lg">
            <input
              type={showPassword ? "text" : "password"} // Toggle between text and password
              placeholder="Your Password"
              className="p-3 w-full text-lg outline-none bg-white bg-opacity-50 focus:border-blue-500 rounded-lg"
              required
            />
            {/* Show/Hide Password Button */}
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700"
          >
            Login
          </button>
        </form>

        {/* Google Authentication Button */}
        <button
          className="p-3 mt-6 w-full flex items-center justify-center bg-gray-100 bg-opacity-70 border border-gray-300 rounded-lg text-lg hover:bg-gray-200"
          onClick={handleGoogleLogin} // Updated handler
        >
          <FcGoogle className="mr-2 text-2xl" /> {/* Google Icon */}
          Login with Google
        </button>

        {/* Redirect to Signup */}
        <button onClick={redirectToSignup} className="mt-6 text-lg">
          <span>
            <span className="text-black">Don't have an account? </span>
            <span className="text-blue-800 font-semibold">Sign Up</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
