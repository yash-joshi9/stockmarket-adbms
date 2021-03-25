const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/stock-market-main", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
