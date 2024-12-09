import express from 'express';
import { getSvgController } from '../controllers/svgControllers';

const router = express.Router();

router.get('/:state', getSvgController);

export default router;