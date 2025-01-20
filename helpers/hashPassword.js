const bcrypt = require('bcrypt');
const hashPassword = async (password) => {
    if (!password || typeof password !== "string") {
        throw new Error("Invalid password provided for hashing");
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw new Error("Password hashing failed");
    }
};

module.exports = { hashPassword };
