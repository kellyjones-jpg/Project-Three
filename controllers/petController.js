const db = require("../models/events");
const mongoose = require('mongoose');

module.exports = {

create: function(req, res) {
    console.log("hey cool")
    var newEvent = new db(req.body);
    newEvent.save(function (err) {
        if(err)
        return (err);
        res.json({
            message: 'Event Created'
        });
    });
        
},

update: function(req, res) {
    db.Pets
        .findOneAndUpdate({_id: req.params.id }, req.body)
        .then(dbModel => res.json(dbModel))
        .catch(err => res.status(422).json(err))
},

delete: function(req,res) {
    db.Pets
    .findById({ _id: req.params.id })
    .then(dbModel => dbModel.remove())
    .then(dbModel => res.json(dbModel))
    .catch(err => res.status(422).json(err));
}


};