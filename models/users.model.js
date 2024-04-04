const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String, required: [true, 'The name is missing!'] },
    email: { type: String, required: [true, 'Your email is missing!'], unique: true },
    password: { type: String, required: [true, 'A password is missing!'] },
    image: { type: String, default: '' },
    type: { type: String, enum: { values: ['user', 'admin'], message: '{VALUE} is not supported' }, default: 'user' },
    active: { type: Boolean, default: true },
    AccessibilityLvl: { type: Number, enum: { values: [0, 1, 2], message: '{VALUE is not supported' }, required: [true, 'Your level of accessibility is lacking']}
});
const User = mongoose.model("Users", schema);

module.exports = User;