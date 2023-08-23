const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5043;

app.use(express.json());

app.use(cors());


const MONGO_URI = require('./mongoConfig.json')['MONGO_URI'];

try {
    mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: 'authDB',
    });
    console.log("Connected to MongoDB");
}
catch (error) {
    console.log("Could not connect to MongoDB");
    console.error(error);
}

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        unique: [true, 'Username already exists'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        unique: false,
    },
});

const User = mongoose.model('User', UserSchema);


const router = express.Router();

router.post('/auth/login', (req, res) => {
    User.findOne({username: req.body.username}).then((user) => {
        bcrypt.compare(req.body.password, user.password).then((result) => {
            if(!result) {
                console.log(`Incorrect password for user: ${user.username}`);
                return res.status(401).json({
                    message: "Incorrect password",
                });
            }

            const token = jwt.sign(
                {username: user.username},
                'secret',
                {expiresIn: '24h'}
            );

            console.log(`User: ${user.username} logged in`);

            res.status(200).json({
                message: "Login successful",
                username: user.username,
                token: token,
            });
        }).catch((error) => {
            console.log(`Passwords do not match for user: ${user.username}`);
            console.error(error);
            res.status(400).json({
                message: "Passwords do not match",
                error: error,
            });
        });

    }).catch((error) => {
        console.log(`Error finding user: ${req.body.username}`);
        console.error(error);
        res.status(500).json({
            message: "Error finding user",
            error: error,
        });
    });
});

router.post('/auth/register', (req, res) => {
    if(!req.body.username || !req.body.password) {
        console.log(`ERROR: Username: ${req.body.username}, Password: ${req.body.password}`);
        return res.status(400).json({
            message: "Username and password are required",
        });
    }

    // hash password
    bcrypt.hash(req.body.password, 10).then((hash) => {
        // create user
        const user = new User({
            username: req.body.username,
            password: hash,
        });

        console.log(`Creating user: ${user.username} with password hash: ${user.password}`);

        // save user to database
        user.save().then((result) => {
            res.status(201).json({
                message: 'User created',
                result: result,
            });
        }).catch((error) => {
            console.log("Error creating user");
            console.error(error);
            res.status(500).json({
                message: "Error creating user",
                error: error,
            });
        });
    }).catch((error) => {
        console.log("Error hashing password");
        console.error(error);
        res.status(500).json({
            message: "Error hashing password",
            error: error,
        });
    });
});

app.use('/', router);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});
