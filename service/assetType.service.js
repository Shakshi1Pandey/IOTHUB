import AssetType from '../models/assetType.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
    // if(!req.query.clientId){
    //     res.send({"success":false,"code":"500","msg":"clientId is missing","data":req.query});
    // }
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
		res.send({success:true, code:200, msg:"Found successfully", data:assetType});
	}catch(err){
		logger.error('Error in getting assetType- ' + err);
		res.send({success:false, code:500, msg:"Error in AssetType", err:err});
	}
}

service.addAssetType = async (req, res) => {
    let assetTypeToAdd = AssetType({
        clientId: req.body.clientId,
        assetTypeId: req.body.assetTypeId,
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
        res.send({"success":true, "code":"200", "msg":"AssetType added successfully","data":savedAssetType});
    }
    catch(err) {
        logger.error('Error in getting AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in AssetType","err":err});
    }
}

service.deleteAssetType = async (req, res) => {
    let assetTypeToDelete = req.body.assetTypeId;
    if(!req.body.assetTypeId){
        res.send({"success":false, "code":"500", "msg":"AssetType id is missing","err":err});

    }
    try{
        const removedAssetType = await AssetType.removeAssetType(assetTypeToDelete);
        logger.info('Deleted assetType-' + removedAssetType);
        res.send({"success":true, "code":"200", "msg":"AssetType deleted successfully","data":removedAssetType});
    }
    catch(err) {
        logger.error('Failed to delete AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete AssetType","err":err});
    }
}

service.updateAssetType = async (req, res) => {
		let query = req.body;
		try {
			const modifiedAssetType =	await AssetType.modifyAssetType(query);
			res.send({"success":true, "code":"200", "msg":"AssetType updated successfully","data":modifiedAssetType});
		} catch (e) {
			res.send({"success":false, "code":"500", "msg":"Failed to update AssetType","err":e});
		}
}

export default service;
