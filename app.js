// Mongoose
const mongoose = require("mongoose");
const URI =
  "mongodb+srv://caroline:caroline@cluster0.gfvqb.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

// Express
const express = require("express");
const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});

// Connection to MongoDB on MongoCloud
mongoose.connect(
  URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  (err) => {
    if (err) console.log("error :", err);
    console.log("Connected to mongodb");
  }
);

// Object model for Air BnB reviews
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const AirbnbReview = new mongoose.Schema({
  _id: ObjectId,
  listing_url: String,
  name: String,
  summary: String,
  space: String,
  description: String,
  neighborhood_overview: String,
  notes: String,
  transit: String,
  access: String,
  interaction: String,
  house_rules: String,
  property_type: String,
  room_type: String,
  bed_type: String,
  minimum_nights: Number,
  maximum_nights: Number,
  cancellation_policy: String,
  last_scraped: Date,
  calendar_last_scraped: Date,
  first_review: Date,
  last_review: Date,
  accommodates: Number,
  bedrooms: Number,
  beds: Number,
});

const ListingAndReviews = mongoose.model(
  "airbnb",
  AirbnbReview,
  "listingsAndReviews"
);

// const randomquery = ListingAndReviews.find(
//   { name: /^h/, beds: { $gt: 3 } },
//   { name: 1, notes: 1, description: 1 }
// );

const baseQuery = ListingAndReviews.find(
  {},
  { name: 1, notes: 1, description: 1 }
);

app.get("/api", (req, response) => {
    
  // Case with a limit param in query
  if (req.query.limit) {
    var limit = parseInt(req.query.limit);
    const queryLimit = baseQuery.limit(limit);

    queryLimit.exec((err, result) => {
      response.send(result);
    });

    // Default case
  } else {
    baseQuery.exec((err, result) => {
      response.send(result);
    });
  }
});
