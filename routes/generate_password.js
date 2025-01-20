const express = require('express');
const router = express.Router();
const client = require('../config/db');
const { validateUser } = require('../helpers/validation');
const { sendEmail } = require('../helpers/emailService');
const { hashPassword } = require('../helpers/hashPassword');
const { sendResponse } = require('../helpers/handleResponse');

router.patch('/generate_password', async (req, res) => {
    try {
        const { email, password } = req.body;
        // console.log('req.body ==>> :', req.body);

        if (!validateUser(email)) {
            sendResponse(res,false, 400, 'Invalid email address!' );
        }
        const db = client.db('CodeBase');

        const user = await db.collection('users').findOne({ email });
        if (!user) {
            sendResponse(res,false, 400, 'User not found!' );
        }
        const hashedPassword = await hashPassword(password);

        await db.collection('users').updateOne(
            { email },
            { $set: { password: hashedPassword } }
        );
        const emailSent = await sendEmail({
            to: email,
            subject: 'Password Changed Successfully',
            text: `Your password has been successfully updated.\n\nYour new Password is: ${password}\n\nRegards,\nCodeBase\n\nThank You.`,
        });
        // console.log('emailSent <<==>> :', emailSent);
        if (!emailSent) {
            sendResponse(res,false, 400, 'Failed to send confirmation email' );
        }

        sendResponse(res,true, 200, 'Password updated successfully & Password send on mail please check...!' );
    } catch (error) {
        res.status(400).json({
            status: false,
            statusCode: 400,
            message: error.stack,
        });
    }
});

module.exports = router;
