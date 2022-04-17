const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const jwt = require('jsonwebtoken')
const moment = require('moment')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        maxlength: 50
    },
    loginId: {
        type: String,
        trim: true,
        unique: 1
    },
    password: {
        type: String,
        minlength: 8
    },
    role: {
        type: Number,
        default: 0
    },
    token: {
        type: String,
    },
    tokenexp: {
        type: Number
    },
    image: {
        type: String
    },
    team: {
        type: Array,
        default: []
    },
    position: {
        type: Array,
        default: []
    }
})

userSchema.pre('save', function(next) {
    var user = this;

    if(user.isModified('password')) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            if (err) return next(err)

            bcrypt.hash(user.password, salt, function(err, hash) {
                if(err) return next(err)
                user.password = hash;
                next();
            })
        })
    } else {
        next()
    }
});

userSchema.methods.comparePassword = function(plainPassword, cb) {
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb) {
    var user = this;

    var token = jwt.sign(user._id.toHexString(), 'secretToken')
    var oneHour = moment().add(1, 'hour').valueOf();
    
    user.tokenExp = oneHour;
    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err)
        cb(null, user)
    })
}

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // 토큰 decode
    jwt.verify(token, 'secretToken', function(err, decoded) {
        // 유저 아이디 찾은 후 token과 DB에 보관된 토큰 일치하는지 확인
        user.findOne({ "_id": decoded, "token": token }, function(err, user) {
            if(err) return cb(err);
            cb(null, user)
        })
    })
}

const User = mongoose.model('User', userSchema);

module.exports = { User };