import mongoose from 'mongoose';

const BranchSchema = mongoose.Schema({
    clientId: {type: Number },
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
    return BranchModel.aggregate([
       {
         $lookup:
           {
             from: "zone",
             localField: "zoneId",
             foreignField: "zoneId",
             as: "zone_docs"
           }
        },
        {
            $unwind: "$zone_docs"
        },
        {
            $lookup:{
                from:"region",
                localField:"zone_docs.regionId",
                foreignField:"regionId",
                as:"region_docs"

            }
        },
        {
            $unwind:"$region_docs"
        },
        {
            $project:{
                zoneId:1,
                branchId:1,
                branchName:1,
                pincode:1,
                Address:1,
                zoneName:"$zone_docs.zoneName",
                status:1,
                clientId:1,
                regionId:"$region_docs.regionId",
                regionName:"$region_docs.regionName"

        }}
    ])
    //return BranchModel.find(dataToFind.query,dataToFind.projection);
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
