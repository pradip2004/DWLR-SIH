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
        // backgroundImage: 'linear-gradient(to bottom, #03045E,#0077B6,#00B4D8,#90E0EF,#CAF0F8)',
        // backgroundImage: 'linear-gradient(to bottom, #cfad89,#cfc1af,#78b2c4,#1088a0,#818792)',
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
