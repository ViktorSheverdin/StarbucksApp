const request = require('request');
require('dotenv').config();
const fs = require('fs');
var list_of_places = [];

/**
 *This function is used to get Sbs near you based on the coordinates. THIS IS A TEST
 *It uses Google Place API. It creates a Promise and if the body.status=="OK", will return tuple of body and list of places
 *@param {string} lat - Latitude of the position
 *@param {string} long - Longtitude of the position
 */
var get_sturbuckses = (lat, long) => {
  return new Promise((resolve, reject) => {
    request(
      {
        // url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=10000&type=coffee&keyword=starbucks&key=${process.env.api_google}`,
        url: `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${lat},${long}&radius=10000&keyword=starbucks&key=${process.env.api_google}`,
        json: true,
      },
      (error, response, body) => {
        if (error) {
          console.log('Cannot connect to Maps');
          resolve('Can not connect to Maps');
        } else if (body.status === 'ZERO_RESULTS') {
          resolve('Cannot find requested address');
        } else if (body.status == 'OK') {
          console.log('Status OK');
          for (place in body.results) {
            list_of_places.unshift(body.results[place].vicinity);
          }
          fs.writeFileSync('places.json', JSON.stringify(body));
          resolve({ body, list_of_places });
          list_of_places = [];
        }
      }
    );
  });
};

/**
 *This function is used to get address based on the word position and returns the latitude and longtitude
 *@param {string} address - Address in words, that will be converted to the URI format
 *@returns {dictionary} Dict of the long and lat of the address
 */
var getAddress = (address) => {
  return new Promise((resolve, reject) => {
    request(
      {
        url:
          'https://maps.googleapis.com/maps/api/geocode/json' +
          '?address=' +
          encodeURIComponent(address) +
          `&key=${process.env.api_google}`,
        json: true,
      },
      (error, response, body) => {
        console.log(body);
        if (error) {
          resolve('Cannot connect to Google Maps');
          //console.log('Cannot connect to Google Maps');
        } else if (body.status === 'ZERO_RESULTS') {
          resolve('Cannot find requested address');
        } else if (body.status === 'OK') {
          resolve({
            lat: body.results[0].geometry.location.lat,
            long: body.results[0].geometry.location.lng,
          });
        }
      }
    );
  });
};

module.exports = {
  get_sturbuckses,
  getAddress,
};
module.exports.listofmaps = list_of_places;
