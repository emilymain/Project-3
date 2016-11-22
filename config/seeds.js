var mongoose = require('./database');
var Listing = require('../models/listing');

var listings = [
  { // 0
    city: "Los Angeles",
    state: 'CA',
    address: "1450 Barry Ave Apt 4",
    zipcode: "90025",
    price: 1895,
    bedrooms: 2,
    bathrooms: 1,
    duration: 1,
    pets: true,
    furnished: false
  },
  { // 1
    city: "Los Angeles",
    state: 'CA',
    address: "1312 Barry Ave Apt 4",
    zipcode: "90025",
    price: 1895,
    bedrooms: 2,
    bathrooms: 1,
    duration: 1,
    pets: true,
    furnished: false
  },
  { // 2
    city: "Los Angeles",
    state: 'CA',
    address: "1100 Barry Ave Apt 4",
    zipcode: "90025",
    price: 1895,
    bedrooms: 2,
    bathrooms: 1,
    duration: 1,
    pets: true,
    furnished: false
  },
  { // 3
    city: "Los Angeles",
    state: 'CA',
    address: "9000 Barry Ave Apt 4",
    zipcode: "90025",
    price: 1895,
    bedrooms: 2,
    bathrooms: 1,
    duration: 1,
    pets: true,
    furnished: false
  },
  { // 4
    city: "Los Angeles",
    state: 'CA',
    address: "1600 Barry Ave Apt 4",
    zipcode: "90025",
    price: 1895,
    bedrooms: 2,
    bathrooms: 1,
    duration: 1,
    pets: true,
    furnished: false
  }
];

Listing.remove({}, function(err) {
  if (err) console.log(err);
  Listing.create(listings, function(err, listings) {
    if (err) {
      console.log(err);
    } else {
      console.log("Database seeded with " + listings.length  + " listings.");
      mongoose.disconnect();
      process.exit(0);
    }
  });
});
