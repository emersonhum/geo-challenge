(function() {
//Haversine formula to calculate distance btwn coordinates
var distanceCalculator = function(lat1, long1, lat2, long2) {	
  var R = 6371e3; // Earth radius in meters
  var φ1 = toRadians(lat1);
  var φ2 = toRadians(lat2);
  var Δφ = toRadians(lat2-lat1);
  var Δλ = toRadians(long2-long1);

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d / 1000;
};

function toRadians(num) {
  var copy = num;
  return copy * Math.PI / 180;
}

module.exports = distanceCalculator;
})();