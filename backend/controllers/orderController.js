import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order for frontend
const placeOrder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Create a new order with the current date
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
            date: new Date(), // Add the current date
        });
        await newOrder.save();

        // Clear the user's cart
        await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

        // Prepare line items for Stripe
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: "LKR",
                product_data: {
                    name: item.name,
                },
                unit_amount: Math.round(item.price * 100), // Assuming item.price is in LKR
            },
            quantity: item.quantity,
        }));

        // Add delivery charges
        line_items.push({
            price_data: {
                currency: "LKR",
                product_data: {
                    name: "Delivery Charges",
                },
                unit_amount: 350 * 100, // Delivery charges in cents
            },
            quantity: 1,
        });

        // Create a Stripe session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        });

        res.json({ success: true, session_url: session.url });

    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Error placing order" });
    }}
    
    const verifyOrder = async (req,res) =>{
        const {orderId,success} = req.body;
        try {
            if (success=="true") {
                await orderModel.findByIdAndUpdate(orderId,{payment:true});
                res.json({success:true,message:"Paid"})
            }
            else{
                await orderModel.findByIdAndDelete(orderId);
                res.json({success:true,message:"Not Paid"})
            }
        } catch (error) {
            console.log(error);
            res.json({success:false,message:"Error"})
        }
}
// user orders for frontend
const userOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({userId:req.body.userId});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}

// Listing orders for admin panel
const listOrders = async (req,res) =>{
    try {
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
// Updating order status
const updateStatus = async (req,res) =>{
    try {
       await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
       res.json({success:true,message:"Status Updated"})
    } catch (error) {
        console.log(error);
        res.json({success:false,message:"Error"})
    }
}
export { placeOrder,verifyOrder,userOrders,listOrders,updateStatus };
