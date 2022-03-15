const db = require("../models");
const AudioBook = db.audiobooks;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the bookshop system");
    response.end();
};

// Create and Save a new audioBook
exports.create = (req, res) => {
     // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create an audiobook model object
    const audiobook = new AudioBook({
        title: req.body.title,
        no: req.body.no,
        author: req.body.author,
        description: req.body.description,
    });
    // Save AudioBook in the database
    audiobook
        .save(audiobook)
        .then(data => {
            console.log("AudioBook saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the AudioBook."
            });
        });
};
 
// Retrieve all AudioBooks from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    //We use req.query.title to get query string from the Request and consider it as condition for findAll() method.
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    AudioBook
        .find(condition)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message: 
                    err.message || "Some error occurred while retrieving Books."
            });
        });
};

//Find a single AudioBook with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    AudioBook.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not fond audiobook by id!" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving audiobook with id!" + id });

        });
};
 
// Update an AudioBook by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    AudioBook.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update AudioBook with id=${id}.Maybe AudioBook was not found`
                });
            } else res.send({ message: "AudioBook was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating AudioBook with id=" + id
            });
        });  
};
 
// Delete an AudioBook with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    AudioBook.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete AudioBook with id=${id}.Maybe AudioBook was not found`
                });
            } else {
                res.send({
                  message: "AudioBook was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete AudioBook with id=" + id
            });
       });        
};
 
// Delete all AudioBooks from the database.
exports.deleteAll = (req, res) => {

    AudioBook.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} AudioBooks were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all AudioBooks."
            });
        });
};

// Find all published AudioBooks
exports.findAllPublished = (req, res) => {
    AudioBook.find({ purchased: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving AudioBooks."
            });
        });
}