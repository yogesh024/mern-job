import express from 'express';
import { isAuthroized } from '../utils/verifyToken.js';
import { getProfile, updateProfile } from '../controllers/profileController.js';

const router = express.Router();

router.get('/:id', getProfile);

router.put('/update/:id', isAuthroized, updateProfile);

export default router;
