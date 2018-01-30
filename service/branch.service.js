import Branch from '../models/branch.model'
import logger from '../core/logger/app.logger'

const service = {};

service.getAll = async (req,res) =>{
	try{
		let dataToFind = {
			query:{},
			projection:{}
		};

		if(req.query.branchId){
			dataToFind.projection = {
				branchId:1,_id:0
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

service.addBranch = async (req, res) => {
    let branchToAdd = Branch({
        clientId: req.body.clientId,
        branchId: req.body.branchId,
        zoneId: req.body.zoneId,
        regionId: req.body.regionId,
        zoneName: req.body.zoneName,
        pinCode: req.body.pinCode,
        Address: req.body.Address,
        status:"Active",
        createAt: new Date(),
        updatedAt: new Date()
    });
    try {
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
