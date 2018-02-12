/**
 * @file(zone.service.js) All service related to zone    
 * @author Purti Singh <purti.singh20@gmail.com>
 * @version 1.0.0
 * @lastModifed 07-Feb-2018
 * @lastModifedBy Purti
 */

import Zone from '../models/zone.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'
import msg from '../core/message/error.msg.js'

/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [calculation for getting all the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

 
service.getAll = async (req,res) =>{

    if(!req.query.clientId){
        res.send({success:false, code:500, msg:msg.clientId});
    }
    let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{
		let dataToFind = {
			query:{clientId:clientId},
			projection:{}
        };
        // console.log(dataToFind);
		const zone = await Zone.getAll(dataToFind);
        logger.info('sending all zone...');
		res.send({success:true, code:200, msg:successMsg.allZone, data:zone});
	}catch(err){
		logger.error('Error in getting zone- ' + err);
		res.send({success:false, code:500, msg:msg.getZone, err:err});
	}
}

/**
 * @description [calculation for getting one zone ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getOne = async (req,res) =>{
    
    if(!req.query.clientId){
        res.send({success:false, code:500, msg:msg.clientId});
    }

    try{        
        let zoneToFind = {
            zoneToFind:req.params.zoneId
        };
        const zone = await Zone.getOne(zoneToFind);
        logger.info('sending a zone...');
        res.send({success:true, code:200, msg:successMsg.getOneZone, data:zone});
  
    }catch(err){
        logger.error('Error in getting zone- ' + err);
		res.send({success:false, code:500, msg:msg.getZone, err:err});
    }
}

/**
 * @description [calculation for adding the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addZone = async (req, res) => {
    
    if(!req.body.clientId){
        res.send({success:false, code:500, msg:msg.clientId});
    }

    if(!req.body.regionId){
        res.send({success:false, code:500, msg:msg.regionId});
    }
    if(!req.body.zoneName){
        res.send({success:false, code:500, msg:msg.zoneName});
    }
    let clientId = utility.removeQuotationMarks(req.body.clientId);
    let zoneToAdd = Zone({
        clientId: clientId,
        regionId: req.body.regionId,
        zoneName: req.body.zoneName,
        status: req.body.status,
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        const savedZone = await Zone.addZone(zoneToAdd);
        logger.info('Adding zone...');
        console.log('Adding zone...');
        res.send({"success":true, "code":"200", "msg":successMsg.addZone,"data":savedZone});
    }
    catch(err) {
        logger.error('Error in getting Zone- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addZone,"err":err});
    }
}

/**
 * @description [calculation for editing the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.editZone = async (req, res) => {
    if(!req.body._id){
        res.send({"success":false, "code":"500", "msg":msg._id});
    }
    if(!req.body.status){
        res.send({"success":false, "code":"500", "msg":msg.status});
    }
    if(!req.body.zoneName){
        res.send({"success":false, "code":"500", "msg":msg.zoneName});
    }

    let zoneToEdit = {
        regionId: req.body.regionId,
        zoneName: req.body.zoneName,
        status: req.body.status,
        updatedAt: new Date()
    };

    let zoneedit = {
        query:{"_id":req.body._id},
        data:{"$set":zoneToEdit}
    };

    try {
        const editedZone = await Zone.editZone(zoneedit);
        logger.info('Adding zone...');
        console.log('Adding zone...');
        res.send({"success":true, "code":"200", "msg":successMsg.editZone,"data":editedZone});
    }
    catch(err) {
        logger.error('Error in getting Zone- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editZone,"err":err});
    }
}

/**
 * @description [calculation for deleting the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.deleteZone = async (req, res) => {

    if(!req.body._id){
        res.send({success:false, code:500, msg:msg._id});
    }
    let zoneToDelete = req.body._id;
    try{
        const removedZone = await Zone.removeZone(zoneToDelete);
        logger.info('Deleted zone-' + removedZone);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteZone,"data":removedZone});
    }
    catch(err) {
        logger.error('Failed to delete Zone- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteZone,"err":err});
    }
}

export default service;
