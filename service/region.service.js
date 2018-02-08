/**
 * @file(region.service.js) All service related to region    
 * @author Purti Singh <purti.singh20@gmail.com>
 * @version 1.0.0
 * @lastModifed 07-Feb-2018
 * @lastModifedBy Purti
 */

import Region from '../models/region.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg';
import utility from '../core/utility.js'


/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};

/**
 * @description [calculation for getting all the regions ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getAll = async (req,res) =>{
console.log(req.query.clientId)
    if(!req.query.clientId){
        return res.send({success:false, code:500, msg:"clientId missing"})
    }

    let clientId = utility.removeQuotationMarks(req.query.clientId);

	try{
		let dataToFind = {
			query:{clientId:clientId},

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

/**
 * @description [calculation for getting one zone ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

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

/**
 * @description [calculation for adding all the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addRegion = async (req, res) => {

     if(!req.body.clientId){
        return res.send({success:false, code:500, msg:"clientId missing"})
    }
    let clientId = utility.removeQuotationMarks(req.body.clientId);
    
    let regionToAdd = Region({
        regionName:req.body.regionName,
        clientId:clientId,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
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

/**
 * @description [calculation for editing the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
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

/**
 * @description [calculation for deleting the zones ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.deleteRegion = async (req, res) => {
    if(!req.body._id){
        res.send({success:false, code:500, msg:"_id missing"});
    }
    let regionToDelete = req.body._id;
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
