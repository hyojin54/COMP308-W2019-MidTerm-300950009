/*
COMP308-W2019-MidTerm-300950009

File name: server/models/users.js
Student's name: Hyojin Kim
Student's number: 300950009
Date: February 25, 2019
*/

// require modules for our User Model
let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

let userSchema = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        trim: true,
        required: 'username is required'
    },
    /* taken out because encrypted password is used instead
    password: {
        type: String,
        default: '',
        trim: true,
        required: 'password is required'
    },
    */
    email: {
        type: String,
        default: '',
        trim: true,
        required: 'email is required'
    },
    displayName: {
        type: String,
        default: '',
        trim: true,
        required: 'Dispaly Name is required'
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
},
{
    collection: "users"
}
);

// configure options
let options = ({
    missingPasswordError: "Wrong Password"
});

userSchema.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', userSchema);