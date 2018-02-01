import Zone from '../models/zone.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
	try{
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.zoneId){
			dataToFind.projection = {
				zoneId:1,_id:0
			}
		}
		const zone = await Zone.getAll(dataToFind);
        logger.info('sending all zone...');
		res.send({success:true, code:200, msg:"Found successfully", data:zone});
	}catch(err){
		logger.error('Error in getting zone- ' + err);
		res.send({success:false, code:500, msg:"Error in Zone", err:err});
	}
}

service.addZone = async (req, res) => {
    console.log(req.body,'+++')
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
