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
const UserTypeSchema = mongoose.Schema({
    clientId : {type: Number }, 
    userType: {type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'usertype'});

let UserTypeModel = mongoose.model('usertype', UserTypeSchema);

/**
 *@description [is used for getting all data of devices from db]
 * @return {object}
 */
UserTypeModel.getAll = (dataToFind) => {
    return UserTypeModel.find(dataToFind.query,dataToFind.projection);
}

/**
 *@description [is used for getting one data of devices from db]
 * @return {object}
 */
UserTypeModel.getOne = (deviceToFind) => {
    console.log(deviceToFind," = deviceToFind")
    return UserTypeModel.findOne(deviceToFind);
}

/**
 * @description [add one device to db]
 * @param  {object}
 * @return {[object]}
 */
UserTypeModel.addUsertype = (userTypeToAdd) => {
    return userTypeToAdd.save();
}

/**
 * @description [responsible for remove devices from db based on condition]
 * @param  {object}
 * @return {[object]}
 */
UserTypeModel.removeUserType = (_id) => {
    console.log(_id)
    return UserTypeModel.remove({_id: _id});
}

/**
 * @description [make used by other module]
 */
export default UserTypeModel;
