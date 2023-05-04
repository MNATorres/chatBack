const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
   sender: {
    type: String,
  },
  text: {
    type: String,
  },
  timestamp: {
    type: String,
  },
});


module.exports = mongoose.model('Message', messageSchema);