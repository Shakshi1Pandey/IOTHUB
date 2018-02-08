/**
 * @file(device.service.js) All service realted to device and entry handler file after routing  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import Device from '../models/device.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'



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
    // if(!req.query.clientId){
    //     res.send({"success":false,"code":"500","msg":"clientId is missing","data":req.query});
    // }
    let clientId = utility.removeQuotationMarks(req.query.clientId);
    
	try{
        
		const device = await Device.getAll(clientId);
        logger.info('sending all device...');
		res.send({"success":true,"code":"200","msg":successMsg.allDevice,"data":device});

	}catch(err){
		logger.error('Error in getting device- ' + err);
		res.send({"success":false, "code":"500", "msg":"Failed to get device","err":err});
	}
}
service.getOne=async(req,res)=>{
    let deviceToFind={
        deviceId:req.params.deviceId}
 
 try{
     const getOneDevice=await Device.getOne(deviceToFind);
     logger.info('get one device-' +getOneDevice);
     res.send({"success":true,"code":"200","msg":successMsg.getOneDevice,"data":getOneDevice});
 }
 catch(err){
     logger.error('Failed to get branch- ' + err);
     res.send({"success":false, "code":"500", "msg":"Failed to get device","err":err});

 }

}

/**
 * @description [calculation before add Device to db and after adding Device ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addDevice = async (req, res) => {
    let clientId = utility.removeQuotationMarks(req.body.clientId);

    let deviceToAdd = Device({
         name: req.body.name,
        clientId : clientId, 
        branchId: req.body.branchId,
        deviceId: req.body.deviceId,
        brand: req.body.brand,
        regionId: req.body.regionId,
        assetId : req.body.assetId,
        deviceType: req.body.deviceType,
        deviceName: req.body.deviceName,
        serialNo: req.body.serialNo,
        simno: req.body.simno,
        status: req.body.status,
        createAt: new Date()
    });
    try {
        if(!req.body.deviceId || !req.body.name || !req.body.clientId || !req.body.deviceType){
            res.send({"success":false,"code":"500","msg":"Expected params are missing","data":req.body});
        }
        const savedDevice = await Device.addDevice(deviceToAdd);
        logger.info('Adding device...');
        res.send({"success":true, "code":"200", "msg":successMsg.addDevice,"data":savedDevice});
    }
    catch(err) {
        logger.error('Error in getting Device- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to add device","err":err});

        //res.send('Got error in getAll');
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
    if(!req.body.name){
        res.send({"success":false,"code":"500","msg":"device name is missing"});
    }
    try{
        const removedDevice = await Device.removeCar(deviceToDelete);
        logger.info('Deleted Device- ' + removedDevice);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteDevice,"data":removedDevice});

    }
    catch(err) {
        logger.error('Failed to delete Device- ' + err);
        res.send({success:false, code:500, msg:"Failed to delete Device", err:err});
    }
}

service.editDevice = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":"device_id is missing", data:req.query})
    }
    let deviceEdit={
        status: req.body.status,
        createAt: new Date()

    }
    let deviceToEdit = {
        query:{"_id":req.body._id},
        data:{"$set":deviceEdit}
    };
    try{

    const editDevice= await Device.editDevice(deviceToEdit);
    logger.info("update device");
    console.log("update device");
    res.send({"success":true,"code":200,"msg":successMsg.editDevice,"data":editDevice});
    }
    catch(err){
        logger.error('Error in getting device- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in device edit","err":err});

    }

}

export default service;
