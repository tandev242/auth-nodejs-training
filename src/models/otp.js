const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: "User",
        },
        otpCode: {
            type: String,
            required: true,
            trim: true,
        },
        expireAt: {
            type: Date,
            default: Date.now(),
            expires: 60  // set expire time is 60s
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model("Otp", otpSchema);
