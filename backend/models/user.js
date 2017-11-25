var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');



// Functions above schema!
// Validate function to check if length of email is ok
let emailLengthChecker = (email) => {
    if (!email) {
        return false;
    } else if (email.length < 5 || email.length > 30) {
        return false;
    } else {
        return true;
    }
}

let usernameLengthChecker = (username) => {
    if (!username) {
        return false;
    } else if (username.length < 8 || username.length > 15) {
        return false;
    } else {
        return true;
    }
}

// Validate Function to check password length
let passwordLengthChecker = (password) => {
    // Check if password exists
    if (!password) {
        return false; // Return error
    } else {
        // Check password length
        if (password.length < 8 || password.length > 35) {
            return false; // Return error if passord length requirement is not met
        } else {
            return true; // Return password as valid
        }
    }
};

let validUsernameChecker = (username) => {
    // Check if username exists
    if (!username) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid username
        const regExp = new RegExp(/^[a-z0-9_-]+$/);
        return regExp.test(username); // Return regular expression test results (true or false)
    }


}

// Validate function to check if valid e-mail format
let validEmailChecker = (email) => {
    // Check if e-mail exists
    if (!email) {
        return false; // Return error
    } else {
        // Regular expression to test for a valid e-mail
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email); // Return regular expression test results (true or false)
    }
}

// Validate Function to check if valid password format
let validPasswordChecker = (password) => {
    // Check if password exists
    if (!password) {
        return false; // Return error
    } else {
        // Regular Expression to test if password is valid format
        const regExp = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,35}$/);
        return regExp.test(password); // Return regular expression test result (true or false)
    }
};

const usernameValidators = [
    // first validator : to check if length of email is ok
    {
        validator: usernameLengthChecker,
        message: 'Username must be at least 8 characters long, but should not be longer than 15 characters.'
    },
    // second validator: to check if email is valid email
    {
        validator: validUsernameChecker,
        message: 'Username can only consist of underscore and hyghen, lowercase characters or digits.'
    },
]

const emailValidators = [
    // first validator : to check if length of email is ok
    {
        validator: emailLengthChecker,
        message: 'Email must be at least 5 characters long, but should not be longer than 30 characters.'
    },
    // second validator: to check if email is valid email
    {
        validator: validEmailChecker,
        message: 'Email must be a valid email.'
    },
]

const passwordValidators = [
    // first validator : to check if length of email is ok
    {
        validator: passwordLengthChecker,
        message: 'Password must be at least 8 characters long, but should not be longer than 35 characters.'
    },
    // second validator: to check if email is valid email
    {
        validator: validPasswordChecker,
        message: 'Password must have at least one uppercase, lowercase, special character, and number.'
    },
]

const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: { type: String, required: true, unique: true, lowercase: true, validate: usernameValidators },
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    password: { type: String, required: true, validate: passwordValidators }
});


userSchema.pre('save', function(next) {
    // we do not want to encrypt password if it is already encrypted
    if (!this.isModified('password')) {
        // closing middleware
        return next();
    } else {
        bcrypt.hash(this.password, null, null, (err, hash) => {
            if (err) {
                return next(err);
            } else {
                // encrypt password
                this.password = hash;
                //closing middleware
                next();
            }
        });
    }
});

// to enable us to decrypt password we will write a method - we will need this for the login
userSchema.methods.comparePassword = function(password) {
    // this will return true or false - password = what user types in - this.password = password in dbase
    return bcrypt.compareSync(password, this.password)
}

module.exports = mongoose.model('User', userSchema);