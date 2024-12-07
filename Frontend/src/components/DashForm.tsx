import React, { useState, ChangeEvent, FormEvent } from 'react';

interface FormData {
  email: string;
  mobile: string;
}

function DashForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    mobile: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="w-1/2 h-full flex justify-center items-center bg-white">
      <div className="w-full h-full p-8 space-y-6">
        <form onSubmit={handleSubmit}>
          <div className="mb-4 mt-5">
            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your Gmail"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274C77] text-gray-800"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="mobile" className="block text-sm font-medium text-gray-600">Mobile Number</label>
            <input
              type="tel"
              id="mobile"
              name="mobile"
              placeholder="Enter your mobile number"
              value={formData.mobile}
              onChange={handleChange}
              className="w-full p-3 mt-1 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#274C77] text-gray-800"
              required
            />
          </div>

          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="w-full py-3 px-6 bg-[#274C77] text-white rounded-md text-lg font-semibold hover:bg-[#1d3c56] transition duration-300"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DashForm;
