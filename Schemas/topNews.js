const mongoose = require('mongoose');
 
const schema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    imgUrl: String,
    content: [String],
    category: String,
    url: {
      type: String,
      unique: true,
      required: true
    }
  },
  { timestamps: true },
);
 
module.exports = mongoose.model('TopNews', schema);