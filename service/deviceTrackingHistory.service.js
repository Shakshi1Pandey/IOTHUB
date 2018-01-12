/**
 * @file(DeviceTrackingHistory.service.js) All service realted to DeviceTrackingHistory and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import DeviceTrackingHistory from '../models/deviceTrackingHistory.model'
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
		const deviceTrackingHistory = await DeviceTrackingHistory.getAll();
        logger.info('sending all DeviceTrackingHistory...');
		res.send(deviceTrackingHistory);
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
    console.log("hii")
    let deviceToAdd = DeviceTrackingHistory({
        name: req.body.name
    });
    console.log("deviceToAdd = ",deviceToAdd)
    try {
        const savedDevice = await DeviceTrackingHistory.addDeviceTrackingHistory(deviceToAdd);
        logger.info('Adding DeviceTrackingHistory...');
        res.send({success:true,code:200,Msg:"successfully add",data:savedDevice});
    }
    catch(err) {
        logger.error('Error in getting DeviceTrackingHistory- ' + err);
        res.send({success:false,code:500,Msg:"Got error",err:err});
        //res.send('Got error in getAll');
    }
}

export default service;