const dbConfig = require("../config/db.config.js");
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;
db.url = dbConfig.url;

db.books = require("./book.model.js")(mongoose);
db.audiobooks = require("./audiobook.model.js")(mongoose);

db.users = require("./user.model");
db.roles = require("./role.model");

db.ROLES = ["user", "admin", "moderator"];

module.exports = db;