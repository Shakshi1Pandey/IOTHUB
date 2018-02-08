/**
 * @file(usertype.service.js) All service realted to asset
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 15-Jan-2018
 * @lastModifedBy Deepak
 */


import userTypeConfig from '../models/usertype.model'
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

    if(!req.query.clientId){
        res.send({success:false, code:500, msg:"clientId missing"});
    }

	try{
        
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.clientId){
			dataToFind.projection = {
				userType:1,status:1
			}
            dataToFind.query = {
                clientId:req.query.clientId
            }
		}
        console.log(dataToFind)
		const usertype = await userTypeConfig.getAll(dataToFind);
        logger.info('sending all usertype...');
		res.send({success:true, code:200, msg:"Found successfully", data:usertype});
	}catch(err){
		logger.error('Error in getting usertype- ' + err);
		res.send({success:false, code:500, msg:"Error in userType ", err:err});

	}
}
/**
 * @description [calculation before update Device to db ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.editUsertype = async (req, res) => {
    if(req.body.clientId=='')
    {
        res.send({"success":false, "code":"500", "msg":"clientId missing"});
    }
    if(req.body.userType=='')
    {
        res.send({"success":false, "code":"500", "msg":"userType missing"});
    }

    if(!req.body._id)
    {
        res.send({"success":false, "code":"500", "msg":" _id missing"});
    }
    let userTypeToUpdate = {
        query:{_id:req.body._id},

        data:{
            $set:{
                userType: req.body.userType,
                status: req.body.status || "Active",
                updatedAt: new Date()
            }
        }
    };
    try {
        const savedUsertype = await userTypeConfig.editUsertype(userTypeToUpdate);
        logger.info('Updating user type ...');
        res.send({"success":true, "code":"200", "msg":"Usertype updated successfully","data":savedUsertype});
    }
    catch(err) {
        logger.error('Error in updating Usertype- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Usertype","err":err});
    }
}

/**
 * @description [calculation before add Device to db and after adding asset ]
 * @param  {[object]}
 * @param  {[object]}
 * @return {[object]}
 */

service.addUsertype = async (req, res) => {
    if(!req.body.clientId)
    {
        res.send({"success":false, "code":"500", "msg":"clientId missing"});
    }
    if(!req.body.userType)
    {
        res.send({"success":false, "code":"500", "msg":"userType missing"});
    }
    let userTypeToAdd = userTypeConfig({
        clientId : req.body.clientId,
        userType: req.body.userType,
        status: "Active",
        createAt: new Date()
    });
    try {
        const savedUsertype = await userTypeConfig.addUsertype(userTypeToAdd);
        logger.info('Adding user type ...');
        res.send({"success":true, "code":"200", "msg":"Usertype added successfully","data":savedUsertype});
    }
    catch(err) {
        logger.error('Error in getting Usertype- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Usertype","err":err});
    }
}


/**
 * @description [calculation before delete Device to db and after delete Device]
 * @param  {[type]}
 * @param  {[type]}
 * @return {[type]}
 */
service.deleteUsertype = async (req, res) => {

    if(!req.body._id)
    {
        res.send({"success":false, "code":"500", "msg":"_id missing"});
    }
    let usertypeToDelete = req.body._id;
    
    console.log(usertypeToDelete);
    try{
        const removedUsertype = await userTypeConfig.removedUsertype(usertypeToDelete);
        logger.info('Deleted user type- ' + removedUsertype);
        res.send({"success":true, "code":"200", "msg":"usertype deleted successfully","data":removedUsertype});
    }
    catch(err) {
        logger.error('Failed to delete usertype- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete usertype","err":err});
    }
}

export default service;
