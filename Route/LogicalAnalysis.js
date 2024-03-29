const express = require("express");
const router = express.Router();
const LogicalAnalysis = require("../Controller/LogicalAnalysis");
const passport = require("passport");
require("../Middleware/Passport");

router.post(
  "/logicalAnalysis",
  passport.authenticate("jwt", { session: false }),
  LogicalAnalysis.LogicalAnlysis
);
router.get(
  "/logicalResponse",
  passport.authenticate("jwt", { session: false }),
  LogicalAnalysis.LogicalResponse
);
router.get(
  "/logicalData",
  passport.authenticate("jwt", { session: false }),
  LogicalAnalysis.LogicalData
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Logical
 *   description: The apis for logical analysis
 */

/**
 * @swagger
 * /api/logical/logicalAnalysis:
 *   post:
 *     summary: Logical data
 *     description: This api is called when the logical data is stored into database after the analysis
 *     tags: [Logical]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - Demographics
 *               - CosmeticConcerns
 *               - SkinType
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
 *               Demographics:
 *                 Race: Black
 *                 Age: 13-17
 *                 Gender: Male
 *               CosmeticConcerns:
 *                 Name: fake name
 *                 Detected: fake
 *                 Prediction: fake
 *                 Description: fake
 *               SkinType:
 *                 Name: Acne
 *                 SkinType: Dark
 *                 Description: fake
 *                 Prediction: fake
 *     responses:
 *       "200":
 *         description: Payment result
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: LogicalAnalysis Store Successfully
 *                 userId: 65e4a16e8a8f249a7121ff1e
 *                 Demographics:
 *                   Race: Black
 *                   Age: 13-17
 *                   Gender: Male
 *                 CosmeticConcerns:
 *                   Name: fake name
 *                   Detected: fake
 *                   Prediction: fake
 *                   Description: fake
 *                 SkinType:
 *                   Name: Acne
 *                   SkinType: Dark
 *                   Description: fake
 *                   Prediction: fake
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
 * /api/logical/logicalResponse:
 *   post:
 *     summary: Logical data
 *     description: This api is called when the user is going to save the logical data after getting the analysis data.
 *     tags: [Logical]
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
 *         description: Payment result
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: Response Store Successfully
 *                 userId: 65e4a16e8a8f249a7121ff1e
 *                 Demographics:
 *                   Race: Black
 *                   Age: 13-17
 *                   Gender: Male
 *                 CosmeticConcerns:
 *                   Name: fake name
 *                   Detected: fake
 *                   Prediction: fake
 *                   Description: fake
 *                 SkinType:
 *                   Name: Acne
 *                   SkinType: Dark
 *                   Description: fake
 *                   Prediction: fake
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
 * /api/logical/logicalData:
 *   post:
 *     summary: Logical data
 *     description: This api is called when the user is going to get the logical data.
 *     tags: [Logical]
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
 *         description: Payment result
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: Res send
 *                 userId: 65e4a16e8a8f249a7121ff1e
 *                 Demographics:
 *                   Race: Black
 *                   Age: 13-17
 *                   Gender: Male
 *                 CosmeticConcerns:
 *                   Name: fake name
 *                   Detected: fake
 *                   Prediction: fake
 *                   Description: fake
 *                 SkinType:
 *                   Name: Acne
 *                   SkinType: Dark
 *                   Description: fake
 *                   Prediction: fake
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
