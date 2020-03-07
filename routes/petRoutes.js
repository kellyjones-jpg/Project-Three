
var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Pet = require('../models/events');

router.get('/', function(req, res, next) {
    Pet.find(function (err) {
        if (err) return next(err);
        res.json();
    });
});

router.get('/:id', function(req, res, next) {
    Pet.findById(req.params.id, function(err) {
        if (err) return next(err);
        res.json();
    });
});

router.post('/', function(req, res, next) {
    Pet.create(req.body, function(err) {
        if (err) return next(err);
        res.json();
    });
});

router.put('/:id', function(req, res, next){
    Pet.findByIdandUpdate(req.params.id, req.body, function(err) {
        if (err) return next(err);
        res.json();
    });
});

router.delete('/:id', function(req, res, next) {
    Pet.findByIdAndRemove(req.params.id, req.body, function(err) {
        if(err) return next(err);
        res.json();
    });
});