// import { DWLR } from "../model/dwlr";
// import { DailyDWLRDataDocument } from "../model/dwlrData";


// export const updateDWLRStatusOnSave = async function (doc: DailyDWLRDataDocument) {
//   try {
//     const lowBattery = doc.dailyData.some((data) => data.batteryPercentage && data.batteryPercentage < 20);

//     if (lowBattery) {
//       await DWLR.findByIdAndUpdate(doc.dwlrId, {
//         lowBattery: true,
//         active: false,
//       });
//       console.log(`DWLR with ID ${doc.dwlrId} updated: lowBattery=true, active=false`);
//     }
//   } catch (error) {
//     console.error("Error updating DWLR status:", error);
//   }
// };


import { DailyDWLRData, DailyDWLRDataDocument } from "../model/dwlrData";
import { DWLR } from "../model/dwlr";

export const updateDWLRStatusOnSave = async function (doc: DailyDWLRDataDocument) {
  try {
    // Check if any `batteryPercentage` in `dailyData` is below 20
    const lowBattery = doc.dailyData.some((data) => data.batteryPercentage && data.batteryPercentage < 20);

    if (lowBattery) {
      // Update the associated DWLR document to set lowBattery=true and active=false
      await DWLR.findByIdAndUpdate(doc.dwlrId, {
        lowBattery: true,
        active: false,
      });
      console.log(`DWLR with ID ${doc.dwlrId} updated: lowBattery=true, active=false`);
    }
  } catch (error) {
    console.error("Error updating DWLR status:", error);
  }
};
