import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-auto-increment';
AutoIncrement.initialize(mongoose);

const RegionSchema = mongoose.Schema({
    regionId: {type:Number },
    regionName:{type: String },
    clientId: {type: Number},
    status:{type: String }, 
    createAt:{type: Date},
    updatedAt:{type: Date}
    }, {collection : 'region'}
  );
  RegionSchema.plugin(AutoIncrement.plugin,{model:'region',field:'regionId',startAt:1 ,incrementBy:1 })

let RegionModel = mongoose.model('region',RegionSchema);

RegionModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return RegionModel.find(dataToFind.query,dataToFind.projection);
}

RegionModel.getOne = (regionToFind) => {
    console.log(regionToFind," = regionToFind")
    return RegionModel.findOne(regionToFind);
}

RegionModel.editRegion = (regionToUpdate) =>{
    return RegionModel.update(regionToUpdate.query,regionToUpdate.data)
}

RegionModel.addRegion = (regionToAdd) => {
    return regionToAdd.save();
}

RegionModel.removeRegion = (regionId) => {
    return RegionModel.remove({regionId: regionId});
}

export default RegionModel;
