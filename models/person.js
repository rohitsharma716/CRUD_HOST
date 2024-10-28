const mongoose = require('mongoose');
const passport = require('passport');

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true  // Fixed typo from `require` to `required`
    }, 
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'waiter', 'manager'],  // Fixed typo in 'manager'
        required: true  // Fixed typo from `require` to `required`
    }, 
    contact: {  // Fixed typo from `contect` to `contact`
        type: String,
        required: true  // Fixed typo from `require` to `required`
    },
    email: {
        type: String,
        required: true,
        // unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username:{
        type: String,
        required: true,
        unique: true,

    },
    password:{
        type:String,
        // unique: true,
        required: true
    }
});

module.exports = mongoose.model('Person', personSchema);
