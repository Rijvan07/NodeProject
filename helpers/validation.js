
const Joi = require('joi');

const registerSchema = Joi.object({
    email: Joi.string().email().lowercase().required()
        .messages({
            'string.empty': 'Email is required.',
            'string.email': 'Email must be a valid email address.',
        }),

    contact_name: Joi.string().required()
        .messages({
            'string.empty': 'Contact name is required.',
        }),

    phone_number: Joi.string().pattern(/^[0-9+\-()\s]{10,15}$/).required()
        .messages({
            'string.empty': 'Phone number is required.',
            'string.pattern.base': 'Phone number must be valid and include only digits or valid symbols (+, -, (), or spaces).',
        }),

    business_no: Joi.string().alphanum().optional().required()
        .messages({
            'string.alphanum': 'Business number must be alphanumeric.',
            'string.empty': 'Business number cannot be empty.'
        }),

    password: Joi.string().min(6).required()
        .messages({
            'string.empty': 'Password is required.',
            'string.min': 'Password must be at least 6 characters long.',
        })
});

const validateUser = (data) => {
    return registerSchema.validate(data);
};

module.exports = { validateUser }; 