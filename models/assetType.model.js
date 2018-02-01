import mongoose from 'mongoose';

const assetTypeSchema = mongoose.Schema({
    clientId: {type: String },
    assetTypeId: {type: String },
    assetTypeName: {type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'assettype'});

let AssetTypeModel = mongoose.model('assettypes',assetTypeSchema);

AssetTypeModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return AssetTypeModel.find(dataToFind.query,dataToFind.projection);
}

AssetTypeModel.getOne = (assetTypeToFind) => {
    console.log(assetTypeToFind," = assetTypeToFind")
    return AssetTypeModel.findOne(assetTypeToFind);
}

AssetTypeModel.addAssetType = (assetTypeToAdd) => {
    return assetTypeToAdd.save();
}

AssetTypeModel.removeAssetType = (assetTypeId) => {
    return AssetTypeModel.remove({assetTypeId: assetTypeId});
}

export default AssetTypeModel;
