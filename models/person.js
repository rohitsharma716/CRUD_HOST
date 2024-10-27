const mongoose = require('mongoose');

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
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Person', personSchema);
