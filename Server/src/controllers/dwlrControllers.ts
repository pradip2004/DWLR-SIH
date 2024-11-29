import { Request, Response } from "express";
import { DWLR } from "../model/dwlr"
import { DailyDWLRData } from "../model/dwlrData";


export const allDwlrInfo = async (req: Request, res: Response) => {
      try {
            const total = await DWLR.countDocuments();
            const active = await DWLR.countDocuments({ active: true });
            const lowBattery = await DWLR.countDocuments({ lowBattery: true });
            const anomalyDwlr = await DWLR.countDocuments({ anomalyDwlr: true });

            res.status(200).json({
                  total,
                  lowBattery,
                  active,
                  anomalyDwlr,
            });
      } catch (error: any) {
            console.error("Error fetching DWLR data:", error);
            res.status(500).json({
                  message: "Error fetching DWLR data",
                  error: error.message,
            });
      }
}

export const allDwlrLocations = async (req: Request, res: Response) => {
      try {

            const states = await DWLR.distinct("state");
            const districts = await DWLR.distinct("district");


            res.status(200).json({
                  states,
                  districts,
            });
      } catch (error: any) {
            console.error("Error fetching DWLR locations:", error);
            res.status(500).json({
                  message: "Error fetching DWLR locations",
                  error: error.message,
            });
      }
};

export const allProblematicDwlrCoordinates = async (req: Request, res: Response) => {
      try {

            const problematicDwlr = await DWLR.find({ active: false }).select(
                  "longitude latitude state district -_id"
            );


            res.status(200).json(problematicDwlr);
      } catch (error: any) {
            console.error("Error fetching problematic DWLR coordinates:", error);
            res.status(500).json({
                  message: "Error fetching problematic DWLR coordinates",
                  error: error.message,
            });
      }
};

export const allDwlr = async (req: Request, res: Response) => {
      try {
            const dwlrData = await DWLR.find({}, "longitude latitude state district lowBattery active anomalyDwlr _id");

            const enrichedData = await Promise.all(
                  dwlrData.map(async (dwlr) => {
                        const latestData = await DailyDWLRData.findOne({ dwlrId: dwlr._id })
                              .sort({ "dailyData.timestamp": -1 }) // Sort by timestamp descending to get the latest
                              .select("dailyData -_id");

                        let latestWaterLevel = null;
                        let latestBatteryPercentage = null;
                        let lastUpdatedInHours = null;

                        if (latestData && latestData.dailyData.length > 0) {
                              const latestEntry = latestData.dailyData[0]; // Get the latest entry
                              latestWaterLevel = latestEntry.waterLevel;
                              latestBatteryPercentage = latestEntry.batteryPercentage;

                              // Calculate the time since the last update in hours
                              const now = new Date();
                              const lastUpdated = new Date(latestEntry.timestamp);
                              lastUpdatedInHours = Math.abs((now.getTime() - lastUpdated.getTime()) / (1000 * 60 * 60));
                        }

                        return {
                              longitude: dwlr.longitude,
                              latitude: dwlr.latitude,
                              state: dwlr.state,
                              district: dwlr.district,
                              lowBattery: dwlr.lowBattery,
                              active: dwlr.active,
                              anomalyDwlr: dwlr.anomalyDwlr,
                              _id: dwlr._id,
                              latestWaterLevel,
                              latestBatteryPercentage,
                              lastUpdatedInHours,
                        };
                  })
            );

            res.status(200).json(enrichedData);
      } catch (error: any) {
            console.error("Error fetching DWLR data:", error);
            res.status(500).json({
                  message: "Error fetching DWLR data",
                  error: error.message,
            });
      }
};


export const dwlrDetails = async (req: Request, res: Response) : Promise<any> => {
      try {
            const { id } = req.params;

            const dwlr = await DWLR.findById(id, "longitude latitude state district lowBattery active anomalyDwlr");
            if (!dwlr) {
                  return res.status(404).json({ message: "DWLR not found" });
            }

            
            const latestData = await DailyDWLRData.findOne({ dwlrId: id })
                  .sort({ "dailyData.timestamp": -1 }) // Sort by timestamp descending to get the latest
                  .select("dailyData -_id");

            let latestWaterLevel = null;
            let latestBatteryPercentage = null;

            if (latestData && latestData.dailyData.length > 0) {
                  const latestEntry = latestData.dailyData[0]; // Get the latest entry
                  latestWaterLevel = latestEntry.waterLevel;
                  latestBatteryPercentage = latestEntry.batteryPercentage;
            }

            const response = {
                  longitude: dwlr.longitude,
                  latitude: dwlr.latitude,
                  state: dwlr.state,
                  district: dwlr.district,
                  lowBattery: dwlr.lowBattery,
                  active: dwlr.active,
                  anomalyDwlr: dwlr.anomalyDwlr,
                  latestWaterLevel,
                  latestBatteryPercentage,
            };

            
            res.status(200).json(response);
      } catch (error: any) {
            console.error("Error fetching DWLR details:", error);
            res.status(500).json({
                  message: "Error fetching DWLR details",
                  error: error.message,
            });
      }
};