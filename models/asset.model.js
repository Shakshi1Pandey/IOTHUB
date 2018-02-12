/**
 * @file(asset.model.js) With Schema for asset model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose'
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

/**
 * [AssetSchema is used for device data validating aginst schema]
 * @type {[type]}
 */


const AssetSchema = mongoose.Schema({
    clientId : {type: Number },
    branchId: {type: Number },
    assetId : {type: Number },
    assetTypeId:{type: Number },
    assetName:{type: String },
    serialNo: {type: Number },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'asset'});
AssetSchema.plugin(AutoIncrement.plugin, { model: 'asset',
field: 'assetId',
startAt: 10,
incrementBy: 1
});

let AssetModel = mongoose.model('asset', AssetSchema);


 
/**
 *@description [is used for getting all data of asset from db]
 * @return {object}
 */

AssetModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return AssetModel.aggregate([
        { $match: dataToFind.query},
        {
          $lookup:{
            from:"assettype",
            localField:"assetTypeId",
            foreignField:"assetTypeId",
            as:"assetType_docs"
          }

        },
        { 
          $unwind:"$assetType_docs"
        },
        {
            $lookup:{
                from:"branch",
                localField:"branchId",
                foreignField:"branchId",
                as:"branch_docs"
            }
        },
        {
          $unwind:"$branch_docs"
        },
        {
            $lookup:{
                from:"zone",
                localField:"branch_docs.zoneId",
                foreignField:"zoneId",
                as:"zone_docs"
            }
        },
        {
          $unwind:"$zone_docs"
        },
        {
            $lookup:{
                from:"region",
                localField:"zone_docs.regionId",
                foreignField:"regionId",
                as:"region_docs"
            }
        },
        {
          $unwind:"$region_docs"
        },
        {
            $project:{
                clientId:1,
                assetId:1,
                branchId: 1,
                branchName:"$branch_docs.branchName",
                regionId:1,
                regionName:"$region_docs.regionName",
                zoneId : 1,
                zoneName:"$zone_docs.zoneName",
                assetId : 1,
                assetTypeId:1,
                assetTypeName:"$assetType_docs.assetTypeName",
                assetName:1,
                serialNo: 1,
                status:1

            }
        }
    ]);

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
