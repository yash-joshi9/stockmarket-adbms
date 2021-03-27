const express = require("express");

var cors = require("cors");
const Stocks = require("../models/stocks");
const StocksBucket = require("../models/stockBucket");
const auth = require("../middleware/auth");
var schedule  = require('node-schedule');

var app = express();
app.use(cors());

const router = new express.Router();

var corsOptions = {
  origin: "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "*",
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
};

const ss = require("../data/demo-stock");



// '* * * * * *' - runs every second
// '*/5 * * * * *' - runs every 5 seconds
// '10,20,30 * * * * *' - run at 10th, 20th and 30th second of every minute
// '0 * * * * *' - runs every minute
// '0 0 * * * *' - runs every hour (at 0 minutes and 0 seconds)

const job = schedule.scheduleJob('0 * * * * *', function(date){

  console.log('This job was supposed to run at ' + date + ', but actually ran at ' + new Date());
});



// // add players to db
//   ss.stock.forEach(async function(t) {
//     console.log(t)
//   const s = new Stocks(t)
//   await s.save()
// });

router.get("/stocks", cors(corsOptions), async (req, res) => {
  try {
    const allStock = await Stocks.find();
    return res.status(200).send(allStock);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});


router.post("/stock-compare", cors(corsOptions), async (req, res) => {
  try {

    let { Stockfirst, stockSecond } = req.body;

    const allStock = await Stocks.find({name: [Stockfirst, stockSecond]});

    return res.status(200).send(allStock);
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});


router.post("/stocks-by-name", cors(corsOptions), auth, async (req, res) => {
  try {
    let { name } = req.body;

    const singleStock = await Stocks.find({name});
    return res.status(200).send(singleStock)
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});

module.exports = router;
