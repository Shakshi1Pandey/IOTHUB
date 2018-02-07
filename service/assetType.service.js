import AssetType from '../models/assetType.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'

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
        res.send({"success":false,"code":"500","msg":"clientId is missing","data":req.query});
    }
	try{
		let dataToFind = {
			query:{},
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
		res.send({success:false, code:500, msg:"Error in AssetType", err:err});
	}
}

/**
 * @description [calculation before add Asset to db and after adding assetType ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addAssetType = async (req, res) => {
    let assetTypeToAdd = AssetType({
        clientId: req.body.clientId,
        assetTypeName: req.body.assetTypeName,
        status: req.body.status,
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        if(!req.body.clientId ||!req.body.assetTypeName){
            res.send({"success":false,"code":"500","msg":"Expected params are missing","data":req.body});
        }
        const savedAssetType = await AssetType.addAssetType(assetTypeToAdd);
        res.send({"success":true, "code":"200", "msg":successMsg.addAssetType,"data":savedAssetType});
    }
    catch(err) {
        logger.error('Error in getting AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in AssetType","err":err});
    }
}

/**
 * @description [delete asset type]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.deleteAssetType = async (req, res) => {
    let assetTypeToDelete = req.body.assetTypeId;
    if(!req.body.assetTypeId){
        res.send({"success":false, "code":"500", "msg":"AssetType id is missing","err":err});

    }
    try{
        const removedAssetType = await AssetType.removeAssetType(assetTypeToDelete);
        logger.info('Deleted assetType-' + removedAssetType);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteAssetType,"data":removedAssetType});
    }
    catch(err) {
        logger.error('Failed to delete AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete AssetType","err":err});
    }
}

/**
 * @description [update asset type]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.updateAssetType = async (req, res) => {
		let query = req.body;
		try {
			const modifiedAssetType =	await AssetType.modifyAssetType(query);
			res.send({"success":true, "code":"200", "msg":successMsg.editAssetType,"data":modifiedAssetType});
		} catch (e) {
			res.send({"success":false, "code":"500", "msg":"Failed to update AssetType","err":err});
		}
}

export default service;
