import mongoose from 'mongoose';

const RegionSchema = mongoose.Schema({
    regionId: {type: String },
    regionName:{type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
    }, {collection : 'region'}
  );

let RegionModel = mongoose.model('regiones',RegionSchema);

RegionModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return RegionModel.find(dataToFind.query,dataToFind.projection);
}

RegionModel.getOne = (regionToFind) => {
    console.log(regionToFind," = regionToFind")
    return RegionModel.findOne(regionToFind);
}

RegionModel.addRegion = (regionToAdd) => {
    return regionToAdd.save();
}

RegionModel.removeRegion = (regionId) => {
    return RegionModel.remove({regionId: regionId});
}

export default RegionModel;
