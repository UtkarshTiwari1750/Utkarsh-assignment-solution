const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense",
        }
    ],
    users: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ]
});

module.exports = mongoose.model("Category", categorySchema);