const router = require("express").Router();
const User = require("../models/User");
const CryptoJS = require("crypto-js");
const verify = require("../verifyToken");

// UPDATE
router.put("/:id", verify, async (req, res, next) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        if (req.body.password) {
            const cipherPassword = CryptoJS.AES.encrypt(
                req.body.password,
                process.env.SECRET_KEY
            ).toString();
        }

        try {
            const updateUser = await User.findByIdAndUpdate(req.user.id, {
                $set: req.body,
            },
            { new: true}
            );
            res.status(200).json(updateUser); 
        } catch(err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You can update only your account!");
    }
})

// DELETE
router.delete("/:id", verify, async (req, res) => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            const user = await User.findByIdAndDelete(req.user.id);
            res.status(200).json(`User was deleted`);
        } catch (err) {
            res.status(500).json("Sever error");
        }
    } else {
        res.status(403).json("You can delete only your own account");
    }
})

// GET
router.get("/find/:id", async (req, res) => {
    try {
        const user = User.findById(req.params.id);
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
})

// GET ALL
router.get("/find", verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
        try {
            const users = query ? await User.find().limit(10) : await User.find();
            res.status(200).json(users)
        } catch (err) {
            res.status(500).json(err);
        }
    }
})


// GET USER STATS
// todo

module.exports = router;