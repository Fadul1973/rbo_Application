const db = require("../models");
const Book = db.books;

//Welcome page
exports.start = (response) => {
    response.writeHead(200, {"Content-type": "text/plain"});
    response.write("Welcome to the bookshop system");
    response.end();
};

// Create and Save a new Book
exports.create = (req, res) => {
     // Validate request
    if (!req.body.title) {
        res.status(400).send({ message: "Content can not be empty!" });
        return;
    }
  
    // Create a book model object
    const book = new Book({
        title: req.body.title,
        isbn: req.body.isbn,
        author: req.body.author,
        description: req.body.description,
    });
    // Save Book in the database
    book
        .save(book)
        .then(data => {
            console.log("Book saved in the database: " + data);
            res.send(data);
        })
        .catch(err => {
            res.status(500).send( {
                message:
                  err.message || "Some error occurred while creating the Book."
            });
        });
};
 
// Retrieve all Books from the database by Title.
exports.findAll = (req, res) => {
    const title = req.query.title;
    //We use req.query.title to get query string from the Request and consider it as condition for findAll() method.
    var condition = title ? { title: { $regex: new RegExp(title), $options: "i" } } : {};
    Book
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

//Find a single Book with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Book.findById(id)
        .then(data => {
            if (!data)
                res.status(404).send({ message: "Not fond book by id!" + id });
            else res.send(data);
        })
        .catch(err => {
            res
                .status(500)
                .send({ message: "Error retrieving book with id!" + id });

        });
};
 
// Update a Book by the id in the request
exports.update = (req, res) => {
    if (!req.body) {
        return res.status(404).send({
            message: "Data to update can not be empty!"
        });
    } 

    const id = req.params.id;

    Book.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot update Book with id=${id}.Maybe Book was not found`
                });
            } else res.send({ message: "Book was updated successfully. " });
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Book with id=" + id
            });
        });  
};
 
// Delete a Book with the specified id in the request
exports.delete = (req, res) => {
    
    const id = req.params.id;

    Book.findByIdAndRemove(id, { useFindAndModify: false })
        .then(data => {
            if (!data) {
                res.status(404).send({
                    message: `Cannot delete Book with id=${id}.Maybe Book was not found`
                });
            } else {
                res.send({
                  message: "Book was updated successfully. "
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Book with id=" + id
            });
       });        
};
 
 
// Delete all Books from the database.
exports.deleteAll = (req, res) => {

    Book.deleteMany({})
        .then(data => {
            res.send({
                message: `${data.deletedCount} Books were deleted successfully!`
            });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while removing all Books."
            });
        });
};

// Find all purchased Books
exports.findAllPurchased = (req, res) => {
    Book.find({ purchased: true })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving Books."
            });
        });
}