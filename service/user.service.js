/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */

import User from '../models/user.model'
import logger from '../core/logger/app.logger'
import successMsg from '../core/message/success.msg'
import msg from '../core/message/error.msg.js'
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

service.getAll = async (req,res) =>{
    if(!req.query.clientId){
        res.send({"success":false,"code":"500","msg":msg.clientId});
    }
	try{
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.userId){
			dataToFind.projection = {
				userId:1
			}
		}
		const user = await User.getAll(dataToFind);
        logger.info('sending all user...');
		res.send({success:true, code:200, msg:successMsg.allUser, data:user});
	}catch(err){
		logger.error('Error in getting user- ' + err);
		res.send({success:false, code:500, msg:msg.getUser, err:err});
	}
}

/**
 * @description  [Get one user details from db]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
service.getOne=async(req,res)=>{
    let userToFind={
        userId:req.query.userId}
    console.log(req.query.userId);
 
 try{
    
     const getOneUser=await User.getOne(userToFind);
     logger.info('get one user-' +getOneUser);
     res.send({"success":true,"code":"200","msg":successMsg.getOneUser,"data":getOneUser});
 }
 catch(err){
     logger.error('Failed to get user- ' + err);
     res.send({"success":false, "code":"500", "msg":msg.getUser,"err":err});

 }

}

/**
 * @description [calculation before add user to db and after adding users ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addUser = async (req, res) => {
    let clientId = utility.removeQuotationMarks(req.body.clientId);

    let userToAdd = User({

		clientId: clientId,
	    emailId: req.body.emailId,
	    password: req.body.password,
	    name: req.body.name,
	    userTypeId: req.body.userTypeId,
        status:req.body.status || "Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        if(!req.body.clientId || !req.body.userTypeId|| !req.body.name || !req.body.password || !req.body.emailId){
            res.send({"success":false, "code":"500","msg":msg.param});
        }
        const savedUser = await User.addUser(userToAdd);
        logger.info('Adding user...');
        res.send({"success":true, "code":"200", "msg":successMsg.addUser,"data":savedUser});
    }
    catch(err) {
        logger.error('Error in getting User- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.addUser,"err":err});
    }
}

service.editUser = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":msg._id})
    }
    let userEdit={
        status:req.body.status,
        updatedAt: new Date()
    }
    let userToEdit={
        query:{"_id":req.body._id},
        data:{"$set":userEdit}
    };
    try{
        const editUser= await User.editUser(userToEdit);
        logger.info("update user");
        console.log("update user");
        res.send({"success":true,"code":200,"msg":successMsg.editUser,"data":editUser});

    }
    catch(err){
        logger.error('Error in getting user- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.editUser,"err":err});
    }
}

service.deleteUser = async (req, res) => {
    let userToDelete = req.body.userId;
    if(!req.body.userId){
        ({"success":false,"code":"500","msg":msg.userId });
    }
    try{
        const removedUser = await User.removeUser(userToDelete);
        logger.info('Deleted user-' + removedUser);
        res.send({"success":true, "code":"200", "msg":successMsg.deleteUser,"data":removedUser});
    }
    catch(err) {
        logger.error('Failed to delete User- ' + err);
        res.send({"success":false, "code":"500", "msg":msg.deleteUser,"err":err});
    }
}

/**
 * @description [App login functionality]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */

service.login = async (req, res) =>{

    try{
        if(!req.body.emailId){
            res.send({success:false, code:500, msg:msg.emailId});
        }
        if(!req.body.password){
            res.send({success:false, code:500, msg:msg.password})
        }
        const loggedUser = await User.login(req.body);
        console.log(loggedUser, "loggedUser")
        if(loggedUser && loggedUser.name ){
            res.send({success:true, code:200, msg:successMsg.loginUser, data:loggedUser })
        }else{
            res.send({success:false, code:500, msg:"EmailId or password does not match"})
        }
    }catch(error){
        res.send({success:false, code:500, msg:msg.login, err:error})
    }
}
export default service;
