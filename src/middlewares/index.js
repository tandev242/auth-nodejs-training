const jwt = require('jsonwebtoken');

// Check user is logged in 
exports.requireSignin = (req, res, next) => {
    if (req.headers.authorization) {
        // get token from authorization string
        const token = req.headers.authorization.split(' ')[1];
        // decode token to verify user 
        try {
            const user = jwt.verify(token, process.env.JWT_SECRET);
            // save user to request
            req.user = user;
        } catch (error) {
            return res.status(400).json({ error });
        }

    } else {
        return res.status(400).json({ error: "Authorization required" });
    }
    next();
}

