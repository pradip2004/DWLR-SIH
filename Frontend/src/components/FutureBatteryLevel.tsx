import React from 'react';

function FutureBatteryLevel({data, loading}) {
 
  const {currentBattery = 0} = data || {};
  const getBatteryStatusColor = (level) => {
    if (level >= 100) {
      return "bg-green-100 border-green-400 text-green-700"; // Full (Green)
    } else if (level > 60) {
      return "bg-green-100 border-green-300 text-green-700"; // High (Light Green)
    } else if (level > 40) {
      return "bg-yellow-100 border-yellow-400 text-yellow-700"; // Moderate (Yellow)
    } else if (level > 20) {
      return "bg-orange-100 border-orange-400 text-orange-700"; // Low (Orange)
    } else {
      return "bg-red-100 border-red-400 text-red-700"; // Critical (Red)
    }
  };
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
  
    <div className="Future w-full lg:w-1/2 sm:h-[50vh] h-[80vh] bg-white shadow-lg rounded-md p-5">
      {/* Estimated Charging Date */}
      <div className="flex justify-between items-center text-[#274C77] mb-4">
        <span className="font-bold text-2xl">Estimated Charging Date:</span>
        <span className="font-semibold text-green-600">add api soon</span>
      </div>

      {/* Notifications Section */}
      <div className="Notification w-full bg-gray-50 rounded-lg shadow-md p-4 mt-4">
        <h3 className="text-lg font-semibold text-[#274C77] border-b pb-3 mb-4">
          🔔 Battery Alerts & Notifications
        </h3>
        <div className="space-y-4">
          {/* Low Battery Warning */}
          {currentBattery <= 20 && (
            <div className="flex items-center bg-red-100 border border-red-400 rounded-md p-4">
              <span className="text-red-500 text-xl mr-3">⚠️</span>
              <div>
                <p className="text-red-700 font-bold">Low Battery Warning</p>
                <p className="text-gray-600 text-sm">
                  Battery level is critically low at <strong>{currentBattery}%</strong>. Please charge immediately!
                </p>
              </div>
            </div>
          )}

          {/* Overcharging Warning */}
          {currentBattery >= 100 && (
            <div className="flex items-center bg-green-100 border border-green-400 rounded-md p-4">
              <span className="text-green-500 text-xl mr-3">🔋</span>
              <div>
                <p className="text-green-700 font-bold">Overcharging Warning</p>
                <p className="text-gray-600 text-sm">
                  Battery is fully charged. Disconnect to prevent damage.
                </p>
              </div>
            </div>
          )}

          {/* Battery Status */}
          {currentBattery > 20 && currentBattery < 100 && (
            <div className={`flex items-center p-4 rounded-md border ${getBatteryStatusColor(currentBattery)}`}>
              <span className="text-xl mr-3">✅</span>
              <div>
                <p className="font-bold">Battery Status</p>
                <p className="text-gray-600 text-sm">
                  Battery is in good condition at <strong>{currentBattery}%</strong>.
                </p>
              </div>
            </div>
          )}

          {/* Last Charging and Uncharging Dates */}
          <div className="bg-gray-200 border border-gray-300 rounded-md p-4">
            <div className="flex items-center mb-2">
              <span className="text-blue-500 text-lg mr-3">⏳</span>
              <p className="text-gray-700">
                <strong>battery can run upto</strong> api added soon.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FutureBatteryLevel;
