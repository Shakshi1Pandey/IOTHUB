/**
 * @file(branch.service.js) All service related to branch    
 * @author Purti Singh <purti.singh20@gmail.com>
 * @version 1.0.0
 * @lastModifed 07-Feb-2018
 * @lastModifedBy Purti
 */

import Branch from '../models/branch.model'
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
 * @description [calculation for getting all the branches ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.getAll = async (req,res) =>{ 

    if(!req.query.clientId){
        res.send({success:false, code:500, msg:msg.clientId});
    }
    let clientId = utility.removeQuotationMarks(req.query.clientId);
	try{
		let dataToFind = {
			query:{clientId:clientId},
			projection:{}
		};

		if(req.query.region){
			dataToFind.projection = {
				branchId:1
			}
		}
		const branch = await Branch.getAll(dataToFind);
        logger.info('sending all branch...');
		res.send({success:true, code:200, msg:successMsg.allBranch, data:branch});
	}catch(err){
		logger.error('Error in getting branch- ' + err);
		res.send({success:false, code:500, msg:msg.getBranch, err:err});
	}
}

/**
 * @description [calculation for getting one branch ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.getOne=async(req,res)=>{

    if(!req.query.clientId){
        res.send({success:false, code:500, msg:msg.clientId});
    }

       let branchToFind={branchId:req.params.branchId}
    
    try{
        const getOneBranch=await Branch.getOne(branchToFind);
        logger.info('get one branch-' +getOneBranch);
        res.send({"success":true,"code":"200","msg":successMsg.getOneBranch,"data":getOneBranch});
    }
    catch(err){
        logger.error('Failed to get branch- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.getBranch,"err":err});

    }

}

/**
 * @description [calculation for adding all the branches ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addBranch = async (req, res) => {

    if(!req.body.clientId){
        res.send({success:false, code:500, msg:msg.clientId});
    }
    if(!req.body.branchName){
        res.send({success:false, code:500, msg:msg.branchName});
    }
    if(!req.body.zoneId){
        res.send({success:false, code:500, msg:msg.zoneId});
    }
    let clientId = utility.removeQuotationMarks(req.body.clientId);

    let branchToAdd = Branch({
        clientId: clientId,
        zoneId: req.body.zoneId,
        branchName: req.body.branchName,
        pinCode: req.body.pinCode,
        Address: req.body.Address,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        if(!req.body.clientId ||!req.body.branchName||!req.body.zoneId){
            res.send({success:false, code:500, msg:msg.param});
        }
      
        const savedBranch = await Branch.addBranch(branchToAdd);
        logger.info('Adding branch...');
        res.send({"success":true, "code":"200", "msg":successMsg.addBranch,"data":savedBranch});
    }
    catch(err) {
        logger.error('Error in getting Branch- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addBranch,"err":err});
    }
}

/**
 * @description [calculation for editing all the branches ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.editBranch = async (req,res) =>{

    if(!req.body._id){
        res.send({success:false, code:500, msg:msg._id});
    }
    if(!req.body.branchName){
        res.send({success:false, code:500, msg:msg.branchName});
    }

    let branchToEdit = {
        branchName: req.body.branchName,
        pinCode: req.body.pinCode,
        Address: req.body.Address,
        status:req.body.status,
        updatedAt: new Date()
    };
    let branchedit = {
        query:{"_id":req.body._id},
        data:{"$set":branchToEdit}
        
    };
    try {
        const editedBranch = await Branch.editBranch(branchedit);
        logger.info('Adding branch...');
        console.log('Adding branch...');
        res.send({"success":true, "code":"200", "msg":successMsg.editBranch,"data":editedBranch});
    }catch(err) {
        logger.error('Error in getting Branch- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editBranch,"err":err});
    }
}

/**
 * @description [calculation for deleting all the branches ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.deleteBranch = async (req, res) => {

    if(!req.body._id){
        res.send({success:false, code:500, msg:msg._id});
    }
    
    let branchToDelete = req.body.branchId;
    try{
        const removedBranch = await Branch.removeBranch(branchToDelete);
        logger.info('Deleted branch-' + removedBranch);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteBranch,"data":removedBranch});
    }
    catch(err) {
        logger.error('Failed to delete Branch- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteBranch,"err":err});
    }
}

export default service;
