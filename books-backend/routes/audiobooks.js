var express = require('express');
var router = express.Router();

var bodyParser = require('body-parser');
var multer = require('multer'); 
var upload = multer(); 

const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
const dbName = 'booksdb';
const client = new MongoClient(url);

// GET at the root just to demonstrate
router.get('/', function(req, res, next) {
   res.send('got a GET request at /');
});
 
// GET list of audiobooks to show that we're up and running
router.get('/audiobooks', function(req, res, next) {
    //Getting list of audiobooks from database
    client.connect(function(err) { 
        const db = client.db(dbName);
        const collection = db.collection('audiobooks');
        collection.find({}).toArray(function(err, data) {
            if (err != null) {
                console.log(err);
                return res.status(500).send({ 
                    message: err.message || "Some error occurred while retrieving audiobooks." });
            }
            return res.send(data);
        });
    });
});
 
// accept POST request and add a new audiobook to the db
router.post('/audiobooks', upload.array(), function (req, res) {
     //Extracting data and saving in the database.
    let nu = { title: req.body.title, 
               no: req.body.no,          
               author: req.body.author,
               description: req.body.description,};

    client.connect(function(err) {
        const db = client.db(dbName);
        const collection = db.collection('audiobooks');
        collection.insertOne(nu, function(err, result) {
            if(err != null) { 
                console.log(err);
                return res.status(500).send({
                    message:
                    err.message || "Some error occurred while creating the audiobook."});
            }
            return res.send(result);
        });
    });
});
 
// accept PUT request at /audiobook
router.put('/audiobooks', function (req, res) {
 res.send('Got a PUT request at /audiobook');
});
 
 
// accept DELETE request at /book
router.delete('/audiobooks', function (req, res) {
 res.send('Got a DELETE request at /audiobook');
});
 
module.exports = router;