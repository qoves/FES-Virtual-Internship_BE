const express = require("express");
const router = express.Router();
const Custmization = require("../Controller/Custmization");
const passport = require("passport");
require("../Middleware/Passport");

router.post(
  "/custom",
  passport.authenticate("jwt", { session: false }),
  Custmization.Custmization
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Customization
 *   description: The apis for customization
 */

/**
 * @swagger
 * /api/custmization/custom:
 *   post:
 *     summary: Customization
 *     description: This api is called when the user is gonna save his customization data
 *     tags: [Customization]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - Custmization
 *             properties:
 *               userId:
 *                 type: string
 *               Custmization:
 *                 type: object
 *                 properties:
 *                   name:
 *                     type: string
 *                   Data:
 *                     type: object
 *                     properties: 
 *                       keyingredients: 
 *                         type: object
 *                         properties: 
 *                           name:
 *                             type: string
 *                           image:
 *                             type: string
 *                           reason: 
 *                             type: string
 *                       fragrance:
 *                         type: array
 *                       consistancy: 
 *                         type: string
 *                       base:
 *                         type: string
 *                       Preservatives: 
 *                         type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               Custmization:
 *                 name: fake name
 *                 Data: 
 *                   keyingredients: 
 *                     name: fake
 *                     image: fake
 *                     reason: fake
 *                   fragrance: []
 *                   consistancy: fake
 *                   base: fake
 *                   Preservatives: fake
 *     responses:
 *       "200":
 *         description: Payment result
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: custmizationData Store Successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
