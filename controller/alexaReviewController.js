const AlexaReview = require('../model/alexaReviewModel');

// Get API '/api/alexa/filter/:storeTye?/:date?/:rating?'
async function getAlexaReviewByGivenFilter(storeType, rating, date) {
    try {
        const result = await AlexaReview.findAlexaReviewByGivenFilter(storeType, rating, date);
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Get API '/api/alexa/average/:month/:year/:store'
async function getAverageRatingByMonthAndYearPerStore(month, year, store) {
    try {
        const result = await AlexaReview.findAverageRatingByMonthAndYearPerStore(month, year, store);
        return result;
    } catch (error) {
        console.log(error);
    }


}

// Get API '/api/alexa/totalRating'
async function getTotalRating() {

    try {
        const result = await AlexaReview.calculateTotalRating();
        return result;
    } catch (error) {
        console.log(error);
    }
}

// Post API '/api/alexa/postReview'
async function createReview(data, res) {

    try {
        const review = {
            "review": data.review,
            "author": data.author,
            "review_source": data.review_source,
            "rating": data.rating,
            "title": data.title,
            "product_name": data.product_name,
            "reviewed_date": data.reviewed_date
        }

        const newReview = await AlexaReview.createReview(review);
        return newReview;

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getAlexaReviewByGivenFilter,
    getAverageRatingByMonthAndYearPerStore,
    getTotalRating,
    createReview
}