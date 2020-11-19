const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const PointSchema = new Schema({
    type: {type: String, default: 'Point'},
    coordinates: { type: [Number], index: '2dsphere'}
});// it is very tiny, so we put it here

const DriverSchema = new Schema({
    email: {
        type: String,
        required: true // email is necessary
    },
    driving: {
        type: Boolean,
        default: false
    },
    geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;