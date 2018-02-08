/**
 * @file(device.model.js) With Schema for device model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";

/**
 * [DeviceSchema is used for device data validating aginst schema]
 * @type {[type]}
 */ 
const DeviceSchema = mongoose.Schema({
    clientId : {type: Number },
    branchId: {type: Number },
    brand:{type: String },
    regionId: {type: Number },
    assetId : {type: Number },
    deviceId:{type: String },
    deviceType:{type: String },
    deviceName:{type: String },
    serialNo: {type: Number },
    simno: {type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'device'});

let DeviceModel = mongoose.model('device', DeviceSchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
DeviceModel.getAll = (clientId) => {
    return DeviceModel.aggregate([
        {
            $match:{clientId:clientId}
        },
        {
          $lookup:{
            from:"asset",
            localField:"assetId",
            foreignField:"assetId",
            as:"asset_docs"
          }

        },
        {
          $unwind:"$asset_docs"
        },
        {
            $lookup:{
                from:"assettype",
                localField:"asset_docs.assetTypeId",
                foreignField:"assetTypeId",
                as:"assetType_docs"
            }
        },
        {
          $unwind:"$assetType_docs"
        },
        {
            $lookup:{
                from:"region",
                localField:"regionId",
                foreignField:"regionId",
                as:"region_docs"
            }
        },
        {
          $unwind:"$region_docs"
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
            $project:{
                clientId : 1, 
                branchId: 1,
                branchName:"$branch_docs.branchName",
                brand:1,
                regionId: 1,
                regionName:"$region_docs.regionName",
                assetId : 1,
                assetName:"$asset_docs.assetName",
                assetTypeName:"$assetType_docs.assetTypeName",
                deviceId:1,
                deviceType:1,
                deviceName:1,
                serialNo: 1,
                simno: 1

            }
        }
    ])
    //return DeviceModel.find({});
}

/**
 *@description [is used for getting one data of devices from db]
 * @return {object}
 */
DeviceModel.getOne = (deviceToFind) => {
    console.log(deviceToFind," = deviceToFind")
    return DeviceModel.findOne(deviceToFind);
}

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
DeviceModel.addDevice = (deviceToAdd) => {
    return deviceToAdd.save();
}

/**
 * @description [responsible for remove devices from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
DeviceModel.removeDevice = (carName) => {
    return DeviceModel.remove({name: carName});
}

DeviceModel.editDevice=(deviceToEdit)=>{
    return DeviceModel.update(deviceToEdit.query,deviceToEdit.data);
}
/**
 * @description [make used by other module]
 */
export default DeviceModel;
