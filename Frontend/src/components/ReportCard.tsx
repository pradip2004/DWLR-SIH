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
    <div className='w-[80%] bg-white shadow-xl p-3 rounded-lg border flex justify-between'>
      <div className='flex h-full'>
        <div className='h-full flex justify-center items-center px-3'>
          🔖
        </div>
        <div>
          <h1 className='text-xl font-kameron font-bold'>{id}</h1>
          <h3 className='text-md font-kameron text-[#4E4E4E]'>{`Problem Detect on this DWLR (${problem})`}</h3>
        </div>
      </div>
      <div className='flex h-full flex-col justify-around border-l pl-4'>
        <button
          className='px-4 py-1 bg-[#274C77] text-white'
          onClick={generatePDF}
        >
          Download
        </button>
      </div>
    </div>
  );
}

export default ReportCard;
