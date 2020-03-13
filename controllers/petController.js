const db = require("../models/events");
const mongoose = require('mongoose');

module.exports = {

    create: function (req, res) {
        console.log("hey cool")
        var newEvent = new db(req.body);
        newEvent.save(function (err) {
            console.log(err)
            if (err) {
                res.json(err)
            }
            // return (err);
            res.json({
                message: 'Event Created'
            });
        });

    },

    findAll: function (req, res) {
        console.log("get ALL endpoint on the backend");
        db.find({}, function (err, docs) {
                if (err) {
                    res.json(err)
                }
                res.json(
                    docs
                );
            })
    },

    update: function (req, res) {
        db
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },
    get: function (req, res) {
        console.log("get:id endpoint on the backend");
        db
            .find({ _id: req.params.id })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    delete: function (req, res) {
        db
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }


};