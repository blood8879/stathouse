const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const stadiumSchema = mongoose.Schema({
    region: {
        type: String
    }
})

const Stadium = mongoose.model('Stadium', stadiumSchema);

module.exports = { Stadium }