const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = async(req, res, next) => {
    try{
        const token = req.body.token
                    || req.cookies.token
                    || req.header("Authorization").replace("Bearer ", "");

        if(!token) {
            return res.status(401).json({
                success: false,
                message: "Token is required..."
            })
        }

        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log("DECODED: ", decode);
            req.user = decode;
        } catch(error) {
            return res.status(401).json({
                success: false,
                message: "Invalid Token..."         
            })
        }
        next();
    } catch(error) {
        return res.status(500).json({
            success: false,
            message: "Internal Server Error..."
        })
    }
}

