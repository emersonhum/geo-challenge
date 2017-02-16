(function() {

//Enter Google Maps API key below that was sent in email
var GOOGLE_API_KEY = 'ENTER PERSONAL API KEY HERE';

var NodeGeocoder = require('node-geocoder');

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: GOOGLE_API_KEY,
  formatter: null
};

var geocoder = NodeGeocoder(options);

module.exports = geocoder;
})();