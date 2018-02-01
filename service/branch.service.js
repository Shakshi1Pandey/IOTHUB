import Branch from '../models/branch.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
	try{
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.region){
			dataToFind.projection = {
				branchId:1
			}
		}
		const branch = await Branch.getAll(dataToFind);
        logger.info('sending all branch...');
		res.send({success:true, code:200, msg:"Found successfully", data:branch});
	}catch(err){
		logger.error('Error in getting branch- ' + err);
		res.send({success:false, code:500, msg:"Error in Branch", err:err});
	}
}

service.getOne=async(req,res)=>{
       let branchToFind=req.params.branchId;
    
    try{
        const getOneBranch=await Branch.getOne(branchToFind);
        logger.info('get one branch-' +getOneBranch);
        res.send({"success":true,"code":"200","msg":"get branch","data":getOneBranch});
    }
    catch(err){
        logger.error('Failed to get branch- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to get branch","err":err});

    }

}
service.addBranch = async (req, res) => {
    let branchToAdd = Branch({
        clientId: req.body.clientId,
        branchId: req.body.branchId,
        zoneId: req.body.zoneId,
        regionId: req.body.regionId,
        branchName: req.body.branchName,
        pinCode: req.body.pinCode,
        Address: req.body.Address,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
        if(!req.query.clientId ||!req.query.branchName||!req.query.zoneId){
            res.send({success:false, code:500, msg:"Expected params are missing", data:req.query});
        }
      
        const savedBranch = await Branch.addBranch(branchToAdd);
        logger.info('Adding branch...');
        res.send({"success":true, "code":"200", "msg":"Branch added successfully","data":savedBranch});
    }
    catch(err) {
        logger.error('Error in getting Branch- ' + err);
        res.send({"success":false, "code":"500", "msg":"Error in Branch","err":err});
    }
}

service.deleteBranch = async (req, res) => {
    let branchToDelete = req.body.branchId;
    try{
        const removedBranch = await Branch.removeBranch(branchToDelete);
        logger.info('Deleted branch-' + removedBranch);
        res.send({"success":true, "code":"200", "msg":"Branch deleted successfully","data":removedBranch});
    }
    catch(err) {
        logger.error('Failed to delete Branch- ' + err);
        res.send({"success":false, "code":"500", "msg":"Failed to delete branch","err":err});
    }
}

export default service;
