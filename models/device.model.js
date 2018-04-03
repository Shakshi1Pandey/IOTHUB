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
    customerId : {type: String },
    brand:{type: String },
    assetId : {type: String },
    deviceId:{type: String, index:{unique:true}},
    deviceType:{type: String }, 
    deviceName:{type: String },
    serialNo: {type: String },
    simno: {type: String },
    registerBy:{type:String},
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'device'});

let DeviceModel = mongoose.model('device', DeviceSchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
DeviceModel.getAll = (customerId) => {
    return DeviceModel.aggregate([
        {
            $match:{customerId:customerId}
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
        // {
        //     $lookup:{
        //         from:"branch",
        //         localField:"asset_docs.branchId",
        //         foreignField:"branchId",
        //         as:"branch_docs"
        //     }
        // },
        // {
        //   $unwind:"$branch_docs"
        // },
        // {
        //     $lookup:{
        //         from:"zone",
        //         localField:"branch_docs.zoneId",
        //         foreignField:"zoneId",
        //         as:"zone_docs"
        //     }
        // },
        // {
        //   $unwind:"$zone_docs"
        // },
        // {
        //     $lookup:{
        //         from:"region",
        //         localField:"zone_docs.regionId",
        //         foreignField:"regionId",
        //         as:"region_docs"
        //     }
        // },
        // {
        //   $unwind:"$region_docs"
        // },
        {
            $project:{
                customerId : 1, 
                // branchId: 1,
                // branchName:"$branch_docs.branchName",
                brand:1,
                // regionId: 1,
                // regionName:"$region_docs.regionName",
                assetId : 1,
                assetName:"$asset_docs.assetName",
                assetTypeName:"$assetType_docs.assetTypeName",
                // zoneId:"$zone_docs.zoneId",
                // zoneName:"$zone_docs.zoneName",
                deviceId:1,
                deviceType:1,
                deviceName:1,
                serialNo: 1,
                simno: 1,
                status:1

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

DeviceModel.getCount =(deviceToCount)=>{
    return DeviceModel.find(deviceToCount.query).count();
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
