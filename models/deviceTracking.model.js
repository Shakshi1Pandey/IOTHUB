/**
 * @file(deviceTrackeing.model.js) With Schema for DeviceTracker model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 11-Jan-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';

/**
 * [DeviceTrackerSchema is used for device data validating aginst schema]
 * @type {[type]}
 */
const DeviceTrackerSchema = mongoose.Schema({
    clientId : {type: Number }, 
    deviceid: {type: String } ,
    lat:{type: Number },
    lng: {type: Number },
    date: {type: Date},
    temprature: {type: String},
    deviceType: {type: String },
    workingStatus: {type: String },
    status:{type: String },
    createdAt:{type: Date}
}, {collection : 'deviceTracker'});

let DeviceTrackerModel = mongoose.model('deviceTracker', DeviceTrackerSchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
DeviceTrackerModel.getAll = () => {
    return DeviceTrackerModel.find({});
}

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerModel.addDeviceTracker = (deviceDataToAdd) => {
    return deviceDataToAdd.save();
}

/**
 * @description [responsible for remove devices from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
DeviceTrackerModel.removeDeviceTracker = (deviceDataToDelete) => {
    return DeviceTrackerModel.remove({name: deviceDataToDelete});
}

export default DeviceTrackerModel;