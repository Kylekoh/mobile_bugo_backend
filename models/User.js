const mongoose = require("mongoose");

const UserScehma = new mongoose.Schema(
  {
    snsId: {
      type: String,
    },
    email: {
      type: String,
    },
    nickName: {
      type: String,
    },
    avatarUrl: {
      type: String,
    },
    ageRange: {
      type: String,
    },
    provider: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserScehma);
