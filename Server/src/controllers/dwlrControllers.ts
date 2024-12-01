import { Request, Response } from "express";
import { DWLR } from "../model/dwlr"
import { DailyDWLRData } from "../model/dwlrData";
import mongoose from "mongoose";


export const allDwlrInfo = async (req: Request, res: Response): Promise<any> => {
      try {
        const { state, district } = req.query;
    
        const queryConditions: any = {};
    
        if (state) {
          queryConditions.state = state;
        }
    
        if (district) {
          queryConditions.district = district;
        }
    
        const total = await DWLR.countDocuments(queryConditions);
        const active = await DWLR.countDocuments({ ...queryConditions, active: true });
        const lowBattery = await DWLR.countDocuments({ ...queryConditions, lowBattery: true });
        const anomalyDwlr = await DWLR.countDocuments({ ...queryConditions, anomalyDwlr: true });
    
        return res.status(200).json({
          total,
          active,
          lowBattery,
          anomalyDwlr,
        });
    
      } catch (error: any) {
        console.error("Error fetching DWLR data:", error);
        return res.status(500).json({
          message: "Error fetching DWLR data",
          error: error.message,
        });
      }
    };

export const getAllStates = async (req: Request, res: Response) => {
      try {
          const states = await DWLR.distinct("state");
  
          res.status(200).json({
              states,
          });
      } catch (error: any) {
          console.error("Error fetching states:", error);
          res.status(500).json({
              message: "Error fetching states",
              error: error.message,
          });
      }
  };


export const getDistrictsByState = async (req: Request, res: Response): Promise<any> => {
      try {
          const { state } = req.query;
  
          if (!state) {
              return res.status(400).json({
                  message: "State parameter is required",
              });
          }
  
          const districts = await DWLR.distinct("district", { state });
  
          res.status(200).json({
              districts,
          });
      } catch (error: any) {
          console.error("Error fetching districts:", error);
          res.status(500).json({
              message: "Error fetching districts",
              error: error.message,
          });
      }
  };
  

  export const allProblematicDwlrCoordinates = async (req: Request, res: Response) => {
      try {
        // Find all problematic DWLR with `active: false`, including the _id field
        const problematicDwlr = await DWLR.find({ active: false }).select(
          "longitude latitude state district lowBattery anomalyDwlr id"
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
                              dwlrId: dwlr.id,
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
                  delrId: dwlr.id,
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


export const previousData = async (req: Request, res: Response): Promise<any> => {
      try {
        const { dwlrId, noOfDays } = req.body;
    
        if (!dwlrId || !noOfDays) {
          return res.status(400).json({ error: "dwlrId and noOfDays are required." });
        }
    
        // Calculate the start date for the query
        const startDate = new Date();
        startDate.setDate(startDate.getDate() - noOfDays);
    
        // Query the DailyDWLRData collection for all matching documents
        const results = await DailyDWLRData.find({
          dwlrId: new mongoose.Types.ObjectId(dwlrId),
          date: { $gte: startDate },
        })
          .select("dailyData.timestamp dailyData.waterLevel date")
          .exec();
    
        // Create a map to store the highest water level for each date
        const dateMap: Map<string, number> = new Map();
    
        results.forEach((result) => {
          result.dailyData.forEach((data) => {
            if (data.timestamp && data.waterLevel !== undefined) {
              const dateKey = new Date(result.date).toISOString().split("T")[0]; // Use result.date for the document date
              const currentLevel = dateMap.get(dateKey) || 0;
              dateMap.set(dateKey, Math.max(currentLevel, data.waterLevel ?? 0));
            }
          });
        });
    
        // Generate a list of all dates in the requested range
        const currentDate = new Date();
        const datesInRange: { date: string; waterLevel: number }[] = [];
    
        for (let i = 0; i < noOfDays; i++) {
          const date = new Date();
          date.setDate(currentDate.getDate() - i);
          const dateKey = date.toISOString().split("T")[0]; // Format date as YYYY-MM-DD
          datesInRange.push({
            date: dateKey,
            waterLevel: dateMap.get(dateKey) ?? 0, // Use nullish coalescing to provide a fallback of 0
          });
        }
    
        // Sort dates in ascending order
        datesInRange.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
        return res.status(200).json({
          dwlrId,
          data: datesInRange,
        });
      } catch (error) {
        console.error("Error fetching previous trend data:", error);
        return res.status(500).json({ error: "Internal server error" });
      }
    };
    
