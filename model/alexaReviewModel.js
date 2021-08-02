const alexaReview = require('../data/alexa');
const { writeDataToFile } = require('../utils/util');
const _ = require('lodash');
const { reject } = require('lodash');



// Function to check value
function checkValue(key, reviewData, givenData) {
    if (_.isNull(key) || _.isNull(reviewData) || _.isNull(givenData)) {
        return false
    }
    var retVal = false;
    if (key != 'reviewed_date') {
        retVal = reviewData != givenData ? true : false;
    } else {
        retVal = reviewData.substring(0, 10) != givenData ? true : false;
    }
    return retVal;
}


// Function to filter data based on storeType, rating or date
function findAlexaReviewByGivenFilter(storeType, rating, date) {

    const filter = {
        review_source: storeType,
        rating: rating,
        reviewed_date: date
    };
    return new Promise((resolve, reject) => {
        if (_.isNull(storeType) || _.isNull(rating) || _.isNull(date)) {
            reject({ message: "Parameters cannot be null" });
        }
        let result = alexaReview.filter((item) => {
            for (let key in filter) {
                if (filter[key]) {
                    if (item[key] === undefined || checkValue(key, item[key], filter[key])) {
                        return false;
                    }
                }
            }
            return true;
        });
        
        resolve(result);
    })
}


// Function to filter data based on storeType
function filterByStoreType(storeType) {
    if (_.isNull(storeType)) {
        return (false);
    }
    let result = alexaReview.filter((element) => {
        if (element.review_source === storeType) {
            return true;
        }
        return false;
    });
    return (result);
}

// FUnction to filter data based on rating
function filterByRating(rating) {
    let result = alexaReview.filter((element) => {
        if (element.rating == rating) {
            return true;
        }
        return false;
    });
    return (result);
}

// Function to calculte average rating of given rating category
function calculateAverageRating(data) {
    let sum = 0;
    data.forEach(function (element) {
        sum += element.rating;
    })
    return sum / data.length;
}

// Function to return average rating based on given month, year and store
function findAverageRatingByMonthAndYearPerStore(month, year, store) {
    return new Promise((resolve, reject) => {
        if(_.isNull(month) || _.isNull(year) || _.isNull(store)){
            reject({ message: 'Parameters cannot be null' });
        }
        let dataByStoreType = filterByStoreType(store);
        if (_.isEmpty(dataByStoreType)) {
            reject({ message: 'There is no data for given store type' });
        }
        let result = dataByStoreType.filter((element) => {
            let Date = (element.reviewed_date).substring(0, 10);
            let reviewMonth = Date.split('-')[1];
            let reviewYear = Date.split('-')[0];
            if (reviewMonth === month && reviewYear === year) {
                return true;
            }
            return false;
        });
        let averageRating = calculateAverageRating(result);
        if (averageRating) {
            resolve({ message: `The average rating for ${store} for month of ${month}, ${year} is ${averageRating}` });
        } else {
            resolve({ message: `There is no review rating for ${store} for month of ${month}, ${year}` });
        }
    });
}

// Function to calculate total rating
function calculateTotalRating() {
    return new Promise((resolve, reject) => {
        var ratingObj = {
            '1*': filterByRating(1).length,
            '2*': filterByRating(2).length,
            '3*': filterByRating(3).length,
            '4*': filterByRating(4).length,
            '5*': filterByRating(5).length
        }
        resolve(ratingObj);
    });
}

// Function to post new review to the file
function createReview(review) {
    return new Promise((resolve, reject) => {
        const newReview = { ...review };
        alexaReview.push(newReview);
        writeDataToFile('./data/alexa.json', alexaReview);
        resolve(newReview);

    });
}


module.exports = {
    findAlexaReviewByGivenFilter,
    findAverageRatingByMonthAndYearPerStore,
    calculateTotalRating,
    createReview,
    checkValue,
    filterByStoreType,
    filterByRating
}