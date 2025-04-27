import Order from "../models/Order.js"
import Product from "../models/Product.js"


//place order COD : /api/order/cod
export const placeOrderCOD = async(req,res) =>{
    try {
        const userId = req.userId
        const { items, address} = req.body
        if(!address || items.length === 0){
            return res.json({success: false, message: 'Invalid data'})
        }
        //calculate amount using items
        let amount = await items.reduce(async(acc, item)=>{
            const product = await Product.findById(item.product)
            return (await acc) + product.offerPrice * item.quantity
        },0)

        //add tax cahrge (2%)
        amount += Math.floor(amount * 0.02)

        await Order.create({
            userId,
            items,
            amount,
            address,
            paymentType: 'COD'
        })

        return res.json({success: true, message: 'Order Placed Successfully'})
    } catch (error) {
        return res.json({success: false, message: error.message})
    }
}


//get order by user id : /api/order/user
export const getUserOrders = async (req, res) => {
    try {
      const userId = req.userId;
      const { paymentType } = req.query;
  
      let filter = { userId };
  
      if (paymentType === 'COD') {
        filter.$or = [
          { paymentType: 'COD' },
          { isPaid: true }
        ];
      } else if (paymentType === 'ONLINE') {
        filter.paymentType = 'ONLINE';
        filter.isPaid = true;
      }
  
      const orders = await Order.find(filter)
        .populate('items.product')
        .populate('address')
        .sort({ createdAt: -1 })
        .lean();
  
      res.json({ success: true, orders });
    } catch (error) {
      res.status(500).json({ success: false, message: error.message });
    }
  };
  

//get all orders (for seller / admin) : /api/order/seller
export const getAllOrders = async(req,res) =>{
    try {
        const orders = await Order.find({
            $or: [{paymentType: 'COD'}, {isPaid: true}]
        }).populate('items.product address').sort({createdAt: -1})
        res.json({success: true, orders})
    } catch (error) {
        res.json({success: false, message: error.message})
    }
}