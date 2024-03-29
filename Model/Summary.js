const mongoose = require("mongoose");
const SummarySchema = mongoose.Schema({
  User: String,
  Summary: [
    {
      Name: String,
      Age: String,
      CosmeticData: [],
      Color: String,
      Type: String,
    },
  ],
});

module.exports = mongoose.model("SummaryData", SummarySchema);
