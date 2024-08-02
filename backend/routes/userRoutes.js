// const express = require("express");
// const { registerUser, loginUser } = require("../controllers/authController");

// const router = express.Router();

// router.post("/register", registerUser);
// router.post("/login", loginUser);

// module.exports = router;
const express = require("express");
const router = express.Router();
const { registerUser, loginUser } = require("../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - username
 *         - password
 *       properties:
 *         _id:
 *           type: string
 *           description: The user's unique identifier.
 *         username:
 *           type: string
 *           description: The user's username.
 *         password:
 *           type: string
 *           description: The user's password.
 *         token:
 *           type: string
 *           description: JWT token for authentication.
 *       example:
 *         _id: 123
 *         username: johndoe
 *         password: password123
 *         token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE2MzU1MzI5NjIsImV4cCI6MTYzNTU0NjU2Mn0.S8oUoGfR5tY2i9mAv5BoQb1RgK3hZ9hFbDhf2l2f5hIE"
 */

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new user
 *     description: Create a new user account.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       201:
 *         description: User registered successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       400:
 *         description: Bad request, invalid input.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Please Enter All Fields"
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Login a user
 *     description: Authenticate a user and return a JWT token.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 example: johndoe
 *               password:
 *                 type: string
 *                 example: password123
 *     responses:
 *       200:
 *         description: User logged in successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       401:
 *         description: Unauthorized, invalid credentials.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Invalid Username or Password"
 *       500:
 *         description: Internal server error.
 */

router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;
