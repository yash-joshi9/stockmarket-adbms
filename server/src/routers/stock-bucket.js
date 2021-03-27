const express = require("express");

var cors = require("cors");
const StocksBucket = require("../models/stockBucket");
const Stocks = require("../models/stocks");
const User = require("../models/User");


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

router.post("/stock-bucket-add", cors(corsOptions), async (req, res) => {
  try {
    const { userId, name, inputData } = req.body;

    const singleStock = await Stocks.find({ name }, { _id: 1, close: 1 });


    // const user = await User.findById(id);
  
    // const userUpdate = await User.updateOne(
    //   { _id: userId },
    //   {
    //     $set: {
    //       "funds": user.funds - parseInt(funds),
    //     },
    //   }
    // );



    const data = {
      userid: userId,
      stockDetail: { stockId: `${singleStock[0]._id}`, quantity: inputData },
    };

    const allStocks = await StocksBucket.find({
      $and: [
        {
          "stockDetail.stockId": singleStock[0]._id,
        },
        {
          userid: userId,
        },
      ],
    });


    const totalPrice = singleStock[0].close * inputData; 

    const user = await User.findById({_id: userId});
    
    if (user.funds < totalPrice) {
      return res.status(200).send({"error": "Not Enough funds"});
    }

    const userUpdate = await User.updateOne(
      { _id: userId },
      {
        $set: {
          "funds": user.funds - totalPrice,
        },
      }
    );


    if (allStocks.length) {
      const StockQuant = parseInt(allStocks[0].stockDetail.quantity);
      const intQuant = parseInt(inputData);

      const updateStock = await StocksBucket.updateOne(
        { _id: allStocks[0]._id },
        {
          $set: {
            "stockDetail.quantity": StockQuant + intQuant,
          },
        }
      );

      return res.status(200).send(updateStock);
    } else {
      const stockBucket = new StocksBucket(data);
      await stockBucket.save();
      return res.status(200).send(stockBucket);
    }
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});

router.post("/stock-bucket-delete", cors(corsOptions), async (req, res) => {
  try {
    const { userId, name, quantity } = req.body;

    const singleStock = await Stocks.find({ name }, { _id: 1, close: 1 });


    const allStocks = await StocksBucket.find({
      $and: [
        {
          "stockDetail.stockId": singleStock[0]._id,
        },
        {
          userid: userId,
        },
      ],
    })


    const currQuant = parseInt(allStocks[0].stockDetail.quantity);


    const totalPrice = singleStock[0].close * quantity; 
    const user = await User.findById({_id: userId});

    const userUpdate = await User.updateOne(
      { _id: userId },
      {
        $set: {
          "funds": user.funds + totalPrice,
        },
      }
    );

    const updateStock = await StocksBucket.updateOne(
      { _id: allStocks[0]._id },
      {
        $set: {
          "stockDetail.quantity": currQuant - parseInt(quantity),
        },
      }
    );
    
    return res.status(200).send(updateStock);

    // const data = {
    //   userid: userId,
    //   stockDetail: { stockId: `${singleStock[0]._id}`, quantity: inputData },
    // };

  
  
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});



router.post("/my-stocks", cors(corsOptions), auth, async (req, res) => {
  try {
    const { userId } = req.body;

    const singleStock = await StocksBucket.find({ userid: userId });

    const allData = [];
    
    var pushAction = new Promise((resolve, reject) => {
      singleStock.forEach( async (value, index, array) => {
          const id = value.stockDetail.stockId;
          const quant = value.stockDetail.quantity;
          const newData = await Stocks.find({ _id: id });
          const combData = {...newData[0]._doc, quantity: quant}
          allData.push(combData)
        if (index === array.length - 1) resolve();
      });
    });
    pushAction.then(() => {
      return res.status(200).send(allData);
    });

  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});

router.post("/stock-bucket-get", cors(corsOptions), async (req, res) => {
  try {
    console.log(req.body, ">>>>>>>>>>>>");
    return res.status(200).send(">>");
  } catch (error) {
    console.log(error);
    res.status(400).send({ error: "failed to fetch the data " });
  }
});

module.exports = router;
