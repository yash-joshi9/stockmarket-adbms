const express = require("express");

var cors = require("cors");
const Stocks = require("../models/stocks");
const auth = require("../middleware/auth");

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
