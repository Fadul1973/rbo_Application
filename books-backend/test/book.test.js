let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
 
let mongoose = require('mongoose');
let Book = require('../models/book.model');
 
chai.use(chaiHttp);
 
//the parent block
describe('Testing the /bookshop path', () => {
    //Testing GET /bookshop
    describe('GET /bookshop', () => {
        it('it should return a welcome message', (done) => {
            chai.request(server)
            .get('/bookshop')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Welcome to the bookshop api');
                done();
            });
        });
    });
    //Finished GET /bookshop

    //Testing GET /bookshop/books
    describe('GET /bookshop/books', () => {
        it('it should GET all the books', (done) => {
            chai.request(server)
            .get('/bookshop/books')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    });
     //Finished GET /bookshop/books
    
    //Testing POST /bookshop/books
    describe('POST /bookshop/books', () => {
        it('it should not POST an book without title field', (done) => {
            let book = {
                
                isbn: "9",
                author: "Max",
                description: "Math",
                //userid: "619cd08b3a96796911b757b7" 
            };
            chai.request(server)
                .post('/bookshop/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
        it('it should POST a book ', (done) => {
            let book = {
                title: "latin book",
                isbn: "9",
                author: "max",
                description: "programing book",
                userid: "619cd08b3a96796911b757b7" 
            }; 
            chai.request(server)
                .post('/bookshop/books')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('isbn');
                    res.body.should.have.property('author');
                    res.body.should.have.property('description');
                    done();
                });
        });
    });
    //Finished POST /bookshop/books
});