// iss_promised.js
const request = require('request-promise-native');


// This function should only have one line of code: fetch the IP address from the API, using the request function, and return the promise that is returned by request.
const fetchMyIP = () => {
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