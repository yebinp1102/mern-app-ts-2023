import express from 'express'
import {getGoals, setGoal, updateGoal, deleteGoal} from '../controllers/goalControllers.js'
import { authenticationCheck } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/', authenticationCheck, getGoals);
router.post('/', authenticationCheck, setGoal);
router.put('/:id', authenticationCheck, updateGoal);
router.delete('/:id', authenticationCheck, deleteGoal);

export default router