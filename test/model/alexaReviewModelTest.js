const assert = require('chai').assert;
const AlexaReview = require('../../model/alexaReviewModel');
const expect = require('chai').expect;

describe('Test model class' , () => {
    it('Test checkValue', () => {
        assert.equal(AlexaReview.checkValue('reviewed_date', '2018-01-11', '2018-01-12'), true );
    })

    it('Test findAlexaReviewByGivenFilter', async () => {
        let result = await AlexaReview.findAlexaReviewByGivenFilter('iTunes', '1', '2018-01-12');
        assert.typeOf(result, 'array');
        expect(result).to.have.lengthOf.above(1);
    })

    it('Test filterByStoreType', async () => {
        let result = await AlexaReview.filterByStoreType('iTunes');
        assert.typeOf(result, 'array');
        expect(result).to.have.lengthOf.above(1);
    })

    it('Test filterByStoreType', async () => {
        let result = await AlexaReview.filterByStoreType('xyz');
        assert.typeOf(result, 'array');
        expect(result).to.have.lengthOf.lessThan(1);
    })
    it('Test filterByRating', async () => {
        let result = await AlexaReview.filterByRating('1');
        assert.typeOf(result, 'array');
        expect(result).to.have.lengthOf.above(1);
    })
    it('Test filterByRating', async () => {
        let result = await AlexaReview.filterByRating('0');
        assert.typeOf(result, 'array');
        expect(result).to.have.lengthOf.lessThan(1);
    })
    it('Test findAverageRatingByMonthAndYearPerStore', async () => {
        let result = await AlexaReview.filterByRating('01', '2018', 'iTunes');
        assert.typeOf(result, 'array');
        expect(result).to.have.lengthOf.above(1);
    })
    it('Test calculateTotalRating', async () => {
        let result = await AlexaReview.calculateTotalRating();
        assert.typeOf(result, 'object');
    })
    it('Test createReview', async () => {
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
        assert.typeOf(result, 'object');
    })
})

