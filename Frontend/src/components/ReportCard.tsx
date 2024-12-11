import React from 'react';
import jsPDF from 'jspdf';

function ReportCard({ id, problem, onDetailsClick }) {
  const generatePDF = async () => {
    try {
      const details = await onDetailsClick();

      const doc = new jsPDF();

      // Header with DWLR ID
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(16);
      doc.text(`DWLR Report`, 10, 10);
      doc.setFontSize(12);
      doc.text(`ID: ${id}`, 10, 20);

      // Details Section
      const detailText = `
        Location Details:
        Latitude: ${details.latitude}
        Longitude: ${details.longitude}
        State: ${details.state}
        District: ${details.district}

        Status:
        Low Battery: ${details.lowBattery ? 'Yes' : 'No'}
        Active: ${details.active ? 'Yes' : 'No'}
        Anomaly Detected: ${details.anomalyDwlr ? 'Yes' : 'No'}

        Measurements:
        Latest Water Level: ${details.latestWaterLevel} m
        Latest Battery Percentage: ${details.latestBatteryPercentage}%
      `;
      doc.setFont('helvetica', 'normal');
      doc.text(detailText, 10, 40);

      // Add a link to the map
      const mapLink = `https://www.google.com/maps?q=${details.latitude},${details.longitude}`;
      doc.textWithLink('View on Google Maps', 10, 120, { url: mapLink });

      // Save the PDF
      doc.save(`DWLR_Report_${id}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="w-[90%] bg-white shadow-xl p-3 rounded-lg border flex flex-col sm:flex-row sm:justify-between gap-3">
  {/* Left Section */}
  <div className="flex items-center gap-3">
    <div className="flex justify-center items-center px-3 text-2xl">
      🔖
    </div>
    <div>
      <h1 className="text-lg sm:text-xl font-kameron font-bold">{id}</h1>
      <h3 className="text-sm sm:text-md font-kameron text-[#4E4E4E]">
        {`Problem Detected on this DWLR (${problem})`}
      </h3>
    </div>
  </div>

  {/* Right Section */}
  <div className="flex sm:flex-col justify-end sm:justify-around border-t sm:border-t-0 sm:border-l pt-2 sm:pt-0 sm:pl-4">
    <button
      className="px-4 py-2 w-full sm:w-auto bg-[#274C77] text-white text-sm sm:text-base rounded hover:bg-[#1d3a5a] transition duration-200"
      onClick={generatePDF}
    >
      Download
    </button>
  </div>
</div>

  );
}

export default ReportCard;
