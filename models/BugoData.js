const mongoose = require("mongoose");

const BugoDataScehma = new mongoose.Schema({
  latePersonName: {
    type: String,
  },
  age: {
    type: String,
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
  jangJi: {
    type: String,
  },
  funeralAddress: {
    type: String,
  },
  imJongDate: {
    type: Date,
  },
  balInDate: {
    type: Date,
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
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

module.exports = mongoose.model("BugoData", BugoDataScehma);
