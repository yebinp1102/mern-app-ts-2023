import express from 'express'
import { login, register, getMyInfo } from '../controllers/userControllers.js';
import { authenticationCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/', authenticationCheck, getMyInfo);

export default router;