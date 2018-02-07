/**
 * @file(DeviceTracker.service.js) All service realted to DeviceTracker and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 7-Feb-2018
 * @lastModifedBy Shakshi
 */

import DeviceTracker from '../models/deviceTracking.model'
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
        let condition = {
            clientId:req.query.clientId
        }
		const deviceTracker = await DeviceTracker.getAll(condition);
        logger.info('sending all DeviceTracker...');
		res.send({success:true, code:200, msg:"sending all DeviceTracker",data:deviceTracker});
	}catch(err){
		logger.error('Error in getting DeviceTracker- ' + err);
		res.send({success:false, code:500, msg:'Got error in getAll', err:err});
	}
}

/**
 * @description [calculation before add DeviceTracker to db and after adding DeviceTracker ]success
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addDeviceTracker = async (req, res) => {
    let deviceDataToAdd = DeviceTracker({
        name: req.body.name
    });
    try {
        const savedDevice = await DeviceTracker.addDevice(deviceDataToAdd);
        logger.info('Adding DeviceTracker...');
        res.send({success:true, code:200, msg:"Adding DeviceTracker",data:savedDevice});
        //res.send('added: ' + savedDevice);
    }
    catch(err) {
        logger.error('Error in getting DeviceTracker- ' + err);
        res.send({success:false, code:500, msg:'Error in getting DeviceTracker', err:err});

        //res.send('Got error in getAll');
    }
}
/**
 * @description [calculation before delete DeviceTracker to db and after delete DeviceTracker]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteTracker = async (req, res) => {
    let deviceToDelete = req.body.name;
    try{
        const removedDevice = await DeviceTracker.removeCar(deviceToDelete);
        logger.info('Deleted DeviceTracker- ' + removedDevice);
        res.send({success:true, code:200, msg:"Deleted DeviceTracker",data:removedDevice});

       // res.send('DeviceTracker successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete DeviceTracker- ' + err);
        res.send({success:false, code:500, msg:'Failed to delete DeviceTracker', err:err});

        //res.send('Delete failed..!');
    }
}

export default service;