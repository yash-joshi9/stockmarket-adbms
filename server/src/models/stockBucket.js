const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const Schema = mongoose.Schema;

const stockBucketSchema = new mongoose.Schema({
  userid: { type: Schema.Types.ObjectId, ref: "User" },
  stockDetail: {
    stockId: { type: Schema.Types.ObjectId, ref: "Stocks" },
    quantity: Number,
  },
});


stockBucketSchema.pre("save", async function (next) {
    const stock = this;
    
    const id = stock.stockDetail.stockId
    const quantity = stock.stockDetail.quantity

    const allStocks = await StockBucket.findOne({"stockDetail.stockId": id});

    if(allStocks) {
        
    }
  
    next();
  });



const StockBucket = mongoose.model("StockBucket", stockBucketSchema);

module.exports = StockBucket;
