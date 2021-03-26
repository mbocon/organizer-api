const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
    user: {
        type: String
    },
    activity: {
        type: String
    },
    distance: {
        type: String
    },
    sets: {
        type: String
    },
    reps: {
        type: String
    },
    weight: {
        type: String
    }
   
})

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = { Exercise }