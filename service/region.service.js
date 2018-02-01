import Region from '../models/region.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
	try{
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.regionId){
			dataToFind.projection = {
				regionId:1
			}
		}
		const region = await Region.getAll(dataToFind);
        logger.info('sending all region...');
		res.send({success:true, code:200, msg:"Found successfully", data:region});
	}catch(err){
		logger.error('Error in getting region- ' + err);
		res.send({success:false, code:500, msg:"Error in Region", err:err});
	}
}

service.getOne=async(req,res)=>{
    let regionToFind=req.params.regionId;
 
 try{
     const getOneRegion=await Region.getOne(regionToFind);
     logger.info('get one region-' +getOneRegion);
     res.send({"success":true,"code":"200","msg":"get region","data":getOneRegion});
 }
 catch(err){
     logger.error('Failed to get region- ' + err);
     res.send({"success":false, "code":"500", "msg":"Failed to get region","err":err});

 }

}

service.addRegion = async (req, res) => {
    let regionToAdd = Region({
        regionId: req.body.regionId,
        regionName:req.body.regionName,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        const savedRegion = await Region.addRegion(regionToAdd);
        logger.info('Adding region...');
        res.send({"success":true, "code":"200", "msg":"Region added successfully","data":savedRegion});
    }
    catch(err) {
        logger.error('Error in getting Region- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Region","err":err});
    }
}

service.deleteRegion = async (req, res) => {
    let regionToDelete = req.body.regionId;
    try{
        const removedRegion = await Region.removeRegion(regionToDelete);
        logger.info('Deleted region-' + removedRegion);
        res.send({"success":true, "code":"200", "msg":"Region deleted successfully","data":removedRegion});
    }
    catch(err) {
        logger.error('Failed to delete Region- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete region","err":err});
    }
}

export default service;
