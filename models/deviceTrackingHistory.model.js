/**
 * @file(deviceTrackerHistory.model.js) With Schema for deviceTrackerHistory model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';

/**
 * [DeviceTrackerHistorySchema is used for deviceTrackerHistory data validating aginst schema]
 * @type {[type]}
 */
const DeviceTrackerHistorySchema = mongoose.Schema({
    clientId : {type: Number }, 
    deviceId: {type: String } ,
    lat:{type: Number },
    lng: {type: Number },
    date: {type: Date},
    temprature: {type: String},
    deviceType: {type: String },
    workingStatus: {type: String },
    status:{type: String },
    createdAt:{type: Date,default:Date.now}
}, {collection : 'deviceTrackerHistory'});

let DeviceTrackerHistoryModel = mongoose.model('deviceTrackerHistory', DeviceTrackerHistorySchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
DeviceTrackerHistoryModel.getAll = () => {
    return DeviceTrackerHistoryModel.find({});
}

/**
 * @description [add one deviceTrackerHistory to db]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerHistoryModel.addDeviceTrackingHistory = (deviceDataToAdd) => {
    return deviceDataToAdd.save();
}

/**
 * @description [responsible for remove devices from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerHistoryModel.removeDevice = (deviceDataToDelete) => {
    return DeviceTrackerHistoryModel.remove({name: deviceDataToDelete});
}

export default DeviceTrackerHistoryModel;