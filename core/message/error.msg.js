/**
 * @file(error.msg.js) All service realted to errors    
 * @author Purti Singh <purti.singh20@gmail.com>
 * @lastModifed 07-Feb-2018
 * @lastModifedBy Purti
 */


 /**
 * [service is a object ]
 * @type {Object}
 */

const msg = {};


/******                            */
/** Device related error messages */
/******                          */


/** Error message for adding device*/
msg.addDevice ="Unable to add device"


/** Error message for editing device*/
msg.editDevice ="Unable to edit device"


/** Error message for deleting device*/
msg.deleteDevice ="Unable to delete device"


/** Error message for getting device*/
msg.getDevice ="Unable to get device"


/** Error message for device name*/
msg.deviceName = "Device name is missing"


/** Error message for device id*/
msg.deviceId = "Device id is missing"


/** Error message for expected parameters*/
msg.param ="Expected params are missing"


/** Error message for client id*/
msg.clientId ="Client Id is missing"


/** Error message for _id*/
msg._id ="_id is missing"


/******                          */
/** Asset related error messages */
/******                          */


/** Error message for getting assets*/
msg.getAsset ="Unable to get asset"


/** Error message for asset id*/
msg.assetId ="asset id is missing"

 
/** Error message for adding assets*/
msg.addAsset ="Unable to add asset"


/** Error message for editing assets*/
msg.editAsset ="Unable to edit asset"


/** Error message for deleting assets*/
msg.deleteAsset ="Unable to delete asset"


/******                          */
/** AssetType related error messages */
/******                          */


/** Error message for adding assettype*/
msg.addAssetType ="Unable to add assettype"


/** Error message for adding assettype*/
msg.assetTypeId = "AssetType id is missing"


/** Error message for getting assettype*/
msg.getAssetType ="Unable to get assettype"


/** Error message for deleting assettype*/
msg.deleteAssetType ="Unable to delete assettype"


/** Error message for editing assettype*/
msg.editAssetType ="Unable to edit assettype"


/******                            */
/** Branch related error messages */
/******                          */


/** Error message for branch name */
msg.branchName = "Branch Name is missing"


/** Error message for adding branch*/
msg.addBranch ="Unable to add branch"


/** Error message for getting branch*/
msg.getBranch ="Unable to get branch"


/** Error message for deleting branch*/
msg.deleteBranch ="Unable to delete branch"


/** Error message for editing branch*/
msg.editBranch ="Unable to edit branch"


/******                                    */
/** Device tracking related error messages */
/******                                   */


/** Error message for adding Device tracking*/
msg.addDeviceTracking ="Unable to add branch"


/** Error message for getting Device Tracking */
msg.getDeviceTracking ="Unable to get Device tracking"


/** Error message for deleting Device Tracking */
msg.deleteDeviceTracking ="Unable to delete Device tracking"


/** Error message for editing Device Tracking */
msg.editDeviceTracking ="Unable to edit Device tracking"


/******                                    */
/** Zone related error messages */
/******                                   */


/** Error message for zone id*/
msg.zoneId ="Zone id is missing"
export default msg;
