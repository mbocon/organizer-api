const mongoose = require('mongoose');

const workoutSchema = mongoose.Schema({
    user: {
        type: String
    },
    plan: {
        type: Array
    },
    title: {
        type: String
    }
})

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = { Workout }