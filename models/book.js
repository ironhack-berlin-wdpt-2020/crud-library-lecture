// models/book.js

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bookSchema = new Schema(
  {
    title: { type: String, required: true },
    description: String,
    authors: [{ type: Schema.Types.ObjectId, ref: 'Author' }],
    rating: Number
  }
);

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;