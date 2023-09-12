const mongoose = require('mongoose');
const habitSchema = new mongoose.Schema({
    habit : {
        required: true,
        type: String
    },
    date: {
        required: true,
        type: String
    },
    completed: {
        required: true,
        type: Boolean
    }
});

module.exports = mongoose.model('Habit', habitSchema);