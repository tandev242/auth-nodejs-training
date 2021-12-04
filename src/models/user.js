const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
    },
},
    { timestamps: true }
)

//Hash and compare password with hashed password in db
userSchema.methods = {
    authenticate: async function (password) {
        return await bcrypt.compare(password, this.password);
    },
};
module.exports = mongoose.model("User", userSchema);
