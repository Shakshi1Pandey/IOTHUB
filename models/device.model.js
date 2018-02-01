/**
 * @file(device.model.js) With Schema for device model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';

/**
 * [DeviceSchema is used for device data validating aginst schema]
 * @type {[type]}
 */
const DeviceSchema = mongoose.Schema({
    clientId : {type: Number }, 
    branchId: {type: String },
    brand:{type: String },
    regionId: {type: String },
    assetId : {type: String },
    deviceId:{type: String },
    deviceType:{type: String },
    deviceName:{type: String },
    serialNo: {type: String },
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
DeviceModel.getAll = () => {
    return DeviceModel.find({});
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
