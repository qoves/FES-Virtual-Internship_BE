const mongoose = require("mongoose");
const CustmizationData = mongoose.Schema({
  User: String,
  Custmization: [
    {
      name: String,
      Data: {
        keyingredients: [{ name: String, image: String, reason: String }],
        fragrance: [],
        consistancy: String,
        base: String,
        Preservatives: String,
      },
    },
    {
      name: String,
      Data: {
        keyingredients: [{ name: String, image: String, reason: String }],
        fragrance: [],
        consistancy: String,
        base: String,
        preservatives: String,
      },
    },
    {
      name: String,
      Data: {
        keyingredients: [{ name: String, image: String, reason: String }],
        fragrance: [],
        consistancy: String,
        base: String,
        preservatives: String,
      },
    },
    {
      name: String,
      Data: {
        keyingredients: [{ name: String, image: String, reason: String }],
        fragrance: [],
        consistancy: String,
        base: String,
        preservatives: String,
      },
    },
    {
      name: String,
      Data: {
        keyingredients: [{ name: String, image: String, reason: String }],
        fragrance: [],
        consistancy: String,
        base: String,
        preservatives: String,
      },
    },
  ],
});

module.exports = mongoose.model("Custmization", CustmizationData);
