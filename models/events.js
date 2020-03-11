const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    timeStart: {
     type: Number,
     required: true
    },
    timeEnd: {
      type: Number,
      required: true
    },
    appointmentDetails: {
     type: String,
     required: true
    }

});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;