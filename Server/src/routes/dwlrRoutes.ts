import express from 'express';
import { allDwlr, allDwlrInfo, allProblematicDwlrCoordinates, dwlrDetails, getAllStates, getDistrictsByState } from '../controllers/dwlrControllers';

const router = express.Router();

router.get('/info', allDwlrInfo);
router.get('/states', getAllStates);
router.get('/districts', getDistrictsByState);
router.get('/coordinates-info', allProblematicDwlrCoordinates);
router.get('/all', allDwlr);
router.get("/details/:id", dwlrDetails);

export default router;