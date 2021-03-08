const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://YashWindsor:Windsor12345@cluster0.emgoq.mongodb.net/Fantasy-League", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
