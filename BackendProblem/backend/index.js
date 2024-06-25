const express = require("express");
const app = express();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const database = require("./config/database");

dotenv.config();
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin: "*",
        credentials: true,
    })
);

database.connect();
const authRoute = require("./routes/User");
const expenseRoute = require("./routes/Expense");

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/expense", expenseRoute);
const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
    return res.success(200).json({
        success: true,
        message: "Your server is up and running..."
    })
})
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
})
