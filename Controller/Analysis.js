const Analysis = require("../Model/Analysis");
const Userdata = require("../Model/User");
const axios = require("axios").default;
const dotenv = require("dotenv");
const { response } = require("express");
dotenv.config();

//-----------------Store WhetherData In DB-----------------------------------------
exports.Whether = async (req, res) => {
  try {
    const { city } = req.body;
    let url = `https://api.weatherbit.io/v2.0/current/airquality?&city=${city}&key=${process.env.URL_KEY}`;
    await axios
      .get(url)
      .then(async (response) => {
        response.data;
        let UVIndex;
        let rate =
          (response.data.data[0].pollen_level_grass +
            response.data.data[0].pollen_level_tree +
            response.data.data[0].pollen_level_weed) /
          3;
        if (rate == 0) {
          UVIndex = "None";
        } else if (rate <= 1) {
          UVIndex = "Low";
        } else if (rate == 2) {
          UVIndex = "Moderate";
        } else if (rate == 3) {
          UVIndex = "High";
        } else if (rate >= 4) {
          UVIndex = "Very High";
        }
        let userdata = await Analysis.findOne({ User: req.user.userId });
        if (!userdata) {
          await new Analysis({
            User: req.user.userId,
            Whether: {
              UVIndex: UVIndex,
              Data: response.data,
            },
          })
            .save()
            .then((result) => {
              return res.status(200).json({
                code: 200,
                message: "WhetherData Store Successfully",
                result,
              });
            })
            .catch((error) => {
              return res
                .status(404)
                .json({ code: 404, message: error.message });
            });
        } else {
          await Analysis.findOneAndUpdate(
            { User: req.user.userId },
            {
              $set: {
                Whether: {
                  UVIndex: UVIndex,
                  Data: response.data,
                },
              },
            },
            { new: true }
          )
            .then((result) => {
              return res.status(200).json({
                code: 200,
                message: "WhetherData Update Successfully",
                result,
              });
            })
            .catch((error) => {
              return res
                .status(404)
                .json({ code: 404, message: error.message });
            });
        }
      })
      .catch((error) => {
        console.log(error.message, ".........err");
      });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 500, message: error.message });
  }
};

//-----------------Get WhetherData From DB-----------------------------------------
exports.GetWhether = async (req, res) => {
  try {
    const user = await Analysis.findOne({ User: req.user.userId });
    if (user) {
      return res.status(200).json({ code: 200, message: user.Whether });
    } else
      return res
        .status(404)
        .json({ code: 404, message: "WhetherData is not found" });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 500, message: error.message });
  }
};

//-----------------Store DemographicsData In DB-----------------------------------------
exports.Demographics = async (req, res) => {
  try {
    const { Demographics } = req.body;

    await Analysis.findOneAndUpdate(
      { User: req.user.userId },
      {
        $set: {
          Demographics,
        },
      },
      { new: true }
    )
      .then((result) => {
        return res.status(200).json({
          code: 200,
          message: "Demographics Add Successfully",
        });
      })
      .catch((error) => {
        return res.status(404).json({ code: 404, message: error.message });
      });
    // }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 500, message: error.message });
  }
};

//-----------------Store CosmeticConcernsData In DB-----------------------------------------
exports.Cosmeticconcerns = async (req, res) => {
  try {
    const { CosmeticConcerns } = req.body;

    await Analysis.findOneAndUpdate(
      { User: req.user.userId },
      {
        $set: {
          CosmeticConcerns: CosmeticConcerns,
        },
      },
      { new: true }
    )
      .then((result) => {
        return res.status(200).json({
          code: 200,
          message: "CosmeticConcerns Add Successfully",
        });
      })
      .catch((error) => {
        return res.status(404).json({ code: 404, message: error.message });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 500, message: error.message });
  }
};

