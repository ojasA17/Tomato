import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"

const stripe= new Stripe(process.env.STRIPE_SECRET_KEY)



//  placing user order from frontend
const placeOrder = async (req,res) =>{

    const frontend_url ="http://localhost:5173"

    if (!token) {
        toast.error("Please login to place an order");
        return;
      }

    try{
        const newOrder=new orderModel({
            userId:req.body.userId,
            items:req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })
        await newOrder.save();
        await userModel.findByIdAndDelete(req.body.userId,{cartData:{}});

        const line_items=req.body.items.map((item)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:item.name
                },
                unit_amount:item.price*100*80
            },
            quantity:item.quantity
        }))

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charges"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        // const session = await stripe.checkout.session.create({
        //     line_items:line_items,
        //     mode:'payment',
        //     success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
        //     cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        // })

        // res.json({success:true,session_url:session.url})

        clearCart();

      toast.success("Order Placed");
      navigate("/");

    } catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//USER ORDERS FOR FRONTEND  
// const userOrder = async (req,res) =>{
//     try{
//         const orders= await orderModel.find({userId:req.body.userId})
//         res.json({success:true,data:orders})
//     } catch(error){
//         console.log(error);
//         res.json({seccess:false,message:"error"});
//     }

// }

export {placeOrder}