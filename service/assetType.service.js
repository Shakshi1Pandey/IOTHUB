/**
 * @file(assetType.service.js) All service related to assetType    
 * @author Purti Singh <purti.singh20@gmail.com>
 * @version 1.0.0
 * @lastModifed 07-Feb-2018
 * @lastModifedBy Purti
 */

import AssetType from '../models/assetType.model'
import logger from '../core/logger/app.logger'
import msg from '../core/message/error.msg.js'
import successMsg from '../core/message/success.msg'
import utility from '../core/utility.js'


/**
 * [service is a object ]
 * @type {Object}
 */

const service = {};

/**
 * @description [calculation for getting the assetType ]
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

		if(req.query.assetTypeId){
			dataToFind.projection = {
				assetTypeId:1
			}
		}
		const assetType = await AssetType.getAll(dataToFind);
        logger.info('sending all assetType...');
		res.send({success:true, code:200, msg:successMsg.allAssetType, data:assetType});
	}catch(err){
		logger.error('Error in getting assetType- ' + err);
		res.send({success:false, code:500, msg:msg.getAssetType, err:err});
	}
}

/**
 * @description [calculation for adding the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addAssetType = async (req, res) => {
    let clientId = utility.removeQuotationMarks(req.body.clientId);

    let assetTypeToAdd = AssetType({
        clientId: clientId,
        assetTypeName: req.body.assetTypeName,
        status: req.body.status,
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        if(!req.body.clientId ||!req.body.assetTypeName){
            res.send({"success":false,"code":"500","msg":msg.param});
        }
        const savedAssetType = await AssetType.addAssetType(assetTypeToAdd);
        res.send({"success":true, "code":"200", "msg":successMsg.addAssetType,"data":savedAssetType});
    }
    catch(err) {
        logger.error('Error in getting AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addAssetType,"err":err});
    }
}

/**
 * @description [calculation for deleting the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.deleteAssetType = async (req, res) => {
    let assetTypeToDelete = req.body.assetTypeId;
    if(!req.body.assetTypeId){
        res.send({"success":false, "code":"500", "msg":msg.assetTypeId});

    }
    try{
        const removedAssetType = await AssetType.removeAssetType(assetTypeToDelete);
        logger.info('Deleted assetType-' + removedAssetType);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteAssetType,"data":removedAssetType});
    }
    catch(err) {
        logger.error('Failed to delete AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteAssetType,"err":err});
    }
}

/**
 * @description [calculation for editing the assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateAssetType = async (req, res) => {
        // let query = req.body;
        
       let edit={
        query:{"assetTypeId":req.body.assetTypeId},
        data:{"$set":req.body}
       }

		try {
			const modifiedAssetType =	await AssetType.modifyAssetType(edit);
			res.send({"success":true, "code":"200", "msg":successMsg.editAssetType,"data":modifiedAssetType});
		} catch (e) {
			res.send({"success":false, "code":"500", "msg":msg.editAssetType,"err":e});
		}
}

export default service;
