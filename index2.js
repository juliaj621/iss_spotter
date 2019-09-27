const { nextISSTimesForMyLocation } = require('./iss_promised');

nextISSTimesForMyLocation()
  .then((passTimes) => {
    // success, print out the deets!
    printTimes(passTimes);
  })
  .catch((error) => {
    console.log("It didn't work!", error.message);
  })

const printTimes = function (passTimes) {
  for (const x of passTimes) {
    console.log(x.duration)
    const date = new Date(0)
    date.setUTCSeconds((x.risetime) - 25200);
    const duration = x.duration;
    console.log(`Next pass at ${date} for ${duration} seconds!`);
  }
}
