var express = require('express');
var router = express.Router();
//Require controller
var audiobookController = require('../controllers/audiobook.controller');

router.get('/', function(req, res, next) {
    res.json({message: "Welcome to the audiobookshop api"});
});

// Create a new audiobook
router.post("/audiobooks/", audiobookController.create);
 
// Retrieve all audiobooks
router.get("/audiobooks/", audiobookController.findAll);
 
// Retrieve a single audiobook with id
router.get("/audiobooks/:id", audiobookController.findOne);
 
// Update an audiobook with id
router.put("/audiobooks/:id", audiobookController.update);
 
// Delete an audiobook with id
router.delete("/audiobooks/:id", audiobookController.delete);
 
// Delete all audiobooks of the database
router.delete("/audiobooks/", audiobookController.deleteAll);
 
module.exports = router;