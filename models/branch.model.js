import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-auto-increment';
AutoIncrement.initialize(mongoose);

const BranchSchema = mongoose.Schema({
    clientId: {type: Number },
    branchId: {type: Number },
    zoneId: {type: Number },
    regionId: {type: Number },
    branchName:{type: String },
    pinCode:{type: Number },
    Address:{ type: String  },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : 'branch'});

BranchSchema.plugin(AutoIncrement.plugin,{model:'branch',field:'branchId',startAt:1 ,incrementBy:1 })

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

BranchModel.editBranch = (branchedit) => {
    return BranchModel.update(branchedit.query,branchedit.data);
}
export default BranchModel;
