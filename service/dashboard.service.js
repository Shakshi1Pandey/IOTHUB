import logger from '../core/logger/app.logger'
import mongoose from 'mongoose'
import User from '../models/user.model'
import Asset from '../models/asset.model'
import Device from '../models/device.model'
import utility from '../core/utility.js'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg'

const service={}

service.getCount=async(req,res)=>{
    var query = {};
    if(!req.query._id){
        return res.send({success:false, code:500, msg:"_id is missing" });
    }else{
        query.registerBy = req.query._id;
    }
    if(req.query.customerId){
        query.customerId = req.query.customerId
    }
   
    let userToCount={
        query:{createdBy:req.query._id || ""},
        projection:{}
    };
    let assetToCount={
        query:query,
        projection:{}
    };
    let deviceToCount={
        query:query,
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
		return res.send({success:false, code:500, msg:msg.getUser, err:err});
    }
}

export default service;