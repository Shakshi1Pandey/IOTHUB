import User from '../models/user.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
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

service.getOne=async(req,res)=>{
    let userToFind=req.params.userId;
 
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
        const savedUser = await User.addUser(userToAdd);
        logger.info('Adding user...');
        res.send({"success":true, "code":"200", "msg":"User added successfully","data":savedUser});
    }
    catch(err) {
        logger.error('Error in getting User- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in User","err":err});
    }
}

service.deleteUser = async (req, res) => {
    let userToDelete = req.body.userId;
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

export default service;
