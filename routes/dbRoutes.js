
const router = require('express').Router();
const petController = require('../controllers/petController');


router.route("/")
    .get(petController.find)
    .post(petController.create);

router.route("/:id")
    .get(petController.findById)
    .put(petController.findByIdAndUpdate)
    .delete(petController.findByIdAndRemove);

    module.exports = router;