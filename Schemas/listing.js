const mongoose = require('mongoose');
 
const schema = new mongoose.Schema(
  {
    title: String,
    link: String,
    imageUrl: String,
    area: String, 
    space_type: [],
    descriptionTitle: String, 
    descriptionContent: String,
    amenities: [],
    additions: []
  },
  { timestamps: true },
);
 
module.exports = mongoose.model('Listing', schema);