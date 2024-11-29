import express from 'express';
import { allDwlr, allDwlrInfo, allDwlrLocations, allProblematicDwlrCoordinates, dwlrDetails } from '../controllers/dwlrControllers';

const router = express.Router();

router.get('/info', allDwlrInfo);
router.get('/location-info', allDwlrLocations);
router.get('/coordinates-info', allProblematicDwlrCoordinates);
router.get('/all', allDwlr);
router.get("/details/:id", dwlrDetails);

export default router;