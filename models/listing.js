var mongoose = require('mongoose');

var listingSchema = new mongoose.Schema({
  formattedAddress: String,
  latitude: Number,
  longitude: Number,
  googlePlaceId: String,
  neighborhood: String,
  streetNumber: Number,
  streetName: String,
  city: String,
  country: String,
  countryCode: String,
  zipcode: String,
  provider: String,
  price: Number,
  bedrooms: Number,
  bathrooms: Number,
  duration: Number,
  pets: Boolean,
  furnished: Boolean,
  imageurl: String
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;
