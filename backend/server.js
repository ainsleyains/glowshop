import express from 'express';
import dotenv from 'dotenv';
dotenv.config(); // config before using port
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
const port = process.env.PORT || 5000;
connectDB();
const app = express();

app.use('/api/products', productRoutes);

app.listen(port, () => console.log(`server is running on port ${port}`));
