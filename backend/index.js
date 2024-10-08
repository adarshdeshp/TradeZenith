require("dotenv").config();
const express=require("express");
const app=express();
const mongoose=require("mongoose");
const PORT=process.env.PORT||3000;
const bodyParser=require("body-parser");
const cors=require("cors");
const {HoldingModel}=require("./models/HoldingModels");
const { PositionModel } = require("./models/PositionModels");
const {OrderModel}=require("./models/OrderModels");

mongoose.connect(process.env.MONGO_URL)
    .then(() => console.log('DB connected'))
    .catch((err) => console.log('DB connection error:', err));


    // app.get("/addHoldings", async (req, res) => {
    //     let tempHoldings = [
    //         {
    //             name: "BHARTIARTL",
    //             qty: 2,
    //             avg: 538.05,
    //             price: 541.15,
    //             net: "+0.58%",
    //             day: "+2.99%",
    //           },
    //           {
    //             name: "HDFCBANK",
    //             qty: 2,
    //             avg: 1383.4,
    //             price: 1522.35,
    //             net: "+10.04%",
    //             day: "+0.11%",
    //           },
    //           {
    //             name: "HINDUNILVR",
    //             qty: 1,
    //             avg: 2335.85,
    //             price: 2417.4,
    //             net: "+3.49%",
    //             day: "+0.21%",
    //           },
    //           {
    //             name: "INFY",
    //             qty: 1,
    //             avg: 1350.5,
    //             price: 1555.45,
    //             net: "+15.18%",
    //             day: "-1.60%",
    //             isLoss: true,
    //           },
    //           {
    //             name: "ITC",
    //             qty: 5,
    //             avg: 202.0,
    //             price: 207.9,
    //             net: "+2.92%",
    //             day: "+0.80%",
    //           },
    //           {
    //             name: "KPITTECH",
    //             qty: 5,
    //             avg: 250.3,
    //             price: 266.45,
    //             net: "+6.45%",
    //             day: "+3.54%",
    //           },
    //           {
    //             name: "M&M",
    //             qty: 2,
    //             avg: 809.9,
    //             price: 779.8,
    //             net: "-3.72%",
    //             day: "-0.01%",
    //             isLoss: true,
    //           },
    //           {
    //             name: "RELIANCE",
    //             qty: 1,
    //             avg: 2193.7,
    //             price: 2112.4,
    //             net: "-3.71%",
    //             day: "+1.44%",
    //           },
    //           {
    //             name: "SBIN",
    //             qty: 4,
    //             avg: 324.35,
    //             price: 430.2,
    //             net: "+32.63%",
    //             day: "-0.34%",
    //             isLoss: true,
    //           },
    //           {
    //             name: "SGBMAY29",
    //             qty: 2,
    //             avg: 4727.0,
    //             price: 4719.0,
    //             net: "-0.17%",
    //             day: "+0.15%",
    //           },
    //           {
    //             name: "TATAPOWER",
    //             qty: 5,
    //             avg: 104.2,
    //             price: 124.15,
    //             net: "+19.15%",
    //             day: "-0.24%",
    //             isLoss: true,
    //           },
    //           {
    //             name: "TCS",
    //             qty: 1,
    //             avg: 3041.7,
    //             price: 3194.8,
    //             net: "+5.03%",
    //             day: "-0.25%",
    //             isLoss: true,
    //           },
    //           {
    //             name: "WIPRO",
    //             qty: 4,
    //             avg: 489.3,
    //             price: 577.75,
    //             net: "+18.08%",
    //             day: "+0.32%",
    //           },
    //     ];
        
    //     try {
    //       for (let item of tempHoldings) {
    //         let newHolding = new HoldingModel({
    //           name: item.name,
    //           qty: item.qty,
    //           avg: item.avg,
    //           price: item.price,
    //           net: item.net,
    //           day: item.day,
    //         });
    //         await newHolding.save();
    //       }
    //       res.send("Holdings added successfully!");
    //     } catch (error) {
    //       res.status(500).send("Error adding holdings: " + error.message);
    //     }
    //   });

// app.get("/addPositions",async(req,res)=>{
// let tempPositions=[
//     {
//         product: "CNC",
//         name: "EVEREADY",
//         qty: 2,
//         avg: 316.27,
//         price: 312.35,
//         net: "+0.58%",
//         day: "-1.24%",
//         isLoss: true,
//       },
//       {
//         product: "CNC",
//         name: "JUBLFOOD",
//         qty: 1,
//         avg: 3124.75,
//         price: 3082.65,
//         net: "+10.04%",
//         day: "-1.35%",
//         isLoss: true,
//       },
// ];
// try {
//           for (let item of tempPositions) {
//             let newPosition = new PositionModel({
//                 product: item.product,
//                 name: item.name,
//                 qty: item.qty,
//                 avg: item.avg,
//                 price: item.price,
//                 net: item.net,
//                 day: item.day,
//                 isLoss: item.isLoss,
//             });
//             await newPosition.save();
//           }
//           res.send("Positions added successfully!");
//         } catch (error) {
//           res.status(500).send("Error adding positions: " + error.message);
//         }
// })

app.use(cors());
app.use(bodyParser.json());

app.get('/allHoldings',async(req,res)=>{
    let allHoldings=await HoldingModel.find({});
    res.json(allHoldings);
})

app.get("/allPositions",async(req,res)=>{
   let allPositions=await PositionModel.find({});
   res.json(allPositions);
});

app.post("/newOrder",async(req,res)=>{
let newOrder=new OrderModel({
name:req.body.name,
qty:req.body.qty,
price:req.body.price,
mode:req.body.mode
});
newOrder.save();
});

app.get("/allOrders",async(req,res)=>{
    let allOrders=await OrderModel.find({});
    res.json(allOrders);
})

app.post("/sellOrder",async(req,res)=>{

   try {
    const result = await OrderModel.deleteOne({ name:req.body.name });

    if (result.deletedCount === 1) {
      console.log(`Successfully deleted the stock: ${req.body.name }`);
    } else {
      console.log(`No stock found with the name: ${req.body.name }`);
    }
  } catch (error) {
    console.error(`Error deleting the stock: ${error.message}`);
  }
})

app.listen(PORT,()=>{
    console.log("App is listening to port 8080");
})