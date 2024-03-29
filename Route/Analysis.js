const express = require("express");
const router = express.Router();
const Analysis = require("../Controller/Analysis");
const passport = require("passport");
const multer = require("multer");
const AWS = require("aws-sdk");
const multerS3 = require("multer-s3");
require("../Middleware/Passport");
const path = require("path");

//Define AWS Access
const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

const maxUploadSize = 51 * 1024 * 1024;
var upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    //   acl: 'public-read',      Get it enabled from the dashboard and uncomment this line
    key: function (req, file, cb) {
      cb(null, "K" + Date.now() + path.extname(file.originalname));
    },
  }),
  limits: { fileSize: maxUploadSize },
});

router.post(
  "/whether",
  passport.authenticate("jwt", { session: false }),
  Analysis.Whether
);
router.post(
  "/getwhether",
  passport.authenticate("jwt", { session: false }),
  Analysis.GetWhether
);
router.post(
  "/demographics",
  passport.authenticate("jwt", { session: false }),
  Analysis.Demographics
);
router.post(
  "/cosmetic",
  passport.authenticate("jwt", { session: false }),
  Analysis.Cosmeticconcerns
);
router.post(
  "/skintype",
  passport.authenticate("jwt", { session: false }),
  Analysis.Skintypes
);
router.post("/upload-image", upload.single("image"), Analysis.UploadImage);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Analysis
 *   description: The apis for analysis
 */


/**
 * @swagger
 * /api/data/whether:
 *   post:
 *     summary: Analysis
 *     description: This api is called when the user is gonna save the whether data of his position
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - city
 *               - userId
 *             properties:
 *               city:
 *                 type: string
 *               userId:
 *                 type: string
 *             example:
 *               city: San Francisco
 *               userId: 65e4a16e8a8f249a7121ff1e
 *     responses:
 *       "200":
 *         description: The whether data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: WhetherData Store Successfully
 *                 result:
 *                   coord:
 *                     lon: 10.99
 *                     lat: 44.34
 *                   whether:
 *                     id: 501
 *                     main: Rain
 *                     description: moderate rain
 *                     icon: 10d
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/data/getwhether:
 *   post:
 *     summary: Analysis
 *     description: This api is called when the user is gonna get the whether data of his position
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *     responses:
 *       "200":
 *         description: The whether data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 result:
 *                   coord:
 *                     lon: 10.99
 *                     lat: 44.34
 *                   whether:
 *                     id: 501
 *                     main: Rain
 *                     description: moderate rain
 *                     icon: 10d
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/data/demographics:
 *   post:
 *     summary: Analysis
 *     description: This api is called when the user is gonna update the demographics data of his position
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - Demographics
 *             properties:
 *               userId:
 *                 type: string
 *               Demographics:
 *                 type: object
 *                 properties:
 *                   Race:
 *                     type: string
 *                   Age:
 *                     type: string
 *                   Gender:
 *                     type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               Demographics:
 *                 Race: Black
 *                 Age: 13-17
 *                 Gender: Male
 *     responses:
 *       "200":
 *         description: The whether data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: Demographics Add Successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/data/cosmetic:
 *   post:
 *     summary: Analysis
 *     description: This api is called when the user is gonna update the cosmetic data of his position
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - CosmeticConcerns
 *             properties:
 *               userId:
 *                 type: string
 *               CosmeticConcerns:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Detected:
 *                     type: string
 *                   Prediction:
 *                     type: string
 *                   Description:
 *                     type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               CosmeticConcerns:
 *                 Name: fake
 *                 Detected: fake
 *                 Prediction: fake
 *                 Description: fake
 *     responses:
 *       "200":
 *         description: The whether data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: CosmeticConcerns Add Successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */

/**
 * @swagger
 * /api/data/skintype:
 *   post:
 *     summary: Analysis
 *     description: This api is called when the user is gonna update the skintype data of his position
 *     tags: [Analysis]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - SkinType
 *             properties:
 *               userId:
 *                 type: string
 *               SkinType:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   SkinType:
 *                     type: string
 *                   Description:
 *                     type: string
 *                   Prediction:
 *                     type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               SkinType:
 *                 Name: BaumanSkinType
 *                 SkinType: Dehydrated
 *                 Description: Very Light
 *                 Prediction: Light Skinned
 *     responses:
 *       "200":
 *         description: The whether data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: SkinType Add Successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */