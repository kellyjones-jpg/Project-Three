const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  timeStart: {
    type: String,
    required: true
  },
  timeEnd: {
    type: String,
    required: true
  },
  appointmentDetails: {
    type: String,
    required: false
  }

});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;