import express from "express";
import authRoutes from './routes/authRoutes'; 
import dotenv from 'dotenv';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());

app.use('/api/auth', authRoutes)
app.listen(5000, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});