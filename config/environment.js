var _ = require('lodash');

var localEnvVars = {
  TITLE:      "HomeMe",
  SAFE_TITLE: 'home_me'
};

// Merge all environmental variables into one object.
module.exports = _.extend(process.env, localEnvVars);
