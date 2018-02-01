import mongoose from 'mongoose';

const ZoneSchema = mongoose.Schema({
    clientId: {type: String },
    zoneId: {type: String },
    regionId: {type: String },
    zoneName:{type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'zone'});

let ZoneModel = mongoose.model('zones',ZoneSchema);

ZoneModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return ZoneModel.find(dataToFind.query,dataToFind.projection);
}

ZoneModel.getOne = (zoneToFind) => {
    console.log(zoneToFind," = zoneToFind")
    return ZoneModel.findOne(zoneToFind);
}

ZoneModel.addZone = (zoneToAdd) => {
    return zoneToAdd.save();
}

ZoneModel.editZone = (zoneedit) => {
    return ZoneModel.update(zoneedit.query,zoneedit.data);
}

ZoneModel.removeZone = (zoneId) => {
    return ZoneModel.remove({zoneId: zoneId});
}

export default ZoneModel;
