const router = require('express').Router();
const List = require('../models/List');
const { aggregate } = require('../models/List');
const verify = require('../verifyToken');

router.post("/", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newList = new List(req.body);
        try {
            const savedList = await newList.save();
            res.status(201).json(savedList);
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
})

router.delete("/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
        try {
            await List.findByIdAndDelete(req.params.id);
            res.status(200).json("Movie was deleted");
        } catch (err) {
            res.status(500).json(err);
        }
    } else {
        res.status(403).json("You are not allowed");
    }
})

router.get("/", verify, async (req, res) => {
    const typeQuery = req.query.type;
    const genreQuery = req.query.genre;
    let moviesList = [];

    try {
        if (typeQuery) {
            if (genreQuery) {
                moviesList = await List.aggregate([
                    { $sample: { size: 10} },
                    { $match: { type: typeQuery, genre: genreQuery }},
                ]);
            } else {
                moviesList = await List.aggregate([
                    { $sample: { size: 1} },
                    { $match: { type: typeQuery }},
                ]);
            }
        } else {
            moviesList = await List.aggregate([ { $sample: { size: 10} }]);
        }
        res.status(200).json(moviesList);
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;