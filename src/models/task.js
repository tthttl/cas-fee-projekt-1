const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    creationDate: String,
    deadline: String,
    isFinished: Boolean,
    title: String,
    importance: Number,
    description: String,
});

module.exports = mongoose.model('Task', taskSchema);
