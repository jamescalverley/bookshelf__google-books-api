const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  bookID: {
    type: String, 
    trim: true,
    required: true
  },
  title: {
    type: String, 
    trim: true, 
    required: true
  },
  authors: {
    type: String, 
    trim: true, 
    required: true
  },
  description: {
    type: String, 
    trim: true, 
    required: true
  },
  link: {
    type: String, 
    trim: true, 
    required: true
  },
  image: {
    type: String, 
    trim: true, 
    required: true
  },
  createdAt: {
    type: Date, 
    default: Date.now
  } 
}); 

module.exports = mongoose.model('SavedBooks', BookSchema )