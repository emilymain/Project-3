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
  furnished: Boolean
});

var Listing = mongoose.model('Listing', listingSchema);

module.exports = Listing;

// {
//     "formattedAddress": "1450 Barry Ave, Los Angeles, CA 90025, USA",
//     "latitude": 34.045648,
//     "longitude": -118.455829,
//     "extra": {
//       "googlePlaceId": "ChIJTX4V9WW7woARhs274s13gKU",
//       "confidence": 1,
//       "premise": null,
//       "subpremise": null,
//       "neighborhood": "Sawtelle",
//       "establishment": null
//     },
//     "administrativeLevels": {
//       "level2long": "Los Angeles County",
//       "level2short": "Los Angeles County",
//       "level1long": "California",
//       "level1short": "CA"
//     },
//     "streetNumber": "1450",
//     "streetName": "Barry Avenue",
//     "city": "Los Angeles",
//     "country": "United States",
//     "countryCode": "US",
//     "zipcode": "90025",
//     "provider": "google"
//   }
