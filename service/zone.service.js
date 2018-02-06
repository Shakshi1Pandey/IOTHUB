import Zone from '../models/zone.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
    console.log(req.query.clientId,"req.query.clientId")
    if(!req.query.clientId){
        res.send({success:false, code:500, msg:"clientId missing", data:req.query});
    }
	try{
		let dataToFind = {
			query:{'clientId':req.query.clientId},
			projection:{}
		};
		const zone = await Zone.getAll(dataToFind);
        logger.info('sending all zone...');
		res.send({success:true, code:200, msg:"Found successfully", data:zone});
	}catch(err){
		logger.error('Error in getting zone- ' + err);
		res.send({success:false, code:500, msg:"Error in Zone", err:err});
	}
}
service.getOne = async (req,res) =>{
    try{
        if(!req.query.zoneId){
            res.send({success:false, code:500, msg:"zoneId missing", data:req.query});
        }
        let zoneToFind = {
            zoneToFind:req.params.zoneId
        };
        const zone = await Zone.getOne(zoneToFind);
        logger.info('sending a zone...');
        res.send({success:true, code:200, msg:"Found successfully", data:zone});
  
    }catch(err){
        logger.error('Error in getting zone- ' + err);
		res.send({success:false, code:500, msg:"Error in Zone", err:err});
    }
}
service.addZone = async (req, res) => {
  
    if(!req.body.clientId){
        res.send({success:false, code:500, msg:"clientId missing"});
    }
  
    if(!req.body.regionId){
        res.send({success:false, code:500, msg:"regionId missing"});
    }
    if(!req.body.zoneName){
        res.send({success:false, code:500, msg:"zoneName missing"});
    }
  
    let zoneToAdd = Zone({
        clientId: req.body.clientId,
        zoneId: req.body.zoneId,
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
        res.send({"success":true, "code":"200", "msg":"Zone added successfully","data":savedZone});
    }
    catch(err) {
        logger.error('Error in getting Zone- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Zone","err":err});
    }
}

service.editZone = async (req, res) => {
    if(!req.body._id){
        res.send({"success":false, "code":"500", "msg":"Zone id is missing","err":req.body});
    }
    let zoneToEdit = {
        zoneId: req.body.zoneId,
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
        res.send({"success":true, "code":"200", "msg":"Zone updated successfully","data":editedZone});
    }
    catch(err) {
        logger.error('Error in getting Zone- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Zone edit","err":err});
    }
}

service.deleteZone = async (req, res) => {
    if(!req.body.zoneId){
        res.send({success:false, code:500, msg:"zoneId missing"});
    }
    let zoneToDelete = req.body.zoneId;
    try{
        const removedZone = await Zone.removeZone(zoneToDelete);
        logger.info('Deleted zone-' + removedZone);
        res.send({"success":true, "code":"200", "msg":"Zone deleted successfully","data":removedZone});
    }
    catch(err) {
        logger.error('Failed to delete Zone- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete zone","err":err});
    }
}

export default service;
