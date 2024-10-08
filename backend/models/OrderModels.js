const {model, default: mongoose}=require("mongoose");

const {OrderSchema}=require("../schema/OrderSchema.js");

const OrderModel=mongoose.model("order",OrderSchema);

module.exports={OrderModel};