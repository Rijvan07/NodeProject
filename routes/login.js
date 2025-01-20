const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const mongodb = require("mongodb");
const ObjectId = mongodb.ObjectId;
const userSchema = require('../models/register_user'); 
const { validateUser } = require('../helpers/validation'); 
const { generateToken } = require('../helpers/TokenService'); 
const client = require("../config/db"); 

router.post('/login', async (req, res, next) => {
    try {

        const db = await client.db('CodeBase');
        const body = req.body;

        const schema = validateUser(body);

        const user = await db.collection('users').findOne({ email: schema.value.email });

        if (!user) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: 'User not found!',
            });
        }
        const passwordMatch = await bcrypt.compare(schema.value.password, user.password);

        if (!passwordMatch) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: 'Invalid password!',
            });
        }

        const token = generateToken({ email: user.email }, process.env.JWT_KEY, { expiresIn: '7d' });

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'Login successful!',
            data: {
                id: user._id,
                email: user.email,
                contact_name: user.contact_name,
                phone_number: user.phone_number,
                business_no: user.business_no,
                token,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: "Internal Server Error...!",
        });
    }
});

module.exports = router;
