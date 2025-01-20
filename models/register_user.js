const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    contact_name: {
        type: String,
        required: true,
    },
    phone_number: {
        type: String,
        required: true,
    },
    business_no: {
        type: String,
        required: false,
    },
    password: {
        type: String,
        required: true,
    },
    token: { 
        type: String, 
        required: false 
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
