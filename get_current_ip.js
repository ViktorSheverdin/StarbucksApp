/**
@file This file finds the longitude and latitude base on the current IP.
*/
const request = require('request');
var list_of_places = [];
/**
This function gets the current IP and return the coordinates of it.
It should be used to find current location and show Sbs near by
@returns {json} JSON dict with the coords.
*/
var request_coodrs = () => {
  //   return {
  //     lat: 49.2478,
  //     lon: -122.9938,
  //   };

  return new Promise((resolve, reject) => {
    resolve({
      lat: 49.2478,
      lon: -122.9938,
    });
    // request(
    //   {
    //     url: 'http://freegeoip.net/json',
    //   },
    //   (error, response, body) => {
    //     if (error) {
    //       console.log('Cannot connect for IP API');
    //       reject('Cannot connect');
    //     } else {
    //       location = JSON.parse(body);
    //       console.log('location ', location);
    //       console.log('Body ', body);
    //       console.log(location.latitude);
    //       console.log(location.longitude);
    //       resolve({
    //         lat: 49.2478,
    //         lon: -122.9938,
    //       });
    //     }
    //   }
    // );
  });
};

module.exports = {
  request_coodrs,
};

// request_coodrs().then((response) => {
// 	console.log(response);
// })
