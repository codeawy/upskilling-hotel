import { Request, Response } from 'express';
import authService from '../services/authService';
import bcrypt from 'bcryptjs'; // Import bcrypt

const authController = {
  async signIn(req: Request, res: Response) {
    const { email, password } = req.body;

    try {
      const { token, user } = await authService.signIn(email, password);
      res.json({ token, user });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(401).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  },

  async signUp(req: Request, res: Response) {
    const { name, email, password, gender, birthDate, nationality, phone } = req.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
      
      // Create the user in the database
      const newUser = await authService.signUp({
        name,
        email,
        password: hashedPassword,
        gender,
        birthDate,
        nationality,
        phone,
      });

      res.status(201).json({ user: newUser });
    } catch (error: unknown) {
      if (error instanceof Error) {
        res.status(400).json({ message: error.message });
      } else {
        res.status(500).json({ message: 'An unknown error occurred' });
      }
    }
  },
};

export default authController;
