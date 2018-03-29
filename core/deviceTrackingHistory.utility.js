'use strict';

import NodeGeocoder from 'node-geocoder';
import { MongoClient } from 'mongodb';

const url = 'mongodb://localhost:27017/iot_server_app';
const clients = [];

class deviceTrackingHistoryUtility {

  static parser116(s){
    var p = {
      "header": s.slice(0,2),
      "length": Number(s.slice(2,6)),
      "alaramCode":s.slice(6,8),
      "deviceId": s.slice(8,23),
      "vehicleStatus":s.slice(24,32),
      "dateTime": this.dateTime(s.slice(32,44)),
      "batteryVoltage": this.convertBV(s.slice(44,46)),
      "supplyVoltage": this.convertSV(s.slice(46,48)),
      "ADC": this.convertADC(s.slice(48,52)),
      "temperatureA":s.slice(52,56),
      "temperatureB":s.slice(56,60),
      "LACCI":s.slice(60,64),
      "cellID":s.slice(64,68),
      "GPSSatellites":s.slice(68,70),
      "GSMsignal":s.slice(70,72),
      "angle":s.slice(72,75),
      "speed":s.slice(75,78),
      "HDOP":s.slice(78,82),
      "mileage":s.slice(82,89),
      "latitude":this.lat(s.slice(89,98)),
      "NS":s.slice(98,99),
      "longitude":this.lng(s.slice(99,109)),
      "EW":s.slice(109,110),
      "serialNumber":s.slice(110,114),
      "checksum":s.slice(114,116),
  		"createdAt": new Date()
    }
    return p;
  }

  static lat(t){
    return (Number(t.slice(0,2)) + (Number(t.slice(2,9))/60))
  }

  static lng(g) {
    return (Number(g.slice(0,3)) + (Number(g.slice(3,10))/60))
  }

  static dateTime(d){
    return "20" + d.slice(0,2) + "-" + d.slice(2,4) + "-" + d.slice(4,6) + "T" + d.slice(6,8) + ":" + d.slice(8,10) + ":" + d.slice(10,12)
  }

  static convertBV(s){
    return s[0]+"."+s[1]+"V"
  }

  static convertSV(s){
    return s+"V"
  }

  static convertADC(s){
    return s[0]+s[1]+"."+s[2]+s[3]+"V";
  }

  static typeCheck(str){
    if(str.length === 116){
      return this.parser116(str)
    } else {
      return 'data not match'
    }
  }

  static async address(geo,cb){
    var options = {
        provider: 'google',
        httpAdapter: 'https',
        apiKey: ' AIzaSyA6oeTBjzkaluuFGMJFgdEWoGfElxbfcCk',
        formatter: 'json'
      };
    var geocoder = NodeGeocoder(options);
    var result = await geocoder.reverse({lat:geo.latitude, lon:geo.longitude});
        geo.address = result[0].formattedAddress || 'NA';
        geo.placeId = result[0].extra.googlePlaceId || 'NA';
        geo.state = result[0].administrativeLevels.level1long || 'NA';
        geo.city = result[0].city || 'NA';
        geo.country = result[0].country || 'NA';
        geo.zipcode = result[0].zipcode || 'NA';
    return  cb(geo);
  }

  static insertData(socket){
    MongoClient.connect(url, (err, db) => {
      var find = {deviceId:socket.data.msg.deviceId}
      db.collection('deviceTrackerHistory').findOne(find, (err,result)=>{
        if(!result){
          var insert = {
            deviceId: socket.data.msg.deviceId,
            history: [socket.data.msg],
            deviceType: "",
            workingStatus: "",
            status:"",
            createdAt: new Date()
          };
          db.collection('deviceTrackerHistory').insert(insert, (err,result)=>{
      			if(err){
              console.log(`${socket.name} error message is : ${err}`);
              this.broadcast(socket.name + "> " + err, socket);
              socket.write(`error message is (${err}). Thanks!\n`);
      			}else {
              console.log(`${socket.name} said: ${JSON.stringify(result.ops[0])}`);
              this.broadcast(socket.name + "> " + JSON.stringify(result.ops[0]), socket);
              socket.write(`We got message (${JSON.stringify(result.ops[0])}). Thanks!\n`);
      			}
      		});
        } else {
          var update = {
            select: {deviceId: socket.data.msg.deviceId},
            data:{$push:{history: socket.data.msg}}
          };
          db.collection('deviceTrackerHistory').findOneAndUpdate(update.select, update.data, (err,result)=>{
      			if(err){
              console.log(`${socket.name} error message is : ${err}`);
              this.broadcast(socket.name + "> " + err, socket);
              socket.write(`error message is (${err}). Thanks!\n`);
      			}else {
              var res = JSON.stringify(result.value.history[result.value.history.length-1]);
              console.log(`${socket.name} said: ${res}`);
              this.broadcast(socket.name + "> " + res, socket);
              socket.write(`We got message (${res}). Thanks!\n`);
      			}
      		});
        }
      });
  	});
  }

  static broadcast(message, sender) {
      clients.forEach( client => {
        if (client === sender) return;
        client.write(message);
      });
      process.stdout.write(message)
  }

  static onClientConnected(socket) {
    console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
    socket.destroy();
  }

  static onClientConnected(socket) {
    socket.name = `${socket.remoteAddress}:${socket.remotePort}`;
    clients.push(socket);
    console.log(`${socket.name} connected.`);
    socket.on('data', (data) => {
      var m = data.toString().replace(/[\n\r]*$/, '');
      console.log(m,'message')
      var l = this.typeCheck(m);
      this.address(l,function(result){
        var l = result;
          if(typeof l === 'object' && typeof l !== 'string'){
            socket.data = { msg: l };
            deviceTrackingHistoryUtility.insertData(socket);
          } else {
            console.log(`${socket.name} : ${l} "check the data"`);
            deviceTrackingHistoryUtility.broadcast(socket.name + "> " + l + " check the data", socket);
            socket.write(`${l}. check the data!\n`);
          }
      })
    });

    socket.on('end', () => {
      clients.splice(clients.indexOf(socket), 1);
      console.log(`${socket.name} disconnected.`);
    });
  }

}

export default deviceTrackingHistoryUtility;
