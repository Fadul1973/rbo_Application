var express = require('express');
var router = express.Router();
//Require controller
var bookController = require('../controllers/book.controller');

router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the bookshop api"});
});

// Create a new book
router.post("/books/", bookController.create);
 
// Retrieve all books
router.get("/books/", bookController.findAll);
 
// Retrieve a single book with id
router.get("/books/:id", bookController.findOne);

// Retrieve a single book with isbn
router.get("/books/:isbn", bookController.findOne);
 
// Update a book with id
router.put("/books/:id", bookController.update);
 
// Delete a book with id
router.delete("/books/:id", bookController.delete);
 
// Delete all books of the database
router.delete("/books/", bookController.deleteAll);
 
module.exports = router;