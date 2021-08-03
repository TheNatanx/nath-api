import mongoose, {Schema} from "mongoose";

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

const codingProblemModel = mongoose.model("codingProblem", codingProblem, 'DailyCodingProblems')

// let awesome_instance = new codingProblemModel({ number: 3, difficulty: "Easy", statement: "Hey this is my problem :)" });
//
// // Save the new model instance, passing a callback
// awesome_instance.save(function (err) {
//     if (err) return handleError(err);
//     // saved!
// });
