import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import connectDB from './config/db.js';
import { configDotenv } from 'dotenv';
import UserRouter from './routes/userRoute.js';
import sellerRouter from './routes/sellerRoute.js';
import connectCloudinary from './config/cloudinary.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import addressRouter from './routes/addressRoute.js';
import orderRouter from './routes/orderRoute.js';
import Razorpay from 'razorpay';
import paymentRouter from './routes/paymentRoute.js';

const app = express();
const PORT = process.env.PORT || 3000;

configDotenv();

await connectDB();
await connectCloudinary();

//Allow multiple origins
const allowedOrigins = ['http://localhost:5173'];

//middleware configuration
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.get('/', (req, res) => { res.send('Api is working'); });
app.use('/api/user', UserRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);

// Export the express app for serverless functions
export const handler = async (req, res) => {
  await app(req, res);
};

export const instance = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});
