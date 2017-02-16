(function () {

var geocoder = require('./geocoder');
var distanceCalculator = require('./distanceCalculator');
var prompt = require('prompt');
var csv = require('fast-csv');

var stores = [];
var memoizeStorage = {};
var storesFiltered;
var lastCoordinates;
var lastClosestStore;

//Read .csv of store locations upon loading of file
(function onLoad() {
  csv.fromPath('./store-locations.csv', {headers: true})
  .on('data', function(data) {
    stores.push(data);
  })
  .on('end', function() {
    promptUser();
  });
})();

function promptUser() {
  prompt.start();
  console.log('Enter your location below');
  prompt.get('address', function(err, userInput) {
    console.time('Search Time');
    if (memoizeStorage[userInput.address]) {
      console.log('Location previously searched...');
      var memo = memoizeStorage[userInput.address];
      lastCoordinates = [memo.coordinates[0], memo.coordinates[1]];
      lastClosestStore = memo.closestStore;
      console.timeEnd('Search Time');
      displayResults();
    } else {
      geocoder.geocode(userInput.address, function(err, result) {
        console.log('Searching for', result[0].formattedAddress, '\n...\n..\n.\n');
        lastCoordinates = [result[0].latitude, result[0].longitude];
        storesFiltered = filterStores(result[0].latitude, result[0].longitude, stores);
        lastClosestStore = findClosestStore(lastCoordinates, storesFiltered);
        memoizeGeocode(userInput.address, lastCoordinates, lastClosestStore);
        console.timeEnd('Search Time');
        displayResults();
      });
    }
  });
}

function filterStores(lat, long, storeList) {
  return storeList.filter(function(store) {
    return (Math.abs(store.Latitude - lat) < 0.5) && (Math.abs(store.Longitude - long) < 0.5);
  });
}

function findClosestStore(origin, storeList) {
  var shortest = Infinity;
  var closestStore = {};
  
  storeList.forEach(function(store) {
    var distance = distanceCalculator(origin[0], origin[1], store.Latitude, store.Longitude);
    if (shortest > distance) {
      closestStore = store;
      shortest = distance;
    }
  });
  closestStore['Distance from origin (km)'] = shortest.toString();

  return closestStore;
}

function displayResults() {
  console.log('The closest store is', lastClosestStore['Store Name'], 'on', lastClosestStore['Store Location']);
  console.log('Do you want to see full details? (y = yes, n = no, s = search again)');
  prompt.get('response', function(err, userInput) {
    if (userInput.response === 'y') {
      console.log(lastClosestStore);
    } else if (userInput.response === 's') {
      promptUser();
    } else if (userInput.response === 'n') {
      prompt.stop();
    }
  });
}

function memoizeGeocode (key, coordinates, store) {
  memoizeStorage[key] = {
    coordinates: coordinates,
    closestStore: store
  };
}

//Exporting components for testing
module.exports = {
  filterStores: filterStores,
  findClosestStore: findClosestStore,
  stores: stores
};

})();