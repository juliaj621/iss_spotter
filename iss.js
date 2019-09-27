// It will contain most of the logic for fetching the data from each API endpoint.
/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */

const request = require('request');

const nextISSTimesForMyLocation = function (callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error, null);
      return;
    }
    fetchCoordsByIP(ip, (error, coords) => {
      if (error) {
        callback(error, null);
        return;
      }
      fetchISSFlyOverTimes(coords, (error, passTimes) => {
        if (error) {
          callback(error, null);
          return;
        }
        callback(null, passTimes)
      })
    })
  })
};

const fetchMyIP = function (callback) {
  request((`https://api.ipify.org/?format=json`), (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching IP. Response: ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    callback(null, data.ip);
  });
};

const fetchCoordsByIP = function (ip, callback) {
  request((`https://ipvigilante.com/${ip}`), (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    let latLong = {};
    latLong["longitude"] = data.data.longitude;
    latLong["latitude"] = data.data.latitude;
    callback(null, latLong);
  });
};

const fetchISSFlyOverTimes = function (coords, callback) {
  request((`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`), (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      callback(Error(`Status Code ${response.statusCode} when fetching ISS pass times: ${body}`), null);
      return;
    }
    const data = JSON.parse(body);
    const passTimes = data.response
    callback(null, passTimes);
  });
};

module.exports = { nextISSTimesForMyLocation, fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };
