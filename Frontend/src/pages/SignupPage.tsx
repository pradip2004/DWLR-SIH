import React from "react";
import SignupForm from "../components/SignupForm";
import LandingHeader from "../components/LandingHeader";

const SignupPage = () => {
  return (
    <>
      {/* Container with Video Background */}
      <div className="relative min-h-screen w-full" 
      style={{
        backgroundImage:'url(/bg.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }

      }>
  
        {/* Header */}
        <LandingHeader />

        {/* Main Content */}
        <div className="h-screen w-full flex flex-col md:flex-row items-center justify-around px-6 md:px-28 relative z-10">
          {/* Signup Form */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            <SignupForm />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupPage;
