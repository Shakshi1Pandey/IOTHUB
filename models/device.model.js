/**
 * @file(device.model.js) With Schema for device model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

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
    deviceId:{type: Number },
    deviceType:{type: String },
    deviceName:{type: String },
    serialNo: {type: Number },
    simno: {type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'device'});
DeviceSchema.plugin(AutoIncrement.plugin,{model:'device',field:'deviceId',startAt:1,incrementBy:1});

let DeviceModel = mongoose.model('device', DeviceSchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
// DeviceModel.getAll = () => {
//     return DeviceModel.aggregate([
//         {
//             $lookup:{
//                 from:"branch",
//                 localField:"branchId",
//                 foreignField:"branchId",
//                 as:"branch_doc"
                
//             }
//         },{
//             $unwind:"$branch_doc"
//         }
//         ,
//         {
//             $lookup:{
//                 from:"zone",
//                 localField:"branch_doc.zonId",
//                 foreignField:"zonId",
//                 as:"zone_doc"

//             }
//         },{
//             $unwind:"$zone_doc"
//         },
//         // {
//         //     $lookup:{
//         //         from:"asset",
//         //         localField:"assetId",
//         //         foreignField:"assetId",
//         //         as:"asset_doc"

//         //     }
//         // },{
//         //     $unwind:"$asset_doc"
//         // }
//     ])
// }

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
