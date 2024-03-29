const CustmizationData = require("../Model/Custmization");

exports.Custmization = async (req, res) => {
  try {
    const { Custmization } = req.body;
    const user = await CustmizationData.findOne({ User: req.user.userId });
    if (user) {
      await CustmizationData.findOneAndUpdate(
        { User: req.user.userId },
        { $set: { Custmization: Custmization } },
        { new: true }
      )
        .then((result) => {
          return res.status(200).json({
            code: 200,
            message: "custmizationData Update Successfully",
          });
        })
        .catch((error) => {
          return res.status(404).json({ code: 404, message: error.message });
        });
    } else {
      await new CustmizationData({
        User: req.user.userId,
        Custmization: Custmization,
      })
        .save()
        .then((result) => {
          return res.status(200).json({
            code: 200,
            message: "custmizationData Store Successfully",
          });
        })
        .catch((error) => {
          return res.status(404).json({ code: 404, message: error.message });
        });
    }
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
