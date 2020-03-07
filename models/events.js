const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const petSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    startDate:
     {type: Date, 
      default: Date.now
    },
    endDate: 
    {type: Date,
     default: Date.now
    },
    startTime: {
     type: Number,
     required: true
    },
    endTime: {
      type: Number,
      required: true
    },
    description: {
     type: String,
     required: true
    }

});

const Pet = mongoose.model("Pet", petSchema);

module.exports = Pet;