const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerDetailSchema = mongoose.Schema({
    matchId: {
        type: Schema.Types.ObjectId,
        ref: 'Fixture'
    },
    opponent: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    goals: {
        type: Number,
        default: 0
    },
    assists: {
        type: Number,
        default: 0
    }
})

const PlayerDetail = mongoose.model('PlayerDetail', playerDetailSchema);

module.exports = { PlayerDetail }