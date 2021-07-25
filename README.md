# alexaReview

This application implements below APIs to filter and add the review of Alexa product to the given data file.

• Accepts reviews and stores them 
	Ø /api/alexa/postReview with body as part of req.
• Allows to fetches reviews 
	Ø /api/alexa/filter
• Reviews can be filtered by date, store type or rating. 
	Ø /api/alexa/filter/:storeType?/:rating?/date?
	  Eg: /api/alexa/filter?storeType=iTunes&rating=1&date=2018-01-11 (all the request params are optional)
• All filters are optional; fetch all reviews if no filters are applied.
	Ø /api/alexa/filter
• Allows to get average monthly ratings per store.
	Ø /api/alexa/average/:month/:year/:store (month should be always 2 character string as Jan : 01, Feb : 02 ..)
	Eg : /api/alexa/average/01/2018/iTunes ()
• Allows to get total ratings for each category. Meaning, how many 5*, 4*, 3* and so on
	Ø /api/alexa/totalRating
  
  Installing  and running application:
	• Install nodejs from https://nodejs.org/en/download/ 
	• Run 'npm install' in the folder of application
	• Run command 'npm run dev' to start the application



