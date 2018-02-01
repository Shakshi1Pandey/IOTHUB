import AssetType from '../models/assetType.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
	try{
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.assetTypeId){
			dataToFind.projection = {
				assetTypeId:1,_id:0
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
    let assetTypeToAdd = assetType({
        clientId: req.body.clientId,
        assetTypeId: req.body.assetTypeId,
        assetTypeName: req.body.assetTypeName,
        status: req.body.status,
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        const savedAssetType = await AssetType.addAssetType(assetTypeToAdd);
        logger.info('Adding assetType...');
        console.log('Adding assetType...');
        res.send({"success":true, "code":"200", "msg":"AssetType added successfully","data":savedAssetType});
    }
    catch(err) {
        logger.error('Error in getting AssetType- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in AssetType","err":err});
    }
}

service.deleteAssetType = async (req, res) => {
    let assetTypeToDelete = req.body.assetTypeId;
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

export default service;
