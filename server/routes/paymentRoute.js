import express from 'express'
import { getKey, paymentVerification, processPayment } from '../controllers/paymentController.js'
import { authUser } from '../middleware/authMiddleware.js'

const paymentRouter = express.Router()

paymentRouter.post('/process',authUser,processPayment)
paymentRouter.post('/verify',paymentVerification)
paymentRouter.get('/get',getKey)


export default paymentRouter;