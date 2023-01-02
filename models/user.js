const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const passportLocalMongoose = require('passport-local-mongoose');

const UserScheme = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

UserScheme.plugin(passportLocalMongoose);//plugin will help to add username and password.

module.exports = mongoose.model('User', UserScheme);