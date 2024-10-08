const {Schema}=require("mongoose");

const OrderSchema=new Schema({
    name:String,
    qty:Number,
    price:Number,
    mode:String,//buy or sell
});

module.exports={OrderSchema};