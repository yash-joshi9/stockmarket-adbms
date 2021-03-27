

const mongoose = require("mongoose");
require('dotenv').config()

const StocksSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  series: {
    type: String,
    required: true,
    trim: true,
  },
  open: {
    type: Number,
    required: true,
    trim: true,
  },
  high: {
      type: Number,
      required: false,
      trim: true
  },
  low: {
    type: Number,
    required: false,
    trim: true
  },
  close: {
    type: Number,
    required: false,
    trim: true
  },
  last: {
    type: Number,
    required: false,
    trim: true
  },
  prevClose: {
    type: Number,
    required: false,
    trim: true
  },
  totalQuantTraded: {
    type: Number,
    required: false,
    trim: true
  },
  numTradingTransaction: {
    type: Number,
    required: false,
    trim: true
  },
  totalTrades: {
    type: Number,
    required: false,
    trim: true
  },
  ISIN: {
    type: String,
    required: false,
    trim: true
  }
});


const Stocks = mongoose.model("Stocks", StocksSchema);

module.exports = Stocks;
