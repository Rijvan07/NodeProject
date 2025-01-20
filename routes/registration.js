const express = require('express');
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const userSchema = require('../models/register_user');
const { hashPassword } = require('../helpers/hashPassword');
const { generateToken } = require('../helpers/TokenService'); 
const { validateUser } = require('../helpers/validation'); 
const client = require("../config/db"); 


// Registration Route ->
router.post("/register", async (req, res, next) => {
    try {
        const db = await client.db("CodeBase");
        const body = req.body;

        const schema = validateUser(body);
        
        const password = schema.value.password;

        if (!password || typeof password !== "string") {
            throw new Error("Invalid password provided for hashing");
        }

        const hashedPassword = await hashPassword(password);
        schema.value.password = hashedPassword; 

        const existingUser = await db.collection("users").findOne({ email: schema.value.email });
        if (existingUser) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: "User with this email already exists!",
            });
        }

        const token = generateToken(
            { email: schema.value.email },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
        );
        schema.value.token = token;

        const create = await db.collection("users").insertOne(schema.value);

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: "User Registered successfully!",
            data: {
                id: create.insertedId,
                email: schema.value.email,
                contact_name: schema.value.contact_name,
                phone_number: schema.value.phone_number,
                business_no: schema.value.business_no,
                token,
            },
        });
    } catch (error) {
        if (error) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: error.message,
            });
        }
        // next(error);
    }
});


module.exports = router;

