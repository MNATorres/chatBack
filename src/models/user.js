const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  user: {
    type: String,
  },
});

module.exports = mongoose.model("User", userSchema);
