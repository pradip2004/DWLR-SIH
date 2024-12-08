import express from 'express';
import { addAuthorityUser, showAuthorityUser } from '../controllers/authorityController';


const router = express.Router();

router.post('/add', addAuthorityUser);
router.get('/users', showAuthorityUser);


export default router;