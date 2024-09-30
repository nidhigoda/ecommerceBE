const userService=require('../services/user.service.js')
const CartItem=require('../models/cartItems.model')



async function updateCartItem(userId,cartItemId,cartItemData){
    try{
        const item=await findCartItemById(cartItemId);
        console.log("item",item)
        if(!item){
            throw new Error('cart item not found',item)
        }
        const user=await userService.findUserById(item.userId);
        
        if(!user){
            throw new Error('user not found',userId)
        }

        console.log("type of item.product.price",typeof(item.price))
        if(user._id.toString()===userId.toString())
        {
            item.quantity=cartItemData.quantity;
            item.price=item.quantity*item.product.price;
            item.discountedPrice=item.quantity*item.product.discountedPrice; 
            const updatedCartItem=await item.save();
            return updatedCartItem;
        }
        else{
            throw new Error("you can't update this cart item");
        }
    }
    catch(error){
        throw new Error(error.message)
    }
}

async function removeCartItem(userId,cartItemId){

    const cartItem=await findCartItemById(cartItemId);
    const user=await userService.findUserById(userId);

    if(user._id.toString()===cartItem.userId.toString()){
        await CartItem.findByIdAndDelete(cartItemId)
    }
    else{
        throw new Error("You cant remove another user item.")
    }
}

async function findCartItemById(cartItemId){
    const cartItem=await CartItem.findById(cartItemId).populate('product')
    if(cartItem){
        return cartItem
    }
    else{
        throw new Error("cartItem not found with id", cartItemId)
    }

}

module.exports={
    updateCartItem,
    removeCartItem,
    findCartItemById
}