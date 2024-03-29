const express = require("express");
const router = express.Router();
const Controller = require("../Controller/AWS");
const passport = require("passport");
require("../Middleware/Passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

var profileImageStorage = multer.diskStorage({
  destination: async function (req, file, cb) {
    const profileImguploadDir = path.join(__dirname, "..", "public");
    if (fs.existsSync(profileImguploadDir)) {
      cb(null, profileImguploadDir);
    } else {
      fs.mkdirSync(profileImguploadDir, { recursive: true });
      cb(null, profileImguploadDir);
    }
  },
  filename: async function (req, file, cb) {
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf(".")
    );
    cb(
      null,
      Math.random().toString(36).substring(2, 15) + "_" + Date.now() + extension
    );
  },
});
const uploadprofileImg = multer({
  storage: profileImageStorage,
  fileFilter: function (req, file, cb) {
    const fileType = /jpeg|jpg|png/;
    // const fileType = /png/;
    const extension = file.originalname.substring(
      file.originalname.lastIndexOf(".") + 1
    );
    const mimetype = fileType.test(file.mimetype);
    file.filepath = "/";
    if (mimetype && extension) {
      return cb(null, true);
    } else {
      cb("Error:you can upload only Image file");
    }
  },
});

router.post(
  "/image",
  uploadprofileImg.single("image"),
  // passport.authenticate("jwt", { session: false }),
  Controller.UploadImg
);

module.exports = router;