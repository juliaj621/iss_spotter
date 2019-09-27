// iss_promised.js
const request = require('request-promise-native');

const nextISSTimesForMyLocation = function () {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
};

const fetchMyIP = () => {
  return request(`https://api.ipify.org/?format=json`)
};

const fetchCoordsByIP = function (body) {
  let ip = JSON.parse(body).ip;
  return request(`https://ipvigilante.com/${ip}`)
};

const fetchISSFlyOverTimes = function (body) {
  const data = JSON.parse(body);
  let coords = {};
  coords["longitude"] = data.data.longitude;
  coords["latitude"] = data.data.latitude;
  return request(`http://api.open-notify.org/iss-pass.json?lat=${coords.latitude}&lon=${coords.longitude}`)
};

module.exports = { nextISSTimesForMyLocation, fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };