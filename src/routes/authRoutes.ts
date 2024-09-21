// src/routes/authRoutes.ts
import express from 'express';
import authService from '../services/authService'; 

const router = express.Router();

// Sign Up Route
router.post('/signup', async (req, res) => {
    try {
        const user = await authService.signUp(req.body);
        res.status(201).json(user);
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(400).json({ error: errorMessage });
    }
});

// Sign In Route
router.post('/signin', async (req, res) => {
    try {
        const { token, user } = await authService.signIn(req.body.email, req.body.password);
        res.status(200).json({ token, user });
    } catch (error) {
        const errorMessage = (error as Error).message;
        res.status(401).json({ error: errorMessage });
    }
});

export default router;
