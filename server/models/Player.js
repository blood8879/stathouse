const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const playerSchema = mongoose.Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    role: {
        type: Number,
        default: 0
    },
    joinDate: {
        type: Date,
        default: Date.now()
    },
    position: {
        type: Array,
        default: []
    },
    Apps: {
        type: Number
    },
    Goals: {
        type: Number
    },
    Assists: {
        type: Number
    },
    backNo: {
        type: Number,
        unique: 1
    }
})

const Player = mongoose.model('Player', playerSchema);

module.exports = { Player }