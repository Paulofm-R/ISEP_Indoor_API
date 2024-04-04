const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    position: { type: Array, required: [true, 'Missing X Y coordinates'] },
    floor: { type: Number, required: [true, 'Missing floor'] },
    locationType: { type: String, required: [true, 'Missing location type'] },
    inDoor: { type: Boolean, required: [true, 'Indoor missing'] }
});

const Beacon = mongoose.model("beacon", schema);

module.exports = Beacon;