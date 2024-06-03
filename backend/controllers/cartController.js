import userModel from '../models/userModel.js'

// add items to user cart
// const addToCart = async(req,res) =>{
//     try{
//         let userData=await userModel.findById(req.body.userId);
//         let cartData=await userData.cartData;
//         if(!cartData[req.body.itemId]){
//             cartData[req.body.itemId]=1
//         }
//         else{
//             cartData[req.body.itemId] += 1;
//         }

//         await userModel.findByIdAndUpdate(req.body.userId,{cartData});
//         res.json({success:true,message:"Added to Cart"});    
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"});
//     }
// }

const addToCart = async (req, res) => {
  try {
      let userData = await userModel.findById(req.body.userId);
      if (!userData) {
          return res.status(404).json({ success: false, message: "User not found" });
      }

      let cartData = userData.cartData || {}; // Initialize cartData if it's null

      if (!cartData[req.body.itemId]) {
          cartData[req.body.itemId] = 1;
      } else {
          cartData[req.body.itemId] += 1;
      }

      await userModel.findByIdAndUpdate(req.body.userId, { cartData });
      res.json({ success: true, message: "Added to Cart" });
  } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Error" });
  }
}

//remove items from user cart

const removeFromCart = async(req,res) =>{
    try{
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        if(cartData[req.body.itemId]>0){
            cartData[req.body.itemId]-=1;
        }
        await userModel.findByIdAndUpdate(req.body.userId,{cartData});
        res.json({success:true,message:"Removed from cart"})



    }catch(error){
        console.log(error);
        res.json({success:false,message:"Error"});
    }
}

//fetch usercart data
// const getCart = async (req,res) =>{
//     try{
//         let userData=await userModel.findById(req.body.userId);
//         let cartData=await userData.cartData;
//         //console.log(cartData);
//         res.json({success:true,cartData})
//     }catch(error){
//         console.log(error);
//         res.json({success:false,message:"Error"})
//     }
// }

const getCart = async (req, res) => {
    try {
      // Fetch user data using the user ID from the request body
      let userData = await userModel.findById(req.body.userId);
      
      // Check if user data is found
      if (!userData) {
        return res.status(404).json({ success: false, message: "User not found" });
      }
  
      // Access cartData directly from the user data
      let cartData = userData.cartData;
      
      // If cartData is not found, handle accordingly
      if (!cartData) {
        return res.status(404).json({ success: false, message: "Cart data not found" });
      }
  
      // Send response with cartData
      res.json({ success: true, cartData });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    }
  };
  

export {addToCart,removeFromCart,getCart}