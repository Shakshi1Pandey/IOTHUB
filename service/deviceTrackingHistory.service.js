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

import logger from '../core/logger/app.logger'

/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};

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

        let condition = {
            deviceId:req.query.deviceId,
            date: { 
                $gte: start
              }  
        }
        console.log(condition)
		const deviceTrackingHistory = await DeviceTrackingHistory.getAll(condition);
        logger.info('sending all DeviceTrackingHistory...');
		res.send({success:true, code:200, msg:"sending all DeviceTrackingHistory", data:deviceTrackingHistory});
	}catch(err){
		logger.error('Error in getting DeviceTrackingHistory- ' + err);
		res.send('Got error in getAll');
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
        const savedCurrentDeviceData = await DeviceTracking.addDeviceTracker(deviceToAdd);

        logger.info('Adding DeviceTrackingHistory...');
        res.send({success:true,code:200,Msg:"successfully add",data:savedDeviceHistory});
    }
    catch(err) {
        logger.error('Error in getting DeviceTrackingHistory- ' + err);
        res.send({success:false,code:500,Msg:"Got error",err:err});
        //res.send('Got error in getAll');
    }
}

export default service;
