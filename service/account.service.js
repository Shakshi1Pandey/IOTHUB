/**
 * @file(asset.service.js) All service realted to asset    
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Shakshi
 */


import AccountModel from '../models/account.model'
import logger from '../core/logger/app.logger' 
import msg from '../core/message/error.msg.js'
import successMsg from '../core/message/success.msg' 
import utility from '../core/utility.js'



/**
 * [service is a object ]
 * @type {Object}
 */
const service = {};

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addAccount = async (req,res)=>{
	if(!req.body.accountName){
		return res.send({success:false, code:500, msg:"accountName is missing"})
	}
	if(!req.body.clientId){
		return res.send({success:false, code:500, msg:"clientId is missing"})
	}
	var objToAdd = AccountModel({
		accountName:req.body.accountName,
		userId:req.body.clientId,
		status:"Active",
		createdAt:new Date()
	})
	try{
		var savedAccount = await AccountModel.addAccount(objToAdd);
		res.send({success:true, code:200, msg:"Successfully add"})
	}catch(error){
		res.send({success:false, code:500, msg:"Error in add account", err:error})
	}
	

}

/**
 * @description [with all the calculation before getAll function of model and after getAll]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res)=>{
	if(!req.query.clientId){
		return res.send({success:false, code:500, msg:"clientId is missing"})
	}
	try{
		var allAccount = await AccountModel.allAccount({userId:req.query.clientId});
		return res.send({success:true, code:200, msg:"Successfully found", data:allAccount});

	}catch(error){
		res.send({success:false, code:500, msg:"Error in add account", err:error})
	}
}

service.editAccount = async (req,res)=>{
	if(!req.body._id){
		return res.send({success:false, code:500, msg:"_id is missing"})
	}
	if(!req.body.status){
		return res.send({success:false, code:500, msg:"status is missing"})
	}
	try{
		var objtoUpdate={
			query:{_id:req.body._id},
			data:{$set:{status:req.body.status}}
		}
		var updatedAccount = await AccountModel.editAccount(objtoUpdate);
		return res.send({success:true, code:200, msg:"Successfully updated", data:updatedAccount});

	}catch(error){
		res.send({success:false, code:500, msg:"Error in update account", err:error})
	}
}

export default service;