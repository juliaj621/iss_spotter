// require and run main function
const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  console.log(passTimes);

  printTimes(passTimes);
});

const printTimes = function (passTimes) {
  for (const i of passTimes) {
    console.log(i.duration)
    const dateTime = new Date(0)
    console.log(dateTime)

  }
}



// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log('It worked! Returned IP:', ip);
// });

// fetchCoordsByIP("162.245.144.188", (error, coords) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   }

//   console.log('It worked! Returned Coords:', coords);
// });

// fetchISSFlyOverTimes({ latitude: '49.26200', longitude: '-123.09230' }, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//   }

//   console.log('It worked! Returned Passtimes:', passTimes);
// });
