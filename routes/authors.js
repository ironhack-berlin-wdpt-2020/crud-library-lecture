const express = require('express');
const router = express.Router();

const Author = require('../models/author')


// READ
// GET /authors
router.get('/', (req, res, next) => {

  Author.find().then((authors) => {
    console.log('all my authors: ' + authors)
    res.render('author-list', { allAuthors: authors });
  })

});


// CREATE
// GET /authors/add --> this shows the form
router.get('/add', (req, res, next) => {

  res.render('author-add');
});

// CREATE
// POST /authors/add --> this takes the data and stores into db
router.post('/add', (req, res) => {

  console.log("req.body", req.body)

  // let { name, lastName, nationality } = req.body

  let author = new Author({
    name: req.body.name,
    lastName: req.body.lastName,
    nationality: req.body.nationality
  })

  author.save().then(() => {
    res.redirect('/authors')
  })

})

module.exports = router