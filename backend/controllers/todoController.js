const Todo = require("../models/Todo");
const asyncHandler = require("express-async-handler");

exports.createTodo = asyncHandler(async (req, res) => {
    const { description,status } = req.body;
  
  try {
    const newTodo = new Todo({
      user: req.user.id,
      description,
      status: status,
    });
    //   console.log(newTodo)
    await newTodo.save();
      res.status(201).json({ newTodo, message: "Todo created Successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.getTodos = asyncHandler(async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user.id });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


exports.updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { description, status } = req.body;
  try {
    const todo = await Todo.findByIdAndUpdate(
      id,
      { description, status },
      { new: true }
    );
    if (!todo) return res.status(404).json({ error: "Todo not found" });
      res.json({ todo, message:"Todo updated Successfully!!"});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

exports.deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(id);
    if (!todo) return res.status(404).json({ error: "Todo not found" });
      res.status(200).json({ message: "Todo deleted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};