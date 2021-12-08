const { User } = require("../models");

exports.getUserInfo = async (req, res) => {
    const { _id } = req.user;
    try {
        // get user info by _id but ignore password
        const user = await User.findOne({ _id })
            .select('-password');
        if (user) {
            res.status(200).json({ user });
        } else {
            res.status(400).json({ error: "Something went wrong" });
        }
    } catch (error) {
        res.status(400).json({ error });
    }
}