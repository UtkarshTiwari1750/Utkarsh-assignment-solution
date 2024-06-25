// Import required modules
const express = require("express");
const router = express.Router();

const {createExpense, deleteExpense, updateExpense, getExpenses} = require("../controllers/Expense")
const {auth} = require("../middleware/Auth");
const { getCategories, createCategory } = require("../controllers/Category");

router.post("/create", auth, createExpense);
router.post("/update", auth,updateExpense);
router.post("/delete", auth,deleteExpense);
router.post("/getExpenses", auth, getExpenses);

router.post("/getCategory", auth, getCategories)
router.post("/createCategory", auth, createCategory)

module.exports = router;