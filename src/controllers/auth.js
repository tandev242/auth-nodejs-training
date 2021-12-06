const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User, Otp } = require("../models");

//Generate token by _id, email with expiration time is 10 day
const generateJwtToken = (_id, email) => {
    return jwt.sign({ _id, email }, process.env.JWT_SECRET, {
        expiresIn: "10d",
    });
};

const generateOtp = () => {
    // generate a number with 6 digits 
    return Math.floor(100000 + Math.random() * 900000).toString();
}

exports.signup = async (req, res) => {
    const { email, password } = req.body;
    try {
        // check email exists 
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            return res.status(400).json({ error: "Email already exists" });
        }
        // hash password before saving to db
        const hashedPassword = await bcrypt.hash(password, 10);
        // initialize user and save to db
        const user = new User({ email, password: hashedPassword });
        const createdUser = await user.save();
        // check user has been created or not 
        if (createdUser) {
            const token = generateJwtToken(createdUser._id, createdUser.email);
            const { _id, email } = createdUser;
            // response token and user info
            res.status(201).json({ token, user: { _id, email } });
        } else {
            res.status(400).json({ error: "Something went wrong" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};

exports.signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        // get user info by email 
        const existingUser = await User.findOne({ email }).exec();
        if (existingUser) {
            // hash password and check it match with password in db
            const isMatchPassword = await existingUser.authenticate(password);
            if (isMatchPassword) {
                const token = generateJwtToken(existingUser._id, existingUser.email);
                const { _id, email } = existingUser;
                res.status(200).json({ token, user: { _id, email } });
            } else {
                return res.status(400).json({ message: "Password is incorrect" });
            }
        } else {
            res.status(400).json({ error: "Email is incorrect" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
};


exports.getUserInfo = async (req, res) => {
    const { _id } = req.user;
    try {
        // get user info by _id but ignore password
        const user = await User.findOne({ _id })
            .select('-password').exec();
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(400).json({ error: "Something went wrong" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}


exports.forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // check email exists 
        const user = await User.findOne({ email }).exec();
        if (user) {
            //generate Otp code 
            const otpCode = generateOtp();
            // initialize otpObj and save to db
            const otpObj = new Otp({ user: user._id, otpCode });
            const createdOtp = await otpObj.save();
            if (createdOtp) {
                res.status(200).json({ otpCode });
            } else {
                res.status(400).json({ error: "Something went wrong" });
            }
        } else {
            res.status(400).json({ error: "Email does not exists" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}


exports.resetPassword = async (req, res) => {
    const { password, otpCode } = req.body;
    // _id returned by jwt authentication
    const { _id } = req.user;
    try {
        // get user info by _id
        const user = await User.findOne({ _id }).exec();
        if (user) {
            // check Otp code exists 
            const otpObj = await Otp.findOne({ user: user._id, otpCode }).exec();
            if (otpObj) {
                // hashing password before updating to database
                const hashedPassword = await bcrypt.hash(password, 10);
                await User.updateOne({ _id: user._id }, { password: hashedPassword });
                res.status(200).json({ message: "Password is updated successfully" });
            } else {
                res.status(400).json({ error: "Otp code is invalid" });
            }
        } else {
            res.status(400).json({ error: "Email does not exists" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}