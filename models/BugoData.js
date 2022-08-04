const mongoose = require("mongoose");

const BugoDataScehma = new mongoose.Schema({
  latePersonName: {
    type: String,
  },
  age: {
    type: Number,
  },
  mourner: {
    type: String,
  },
  funeralHall: {
    type: String,
  },
  binso: {
    type: String,
  },
  funeralAddress: {
    type: String,
  },
  imJongDate: {
    type: Date,
  },
  imJongTime: {
    type: Number,
  },
  imJongMinute: {
    type: Number,
  },
  balInDate: {
    type: Date,
  },
  balInTime: {
    type: Number,
  },
  balInMinute: {
    type: Number,
  },
  accountHolder: {
    type: String,
  },
  bankName: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
});

module.exports = mongoose.model("BugoData", BugoDataScehma);
