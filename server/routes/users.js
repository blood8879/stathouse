const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

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

module.exports = router;