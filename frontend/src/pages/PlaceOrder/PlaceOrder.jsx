import React, { useContext,  useState } from 'react'
import '../PlaceOrder/PlaceOrder.css'
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const PlaceOrder = () => {
  //toast.configure();
  const navigate=useNavigate();
  const {getTotalCartAmount,token,food_list,cartItems,url,clearCart}=useContext(StoreContext);

  const [data,setData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    street:"",
    city:"",
    state:"",
    zipcode:"",
    country:"",
    phone:""
  })

  const onChangeHandler= (event) =>{
    const name=event.target.name;
    const value=event.target.value;
    setData(data => ({...data,[name]:value}))
  }

  const placeOrder = async (event) =>{
    event.preventDefault();

    if (!token) {
       //alert("Please login to place an order");
      toast("Please login to place an order");
      return;
    }

    let orderItems = [];
    food_list.map((item)=>{
      if(cartItems[item._id]>0){
        let itemInfo = item;
        itemInfo["quantity"]=cartItems[item._id];
        orderItems.push(itemInfo)
      }
    })

    let orderData={
      address:data,
      items:orderItems,
      amount:getTotalCartAmount()+2,
    }

    clearCart();

    // alert("Order Placed")
    toast("Order Placed");

    navigate("/");

  }



  return (
   <form onSubmit={placeOrder} className='place-order' >
    <div className='place-order-left'>
      <p className='title'>Delivery Information</p>
      <div className='milti-fields'>
        <input  required name="firstName" onChange={onChangeHandler} value={data.firstName} type="text" placeholder='First Name'></input>
        <input  required name="lastName" onChange={onChangeHandler} value={data.lastName}   type="text" placeholder='Last Name'></input>

      </div>
      <input  required name="email" onChange={onChangeHandler} value={data.email} type="email" placeholder='Email address'></input>
      <input  required name='street' onChange={onChangeHandler} value={data.street} type="text" placeholder='Street'></input>
      <div className='milti-fields'>
        <input  required name='city' onChange={onChangeHandler} value={data.city} type="text" placeholder='City'></input>
        <input  required name='state' onChange={onChangeHandler} value={data.state} type="text" placeholder='State'></input>
      </div>
      <div className='milti-fields'>
        <input required  name='zipcode' onChange={onChangeHandler} value={data.zipcode} type="text" placeholder='Zip Code'></input>
        <input  required name='country' onChange={onChangeHandler} value={data.country} type="text" placeholder='Country'></input>

      </div>
      <input  required name='phone' onChange={onChangeHandler} value={data.phone} type="text" placeholder='Phone'></input>
    </div>
    <div className='place-order-right'>
    <div className='cart-total'>
          <h2>Cart Totals</h2>
          <div>
          <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${getTotalCartAmount()}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${getTotalCartAmount()===0?0:2}</p>
            </div>
            <hr/>
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${getTotalCartAmount()===0?0:getTotalCartAmount()+2}</b>
            </div>
          </div>
          <button type='submit'>PROCEED TO PAYMENT</button>
          
        </div>
    </div>
   </form>
  )
}
export default PlaceOrder