const assert = require('chai').assert;
const AlexaReview = require('../../model/alexaReviewModel');
const expect = require('chai').expect;
const chai = require('chai');
const should = chai.should();
const alexaReviewData = require('../../data/alexa');

describe('Test model class', () => {
    it('Test checkValue', () => {
        assert.equal(AlexaReview.checkValue('reviewed_date', '2018-01-11', '2018-01-12'), true);
    })

    it('CheckValue: check for null value of parameters', function () {
        let result = AlexaReview.checkValue(null, null, null);
        assert.equal(result, false);
    })
});

describe('findAlexaReviewByGivenFilter()', () => {
    it('Input validation: Check for nullparameters', () => {
        AlexaReview.findAlexaReviewByGivenFilter(null, null, null).then((result) => {
        }).catch((error) => {
            assert.equal(error, { message: 'Parameters cannot be null' });
        })
    });
    it('Input validation: Check for wrong storeType', async () => {
        let result = await AlexaReview.findAlexaReviewByGivenFilter('Google', '4', '2018-01-12');
        assert.equal(result.length, 0);
    });
    it('Input validation: Check for wrong rating', async () => {
        let result = await AlexaReview.findAlexaReviewByGivenFilter('GooglePlayStore', '0', '2018-01-12');
        assert.equal(result.length, 0);
    });
    it('Input validation: Check for wrong rating', async () => {
        let result = await AlexaReview.findAlexaReviewByGivenFilter('GooglePlayStore', '1', '2018-01-12');
        result.forEach((review) => {
            review.should.have.property('review_source', 'GooglePlayStore');
            review.should.have.property('rating', 1);
            let Date = (review.reviewed_date).substring(0, 10);
            assert.equal(Date, '2018-01-12');
        })
    });
    it('Given filter should yield appropriate result', async () => {
        let expectedResult = [{
            "review": "Pero deberia de poder cambiarle el idioma a alexa",
            "author": "WarcryxD",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excelente",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2018-01-12T02:27:03.000Z"
        }];
        let result = await AlexaReview.findAlexaReviewByGivenFilter('iTunes', '4', '2018-01-12');
        result[0].should.have.property('review_source', 'iTunes');
        result[0].should.have.property('rating', 4);
        assert.deepEqual(result, expectedResult);
    })

});

describe('filterByStoreType()', () => {
    it('Input validation: Check for nullparameters', () => {
        let result = AlexaReview.filterByStoreType(null);
        assert.equal(result, false);
    });
    it('Function should return all the matching data of given storeType: iTunes', async () => {
        let result = AlexaReview.filterByStoreType('iTunes');
        result.forEach((review) => {
            review.should.have.property('review_source', 'iTunes');
        })
    });
    it('Function should return all the matching data of given storeType: GooglePlayStore', async () => {
        let result = AlexaReview.filterByStoreType('GooglePlayStore');
        result.forEach((review) => {
            review.should.have.property('review_source', 'GooglePlayStore');
        })
    });
    it('Function should return an empty array if there is no data for given store type', async () => {
        let result = AlexaReview.filterByStoreType('XYZ');
        result.should.be.lengthOf(0);
    });
});


describe('filterByRating()', () => {

    it('Function should return all the matching data of given rating: 1', () => {
        let result = AlexaReview.filterByRating(1);
        result.forEach((review) => {
            review.should.have.property('rating', 1);
        })
    });

    it('Function should return an empty array if there is no data for given rating 0', () => {
        let result = AlexaReview.filterByRating(0);
        result.should.be.lengthOf(0);
    });
});

describe('findAverageRatingByMonthAndYearPerStore()', () => {
    it('Input validation: Check for nullparameters', () => {
        AlexaReview.findAverageRatingByMonthAndYearPerStore(null, null, null).then((result) => {
        }).catch((error) => {
            assert.equal(error, { message: 'Parameters cannot be null' });
        })
    });
    it('Check return data for 2018 April for the store iTunes, should return an empty array as there is no matching data', async () => {
        let result = await AlexaReview.findAverageRatingByMonthAndYearPerStore('04', '2018', 'iTunes');
        assert.deepEqual(result, { "message": "There is no review rating for iTunes for month of 04, 2018" });

    });
    it('Check return data for 2018 January for the store iTunes, should return average rating computed', async () => {
        let result = await AlexaReview.findAverageRatingByMonthAndYearPerStore('13', '2018', 'GooglePlayStore');
        let expectedResult = 'There is no review rating for GooglePlayStore for month of 13, 2018';
        assert.isNotNull(result);
        assert.equal(result.message, expectedResult);
    });
    it('Check for invalid parameters', async () => {
        let result = await AlexaReview.findAverageRatingByMonthAndYearPerStore('month', 'year', 'iTunes');
        let expectedResult = 'There is no review rating for iTunes for month of month, year';
        assert.equal(result.message, expectedResult);
    });
});

describe('calculateTotalRating()', () => {
    it('Test calculateTotalRating', async () => {
        let result = await AlexaReview.calculateTotalRating();
        assert.hasAllKeys(result, ['1*', '2*', '3*', '4*', '5*']);
    })
});

describe('createReview()', () => {
    it('Check for data insertion', async () => {
        let previousData = alexaReviewData.length;
        const newReview = {
            "review": "Test review",
            "author": "John Doe",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excellent",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2021-07-25T02:27:03.000Z"
        }
        let result = await AlexaReview.createReview(newReview);
        let dataAfterInsertion = alexaReviewData.length;
        assert.deepEqual(result, newReview);
        assert.equal(dataAfterInsertion, previousData + 1);
    })
    it('check if data is inserted at the last', async () => {
        const newReview = {
            "review": "Test review",
            "author": "John Doe",
            "review_source": "iTunes",
            "rating": 4,
            "title": "Excellent",
            "product_name": "Amazon Alexa",
            "reviewed_date": "2021-07-25T02:27:03.000Z"
        }
        let result = await AlexaReview.createReview(newReview);
        assert.deepEqual(result, newReview);
        assert.equal(alexaReviewData[alexaReviewData.length-1], result);
    })
});

