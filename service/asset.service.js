/**
 * @file(asset.service.js) All service realted to asset    
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */


import Asset from '../models/asset.model'
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

		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.isAssetType){
			dataToFind.projection = {
				assetType:1,assetId:1,_id:0
			}
		}
		const asset = await Asset.getAll(dataToFind);
        logger.info('sending all asset...');
		res.send({success:true, code:200, msg:"Found successfully", data:asset});
	}catch(err){
		logger.error('Error in getting asset- ' + err);
		res.send({success:false, code:500, msg:"Error in Asset", err:err});

	}
}

/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addAsset = async (req, res) => {
    let assetToAdd = Asset({
        clientId : req.body.clientId, 
        branchId: req.body.branchId,
        regionId: req.body.regionId,
        zoneId : req.body.zoneId,
        assetId : req.body.assetId,
        assetType: req.body.assetType,
        assetName: req.body.assetName,
        serialNo: req.body.serialNo,
        status: "Active",
        createAt: new Date()
    });
    try {
        const savedAsset = await Asset.addAsset(assetToAdd);
        logger.info('Adding asset...');
        res.send({"success":true, "code":"200", "msg":"Asset added successfully","data":savedAsset});
    }
    catch(err) {
        logger.error('Error in getting Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Asset","err":err});
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
    let assetedit = {
        query:{"_id":req.body._id},
        data:{"$set":assetToEdit}
        
    };
    try {
        const editedAsset = await Asset.editAsset(assetedit);
        logger.info('Adding asset...');
        console.log('Adding asset...');
        res.send({"success":true, "code":"200", "msg":"Asset updated successfully","data":editedAsset});
    }catch(err) {
        logger.error('Error in getting Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Asset edit","err":err});
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
    try{
        const removedAsset = await Asset.removeAsset(assetToDelete);
        logger.info('Deleted asset- ' + removedAsset);
        res.send({"success":true, "code":"200", "msg":"Asset deleted successfully","data":removedAsset});
    }
    catch(err) {
        logger.error('Failed to delete Asset- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete asset","err":err});
    }
}

export default service;
