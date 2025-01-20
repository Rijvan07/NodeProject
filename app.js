// app.js
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
require('./config/db');
const cors = require('cors');

const { registration, login, forgotPassword, getUser, generatePassword } = require('./routes');

const app = express();

// // CORS configuration
// app.use(cors({
//     origin: 'http://localhost:3000', 
//     methods: ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders: ['Content-Type', 'Authorization'],
// }));
  
  
  app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register routes
app.use('/registration', registration);
app.use('/login', login);
app.use('/forgot_password', forgotPassword);
app.use('/get_user', getUser);
app.use('/generate_password', generatePassword);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

// Start server
app.listen(process.env.PORT || 80, () => {
    console.log(`Server listening on port ${process.env.PORT || 80}`);
});
