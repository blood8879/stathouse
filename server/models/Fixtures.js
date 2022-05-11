const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const fixturesSchema = mongoose.Schema({
    date: {
        type:Date
    },
    against: {
        type: String
    },
    stadium: {
        type: Schema.Types.ObjectId,
        ref: 'Stadium'
    },
    isFinish: {
        type: Boolean,
        default: false
    }
})

const Fixture = mongoose.model('Fixture', fixturesSchema);

module.exports = { Fixture }