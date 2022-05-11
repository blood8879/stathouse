const { now } = require('moment');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const teamSchema = mongoose.Schema({
    owner: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String,
        maxlength: 30
    },
    ticker: {
        type: String,
        maxlength: 5
    },
    emblem: {
        type: String
    },
    description: {
        type: String
    },
    squad: {
        type: Array,
        default: []
    },
    stadium: {
        type: Array,
        default: []
    },
    fixture: {
        type: Array,
        default: []
    },
    views: {
        type: Number,
        default: 0
    },
    published: {
        type: Date,
        default: Date.now()
    }
}, {timestamps: true})

// 검색 기능을 위한 인덱스 설정 - 어디에 걸려야 하는지 어디에 더 중점적으로 걸려야 하는지 설정
teamSchema.index({
    name: 'text',
    ticker: 'text'
}, {
    weights: {
        title: 5,
        ticker: 3
    }
})

const Team = mongoose.model('Team', teamSchema);

module.exports = { Team }