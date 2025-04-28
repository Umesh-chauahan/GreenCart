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

// Allow multiple origins dynamically
const allowedOrigins = ['http://localhost:5173', 'https://greencart-rosy.vercel.app','https://greencart-umesh-chauhans-projects.vercel.app/'];

const corsOptions = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());

// Routes
app.get('/', (req, res) => res.send('API is working'));
app.use('/api/user', UserRouter);
app.use('/api/seller', sellerRouter);
app.use('/api/product', productRouter);
app.use('/api/cart', cartRouter);
app.use('/api/address', addressRouter);
app.use('/api/order', orderRouter);
app.use('/api/payment', paymentRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
