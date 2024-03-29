const axios = require("axios").default;
// const formData = new FormData();
exports.UploadImg = async (req, res) => {
  try {
    const image = req.file.filepath + req.file.filename;
    console.log(image);
    axios({
      method: "post",
      url: "https://bivw7mc2w6.execute-api.us-east-2.amazonaws.com/book_one",
      data: { image: image },
      headers: {
        "Content-Type": "multipart/form-data",
        "x-api-key": process.env.X_API_KEY,
      },
    })
      .then((response) => {
        return res.send({ code: 200, message: response.data });
      })
      .catch((error) => {
        return res.send({ code: 404, message: error.message });
      });
  } catch (error) {
    return res.status(500).send({ code: 500, message: error.message });
  }
};
