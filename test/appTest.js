let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
let server = require('../app');

chai.use(chaiHttp);

describe('App test', () => {
    it('Test get API', (done) => {
        chai.request('http://localhost:5000')
            .get('/')
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object')
                done();
            })
    })
    it('API should filter by storeType date and ratings', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/alexa/filter?storeType=iTunes&date=2018-01-12&rating=1')
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('array');
                done();
            })
    })
    it('API filter by storeType date and ratings should return 404 if data not found', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/alexa/filter?storeType=someStore')
            .end((err, response) => {
                response.should.have.status(404)
                response.body.should.be.a('object');
                done();
            })
    })
    it('API should give average rating for given month,year and storeType', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/alexa/average/01/2018/iTunes')
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object');
                done();
            })
    })
    it('API should return 404 not found if path is incorrect', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/alexa/average/01/2018')
            .end((err, response) => {
                response.should.have.status(404)
                response.body.should.be.a('object');
                done();
            })
    })
    it('API should return 404 not found if path is incorrect', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/alexa/average/01/2018')
            .end((err, response) => {
                response.should.have.status(404)
                response.body.should.be.a('object');
                done();
            })
    })
    it('API should return total number of ratings', (done) => {
        chai.request('http://localhost:5000')
            .get('/api/alexa/totalRating')
            .end((err, response) => {
                response.should.have.status(200)
                response.body.should.be.a('object');
                done();
            })
    })
    it('API should add data to the file and return added object', (done) => {
        const newReview = {
            "review": "Test review",
            "author": "John Doe",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excellent",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2021-07-25T02:27:03.000Z"
        }
        chai.request('http://localhost:5000')
            .post('/api/alexa/postReview')
            .send(newReview)
            .end((err, response) => {
                response.should.have.status(201)
                response.body.should.be.a('object')
                response.body.should.have.property('review').eq("Test review");
                response.body.should.have.property('author').eq("John Doe");
                response.body.should.have.property('review_source').eq("iTunes");
                response.body.should.have.property('rating').eq(4);
                response.body.should.have.property('title').eq("Excellent");
                response.body.should.have.property('product_name').eq("Amazon Alexa");
                response.body.should.have.property('reviewed_date').eq("2021-07-25T02:27:03.000Z");
                done();
            })
    })
})