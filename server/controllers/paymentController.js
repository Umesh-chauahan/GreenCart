
import { instance } from "../server.js"
import crypto from "crypto";
import Order from "../models/Order.js"

import dotenv from "dotenv";
dotenv.config()

export const processPayment = async (req, res) => {
    try {
        

        const { items, address, amount } = req.body;

        if (!address || items.length === 0) {
            return res.json({ success: false, message: 'Invalid data' });
        }

       
        
        // Create Razorpay Order
        const options = {
            amount: Math.round(amount * 100), // amount must be an integer in paise
            currency: "INR",
            receipt: `receipt_order_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
        };
        

        const myOrder = await instance.orders.create(options);

        // Save MongoDB Order
        await Order.create({
            userId: req.userId,
            items,
            amount,
            address,
            paymentType: 'Online',
            razorpay_order_id: myOrder.id,
        });

        return res.json({
            success: true,
            order: myOrder, // sending razorpay order object
            amount 
        });
    } catch (error) {
        console.error(error);
        return res.json({ success: false, message: error.message });
    }
}

 export const getKey = (req,res) =>{

    res.status(200).json({
        key: process.env.RAZORPAY_API_KEY
    })
 }



 export const paymentVerification = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac('sha256', instance.key_secret)
      .update(body)
      .digest('hex');

    if (expectedSignature === razorpay_signature) {
      await Order.findOneAndUpdate(
        { razorpay_order_id: razorpay_order_id },
        { isPaid: true }
      );

      return res.status(200).json({ success: true, message: "Payment Verified and Order Updated" });
    } else {
      return res.status(400).json({ success: false, message: "Payment verification failed" });
    }
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
  }
};

