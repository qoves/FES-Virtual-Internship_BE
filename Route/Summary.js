const express = require("express");
const router = express.Router();
const Summary = require("../Controller/Summary");
const passport = require("passport");
require("../Middleware/Passport");

router.post(
  "/Summary",
  passport.authenticate("jwt", { session: false }),
  Summary.SummaryData
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Summary
 *   description: The apis for summary
 */

/**
 * @swagger
 * /api/res/Summary:
 *   post:
 *     summary: Update or Save user summary
 *     description: After analysis, the summary data is stored in database using this api.
 *     tags: [Summary]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - summarydata
 *             properties:
 *               userId:
 *                 type: string
 *               summarydata:
 *                 type: object
 *                 properties:
 *                   Name:
 *                     type: string
 *                   Age:
 *                     type: string
 *                   CoemeticData:
 *                     type: array
 *                   Color:
 *                     type: string
 *                   Type:
 *                     type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               summarydata: 
 *                 Name: BaumanSkinType
 *                 Age: 13-17
 *                 CoemeticData: []
 *                 Color: Black
 *                 Type: Normal
 *     responses:
 *       "200":
 *         description: Summary Update
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               code: 200
 *               message: Summary Update Successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
