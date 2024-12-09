import React, { useState, useEffect } from "react";
import axios from "axios";

interface DashIndiaProps {
  selectedState: string | null;
  districtsToHighlight: string[]; // Pass the district names to highlight
}

const DashIndia: React.FC<DashIndiaProps> = ({ selectedState, districtsToHighlight }) => {
  const [svgContent, setSvgContent] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (selectedState) {
      fetchStateSvg(selectedState);
    }
  }, [selectedState]);
  const highlightDistricts = () => {
      const parser = new DOMParser();
      const doc = parser.parseFromString(svgContent || "", "image/svg+xml");
    
      // Iterate through the districts to highlight and set the style
      districtsToHighlight.forEach((districtName) => {
        // Select elements where the class contains the district name
        const districtElements = Array.from(
          doc.querySelectorAll(`path[class*="${districtName}"]`)
        );
    
        districtElements.forEach((districtElement) => {
          // Highlight the district
          districtElement.setAttribute("fill", "red");
        });
      });
    
      // Serialize the modified SVG back to a string
      const serializer = new XMLSerializer();
      const updatedSvg = serializer.serializeToString(doc);
      setSvgContent(updatedSvg);
    };
    

  useEffect(() => {
    if (svgContent && districtsToHighlight.length > 0) {
      highlightDistricts();
    }
  }, [svgContent, districtsToHighlight]);

  const fetchStateSvg = async (state: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`http://localhost:8000/api/v1/getSvg/${state}`, {
        headers: { "Content-Type": "image/svg+xml" },
      });
      setSvgContent(response.data);
    } catch (err: any) {
      setError(`Failed to load SVG for ${state}`);
      setSvgContent(null);
    } finally {
      setLoading(false);
    }
  };

  

  return (
    <div className="w-full overflow-y-scroll h-full p-2 bg-white rounded-md shadow-lg">
      <div className="w-full flex justify-center items-center h-full bg-white shadow-xl rounded-md relative">
        {loading && <p>Loading SVG...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {svgContent && (
          <div
            className="w-full h-full"
            dangerouslySetInnerHTML={{ __html: svgContent }}
          />
        )}
      </div>
    </div>
  );
};

export default DashIndia;
