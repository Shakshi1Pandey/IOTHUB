'use strict';

import NodeGeocoder from 'node-geocoder';

export class DeviceFunctionUtility {
  static async address(geo, cb) {
    var options = {
      provider: 'google',
      httpAdapter: 'https',
      apiKey: ' AIzaSyA6oeTBjzkaluuFGMJFgdEWoGfElxbfcCk',
      formatter: 'json'
    };
    var geocoder = NodeGeocoder(options);
    let location = (geo) =>{
      geo.address = 'NA';
      geo.placeId = 'NA';
      geo.state = 'NA';
      geo.city = 'NA';
      geo.country = 'NA';
      geo.zipcode = 'NA';
      return geo;
    }
    try {
      if(geo.latitude && geo.longitude){
        var result = await geocoder.reverse({
          lat: geo.latitude,
          lon: geo.longitude
        });
        if(result.length > 0){
          geo.address = result[0].formattedAddress || 'NA';
          geo.placeId = result[0].extra.googlePlaceId || 'NA';
          geo.state = result[0].administrativeLevels.level1long || 'NA';
          geo.city = result[0].city || 'NA';
          geo.country = result[0].country || 'NA';
          geo.zipcode = result[0].zipcode || 'NA';
        } else {
          var geo = location(geo);
        }
      } else {
        var geo = location(geo);
      }
      console.log(geo,'geo');
      return cb(geo);
    } catch (e) {
      console.log(e, 'address error');
      return e;
    }
  }

  static lat(t) {
    return Number(t.slice(0, 2)) + Number(t.slice(2, 9)) / 60;
  }

  static lng(g) {
    return Number(g.slice(0, 3)) + Number(g.slice(3, 10)) / 60;
  }

  static dateTime(d) {
    return (
      '20' +
      d.slice(0, 2) +
      '-' +
      d.slice(2, 4) +
      '-' +
      d.slice(4, 6) +
      'T' +
      d.slice(6, 8) +
      ':' +
      d.slice(8, 10) +
      ':' +
      d.slice(10, 12)
    );
  }

  static date(d){
    return (
      '20' +
      d.slice(0, 2) +
      '-' +
      d.slice(2, 4) +
      '-' +
      d.slice(4, 6)
    )
  }

  static time(d){
    return (
      d.slice(0, 2) +
      ':' +
      d.slice(2, 4) +
      ':' +
      d.slice(4, 6)
    )
  }

  static convertBV(s) {
    return s[0] + '.' + s[1] + 'V';
  }

  static convertSV(s) {
    return s + 'V';
  }

  static convertADC(s) {
    return s[0] + s[1] + '.' + s[2] + s[3] + 'V';
  }
}
