
const router = require('express').Router();
const petController = require('../../controllers/petController');


router.route("/")
    .get(petController.findAll)
    .post(petController.create);
    

router.route("/:id")
    .get(petController.get)
    .delete(petController.delete);
    // .get(petController.findById)
    // .put(petController.findByIdAndUpdate)
    // .delete(petController.findByIdAndRemove);

module.exports = router;