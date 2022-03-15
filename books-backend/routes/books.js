var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'bookshopdb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
    res.send({ message: 'Welcome to the booshop api.' });
});
 
// GET list of books to show that we're up and running
router.get('/books', function(req, res, next) {
    //Getting list of books from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('books');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving books." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new book to the db
router.post('/books', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { title: req.body.title, 
               isbn: req.body.isbn, 
               author: req.body.author,
               description: req.body.description,};

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('books');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the book."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /book
router.put('/books', function (req, res) {
 res.send('Got a PUT request at /book');
});
 
// accept DELETE request at /book
router.delete('/books', function (req, res) {
 res.send('Got a DELETE request at /book');
});
 
module.exports = router;