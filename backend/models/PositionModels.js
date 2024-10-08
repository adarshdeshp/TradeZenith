const {model, default: mongoose} =require("mongoose");

const {PositionSchema}=require("../schema/PositionSchema.js");

const PositionModel=mongoose.model("position",PositionSchema);

module.exports={PositionModel};