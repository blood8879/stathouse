const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const matchDetailSchema = mongoose.Schema({
    matchId: {
        type: Schema.Types.ObjectId,
        ref: 'Fixture'
    },
    opponent: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    opponent_imsi: {
        type: String
    },
    goalsFor: {
        type: Number,
        default: 0
    },
    goalsAginst: {
        type: Number,
        default: 0
    },
    result: {
        type: String
    },
    lineup: {
        type: Array,
        default: []
    },
    isHome: {
        type: Boolean,
        default: true
    }
})

const MatchDetail = mongoose.model('MatchDetail', matchDetailSchema);

module.exports = { MatchDetail }