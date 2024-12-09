import { Request, Response } from "express";
import path from "path";
import fs from "fs";

export const getSvgController = (req: Request, res: Response): void => {
  // Get state name from request parameters
  const stateName = req.params.state;

  if (!stateName) {
    res.status(400).json({ error: "State name is required!" });
    return;
  }

  // Construct the file name and absolute path
  const fileName = `${stateName.toLowerCase().replace(/\s+/g, "")}.svg`;
  const assetsPath = path.resolve(__dirname, "../assets"); 
  const filePath = path.join(assetsPath, fileName);

  // Log the resolved file path
  console.log(`Looking for file at: ${filePath}`);

  // Check if the file exists
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      console.error(`File not found: ${filePath}`);
      res.status(404).json({ error: `SVG file for ${stateName} not found!` });
    } else {
      // Read and send the SVG file
      fs.readFile(filePath, "utf8", (readErr, data) => {
        if (readErr) {
          console.error(`Error reading file: ${readErr.message}`);
          res.status(500).json({ error: "Error reading the SVG file." });
        } else {
          res.type("image/svg+xml").send(data);
        }
      });
    }
  });
};
