const mongoose = require('mongoose');
 
const schema = new mongoose.Schema(
  {
    link: {
      type: String,
      unique: true,
      required: true,
    },
  },
  { timestamps: true },
);
 
module.exports = mongoose.model('Url', schema);