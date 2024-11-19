import React from 'react';
import Notification from '../components/Notification';

const Alert: React.FC = () => {
  return (
    <div className="w-full p-2 flex justify-around items-center">
      <div className="w-[40%] h-[90%] bg-white rounded-lg flex flex-col gap-3 overflow-y-scroll items-center p-3">
        <Notification />
        <Notification />
        <Notification />
      </div>

      {/* DWLR Description and Map Section */}
      <div className="w-[40%] h-[90%] bg-white rounded-lg p-4 flex flex-col justify-between">
        {/* DWLR Description */}
        <div className="text-left">
          <h1 className="text-2xl font-bold">DWLR ID: 2222222</h1>
          <h2 className="text-md text-gray-600 font-medium">Location: Sample Location</h2>
          <div className="mt-3">
            <h3 className="text-lg font-semibold">Last Reported</h3>
            <p className="text-md text-gray-600">6 hours ago</p>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold">Water Level</h3>
            <p className="text-md text-gray-600">5 m</p>
          </div>
          <div className="mt-3">
            <h3 className="text-lg font-semibold">Battery</h3>
            <p className="text-md text-gray-600">50%</p>
          </div>
        </div>

        {/* Embedded Google Map */}
        <div className="w-full h-64 mt-4">
          <iframe
            src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.8354345090047!2d144.95373531549934!3d-37.81720997975144!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1b4b441%3A0x5045675218ce6e0!2sSample%20Location!5e0!3m2!1sen!2s!4v1639531059384!5m2!1sen!2s`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            title="DWLR Location Map"
          />
        </div>
      </div>
    </div>
  );
};

export default Alert;
