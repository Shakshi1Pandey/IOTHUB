/**
 * @file(DeviceTracker.service.js) All service realted to DeviceTracker and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import DeviceTracker from '../models/deviceTracking.model'
import logger from '../core/logger/app.logger' 
import msg from '../core/message/error.msg.js'

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
		res.send(deviceTracker);
	}catch(err){
		logger.error('Error in getting DeviceTracker- ' + err);
		res.send('Got error in getAll');
	}
}

/**
 * @description [calculation before add DeviceTracker to db and after adding DeviceTracker ]
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
        res.send('added: ' + savedDevice);
    }
    catch(err) {
        logger.error('Error in getting DeviceTracker- ' + err);
        res.send('Got error in getAll');
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
        res.send('DeviceTracker successfully deleted');
    }
    catch(err) {
        logger.error('Failed to delete DeviceTracker- ' + err);
        res.send('Delete failed..!');
    }
}

export default service;