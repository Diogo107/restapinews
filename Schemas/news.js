const mongoose = require('mongoose');
 
const schema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    imageUrl: String,
    content: [String],
    url: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true },
);
 
module.exports = mongoose.model('News', schema);