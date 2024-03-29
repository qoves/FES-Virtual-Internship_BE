const express = require("express");
const router = express.Router();
const Controller = require("../Controller/Auth");
const passport = require("passport");
require("../Middleware/Passport");

router.post("/signup", Controller.Signup);
router.post("/login", Controller.Login);
router.post("/googleLogin", Controller.googleLogin);
router.post("/user", Controller.Userdata);
router.get(
  "/data",
  passport.authenticate("jwt", { session: false }),
  Controller.getData
);
router.post(
  "/recommendation",
  passport.authenticate("jwt", { session: false }),
  Controller.Recommendation
);

module.exports = router;

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: The apis for authentication
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Auth
 *     description: This api is called when the user is gonna sign up into the site
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               username: test
 *               email: fake@example.com
 *               password: 123!23Asd
 *     responses:
 *       "200":
 *         description: The authenticated user data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: User create Successfully
 *                 result:
 *                   username: test
 *                   email: fake@example.com
 *                   password: $2b$10$iI2pjOHP6ZmcxLuAG2c3fe94jadR1WqmOvaf9bYOrTaV55Yoi0lG6
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
 * /api/auth/login:
 *   post:
 *     summary: Auth
 *     description: This api is called when the user is gonna sign up into the site
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *               password:
 *                 type: string
 *             example:
 *               email: fake@example.com
 *               password: 123!23Asd
 *     responses:
 *       "200":
 *         description: The authenticated user data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: User Login Susccessfully
 *                 result:
 *                   username: test
 *                   email: fake@example.com
 *                   password: $2b$10$iI2pjOHP6ZmcxLuAG2c3fe94jadR1WqmOvaf9bYOrTaV55Yoi0lG6
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk0ODI3NTAsImV4cCI6MTcwOTUxODc1MH0.ops3zk3Mg-mxmHKc-MhBbSCbKEtPZDy4CZWC4GtFtCY
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
 * /api/auth/recommendation:
 *   post:
 *     summary: Auth
 *     description: This api is called when the user is gonna save the recommendation data
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - Recommendation
 *             properties:
 *               userId:
 *                 type: string
 *               Recommendation:
 *                 type: object
 *                 properties:
 *                   Age:
 *                     type: string
 *                   SkinType:
 *                     type: string
 *                   Climate:
 *                     type: string
 *                   SkinConcerns:
 *                     type: string
 *                   SkinTyone:
 *                     type: string
 *                   Gender:
 *                     type: string
 *                   Race:
 *                     type: string
 *             example:
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               Recommendation: 
 *                 Age: 13-17
 *                 SkinType: Normal
 *                 Climate: Continental
 *                 SKinConcerns: Acne
 *                 SkinTyone: Dark
 *                 Gender: Male
 *                 Race: Black
 *     responses:
 *       "200":
 *         description: The authenticated user data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: Recommendation Update Successfully
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
 * /api/auth/user:
 *   post:
 *     summary: Auth
 *     description: This api is called when the user is gonna get his info
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - userId
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *               userid:
 *                 type: string
 *               city:
 *                 type: string
 *             example:
 *               name: test
 *               userId: 65e4a16e8a8f249a7121ff1e
 *               city: San Francisco
 *     responses:
 *       "200":
 *         description: The authenticated user data
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 message: User found Successfully
 *                 result:
 *                   username: test
 *                   email: fake@example.com
 *                   password: $2b$10$iI2pjOHP6ZmcxLuAG2c3fe94jadR1WqmOvaf9bYOrTaV55Yoi0lG6
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk0ODI3NTAsImV4cCI6MTcwOTUxODc1MH0.ops3zk3Mg-mxmHKc-MhBbSCbKEtPZDy4CZWC4GtFtCY
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
 * /api/auth/data:
 *   get:
 *     summary: Auth
 *     description: This api is called to get user lists
 *     tags: [Auth]
 *     responses:
 *       "200":
 *         description: The authenticated users
 *         content:
 *           application/json:
 *             example:
 *                 code: 200
 *                 result:
 *                   username: test
 *                   email: fake@example.com
 *                   password: $2b$10$iI2pjOHP6ZmcxLuAG2c3fe94jadR1WqmOvaf9bYOrTaV55Yoi0lG6
 *                   token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3MDk0ODI3NTAsImV4cCI6MTcwOTUxODc1MH0.ops3zk3Mg-mxmHKc-MhBbSCbKEtPZDy4CZWC4GtFtCY
 *       "400":
 *         $ref: '#/components/responses/BadRequest'
 *       "401":
 *         $ref: '#/components/responses/Unauthorized'
 *       "403":
 *         $ref: '#/components/responses/Forbidden'
 *       "404":
 *         $ref: '#/components/responses/NotFound'
 */