//-----------------Store SkintypeData In DB-----------------------------------------
exports.Skintypes = async (req, res) => {
  try {
    const { SkinType } = req.body;
    let skindata = SkinType.find((data) => data.Name == "BaumanSkinType");
    let skindata1 = SkinType.find((data) => data.Name == "VanLuschanChart");
    const ST1 = [
      "DRPT",
      "DRNT",
      "DSPT",
      "DSNT",
      "DRPW",
      "DRNW",
      "DSPW",
      "DSNW",
    ];
    const ST2 = [
      "ORPT",
      "ORNT",
      "OSPT",
      "OSNT",
      "ORPW",
      "ORNW",
      "OSPW",
      "OSNW",
    ];
    let skintype;
    let skincolor;
    if (ST1.includes(skindata.SkinType)) {
      skintype = "Dehydrated ";
    } else {
      skintype = "Oily";
    }
    if (skindata1.Prediction >= 0 && skindata1.Prediction <= 6) {
      skincolor = "Very Light";
    } else if (skindata1.Prediction >= 7 && skindata1.Prediction <= 13) {
      skincolor = "Light Skinned";
    } else if (skindata1.Prediction >= 14 && skindata1.Prediction <= 20) {
      skincolor = "Light Intermidiate";
    } else if (skindata1.Prediction >= 21 && skindata1.Prediction <= 27) {
      skincolor = "Dark Intermidiate";
    } else if (skindata1.Prediction >= 28 && skindata1.Prediction <= 34) {
      skincolor = "Dark Or Brown";
    } else if (skindata1.Prediction >= 35 && skindata1.Prediction <= 36) {
      skincolor = "Very Dark";
    }

    await Analysis.findOneAndUpdate(
      { User: req.user.userId },
      {
        $set: {
          SkinType: SkinType,
          skincolor: skincolor,
          skintype: skintype,
        },
      },
      { new: true }
    )
      .then((result) => {
        return res.status(200).json({
          code: 200,
          message: "SkinType Add Successfully",
        });
      })
      .catch((error) => {
        return res.status(404).json({ code: 404, message: error.message });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 500, message: error.message });
  }
};

// -------------------------- Store User Image in S3 Bucket ------------------------------
exports.UploadImage = async (req, res) => {
  try {
    const file = req.file;
    if (!file) {
      return res
        .status(400)
        .json({ code: 400, message: "Please Upload Image" });
    }
    res.send(file);
  } catch (error) {
    return res.status(500).json({ code: 500, message: error.message });
  }
};
// -------------------------- Store User Image in S3 Bucket ------------------------------

//-----------------All Analysis response-----------------------------------------
exports.anlysis = async (req, res) => {
  try {
    let Whether;
    const { Demographics, CosmeticConcerns, SkinType, city } = req.body;
    let skindata = SkinType.find((data) => data.Name == "BaumanSkinType");
    let skindata1 = SkinType.find((data) => data.Name == "VanLuschanChart");
    const ST1 = [
      "DRPT",
      "DRNT",
      "DSPT",
      "DSNT",
      "DRPW",
      "DRNW",
      "DSPW",
      "DSNW",
    ];
    const ST2 = [
      "ORPT",
      "ORNT",
      "OSPT",
      "OSNT",
      "ORPW",
      "ORNW",
      "OSPW",
      "OSNW",
    ];
    let skintype;
    let skincolor;
    if (ST1.includes(skindata.SkinType)) {
      skintype = "Dehydrated ";
    } else {
      skintype = "Oily";
    }
    if (skindata1.Prediction >= 0 && skindata1.Prediction <= 6) {
      skincolor = "Very Light";
    } else if (skindata1.Prediction >= 7 && skindata1.Prediction <= 13) {
      skincolor = "Light Skinned";
    } else if (skindata1.Prediction >= 14 && skindata1.Prediction <= 20) {
      skincolor = "Light Intermidiate";
    } else if (skindata1.Prediction >= 21 && skindata1.Prediction <= 27) {
      skincolor = "Dark Intermidiate";
    } else if (skindata1.Prediction >= 28 && skindata1.Prediction <= 34) {
      skincolor = "Dark Or Brown";
    } else if (skindata1.Prediction >= 35 && skindata1.Prediction <= 36) {
      skincolor = "Very Dark";
    }

    await axios({
      method: "get",
      url: `https://api.ambeedata.com/latest/by-city`,
      params: { city: req.body.city },
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.WHETHER_API_KEY,
      },
    })
      .then((response) => {
        Whether = response.data;
      })
      .catch((error) => {
        console.log(error.message, ".........err");
      });
    let user = await Userdata.findOne({ userId: req.user.userId });
    let userdata = await Analysis.findOne({ User: req.user.userId });
    if (!userdata) {
      console.log(Whether, "......");
      await new Analysis({
        User: req.user.userId,
        Demographics,
        CosmeticConcerns,
        SkinType,
        Whether: Whether,
        skintype,
        skincolor,
      })
        .save()
        .then((result) => {
          return res.status(200).json({
            code: 200,
            message: "Analysis Store Successfully",
            result,
          });
        })
        .catch((error) => {
          return res.status(404).json({ code: 404, message: error.message });
        });
    } else {
      await Analysis.findOneAndUpdate(
        { User: req.user.userId },
        {
          $set: {
            Demographics,
            CosmeticConcerns,
            SkinType,
            Whether: Whether,
            skintype,
            skincolor,
          },
        },
        { new: true }
      )
        .then((result) => {
          return res.status(200).json({
            code: 200,
            message: "Analysisdata Update Successfully",
            result,
          });
        })
        .catch((error) => {
          return res.status(404).json({ code: 404, message: error.message });
        });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ code: 500, message: 500, message: error.message });
  }
};
