const express = require("express");
// const bodyParser = require('body-parser');
const router = express.Router();
const Payment = require("../Controller/Payment");
const passport = require("passport");
require("../Middleware/Passport");

router.post("/payment", Payment.payment);
router.post(
  "/webhooks",
  express.raw({ type: "application/json" }),
  Payment.success
);
module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Payment
 *   description: The apis for payment
 */

/**
 * @swagger
 * /api/pay/payment:
 *   post:
 *     summary: Payment
 *     description: This api is called to make the event for payment when the user buys some skincare products.
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - quantity
 *             properties:
 *               id:
 *                 type: number
 *               quantity:
 *                 type: number
 *             example:
 *               id: 1
 *               quantity: 5
 *     responses:
 *       "200":
 *         description: Payment result
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 link: https://qoves.com/facial-assessment-tool/
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
 * /api/pay/webhooks:
 *   post:
 *     summary: Payment
 *     description: This api is called to check the result of payment when the user buys some skincare products.
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - object
 *             properties:
 *               id:
 *                 type: number
 *               object:
 *                 type: number
 *             example:
 *               id: 1
 *               object: https://qoves.com/facial-assessment-tool/
 *     responses:
 *       "200":
 *         description: Payment result
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *                 code: 200
 *                 message: Message sent successfully
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
