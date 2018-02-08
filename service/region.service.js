import Region from '../models/region.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'

const service = {};

service.getAll = async (req,res) =>{
console.log(req.query.clientId)
    if(!req.query.clientId){
        return res.send({success:false, code:500, msg:"clientId missing"})
    }
    try{
		let dataToFind = {
			query:{clientId: req.query.clientId },
			projection:{}
		};

		if(req.query.regionId){
			dataToFind.projection = {
				regionId:1
			}
		}
		const region = await Region.getAll(dataToFind);
        logger.info('sending all region...');
		res.send({success:true, code:200, msg:successMsg.allRegion, data:region});
	}catch(err){
		logger.error('Error in getting region- ' + err);
		res.send({success:false, code:500, msg:"Error in Region", err:err});
	}
}

service.getOne=async(req,res)=>{
    let regionToFind={regionId:req.params.regionId}
 
 try{
     const getOneRegion=await Region.getOne(regionToFind);
     logger.info('get one region-' +getOneRegion);
     res.send({"success":true,"code":"200","msg":successMsg.getOneRegion,"data":getOneRegion});
 }
 catch(err){
     logger.error('Failed to get region- ' + err);
     res.send({"success":false, "code":"500", "msg":"Failed to get region","err":err});

 }

}

service.addRegion = async (req, res) => {
    let regionToAdd = Region({
        regionName:req.body.regionName,
        clientId:req.body.clientId,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
     if(!req.body.clientId){
        return res.send({success:false, code:500, msg:"clientId missing"})
    }
    try {
        const savedRegion = await Region.addRegion(regionToAdd);
        logger.info('Adding region...');
        res.send({"success":true, "code":"200", "msg":successMsg.addRegion,"data":savedRegion});
    }
    catch(err) {
        logger.error('Error in getting Region- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Region","err":err});
    }
}

service.editRegion = async (req, res) => {

    if(!req.body._id || !req.body.regionName || !req.body.status){
        res.send({"success":false, "code":"500", "msg":"_id or regionName or status is missing"});

    }

    let regionToUpdate = {
        query:{_id:req.body._id},
        data:{
            $set:{
                regionName:req.body.regionName,
                status:req.body.status || "Active",
                updatedAt: new Date()
            }
        }
        
    };
    try {
        const savedRegion = await Region.editRegion(regionToUpdate);
        logger.info('Adding region...');
        res.send({"success":true, "code":"200", "msg":successMsg.editRegion,"data":savedRegion});
    }
    catch(err) {
        logger.error('Error in getting Region- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in update Region","err":err});
    }
}

service.deleteRegion = async (req, res) => {
    let regionToDelete = req.body.regionId;
    try{
        const removedRegion = await Region.removeRegion(regionToDelete);
        logger.info('Deleted region-' + removedRegion);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteRegion,"data":removedRegion});
    }
    catch(err) {
        logger.error('Failed to delete Region- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete region","err":err});
    }
}

export default service;
