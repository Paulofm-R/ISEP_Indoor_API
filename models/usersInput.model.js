const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: [true, 'User ID is missing']},
    comment: { type: String, required: [true, 'Your comment is missing!'] },
    satafetionLvl: { type: String, enum: { values: ['Neutral', 'Not satisfied', 'Satisfied'], message: '{VALUE} is not supported' }},
    answers: { type: Array, default: []},
    type: { type: String, enum: { values: ['Problem', 'Feedback'], message: '{VALUE} is not supported' }, efault: 'Feedback' },
    date: { type: String, required: [true, 'Missing date.'] },
    resolved: { type: Boolean, default: false },
});
const UserInput = mongoose.model("UserInput", schema);

module.exports = UserInput;