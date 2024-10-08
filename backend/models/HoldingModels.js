const {model, default: mongoose}=require("mongoose");

const {holdingSchema}=require("../schema/HoldingSchema.js");

const HoldingModel=mongoose.model('holding',holdingSchema);

module.exports={HoldingModel};