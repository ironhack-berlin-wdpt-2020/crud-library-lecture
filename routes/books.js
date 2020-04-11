const express = require('express');
const router = express.Router();

const Book = require('../models/book')

// GET /books/add --> this shows the form
router.get('/add', (req, res, next) => {

  res.render('book-add');
});

// POST /books/add --> this takes the data and stores into db
router.post('/add', (req, res) => {

  console.log("req.body", req.body)

  let book = new Book({ title: req.body.title, description: req.body.description, author: req.body.author, rating: req.body.rating })

  book.save().then(() => {
    res.redirect('/books/add')
  })

})


module.exports = router;
