import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';

interface FormData {
  email: string;
  phone: string;
}

function DashForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    phone: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/v1/authority/add', formData,{
        headers: {
          'Content-Type': 'application/json'
        }});
      console.log('Form submitted:', response.data);
      alert('User added successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error adding user');
    }
  };

  return (
    <div className=" w-full  h-full sm:h-1/2 flex justify-center items-center bg-white">
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
            <label htmlFor="phone" className="block text-sm font-medium text-gray-600">Mobile Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Enter your mobile number"
              value={formData.phone}
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
