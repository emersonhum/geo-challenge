var chai = require('chai');
var expect = chai.expect; 

var geoChallenge = require('./geo-challenge');
var findClosestStore = geoChallenge.findClosestStore;
var filterStores = geoChallenge.filterStores;
var stores = geoChallenge.stores;
var geocoder = require('./geocoder');
var testAddress = 'nyc'


describe('Speed Test', function() {
  var origin, delta, filteredDelta, unfilteredDelta;
  before(function(done) {
    var t0 = process.hrtime();
    geocoder.geocode(testAddress, function(err, result) {
      console.log(testAddress); //makes mocha test look prettier
      console.log('Searching for', result[0].formattedAddress);
      origin = [result[0].latitude, result[0].longitude];
      delta = process.hrtime(t0);
      delta = delta[0] * 1000 + delta[1] / 1000000;
      console.log('Geocoder took', delta, 'ms');
      done();
    });
  });

  it('should run faster with filtered stores', function(done) {
    var t0 = process.hrtime();
    var filteredStores = filterStores(origin[0], origin[1], stores);
    findClosestStore(origin, filteredStores);
    filteredDelta = process.hrtime(t0);
    filteredDelta = filteredDelta[0] * 1000 + filteredDelta[1] / 1000000;
    console.log('Filtered stores took', filteredDelta, 'ms');
    
    var t0 = process.hrtime();
    findClosestStore(origin, stores);
    unfilteredDelta = process.hrtime(t0);
    unfilteredDelta = unfilteredDelta[0] * 1000 + unfilteredDelta[1] / 1000000;
    console.log('Unfiltered stores took', unfilteredDelta, 'ms')
    
    expect(filteredDelta).to.be.below(unfilteredDelta);
    done();
  });

  it('should bottleneck with geocode API call', function(done) {
    expect(delta).to.be.above(filteredDelta + unfilteredDelta);
    done();
  });
});

