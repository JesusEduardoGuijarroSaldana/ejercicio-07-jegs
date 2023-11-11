const mongoose = require("mongoose");
// const uriLocal = "mongodb://127.0.0.1:27017/shop"
const uri =
  "mongodb+srv://jesus-guijarro:deTTeJLGuWLxsBjy@clusterjegs.vwyi8lu.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(uri);

module.exports = mongoose;
