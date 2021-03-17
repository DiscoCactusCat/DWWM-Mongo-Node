const { ObjectID } = require("bson");
const mongoose = require("mongoose");
const URI =
  "mongodb+srv://caroline:caroline@cluster0.gfvqb.mongodb.net/sample_airbnb?retryWrites=true&w=majority";

mongoose.connect(URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}, (err)=>{
    if(err)console.log("error :", err);
    console.log("Connected to mongodb");
}
);

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

const ListingAndReviews = mongoose.model('airbnb', AirbnbReview, 'listingsAndReviews');
const query = ListingAndReviews.find({name:/^h/, beds: { $gt: 3 }},{name:1, notes:1, description:1}).limit(3);

  query.exec((err, res)=>{
      console.log("Result of count:", res);
  })
console.log("hello");
