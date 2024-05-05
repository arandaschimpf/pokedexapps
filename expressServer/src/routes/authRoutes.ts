import { Router } from 'express';
// import { login, signup } from '../services/authService';
import { createUser, authenticateUser } from '../services/users';

const router = Router();

router.post('/signup', createUser);
router.post('/login', authenticateUser);

// router.post('/login', login);
// router.post('/signup', signup);

export default router;
