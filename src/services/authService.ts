import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import prisma from '../prisma/client'; // Ensure this points to your Prisma client instance
import { Gender } from '@prisma/client'; // Import the Gender enum

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret';

const authService = {
  async signIn(email: string, password: string) {
    const user = await prisma.user.findUnique({ where: { email } });

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
    return { token, user };
  },

  async signUp(userData: {
    name: string;
    email: string;
    password: string;
    gender: Gender; // Ensure this is of type Gender
    birthDate?: string; // Keep it as a string for input
    nationality?: string;
    phone?: string;
  }) {
    const { name, email, password, gender, birthDate, nationality, phone } = userData;

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Parse birthDate if provided
    const parsedBirthDate = birthDate ? new Date(birthDate) : null;

    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        gender,
        birthDate: parsedBirthDate,
        nationality,
        phone,
      },
    });

    return newUser;
  },
};

export default authService;
