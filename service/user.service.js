/**
 * @file(user.service.js) All service realted to user  
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 5-Feb-2018
 * @lastModifedBy Shakshi
 */
import User from '../models/user.model'
import logger from '../core/logger/app.logger'


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
    // if(!req.query.clientId){
    //     res.send({"success":false,"code":"500","msg":"clientId is missing","data":req.query});
    // }
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
		res.send({success:true, code:200, msg:"user found successfully", data:user});
	}catch(err){
		logger.error('Error in getting user- ' + err);
		res.send({success:false, code:500, msg:"Error in User", err:err});
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
     res.send({"success":true,"code":"200","msg":"get user","data":getOneUser});
 }
 catch(err){
     logger.error('Failed to get user- ' + err);
     res.send({"success":false, "code":"500", "msg":"Failed to get user","err":err});

 }

}

/**
 * @description [calculation before add user to db and after adding users ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */
service.addUser = async (req, res) => {
    let userToAdd = User({

		clientId: req.body.clientId,
	    userId: req.body.userId,
	    emailId: req.body.emailId,
	    password: req.body.password,
	    name: req.body.name,
	    userType: req.body.userType,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        if(!req.body.clientId || !req.body.userType|| !req.body.name || !req.body.password || !req.body.emailId){
            res.send({"success":false, "code":"500","msg":"Expected params are missing","data":req.body});
        }
        const savedUser = await User.addUser(userToAdd);
        logger.info('Adding user...');
        res.send({"success":true, "code":"200", "msg":"User added successfully","data":savedUser});
    }
    catch(err) {
        logger.error('Error in getting User- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in User","err":err});
    }
}

service.editUser = async(req,res)=>{
    if(!req.body._id){
        res.send({"success":false,"code":500,"msg":"user_id is missing", data:req.query})
    }
    let userEdit={
        emailId: req.body.emailId,
        password: req.body.password,
        name: req.body.name,
        userType: req.body.userType,
        status:req.body.status,
        createAt: new Date(),


    }
    let userToEdit={
        query:{"_id":req.body._id},
        data:{"$set":userEdit}
    };
    try{
    const editUser= await User.editUser(userToEdit);
    logger.info("update user");
    console.log("update user");
    res.send({"success":true,"code":200,"msg":"update user","data":editUser});

    }
    catch(err){
        logger.error('Error in getting user- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in user edit","err":err});
    }
}

service.deleteUser = async (req, res) => {
    let userToDelete = req.body.userId;
    if(!req.body.userId){
        ({"success":false,"code":"500","msg":"user id is missing "});
    }
    try{
        const removedUser = await User.removeUser(userToDelete);
        logger.info('Deleted user-' + removedUser);
        res.send({"success":true, "code":"200", "msg":"User deleted successfully","data":removedUser});
    }
    catch(err) {
        logger.error('Failed to delete User- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete user","err":err});
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
            res.send({success:false, code:500, msg:"EmailId is missing"});
        }
        if(!req.body.password){
            res.send({success:false, code:500, msg:"password is missing"})
        }
        const loggedUser = await User.login(req.body);
        console.log(loggedUser, "loggedUser")
        if(loggedUser && loggedUser.name ){
            res.send({success:true, code:200, msg:"successfully login", data:loggedUser })
        }else{
            res.send({success:false, code:500, msg:"EmailId or password does not match"})
        }
    }catch(error){
        res.send({success:false, code:500, msg:"Unable to process request", err:error})
    }
}
export default service;
