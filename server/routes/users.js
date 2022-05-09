const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");
const { Team } = require('../models/Team');

//=================================
//             User
//=================================

router.get("/auth", auth, (req, res) => {
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        loginId: req.user.loginId,
        name: req.user.name,
        role: req.user.role,
        image: req.user.image,
        teams: req.user.teams
    });
});

router.post("/register", (req, res) => {
    const user = new User(req.body)

    user.save((err, doc) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});

router.post("/login", (req, res) => {
    User.findOne({ loginId: req.body.loginId }, (err, user) => {
        if(!user)
            return res.status(400).json({ loginSuccess: false, message: "Auth failed, loginId not found." });
        
        user.comparePassword(req.body.password, (err, isMatch) => {
            if(!isMatch)
                return res.status(400).json({ loginSuccess: false, message: "Wrong Password." });
            
            user.generateToken((err, user) => {
                if(err) return res.status(400).send(err);
                res.cookie("w_authExp", user.tokenExp);
                res.cookie("w_auth", user.token).status(200).json({ loginSuccess: true, userId: user._id })
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if(err) return res.status(400).json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

router.post('/joinTeam', auth, (req, res) => {
    let userId = req.body._id
    let teamId = req.body.teamId

    User.findOne({ _id: userId},
        (err, teamInfo) => {
            // 가져온 정보에서 가입하려는 팀이 이미 있는지 확인
            let duplicate = false;

            teamInfo.teams.forEach((item) => {
                if(item.id === teamId) {
                    duplicate = true;
                    return;
                }
            })

            if(duplicate == false)
                Team.findOneAndUpdate(
                    { _id: teamId },
                    {
                        $push: {
                            squad: {
                                id: userId,
                                date: Date.now()
                            }
                        }
                    }
                )

                User.findOneAndUpdate(
                    { _id: userId },
                    {
                        $push: {
                            teams: {
                                id: teamId,
                                date: Date.now()
                            }
                        }
                    },
                    (err, teamInfo) => {
                        if(err) return res.status(400).json({ success: false, err })
                        return res.status(200).json({ success: true, teamInfo })    
                    }
                )

                
        }    
    )
    // User.findOneAndUpdate(
    //     { _id: userId},
    //     {
    //         $push: {
    //             teams: {
    //                 id: teamId,
    //                 date: Date.now()
    //             }
    //         }
    //     },
    //     { new: true },
    //     (err, teamInfo) => {
    //         if(err) return res.status(400).json({ success: false, err })
    //         return res.status(200).json({ success: true, teamInfo })
    //     }
    // )
})

module.exports = router;