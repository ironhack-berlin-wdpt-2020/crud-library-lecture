const express = require('express');
const router = express.Router();

const Book = require('../models/book')
const Author = require('../models/author')

// READ
// GET /books
router.get('/', (req, res, next) => {

  Book.find().populate('authors').then((books) => {
    console.log('all my books: ' + books)
    let obj = { allBooks: books }
    res.render('book-list', obj);
  })

});


// CREATE
// GET /books/add --> this shows the form
router.get('/add', (req, res, next) => {

  Author.find().then((authors) => {
    res.render('book-add', { allAuthors: authors });
  })

});

// CREATE
// POST /books/add --> this takes the data and stores into db
router.post('/add', (req, res) => {

  console.log("req.body", req.body)

  let book = new Book({ title: req.body.title, description: req.body.description, authors: req.body.author, rating: req.body.rating })

  book.save().then(() => {
    res.redirect('/books')
  })

})

// UPDATE
// GET /books/edit/:identifier
router.get('/edit/:identifier', (req, res) => {
  Book.findById(req.params.identifier).then((book) => {
    res.render('book-update', { myBook: book })
  })

})

// UPDATE
// POST /books/edit
router.post('/edit/:identifier', (req, res) => {

  console.log("req.body", req.body)

  Book.findByIdAndUpdate(req.params.identifier, {
    title: req.body.title,
    description: req.body.description,
    author: req.body.author,
    rating: req.body.rating
  }).then(() => {
    res.redirect('/books')
  })

})

// DELETE
// POST /books/delete/:identifier
router.post('/delete/:identifier', (req, res) => {

  console.log(req.params.identifier)

  Book.findByIdAndDelete(req.params.identifier).then(() => {
    res.redirect('/books')
  })

})



module.exports = router;
