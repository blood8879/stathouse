const express = require('express');
const res = require('express/lib/response');
const multer = require('multer');
const router = express.Router();
const { Team } = require('../models/Team');
const { User } = require('../models/User');

//=================================
//             Teams
//=================================

var storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function(req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }
})

var upload = multer({ storage: storage, limits: {fileSize: 5 * 1024 * 1024} }).single("file")

router.post('/emblem', (req, res) => {
    upload(req, res, (err) => {
        if(err) {
            return res.json({ success: false, err })
        }
        return res.json({ success: true, filePath: res.req.file.path, fileName: res.req.file.filename })
    })
})

router.post('/', (req, res) => {
    const team = new Team(req.body)
    team.save((err) => {
        User.findOneAndUpdate(
            { _id: req.body.owner },
            {
                $push: {
                    teams: {
                        id: team._id,
                        date: Date.now()
                    }
                }
            },
            { new: true },
            (err, userInfo) => {
                // if(err) return res.status(400).json({ success: false, err }) 
                // res.status(200).send(userInfo.teams)
                // next();
            }
        )
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })

    
})

router.post('/teamlist', (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm
    // mongodb 부분 일치 검색 기능(like) 사용하려면 정규표현식 써줘야 동작함.
    const regex = (pattern) => new RegExp(`.*${pattern}.*`);
    const Regex = regex(term)
    // `.*${term}.*`

    if(term) {
        // Team.find({ $text: { $search: term } }) // 주석 처리한 내용은 완전 일치 검색
        // 복수 검색 및 대소문자 구분없이 검색 위한 "i" options 적용
        Team.find({ $or: [ { name: Regex }, { ticker: { "$regex": Regex, "$options": "i" }} ]})
        .populate("owner")
        .skip(skip)
        .limit(limit)
        .exec((err, teamInfo) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({
                success: true, teamInfo,
                postSize: teamInfo.length
            })
        })
    } else {
        Team.find({})
        .populate("owner")
        .skip(skip)
        .limit(limit)
        .exec((err, teamInfo) => {
            if(err) return res.status(400).json({ success: false, err })
            return res.status(200).json({
                success: true, teamInfo,
                postSize: teamInfo.length
            })
        })
    }
})

router.get('/team_by_id', (req, res) => {
    let teamId = req.query.id
    
    Team.find({ _id: { $in: teamId } })
    .populate('member')
    .exec((err, team) => {
        if(err) return res.status(400).json(err)
        return res.status(200).send(team)
    })

})

module.exports = router;