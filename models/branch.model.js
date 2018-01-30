import mongoose from 'mongoose';

const BranchSchema = mongoose.Schema({
    clientId: {type: String },
    branchId: {type: String },
    zoneId: {type: String },
    regionId: {type: String },
    branchName:{type: String },
    pinCode:{type: String },
    Address:{ type: String  },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'branch'});

let BranchModel = mongoose.model('branches',BranchSchema);

BranchModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return BranchModel.find(dataToFind.query,dataToFind.projection);
}

BranchModel.getOne = (branchToFind) => {
    console.log(branchToFind," = branchToFind")
    return BranchModel.findOne(branchToFind);
}

BranchModel.addBranch = (branchToAdd) => {
    return branchToAdd.save();
}

BranchModel.removeBranch = (branchId) => {
    return BranchModel.remove({branchId: branchId});
}

export default BranchModel;
