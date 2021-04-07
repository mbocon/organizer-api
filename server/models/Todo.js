const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
    user: {
        type: String
    },
    task: {
        type: String
    },
    date: {
        type: String
    }
})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = { Todo }