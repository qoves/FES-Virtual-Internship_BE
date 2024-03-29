const mongoose = require("mongoose");
const AnalysisSchema = mongoose.Schema({
  User: String,
  Demographics: {
    Race: {
      Variant: String,
      Prediction: String,
    },

    Age: {
      Criteria: String,
      Prediction: String,
    },

    Sex: {
      Type: String,
    },
  },
  CosmeticConcerns: [
    {
      Name: String,
      Detected: String,
      Prediction: String,
      Description: String,
    },
  ],

  SkinType: [
    {
      Name: String,
      SkinType: String,
      Description: String,
      Prediction: String,
    },
  ],
  Whether: {
    UVIndex: String,
    Data: Object,
  },
  skincolor: String,
  skintype: String,
});

module.exports = mongoose.model("Analysis", AnalysisSchema);
