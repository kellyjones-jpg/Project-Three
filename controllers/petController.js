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
        db.Pets
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err))
    },

    delete: function (req, res) {
        db.Pets
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
    }


};