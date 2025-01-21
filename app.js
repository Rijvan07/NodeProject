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
app.use('/api/registration', registration);
app.use('/api/login', login);
app.use('/api/forgot_password', forgotPassword);
app.use('/api/get_user', getUser);
app.use('/api/generate_password', generatePassword);


app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/api/', (req, res) => {
    res.send('Hello Rushikesh React Developer...!');
});

// Start server
app.listen(process.env.PORT || 8000, () => {
    console.log(`Server listening on port ${process.env.PORT || 8000}`);
});
