let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../app');
let should = chai.should();
 
let mongoose = require('mongoose');
let AudioBook = require('../models/audiobook.model');
 
chai.use(chaiHttp);
 
//the parent block
describe('Testing the /audiobookshop path', () => {
    //Testing GET /audiobookshop
    describe('GET /audiobookshop', () => {
        it('it should return a welcome message', (done) => {
            chai.request(server)
            .get('/audiobookshop')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                res.body.should.have.property('message');
                res.body.should.have.property('message').eql('Welcome to the audiobookshop api');
                done();
            });
        });
    });
    //Finished GET /audiobookshop

    //Testing GET /audiobookshop/audiobooks
    describe('GET /audiobookshop/audiobooks', () => {
        it('it should GET all the audiobooks', (done) => {
            chai.request(server)
            .get('/audiobookshop/audiobooks')
            .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('array');
                res.body.length.should.not.be.eql(0);
                done();
            });
        });
    });
     //Finished GET /audiobookshop/audiobooks
    
    //Testing POST /audiobookshop/audiobooks
    describe('POST /audiobookshop/audiobooks', () => {
        it('it should not POST an audiobook without title field', (done) => {
            let book = {
                
                no: "9",
                type: "audiobook",
                author: "Max",
                userid: "619cd08b3a96796911b757b8" 
            };
            chai.request(server)
                .post('/audiobookshop/audiobooks')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.should.be.a('object');
                    res.body.should.have.property('message');
                    res.body.message.should.be.eql('Content can not be empty!');
                    done();
                });
        });
        it('it should POST an audiobook ', (done) => {
            let book = {
                title: "french audiobook",
                no: "9",
                type: "audiobook",
                author: "jake",
                userid: "619cd08b3a96796911b757b8" 
            }; 
            chai.request(server)
                .post('/audiobookshop/audiobooks')
                .send(book)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    //res.body.should.have.property('_id');
                    res.body.should.have.property('title');
                    res.body.should.have.property('no');
                    res.body.should.have.property('type');
                    res.body.should.have.property('author');
                    done();
                });
        });
    });
    //Finished POST /audiobookshop/audiobooks
});