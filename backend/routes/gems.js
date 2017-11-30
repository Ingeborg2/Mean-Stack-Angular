const Gems = require('./../models/gems.js');
const User = require('./../models/user.js');
const mongoose = require('mongoose');

module.exports = function(router) {

    // CREATE A NEW GEMSTONE

    router.post('/newGem', (req, res) => {
        // to test this route in postman
        //res.send('post for register works!');
        if (!req.body.name) {
            res.json({ success: false, message: 'Name is required.' });
        } else if (!req.body.price) {
            res.json({ success: false, message: 'Price is required.' });
        } else if (!req.body.sparkle) {
            res.json({ success: false, message: 'Sparkle is required.' });
        } else {
            // Create the gemstone object for insertion into database
            const gems = new Gems({
                name: req.body.name,
                price: req.body.price,
                forSale: req.body.forSale,
                soldOut: req.body.soldOut,
                sparkle: req.body.sparkle,
                createdBy: req.body.createdBy,
                createdOn: req.body.createdOn,
                updatedOn: req.body.updatedOn
            });
            // Save gemstone in database
            gems.save((err) => {
                // Check if error
                if (err) {
                    // Check if error is a validation error
                    if (err.errors) {
                        // Check if validation error is in the name field
                        if (err.errors.name) {
                            res.json({ success: false, message: err.errors.name.message });
                        } else {
                            // Check if validation error is in the price field
                            if (err.errors.price) {
                                res.json({ success: false, message: err.errors.price.message });
                            } else {
                                // Check if validation error is in the sparkle field
                                if (err.errors.sparkle) {
                                    res.json({ success: false, message: err.errors.sparkle.message });
                                } else {
                                    res.json({ success: false, message: err });
                                }
                            }
                        }
                    } else {
                        res.json({ success: false, message: err }); // Return general error message
                    }
                } else {
                    res.json({ success: true, message: 'Gemstone successfully saved!' }); // Return success message
                }
            });
        }
    });

    // GET ALL GEMSTONES

    router.get('/allGems', (req, res) => {
        // Search database for all gems
        Gems.find({}, (err, gems) => {
            // Check if error was found or not
            if (err) {
                res.json({ success: false, message: err });
            } else {
                // Check if gems were found in database
                if (!gems) {
                    res.json({ success: false, message: 'No gems found.' });
                } else {
                    res.json({ success: true, gems: gems }); // Return success and the gems array)
                }
            }
        }).sort({ 'price': -1 });
    });

    // GET SINGLE GEMSTONE

    router.get('/singleGem/:id', (req, res) => {
        // Check if id is present in parameters
        if (!req.params.id) {
            res.json({ success: false, message: 'No gemstone id was provided.' });
        } else {
            // Check if the gems id is found in database
            Gems.findOne({ _id: req.params.id }, (err, gems) => {
                // Check if the id is a valid ID
                if (err) {
                    res.json({ success: false, message: 'Not a valid gemstone id' }); // Return error message
                } else {
                    // Check if gemstone was found by id
                    if (!gems) {
                        res.json({ success: false, message: 'Gemstone not found.' }); // Return error message
                    } else {
                        // Find the current user that is logged in
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            // Check if error was found
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                // Check if username was found in database
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user' });
                                } else {
                                    // Check if the user who requested single blog is the one who created it
                                    if (user.username !== gems.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this gemstone.' });
                                    } else {
                                        res.json({ success: true, gems: gems }); // Return success and the gemstone
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    // UPDATE GEMSTONE

    router.put('/updateGem', (req, res) => {
        // Check if id was provided
        if (!req.body.id) {
            res.json({ success: false, message: 'No gemstone id provided' });
        } else {
            // Check if id exists in database
            Gems.findOne({ _id: req.body._id }, (err, gems) => {
                // Check if id is a valid ID
                if (err) {
                    res.json({ success: false, message: 'Not a valid gemstone id' });
                } else {
                    // Check if id was found in the database
                    if (!gems) {
                        res.json({ success: false, message: 'Gemstone id was not found.' });
                    } else {
                        // Check who user is that wants to update the gemstone
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            // Check if error was found
                            if (err) {
                                res.json({ success: false, message: err });
                            } else {
                                // Check if user was found in the database
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user.' });
                                } else {
                                    // Check if user that is logged in, is the the user that created the gemstone, that he/she wants to update
                                    if (user.username !== gems.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to edit this gemstone.' });
                                    } else {
                                        name = req.body.name;
                                        price = req.body.price;
                                        forSale = req.body.forSale;
                                        soldOut = req.body.soldOut;
                                        sparkle = req.body.sparkle;
                                        createdBy = req.body.createdBy;
                                        createdOn = req.body.createdOn;
                                        updatedOn = req.body.updatedOn;

                                        gems.save((err) => {
                                            if (err) {
                                                if (err.errors) {
                                                    res.json({ success: false, message: 'Please ensure form is filled out properly' });
                                                } else {
                                                    res.json({ success: false, message: err });
                                                }
                                            } else {
                                                res.json({ success: true, message: 'Gems successfully updated!' });
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });

    // DELETE GEMSTONE

    router.delete('/deleteGem/:id', (req, res) => {
        // Check if ID was provided in parameters
        if (!req.params.id) {
            res.json({ success: false, message: 'No id provided' }); // Return error message
        } else {
            // Check if id is found in database
            Gems.findOne({ _id: req.params.id }, (err, gems) => {
                // Check if error was found
                if (err) {
                    res.json({ success: false, message: 'Invalid gemstone id' }); // Return error message
                } else {
                    // Check if gemstone was found in database
                    if (!gems) {
                        res.json({ success: false, messasge: 'Gemstone was not found' }); // Return error message
                    } else {
                        // Get info on user who is attempting to delete post
                        User.findOne({ _id: req.decoded.userId }, (err, user) => {
                            // Check if error was found
                            if (err) {
                                res.json({ success: false, message: err }); // Return error message
                            } else {
                                // Check if user's id was found in database
                                if (!user) {
                                    res.json({ success: false, message: 'Unable to authenticate user.' }); // Return error message
                                } else {
                                    // Check if user attempting to delete blog is the same user who originally posted the blog
                                    if (user.username !== gems.createdBy) {
                                        res.json({ success: false, message: 'You are not authorized to delete this gemstone post' }); // Return error message
                                    } else {
                                        // Remove the blog from database
                                        gems.remove((err) => {
                                            if (err) {
                                                res.json({ success: false, message: err }); // Return error message
                                            } else {
                                                res.json({ success: true, message: 'Gemstone deleted!' }); // Return success message
                                            }
                                        });
                                    }
                                }
                            }
                        });
                    }
                }
            });
        }
    });


    return router;
}