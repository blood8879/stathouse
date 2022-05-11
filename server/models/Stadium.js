const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stadiumSchema = mongoose.Schema({
    teamId: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    location: {
        type: String
    }
})

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = { Stadium }