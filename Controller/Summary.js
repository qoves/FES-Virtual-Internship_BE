const SummaryData = require("../Model/Summary");

exports.SummaryData = async (req, res) => {
  try {
    const { Summary } = req.body;
    const user = await SummaryData.findOne({ User: req.user.userId });
    if (user) {
      await SummaryData.findOneAndUpdate(
        { User: req.user.userId },
        { $set: { Summary: Summary } },
        { new: true }
      )
        .then((result) => {
          return res.status(200).json({
            code: 200,
            message: "Summary Update Successfully",
          });
        })
        .catch((error) => {
          return res.status(404).json({ code: 404, message: error.message });
        });
    } else {
      await new SummaryData({
        User: req.user.userId,
        Summary: Summary,
      })
        .save()
        .then((result) => {
          return res.status(200).json({
            code: 200,
            message: "Summary Store Successfully",
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
