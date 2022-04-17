const express = require('express');
const res = require('express/lib/response');
const multer = require('multer');
const router = express.Router();
const { Team } = require('../models/Team');

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
        if(err) return res.status(400).json({ success: false, err })
        return res.status(200).json({ success: true })
    })
})

router.post('/teamlist', (req, res) => {
    let limit = req.body.limit ? parseInt(req.body.limit) : 100;
    let skip = req.body.skip ? parseInt(req.body.skip) : 0;
    let term = req.body.searchTerm

    if(term) {
        Team.find({ $text: { $search: term } })
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




module.exports = router;