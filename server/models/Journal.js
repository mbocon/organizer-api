const mongoose = require('mongoose');

const journalSchema = mongoose.Schema({
    user: {
        type: String
    },
    text: {
        type: String
    },
    title: {
        type: String
    }
}, { timestamps: true })

const Journal = mongoose.model('Journal', journalSchema);

module.exports = { Journal }