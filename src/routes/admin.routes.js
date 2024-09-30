const express=require('express')
const router=express.Router();

const adminOrder=require('../controller/adminOrder.controller.js')
const authenticate=require('../middleware/authenticate.js')

router.get('/',authenticate,adminOrder.getAllOrders);
router.put('/:orderId/confirmed',authenticate,adminOrder.confirmedOrders);
router.put('/:orderId/ship',authenticate,adminOrder.shipOrders);
router.put('/:orderId/deliver',authenticate,adminOrder.deliveredOrders);
router.put('/:orderId/cancel',authenticate,adminOrder.cancelledOrders);
router.put('/:orderId/delete',authenticate,adminOrder.deleteOrders);

module.exports=router
