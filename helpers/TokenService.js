const jwt = require("jsonwebtoken");

const generateToken = (payload, secretKey, options) => {
    try {
        return jwt.sign(payload, secretKey, options);
    } catch (error) {
        console.error("Error generating token:", error);
        throw new Error("Token generation failed");
    }
};

module.exports = { generateToken }; 
