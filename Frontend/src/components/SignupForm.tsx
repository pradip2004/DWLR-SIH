import { Eye, EyeOff } from "lucide-react"; // Icons for password visibility toggle
import React, { useEffect, useState } from "react";
import { FcGoogle } from "react-icons/fc"; // Google Icon
import { useNavigate } from "react-router-dom"; // React Router for navigation
import axios from "axios"; // Axios for HTTP requests

const SignupForm = () => {
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // Toggle confirm password visibility
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  }); // Form data state
  const navigate = useNavigate(); // Navigation hook

  // Toggle password visibility
  const togglePasswordVisibility = () => {
    setShowPassword((prevState) => !prevState);
  };

  // Toggle confirm password visibility
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prevState) => !prevState);
  };

  // Handle form field changes
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    event.preventDefault();

    const { name, email, confirmPassword } = formData;

    try {
      const response = await axios.post("http://localhost:8000/api/auth/signup", {
        name,
        email,
        password: confirmPassword,
      }, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        console.log("Signup successful:", response.data);
        // After successful signup, redirect to dashboard
        localStorage.setItem("token", response.data.token); // Store token if needed
        navigate("/dashboard"); // Redirect to dashboard
      }
    } catch (error: any) {
      console.error("Signup failed:", error.response?.data || error.message);
    }
  };

  // Handle Google Signup Button Click
  const handleGoogleSignup = () => {
    window.location.href = 'http://localhost:8000/api/auth/google';
  };
  
  useEffect(() => {
    // Check if the token is in the URL
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');

    if (token) {
      localStorage.setItem("token", token); // Store token in local storage
      navigate("/dashboard"); // Redirect to the dashboard
    }
  }, [navigate]);
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between bg-white bg-opacity-30 backdrop-blur-md rounded-xl shadow-2xl p-8 w-[800px] gap-6 border border-gray-200">
      <div className="hidden md:flex items-center justify-center w-1/2">
        <img
          src="/india_login_signup.jpg"
          alt="Illustration"
          className="rounded-lg w-full h-auto"
        />
      </div>

      <div className="flex flex-col w-full md:w-1/2 items-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 font-sans">Create Account</h2>

        <form className="w-full flex flex-col gap-4 font-serif" >
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Your Name"
            className="p-3 border border-gray-300 rounded-lg text-lg outline-none focus:border-blue-500 bg-white bg-opacity-50"
            required
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Your Email"
            className="p-3 border border-gray-300 rounded-lg text-lg outline-none focus:border-blue-500 bg-white bg-opacity-50"
            required
          />
          <div className="relative rounded-lg">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Your Password"
              className="p-3 w-full text-lg outline-none focus:border-blue-500 rounded-lg bg-white bg-opacity-50"
              required
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <div className="relative rounded-lg">
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Confirm Password"
              className="p-3 w-full text-lg outline-none focus:border-blue-500 rounded-lg bg-white bg-opacity-50"
              required
            />
            <button
              type="button"
              onClick={toggleConfirmPasswordVisibility}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
          <button
            type="submit"
            className="p-3 bg-blue-600 text-white rounded-lg text-lg font-medium hover:bg-blue-700"
            onClick={handleSubmit}
          >
            Signup
          </button>
        </form>

        <button
          className="p-3 mt-6 w-full flex items-center justify-center bg-gray-100 bg-opacity-70 border border-gray-300 rounded-lg text-lg hover:bg-gray-200"
          onClick={handleGoogleSignup}
        >
          <FcGoogle className="mr-2 text-2xl" />
          Signup with Google
        </button>

        <button onClick={() => navigate("/auth/signin")} className="mt-6 text-lg">
          <span>
            <span className="text-black">Already have an account? </span>
            <span className="text-blue-800 font-semibold">Login</span>
          </span>
        </button>
      </div>
    </div>
  );
};

export default SignupForm;
