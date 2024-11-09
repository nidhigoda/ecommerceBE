const Cart=require('../models/cart.model.js');
const CartItem =require('../models/cartItems.model.js');
const Product =require('../models/product.model.js');



async function createCart(user){
   try{ const cart=new Cart({user});
    const createdCart=await cart.save();
    return createdCart;
    }
    catch(error){
        throw new Error(error.message);
    }
}


async function findUserCart(userId){
    try{
        let cart=await Cart.findOne({user:userId});
        let cartItems=await CartItem.find({cart:cart._id}).populate("product");
        console.log("cartItems",cartItems)
        cart.cartItems=cartItems;
        let totalPrice=0;
        let totalDiscountedPrice=0;
        let totalItem=0;

        for(let cartItem of cart.cartItems){
            totalPrice+=cartItem.price;
            totalDiscountedPrice+=cartItem.discountedPrice;
            totalItem+=cartItem.quantity;

        }
        cart.totalPrice=totalPrice;
        cart.totalItem=totalItem;
        cart.totalDiscountedPrice=totalDiscountedPrice
        cart.discount=totalPrice-totalDiscountedPrice;
        return await cart.save();
    }
    catch(error){
        throw new Error(error.message)
    }
}


async function addCartItem(userId,req){
  try{
    console.log("req",req)
    const cart= await Cart.findOne({user:userId});
    
    const product=await Product.findById(req.productId);
    console.log("product",product)
    const isPresent=await CartItem.findOne({cart:cart._id,product:product._id,userId})
    console.log("isPresent",isPresent)
    if(!isPresent){
        const cartItem= new CartItem({
            product:product._id,
            cart:cart._id,
            quantity:1,
            userId,
            price:product.price,
            size:req.size,
            discountedPrice:product.discountedPrice
        }) 

        const createdCartItem=await cartItem.save();
        console.log("createdCartItem",createdCartItem)
        cart.cartItems.push(createdCartItem);

        await cart.save();
        return "Item added to cart"
       // 
    }
    /*else{
        isPresent.size=req.name;
        console.log("isPresent",isPresent)
        const UpdatedCartItem=await isPresent.save();
        console.log("UpdatedCartItem",UpdatedCartItem);
    }*/
    
  }
  catch(error){
    throw new Error(error)

  }
}

module.exports={createCart,findUserCart,addCartItem}