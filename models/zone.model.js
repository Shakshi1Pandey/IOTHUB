import mongoose from 'mongoose';
import AutoIncrement from 'mongoose-auto-increment';
AutoIncrement.initialize(mongoose);

const ZoneSchema = mongoose.Schema({
    clientId: {type: Number },
    zoneId: {type: Number },
    regionId: {type:Number },
    zoneName:{type: String },
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'zone'});
  ZoneSchema.plugin(AutoIncrement.plugin,{model:'zone',field:'zoneId',startAt:1,incrementBy:1});

let ZoneModel = mongoose.model('zones',ZoneSchema);

ZoneModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
   return ZoneModel.aggregate([
   {
     $lookup:
       {
         from: "region",
         localField: "regionId",
         foreignField: "regionId",
         as: "region_docs"
       }
    },
    {
        $unwind: "$region_docs"
    },
    {$project:{
        zoneId:1,
        zoneName:1,
        status:1,
        clientId:1,
        regionId:1,
        regionId:1,
        regionName:"$region_docs.regionName"

    }}
])

    //return ZoneModel.find(dataToFind.query,dataToFind.projection);
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
