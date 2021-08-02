var express = require('express');
var app = express();

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
const { getAlexaReviewByGivenFilter, getAverageRatingByMonthAndYearPerStore, getTotalRating, createReview } = require('./controller/alexaReviewController');



app.get('/', function (req, res) {
    res.status(200).send("Welcome to alexa review analysis");
});

// Get data by given filter as storeType or date or rating
app.get('/api/alexa/filter/:storeTye?/:date?/:rating?', async function (req, res) {
    let result = await getAlexaReviewByGivenFilter(req.query.storeType, req.query.rating, req.query.date);
    if (!result || (result.length === 0)) {
        res.status(404).json({ message: 'Query data not found' });
    } else {
        res.json(result);
    }
});

// Get average rating of reviews by given month, year and storeType eg: 01/2018/iTunes
app.get('/api/alexa/average/:month/:year/:store', async function (req, res) {
    let result = await getAverageRatingByMonthAndYearPerStore(req.params.month, req.params.year, req.params.store);
    if (!result) {
        res.status(404).json({ message: 'Query data not found' });
    } else {
        res.status(200).json(result);
    }
});

// Get total ratings of all the type eg: "1*": 10 so on
app.get('/api/alexa/totalRating', async function (req, res) {
    let result = await getTotalRating();
    res.status(200).json(result);
});

// Add new review to given review data
app.post('/api/alexa/postReview', async function (req, res) {
    let result = await createReview(req.body, res);
    res.status(201).json(result);
})

const PORT = process.env.PORT || 5000;
app.listen(PORT);
console.log(`Running on port: ${PORT}`);

