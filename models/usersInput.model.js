const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    userId: { type: mongoose.Types.ObjectId, required: [true, 'User ID is missing']},
    comment: { type: String, required: [true, 'Your comment is missing!'] },
    satafetionLvl: { type: Number, enum: { values: ['Neutral', 'Not satisfied', 'Satisfied'], message: '{VALUE} is not supported' }, default: 'Neutral' },
    answers: { type: Array },
    type: { type: String, enum: { values: ['Problem', 'Feedback'], message: '{VALUE} is not supported' }, efault: 'Feedback' },
    date: { type: String, required: [true, 'Missing date.'] },
    resolved: { type: Boolean, default: true },
});
const UserInput = mongoose.model("UserInput", schema);

module.exports = UserInput;