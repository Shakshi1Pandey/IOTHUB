/**
 * @file(asset.service.js) All service realted to asset    
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */


import Asset from '../models/asset.model'
import logger from '../core/logger/app.logger' 
import msg from '../core/message/error.msg.js'
//import logger from '../core/logger/app.logger'
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
    if(!req.query.clientId){
        res.send({"success":false,"code":"500","msg":msg.clientId});
    }
    
    let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{

		let dataToFind = {
			query:{clientId:clientId},
			projection:{}
		};

		if(req.query.isAssetType){
			dataToFind.projection = {
				assetType:1,assetId:1
			}
        }
        // console.log(dataToFind);
		const asset = await Asset.getAll(dataToFind);
        logger.info('sending all asset...');
		res.send({success:true, code:200, msg:successMsg.allAsset, data:asset});
	}catch(err){
		logger.error('Error in getting asset- ' + err);
		res.send({success:false, code:500, msg:msg.getAsset, err:err});

	}
}

/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addAsset = async (req, res) => {

    let clientId = utility.removeQuotationMarks(req.body.clientId);
    let assetToAdd = Asset({
        clientId : clientId,
        branchId: req.body.branchId,
        regionId: req.body.regionId,
        zoneId : req.body.zoneId,
        assetTypeId: req.body.assetTypeId,
        assetName: req.body.assetName,
        serialNo: req.body.serialNo,
        status: "Active",
        createAt: new Date()
    });

    try {
        if(!req.body.zoneId ||!req.body.regionId || !req.body.branchId ||   !req.body.clientId || !req.body.assetName || !req.body.assetTypeId || !req.body.serialNo){
            res.send({"success":false,"code":"500","msg":msg.param});
        }
        const savedAsset = await Asset.addAsset(assetToAdd);
        logger.info('Adding asset...');
        res.send({"success":true, "code":"200", "msg":successMsg.addAsset,"data":savedAsset});
    }
    catch(err) {
        logger.error('Error in getting Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addAsset,"err":err});
    }
}


/**
 * @description [calculation before edit Device to db and after edit Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.editAsset = async (req,res) => {
    let assetToEdit = {
        branchId: req.body.branchId,
        regionId: req.body.regionId,
        zoneId : req.body.zoneId,
        assetId : req.body.assetId,
        assetType: req.body.assetType,
        assetName: req.body.assetName,
        serialNo: req.body.serialNo,
        status: req.body.status
    };
    let assetEdit = {
        query:{"_id":req.body._id},
        data:{"$set":assetToEdit}

    };
    try {
        const editedAsset = await Asset.editAsset(assetEdit);
        logger.info('Adding asset...');
        console.log('Adding asset...');
        res.send({"success":true, "code":"200", "msg":successMsg.editAsset,"data":editedAsset});
    }catch(err) {
        logger.error('Error in getting Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editAsset,"err":err});
    }
}



/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteAsset = async (req, res) => {
    let assetToDelete = req.body.assetId;
    if(!req.body.assetId){
        res.send({"success":false, "code":"500", "msg":msg.assetId});
    }
    try{ 
        const removedAsset = await Asset.removeAsset(assetToDelete);
        logger.info('Deleted asset- ' + removedAsset);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteAsset,"data":removedAsset});
    }
    catch(err) {
        logger.error('Failed to delete Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteAsset,"err":err});
    }
}

/** 
* @description [with all the calculation before getOne function of model and after getAll]
* @param  {[type]}
* @param  {[type]}
* @return {[type]}
*/
service.getOne= async(req,res)=>{

    let assetToFind={
        assetId:req.query.assetId
    }
    try{
        const getOneAsset=await Asset.getOne(assetToFind);
        logger.info('get one asset-' +getOneAsset);
        res.send({"success":true,"code":"200","msg":"get asset","data":getOneAsset});
    }
    catch(err){
        logger.error('Failed to get Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.getAsset,"err":err});

    }
}

export default service;
