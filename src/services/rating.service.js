const Rating =require('../models/rating.model.js');
const productService= require('../services/product.service.js');
const Product=require('../models/product.model.js')
async function createRating(req,user){
   console.log("req",req)
    const product=await productService.findProductById(req.productId);
   let productDetails=await Product.findOne({_id:req.productId})
   console.log("productDetails",productDetails)
    const rating= new Rating({
        product:product._id,
        user:user._id,
        rating:req.rating,
        createdAt: new Date()
    })
    productDetails.ratings.push(rating._id);
   await  productDetails.save();

    return await rating.save();
}

async function getProductRating(productId){

    return await Rating.find({product:productId}).populate('user');

}

module.exports={
    createRating,
    getProductRating
}