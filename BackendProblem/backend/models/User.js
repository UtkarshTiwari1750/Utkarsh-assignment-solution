const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    token: {
        type: String,
    },
    expenses: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Expense",
        }
    ],
    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Category",
        }
    ]
})

module.exports = mongoose.model("User", UserSchema);