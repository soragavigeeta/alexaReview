const sinon = require('sinon');
const Controller = require('../../controller/alexaReviewController');
const AlexaReview = require('../../model/alexaReviewModel');

describe('AlexaReview Controller', () => {
    beforeEach(() => {
        res = {
            send: sinon.spy(),
            status: sinon.stub().returns({ end: sinon.spy() })
        }
        req = {}
    })
    it('Test getAlexaReviewByGivenFilter', () => {
        expectedResult = {
            "review": "Test review",
            "author": "John Doe",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excellent",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2021-07-25T02:27:03.000Z"
        }
        sinon.stub(AlexaReview, 'findAlexaReviewByGivenFilter').returns(expectedResult);
        Controller.getAlexaReviewByGivenFilter('iTunes', 4, "2021-07-25");
        sinon.assert.calledWith(AlexaReview.findAlexaReviewByGivenFilter, 'iTunes', 4, "2021-07-25");
        
    })
    it('Test getAverageRatingByMonthAndYearPerStore', () => {
        expectedResult = { };
        sinon.stub(AlexaReview, 'findAverageRatingByMonthAndYearPerStore').returns(expectedResult);
        Controller.getAverageRatingByMonthAndYearPerStore('01', "2018", "iTunes");
        sinon.assert.calledWith(AlexaReview.findAverageRatingByMonthAndYearPerStore, '01', "2018", "iTunes");
        
    })
    it('Test getTotalRating', () => {
        expectedResult = { };
        sinon.stub(AlexaReview, 'calculateTotalRating').returns(expectedResult);
        Controller.getTotalRating();
        sinon.assert.calledWith(AlexaReview.calculateTotalRating);
    })
    it('Test createReview', () => {
        const newReview = {
            "review": "Test review",
            "author": "John Doe",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excellent",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2021-07-25T02:27:03.000Z"
        }
        sinon.stub(AlexaReview, 'createReview').returns(newReview);
        Controller.createReview(newReview);
        sinon.assert.calledWith(AlexaReview.createReview, newReview);
    })
})