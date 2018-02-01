/**
 * @file(asset.model.js) With Schema for asset model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';

/**
 * [AssetSchema is used for device data validating aginst schema]
 * @type {[type]}
 */
const AssetSchema = mongoose.Schema({
    clientId : {type: Number },
    branchId: {type: String },
    regionId: {type: String },
    zoneId : {type: String},
    assetId : {type: String },
    assetType:{type: String },
    assetName:{type: String },
    serialNo: {type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'asset'});

let AssetModel = mongoose.model('asset', AssetSchema);

 
/**
 *@description [is used for getting all data of asset from db]
 * @return {object}
 */
AssetModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return AssetModel.find(dataToFind.query,dataToFind.projection);
}

/**
 *@description [is used for getting one data of asset from db]
 * @return {object}
 */
AssetModel.getOne = (assetToFind) => {
    console.log(assetToFind," = assetToFind")
    return AssetModel.findOne(assetToFind);
}

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
AssetModel.addAsset = (assetToAdd) => {
    return assetToAdd.save();
}

/**
 * @description [responsible for remove asset from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
AssetModel.removeAsset = (assetId) => {
    return AssetModel.remove({assetId: assetId});
}

/**
 * @description [responsible for edit asset from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
AssetModel.editAsset = (assetedit) => {
    return AssetModel.update(assetedit.query,assetedit.data);
}

/**
 * @description [make used by other module]
 */
export default AssetModel;
