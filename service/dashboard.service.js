import logger from '../core/logger/app.logger'
import mongoose from 'mongoose'
import User from '../models/user.model'
import Asset from '../models/asset.model'
import Device from '../models/device.model'
import utility from '../core/utility.js'
import successMsg from '../core/message/success.msg'

const service={}

service.getCount=async(req,res)=>{
    let clientId = utility.removeQuotationMarks(req.query.clientId);
    let userToCount={
        query:{clientId:clientId},
        projection:{}
    };
    let assetToCount={
        query:{clientId:clientId},
        projection:{}
    };
    let deviceToCount={
        query:{clientId:clientId},
        projection:{}
    };
    try{
        const getUserCount=await User.getCount(userToCount);
        const getAssetCount=await Asset.getCount(assetToCount);
        const getDeviceCount=await Device.getCount(deviceToCount);
        let data=[{"allUser":getUserCount,"allAsset":getAssetCount,"allDevice":getDeviceCount}];
        logger.info('get all user');
        res.send({"success":true,"code":"200","msg":successMsg.getUser,"data":data});
    }
    catch(err){
        logger.error('Error in getting userCount- ' + err);
		res.send({success:false, code:500, msg:msg.getUser, err:err});
    }
}

export default service;