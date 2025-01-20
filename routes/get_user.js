const express = require('express');
const router = express.Router();
const { ObjectId } = require('mongodb');
const client = require('../config/db');

router.get('/get_user/:id', async (req, res) => {
    try {
        const { id } = req.params; 
        if (!id) {
            return res.status(400).json({
                status: false,
                statusCode: 400,
                message: 'Invalid _id..!',
            });
        }

        const db = client.db('CodeBase');
        const get = await db.collection("users").aggregate([
            {
                $match: {
                    _id: new ObjectId(id) 
                }
            },
            {
                $project: {
                    _id: 1,
                    email: 1,
                    contact_name: 1,
                    phone_number: 1
                }
            }
        ]).toArray();

        if (!get || get.length === 0) {
            return res.status(404).json({
                status: false,
                statusCode: 404,
                message: 'User not found!',
            });
        }

        res.status(200).json({
            status: true,
            statusCode: 200,
            message: 'User found successfully!',
            data: get,
        });
    } catch (error) {
        res.status(500).json({
            status: false,
            statusCode: 500,
            message: 'Internal server error.',
        });
    }
});

module.exports = router;
