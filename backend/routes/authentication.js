const User = require('./../models/user.js');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const config = require('./../config/db')

module.exports = function(router) {
    router.post('/register', (req, res) => {
        // to test this route in postman
        // res.send('post for register works!');
        if (!req.body.email) {
            res.json({ success: false, message: 'You must provide an email' })
        } else if (!req.body.username) {
            res.json({ success: false, message: 'You must provide a username' })
        } else if (!req.body.password) {
            res.json({ success: false, message: 'You must provide a password' })
        } else {
            // now we are sure all the fields are completed
            let user = new User({
                email: req.body.email.toLowerCase(),
                username: req.body.username.toLowerCase(),
                password: req.body.password
            })
            user.save((err) => {
                // console.log(err) - 11000 is duplication error
                if (err) {
                    if (err.code === 11000) {
                        res.json({ success: false, message: 'Username or Email already exists.' })
                    } else {
                        // err.errors = true means that there are validation errors
                        if (err.errors) {
                            if (err.errors.email) {
                                res.json({ success: false, message: err.errors.email.message })
                            } else if (err.errors.username) {
                                res.json({ success: false, message: err.errors.username.message })
                            } else if (err.errors.password) {
                                res.json({ success: false, message: err.errors.password.message })
                            } else {
                                // we have this just in case, but when all detailed validation is working, we should not be needing this
                                res.json({ success: false, message: 'Could not save user. Error: ', err })
                            }
                        }
                    }
                } else {
                    res.json({ success: true, message: 'Account registered successfully!' })
                }
            });
        }

    });

    router.get('/checkEmail/:email', (req, res) => {
        // Check if email was provided in paramaters
        if (!req.params.email) {
            res.json({ success: false, message: 'E-mail was not provided' }); // Return error
        } else {
            // Search for user's e-mail in database;
            User.findOne({ email: req.params.email }, (err, user) => {
                if (err) {
                    res.json({ success: false, message: err }); // Return connection error
                } else {
                    // Check if user's e-mail is taken
                    if (user) {
                        res.json({ success: false, message: 'E-mail is already taken' }); // Return as taken e-mail
                    } else {
                        res.json({ success: true, message: 'E-mail is available' }); // Return as available e-mail
                    }
                }
            });
        }
    });

    router.get('/checkUsername/:username', (req, res) => {
        // Check if username was provided in paramaters
        if (!req.params.username) {
            res.json({ success: false, message: 'Username was not provided' }); // Return error
        } else {
            // Look for username in database
            User.findOne({ username: req.params.username }, (err, user) => { // Check if connection error was found
                if (err) {
                    res.json({ success: false, message: err }); // Return connection error
                } else {
                    // Check if user's username was found
                    if (user) {
                        res.json({ success: false, message: 'Username is already taken' }); // Return as taken username
                    } else {
                        res.json({ success: true, message: 'Username is available' }); // Return as vailable username
                    }
                }
            });
        }
    });

    // LOGIN

    router.post('/login', (req, res) => {
        // Check if username was provided
        if (!req.body.username) {
            res.json({ success: false, message: 'You must provide a username.' }); // Return error
        } else {
            // Check if password was provided
            if (!req.body.password) {
                res.json({ success: false, message: 'You must provide a password' }); // Return error
            } else {
                // Check if username exists in database
                User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
                    // Check if error was found
                    if (err) {
                        res.json({ success: false, message: err }); // Return error
                    } else {
                        // Check if username was found
                        if (!user) {
                            res.json({ success: false, message: 'Username not found.' }); // Return error
                        } else {
                            // here we know user was found by username
                            const validPassword = user.comparePassword(req.body.password); // Compare password provided to password in database
                            // Check if password is a match
                            if (!validPassword) {
                                res.json({ success: false, message: 'Password does not match.' }); // Return error
                            } else {
                                const token = jwt.sign({ userId: user._id }, config.secret, { expiresIn: '24h' }); // Create a token for client - after 24h they will be logged out
                                res.json({
                                    success: true,
                                    message: 'Success!',
                                    token: token,
                                    user: {
                                        username: user.username
                                    }
                                }); // Return success and token to frontend
                            }
                        }
                    }
                });
            }
        }
    });



    // MIDDLEWARE - Used to grab user's token from headers

    router.use((req, res, next) => {
        const token = req.headers['authorization']; // Create token found in headers
        // Check if token was found in headers
        if (!token) {
            res.json({ success: false, message: 'DEZE: No token provided' }); // Return error
        } else {
            // Verify the token is valid
            jwt.verify(token, config.secret, (err, decoded) => {
                // Check if error is expired or invalid
                if (err) {
                    res.json({ success: false, message: 'Token invalid: ' + err }); // Return error for token validation
                } else {
                    req.decoded = decoded; // Create global variable to use in any request beyond
                    next(); // Exit middleware
                }
            });
        }
    });


    // Route to get user's profile data

    router.get('/profile', (req, res) => {
        // Search for user in database
        User.findOne({ _id: req.decoded.userId }).select('username email').exec((err, user) => {
            // Check if error connecting
            if (err) {
                res.json({ success: false, message: err }); // Return error
            } else {
                // Check if user was found in database
                if (!user) {
                    res.json({ success: false, message: 'User not found' }); // Return error, user was not found in db
                } else {
                    res.json({ success: true, user: user }); // Return success, send user object to frontend for profile
                }
            }
        });
    });


    return router;
}