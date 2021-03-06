const mongoose = require('mongoose');
const { Schema } = mongoose;

const codingProblem = new Schema({
    number: {
        type: Number,
        required: true
    },
    difficulty: {
        type: String,
        enum: ["Easy", "Medium", "Hard"],
        required: true
    },
    statement: {
        type: String,
        required: true
    }
}, {_id: true});

module.exports = mongoose.model("codingProblem", codingProblem, 'DailyCodingProblems');
