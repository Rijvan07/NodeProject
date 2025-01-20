const express = require('express');
const router = express.Router();
const client = require('../config/db');
const { sendEmail } = require('../helpers/emailService');
const { hashPassword } = require('../helpers/hashPassword');
const { validateUser } = require('../helpers/validation');
const { sendResponse } = require('../helpers/handleResponse');
const crypto = require('crypto');

router.post('/forgot_password', async (req, res) => {
    try {
        const { email } = req.body;

        if (!validateUser(email)) {
            sendResponse(res,false, 400, 'Invalid email address!' );
        }

        const db = client.db('CodeBase');

        const user = await db.collection('users').findOne({ email });
        if (!user) {
            sendResponse(res,false, 400, 'User not found!' );
        }

        const emailSent = await sendEmail({
            to: email,
            subject: 'Password Reset Request',
            text: `Now you can click on the link below to reset password...! \n https://warm-banoffee-2442d1.netlify.app/?user_id=${user._id} \n`
        });
        
        if (!emailSent) {
            sendResponse(res,false, 400, 'Failed to send the email with the new password.' );
        }

       sendResponse(res,true, 200, 'A new password Link has been sent to your email...!' );
    } catch (error) {
        sendResponse(res,false, 400, 'Internal server error.' );
    }
});

module.exports = router;
