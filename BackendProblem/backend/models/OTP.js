const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: 60*5,
    }
})

async function sendVerificationEmail(email, otp) {
    try {
        const mailResponse = await mailSender(
                                    email, "OTP Verification", `Your OTP is ${otp}`
                                );
        console.log("Email Sent Successfully...", mailResponse.response);
    } catch(error) {
        console.log("Error in sending email...", error);
        throw error;
    }
}

otpSchema.pre("save", async function(next) {
    console.log("New document saved to database...");
    if(this.isNew){
        await sendVerificationEmail(this.email, this.otp);
    }
    next();
})

module.exports = mongoose.model("OTP", otpSchema);
