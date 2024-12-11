import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Loading from '../components/Loading';
import NotData from '../components/NotData';
import ReportCard from '../components/ReportCard';
import { useDwlrContext } from '../context/DwlrContext';

function Report() {
  const { data, loading, error } = useDwlrContext();
  const [states, setStates] = useState<string[]>([]);
  const [districts, setDistricts] = useState<string[]>([]);
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);

  // Fetch states on component mount
  useEffect(() => {
    const fetchStates = async () => {
      try {
        const response = await axios.get<{ states: string[] }>('http://localhost:8000/api/v1/dwlr/states');
        setStates(response.data.states);
      } catch (err) {
        console.error('Error fetching states:', err);
      }
    };
    fetchStates();
  }, []);

  // Fetch districts when a state is selected
  useEffect(() => {
    const fetchDistricts = async () => {
      if (!selectedState) return;
      try {
        const response = await axios.get<{ districts: string[] }>(
          `http://localhost:8000/api/v1/dwlr/districts?state=${selectedState}`
        );
        setDistricts(response.data.districts);
      } catch (err) {
        console.error('Error fetching districts:', err);
        setDistricts([]);
      }
    };
    fetchDistricts();
  }, [selectedState]);

  const fetchDetails = async (id: string) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/dwlr/details/${id}`);
      return response.data;
    } catch (err) {
      console.error('Error fetching details:', err);
    }
  };

  const handleDownload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedState || !selectedDistrict) {
      alert("Please select a state and district.");
      return;
    }
  
    const startDate = (document.getElementById("start-date") as HTMLInputElement).value;
    const endDate = (document.getElementById("end-date") as HTMLInputElement).value;
  
    if (!startDate || !endDate) {
      alert("Please select both start and end dates.");
      return;
    }
  
    try {
      const response = await axios.get("http://localhost:8000/api/v1/dwlr/download-data", {
        params: {
          state: selectedState,
          district: selectedDistrict,
          startDate,
          endDate,
        },
        responseType: "blob", // Important for file download
      });
  
      // Create a download link and trigger it
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "dwlr_data.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      resetForm();
    } catch (err) {
      console.error("Error downloading data:", err);
      alert("Failed to download data. Please try again.");
    }
  };

  const resetForm = () => {
    setSelectedState(null);
    setSelectedDistrict(null);
    setDistricts([]);
    (document.getElementById("start-date") as HTMLInputElement).value = '';
    (document.getElementById("end-date") as HTMLInputElement).value = '';
  };


  if (loading) return <Loading />;
  if (error) return <NotData />;

  return (
    <div className='w-full p-2 flex justify-around items-center ' id='report_page_container'>
      {/* Reports Section */}
      <div className='w-[40%] h-[90%]  bg-white rounded-lg flex flex-col gap-3 overflow-y-scroll items-center p-3' id='dwlr_report_list_container'>
        <h2 className='text-lg pb-3 font-kameron font-bold'>DWLRs Reports</h2>
        {data?.coordinates.map((coordinate) => (
          <ReportCard
            key={coordinate._id}
            id={coordinate.id}
            problem={coordinate.anomalyDwlr ? 'Anomaly Data' : 'Low Battery'}
            onDetailsClick={() => fetchDetails(coordinate._id)}
          />
        ))}
      </div>

      {/* Form Section */}
      <div className='w-[40%]  h-[90%] bg-white rounded-lg overflow-y-scroll p-6'>
        <h2 className='text-lg pb-3 font-kameron font-bold'>Download Data</h2>
        <form className='flex flex-col gap-4'>
          {/* Start Date */}
          <div className='flex flex-col'>
            <label htmlFor='start-date' className='text-lg font-medium'>
              Select Start Date
            </label>
            <input
              type='date'
              id='start-date'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            />
          </div>

          {/* End Date */}
          <div className='flex flex-col'>
            <label htmlFor='end-date' className='text-lg font-medium'>
              Select End Date
            </label>
            <input
              type='date'
              id='end-date'
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            />
          </div>

          {/* Select State */}
          <div className='flex flex-col'>
            <label htmlFor='state' className='text-lg font-medium'>
              Select State
            </label>
            <select
              id='state'
              value={selectedState || ''}
              onChange={(e) => setSelectedState(e.target.value)}
              className='border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77]'
            >
              <option value=''>Choose a state</option>
              {states.map((state, index) => (
                <option key={index} value={state}>
                  {state}
                </option>
              ))}
            </select>
          </div>

          {/* Select City */}
          <div className='flex flex-col'>
            <label htmlFor='city' className='text-lg font-medium'>
              Select City
            </label>
            <select
              id='city'
              value={selectedDistrict || ''}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              disabled={!selectedState}
              className={`border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-[#274C77] ${
                !selectedState && 'bg-gray-200 cursor-not-allowed'
              }`}
            >
              <option value=''>Choose a city</option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Download Button */}
          <button
            type='button'
            onClick={handleDownload}
            className='mt-4 bg-[#274C77] text-white py-2 px-4 rounded-md hover:bg-[#1d3a5a] transition duration-200'
          >
            Download
          </button>
        </form>
      </div>
    </div>
  );
}

export default Report;
