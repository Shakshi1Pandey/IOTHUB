/**
 * @file(DeviceTrackingHistory.service.js) All service realted to DeviceTrackingHistory and entry handler file after routing
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import DeviceTrackingHistory from '../models/deviceTrackingHistory.model';
import DeviceTracking from '../models/deviceTracking.model';
import Device from '../models/device.model';
import utility from '../core/utility.js';
import msg from '../core/message/error.msg.js';
const MongoClient= require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/iot_server_app';
import logger from '../core/logger/app.logger'


/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};
const clients = [];

service.onClientConnected = function(socket) {
  console.log(`New client: ${socket.remoteAddress}:${socket.remotePort}`);
  socket.destroy();
}

service.onClientConnected = function(socket) {
  socket.name = `${socket.remoteAddress}:${socket.remotePort}`;
  clients.push(socket);
  console.log(`${socket.name} connected.`);
  socket.on('data', (data) => {
    var m = data.toString().replace(/[\n\r]*$/, '');
    var l = typeCheck(m);
    if(typeof l === 'object' && typeof l !== 'string'){
      socket.data = { msg: l };
      insertData(socket);
    } else {
      console.log(`${socket.name} : ${l} "check the data"`);
      broadcast(socket.name + "> " + l + " check the data", socket);
      socket.write(`${l}. check the data!\n`);
    }

  });

  socket.on('end', () => {
    clients.splice(clients.indexOf(socket), 1);
    console.log(`${socket.name} disconnected.`);
  });

}

function parser116(s){
  var p = {
    "header": s.slice(0,2),
    "length": Number(s.slice(2,6)),
    "alaramCode":s.slice(6,8),
    "deviceId": s.slice(8,23),
    "vehicleStatus":s.slice(24,32),
    "dateTime": dateTime(s.slice(32,44)),
    "batteryVoltage":convertBV(s.slice(44,46)),
    "supplyVoltage":convertSV(s.slice(46,48)),
    "ADC":convertADC(s.slice(48,52)),
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
    "latitude":Number(s.slice(89,98)),
    "NS":s.slice(98,99),
    "longitude":Number(s.slice(99,109)),
    "EW":s.slice(109,110),
    "serialNumber":s.slice(110,114),
    "checksum":s.slice(114,116),
		"createdAt": new Date()
  }
  return p;
}

function dateTime(d){
  return "20" + d.slice(0,2) + "-" + d.slice(2,4) + "-" + d.slice(4,6) + "T" + d.slice(6,8) + ":" + d.slice(8,10) + ":" + d.slice(10,12)
}

function convertBV(s){
  return s[0]+"."+s[1]+"V"
}

function convertSV(s){
  return s+"V"
}

function convertADC(s){
  return s[0]+s[1]+"."+s[2]+s[3]+"V";
}

function typeCheck(str){
  if(str.length === 116){
    return parser116(str)
  } else {
    return 'data not match'
  }
}

function insertData(socket){
  MongoClient.connect(url, function(err, db){
    var find = {deviceId:socket.data.msg.deviceId}
    console.log(find,'find');
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
            broadcast(socket.name + "> " + err, socket);
            socket.write(`error message is (${err}). Thanks!\n`);
    			}else {
            console.log(`${socket.name} said: ${JSON.stringify(result.ops[0])}`);
            broadcast(socket.name + "> " + JSON.stringify(result.ops[0]), socket);
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
            broadcast(socket.name + "> " + err, socket);
            socket.write(`error message is (${err}). Thanks!\n`);
    			}else {
            var res = JSON.stringify(result.value.history[result.value.history.length-1]);
            console.log(`${socket.name} said: ${res}`);
            broadcast(socket.name + "> " + res, socket);
            socket.write(`We got message (${res}). Thanks!\n`);
    			}
    		});
      }
    });
	});
}

function broadcast(message, sender) {
    clients.forEach(function (client) {
      if (client === sender) return;
      client.write(message);
    });
    process.stdout.write(message)
}

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res) =>{
	try{
        var start = new Date();
        start.setHours(0,0,0,0);

        var end = new Date();
        end.setHours(23,59,59,999);
        let isodate = new Date().toISOString().split(/T/);
        //isodate[0]+' 00:00:00', '$lte' : isodate[0]+' 23:59:59'
        //// gaus:8ec160ccbedf6ced chetan : 203d4784826ac3f6 rasmi: 6a82d3d91b48a947
        console.log(isodate,' - ',start)
        let condition = {
            deviceId:req.query.deviceId,
            date: {
                //'$gte': isodate[0]+' 00:00:00', '$lte' : isodate[0]+' 23:59:59'
                '$gte': start, '$lte' : end
            }
        }
        console.log(condition)
		const deviceTrackingHistory = await DeviceTrackingHistory.getAll(condition);
        logger.info('sending all DeviceTrackingHistory...');
		res.send({success:true, code:200, msg:"sending all DeviceTrackingHistory", data:deviceTrackingHistory});
	}catch(err){
		logger.error('Error in getting DeviceTrackingHistory- ' + err);
		res.send({success:false, code:500, msg:msg.getDeviceTrackingHistory, err:err});
	}
}

service.getAllDeviceHistoryLatLng = async (req,res) =>{
	console.log(req.query.clientId,'idddddd');
	try{
        let condition = {
            clientId: String(utility.removeQuotationMarks(req.query.clientId))
        }
				console.log(condition,'condition');
		const deviceTrackingHistory = await DeviceTrackingHistory.getAll(condition);
        logger.info('sending all DeviceTrackingHistory...');
		res.send({success:true, code:200, msg:"sending all DeviceTrackingHistory", data:deviceTrackingHistory});
	}catch(err){
		logger.error('Error in getting DeviceTrackingHistory- ' + err);
		res.send({success:false, code:500, msg:msg.getDeviceTrackingHistory, err:err});
	}
}

service.getAllDeviceRecentLatLng = async (req,res) =>{
	try{
        let condition = [
							{
								$match:{clientId:req.body.clientId}
							},
						   {
						     $project:
						      {
						         deviceId:1,
						         recent: { $arrayElemAt: [ "$history", -1 ] }
						      }
						   }
						]
		const deviceTrackingHistory = await DeviceTrackingHistory.aggregation(condition);
        logger.info('sending all DeviceTrackingHistory...');
		res.send({success:true, code:200, msg:"sending all DeviceTrackingHistory", data:deviceTrackingHistory});
	}catch(err){
		logger.error('Error in getting DeviceTrackingHistory- ' + err);
		res.send({success:false, code:500, msg:msg.getDeviceTrackingHistory, err:err});
	}
}
/**
 * @description [calculation before add DeviceTrackingHistory to db and after adding DeviceTrackingHistory ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addDeviceTrackingHistoryData = async (req, res) => {
    let dataString = req.query.dataString;
    dataString = dataString.split("~");

    let deviceToAdd = DeviceTrackingHistory({

        deviceId: dataString[0] || 1 ,
        lat: dataString[1] || 1000.0,
        lng: dataString[2] || 123333.99,
        date:  dataString[3] || new Date(),
        temprature: dataString[4] || 0,
        workingStatus:  1,
        status: 'Active',
    });


    try {
        let deviceToFind = {
            deviceId : dataString[0] || "1"
        }
        const deviceData = await Device.getOne(deviceToFind);
        if(deviceData){
            deviceToAdd.deviceType = deviceData.deviceType;
            deviceToAdd.clientId = deviceData.clientId;
        }
        else
        {
            logger.info('Adding DeviceTrackingHistory...');
            res.send({success:false,code:500,Msg:msg.registerDevice});
        }

        const savedDeviceHistory = await DeviceTrackingHistory.addDeviceTrackingHistory(deviceToAdd);
        deviceToAdd = {
            query: {deviceId :deviceData.deviceId},
            data : {
                clientId:deviceData.clientId,
                deviceType:deviceData.deviceType,
                deviceId:  dataString[0] || 1 ,
                lat: dataString[1] || 100288.0,
                lng: dataString[2] || 1002.00,
                date:  dataString[3] || new Date(),
                temprature: dataString[4] || 0,
                workingStatus:  1,
                status: 'Active',
            }
        }
        console.log(deviceToAdd,' F 2');
        const savedCurrentDeviceData = await DeviceTracking.addDeviceTracker(deviceToAdd);

        logger.info('Adding DeviceTrackingHistory...');
        res.send({success:true,code:200,Msg:"successfully add",data:savedDeviceHistory});
    }
    catch(err) {
        logger.error('Error in getting DeviceTrackingHistory- ' + err);
        res.send({success:false,code:500,Msg:msg.addDeviceTrackingHistory,err:err});

    }
}

export default service;
