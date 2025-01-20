const jwt = require("jsonwebtoken");
const UserModel = require("../models/register_user");

const isValidToken = async (req, res, next) => {
    // Check if the Authorization header exists
    if (req.headers.authorization) {
        const token = req.headers.authorization.split(" ")[1]; // Extract the token
        try {
            // Verify the token using the secret key
            const decoded = jwt.verify(token, process.env.JWT_KEY);

            // Check if the user exists in the database
            const user = await UserModel.findById(decoded._id);
            if (user) {
                req.AuthenticatedUser = user; // Attach user info to the request object
                next(); // Proceed to the next middleware or route
            } else {
                return res.status(401).json({
                    status: false,
                    msg: "Unauthorized! User not found.",
                });
            }
        } catch (error) {
            return res.status(401).json({
                status: false,
                msg: "Unauthorized! Invalid token.",
            });
        }
    } else {
        return res.status(401).json({
            status: false,
            msg: "Unauthorized! Token not provided.",
        });
    }
};

module.exports = {
    isValidToken,
};
