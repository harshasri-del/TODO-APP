// const express = require("express");
// const { protect } = require("../middlewares/authMiddleware");
// const {
//   createTodo,
//   getTodos,
//   getTodo,
//   updateTodo,
//   deleteTodo,
// } = require("../controllers/todoController");

// const router = express.Router();

// router.route("/todos").post(protect, createTodo);
// router.route("/todos").get(protect, getTodos);
// router.route("/todos/:id").get(protect, getTodo);
// router.route("/todos/:id").put(protect, updateTodo);
// router.route("/todos/:id").delete(protect, deleteTodo);

// module.exports = router;


const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const {
  createTodo,
  getTodos,
  getTodo,
  updateTodo,
  deleteTodo,
} = require("../controllers/todoController");

const router = express.Router();

/**
 * @swagger
 * components:
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       bearerFormat: JWT
 *   schemas:
 *     Todo:
 *       type: object
 *       required:
 *         - description
 *         - status
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the to-do item.
 *         user:
 *           type: string
 *           description: The ID of the user who created the to-do item.
 *         description:
 *           type: string
 *           description: The description of the to-do item.
 *         status:
 *           type: string
 *           description: The status of the to-do item.
 *       example:
 *         _id: 60d5f5c7b4f7f7504a1b2c3d
 *         user: 60d5f5c7b4f7f7504a1b2c3e
 *         description: "Buy groceries"
 *         status: "pending"
 */

/**
 * @swagger
 * /api/todos:
 *   post:
 *     summary: Create a new to-do item
 *     description: Add a new to-do item to the user's list.
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Buy groceries"
 *               status:
 *                 type: string
 *                 example: "pending"
 *     responses:
 *       201:
 *         description: To-do item created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/todos:
 *   get:
 *     summary: Get all to-do items for the user
 *     description: Retrieve all to-do items associated with the logged-in user.
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: A list of to-do items.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal server error.
 */


/**
 * @swagger
 * /api/todos/{id}:
 *   put:
 *     summary: Update a to-do item
 *     description: Modify an existing to-do item by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the to-do item to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 example: "Buy groceries"
 *               status:
 *                 type: string
 *                 example: "completed"
 *     responses:
 *       200:
 *         description: To-do item updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       404:
 *         description: To-do item not found.
 *       500:
 *         description: Internal server error.
 */

/**
 * @swagger
 * /api/todos/{id}:
 *   delete:
 *     summary: Delete a to-do item
 *     description: Remove a to-do item from the user's list by ID.
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: The ID of the to-do item to delete.
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: To-do item deleted successfully.
 *       404:
 *         description: To-do item not found.
 *       500:
 *         description: Internal server error.
 */

router.post("/todos", protect, createTodo);
router.get("/todos", protect, getTodos);

router.put("/todos/:id", protect, updateTodo);
router.delete("/todos/:id", protect, deleteTodo);

module.exports = router;
