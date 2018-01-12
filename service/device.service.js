/**
 * @file(device.service.js) All service realted to device and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import Device from '../models/device.model'
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
		const device = await Device.getAll();
        logger.info('sending all device...');
		res.send(device);
	}catch(err){
		logger.error('Error in getting device- ' + err);
		res.send('Got error in getAll');
	}
}

/**
 * @description [calculation before add Device to db and after adding Device ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addDevice = async (req, res) => {
    let deviceToAdd = Device({
         name: req.body.name,
        clientId : req.body.clientId, 
        branchId: req.body.branchId,
        brand: req.body.brand,
        regionId: req.body.regionId,
        assetId : req.body.assetId,
        deviceId: req.body.deviceId,
        deviceType: req.body.deviceType,
        deviceName: req.body.deviceName,
        serialNo: req.body.serialNo,
        simno: req.body.simno,
        status: req.body.status,
        createAt: new Date()
    });
    try {
        const savedDevice = await Device.addDevice(deviceToAdd);
        logger.info('Adding device...');
        res.send('added: ' + savedDevice);
    }
    catch(err) {
        logger.error('Error in getting Device- ' + err);
        res.send('Got error in getAll');
    }
}
/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteDevice = async (req, res) => {
    let deviceToDelete = req.body.name;
    try{
        const removedDevice = await Device.removeCar(deviceToDelete);
        logger.info('Deleted Device- ' + removedDevice);
        res.send({"success":true, "code":"200", "msg":"Device added successfully","data":savedDevice});
    }
    catch(err) {
        logger.error('Failed to delete Device- ' + err);
        res.send('Delete failed..!');
    }
}

export default service;
