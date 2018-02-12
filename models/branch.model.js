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

let BranchModel = mongoose.model('branch',BranchSchema);

BranchModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return BranchModel.aggregate([
       { $match:dataToFind.query},{
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
                pinCode:1,
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
