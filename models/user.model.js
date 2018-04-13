import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const UserSchema = mongoose.Schema({
    parentId:{type:String},
    token:{type:String},
    salt:{type:String},
    temp_str:{type:String},
    userId: {type: Number },
    emailId: {type: String , index:{unique:true} },
    password: {type: String },
    name:{type: String },
    roleId: {type: String},
    address:{type: String },
    sector:{type: String },
    city:{type: String },
    state:{type: String },
    country:{type: String },
    status:{type: String },
    customerIds:[{type:String}],
    childIds:[{type:String}],
    locations:[{
        country:{type:String},
        state:{type:String},
        city:{type:String},
        area:{type:String}
    }],
    module:[{               //Permission for user
        name:{type:String}, //Asset or Device or Coustmer or User, may be all
        permission:[{type:String}] // GET or POST or PUT or DELETE, may be all
    }],
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'user'});

  UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let UserModel = mongoose.model('users',UserSchema);

UserModel.getAll = (dataToFind) => {
    console.log(dataToFind,"dataToFinddataToFind")
   return UserModel.aggregate([
    { $match: dataToFind.query},
    {
      $lookup:{
        from:"usertype",
        localField:"userTypeId", 
        foreignField:"userTypeId",
        as:"userType_docs"
      }

    },
    { 
      $unwind:"$userType_docs"
    },
    {
        $project:{
            clientId:1,
            userId:1,
            emailId: 1,
            name:1,
            userTypeId:1 , 
            customerIds:1,  
            locations:1,        
            userType:"$userType_docs.userType",          
            status:1

        }
    }
   ]);
}
UserModel.getOne = (userToFind) => {
    console.log(userToFind," = userToFind")
    return UserModel.findOne(userToFind);
}
 
UserModel.addUser = (userToAdd) => {
    return userToAdd.save();
}

UserModel.editUser = (userToEdit) =>{
    console.log(userToEdit,"hiiiii");
    return UserModel.update(userToEdit.query,userToEdit.data);
}


UserModel.removeUser = (userId) => {
    return UserModel.remove({userId: userId});
}

UserModel.getCount = (userToCount)=>{
    
    return UserModel.find(userToCount.query).count();
}

/**
 * [Service is responsible for getting selected detail of user or client or admin]
 * @param  {[type]} user [user object contains username and password]
 * @return {[type]}      [object]
 */
UserModel.login = (user) =>{
    return UserModel.findOne({emailId:user.emailId},{});
}

UserModel.forgetPassword = (user)=>{
    return UserModel.find({emailId:user.emailId});
}
UserModel.forgetPasswordReset=(user)=>{
    return UserModel.find({emailId:user.emailId});
}
UserModel.changePassword=(user)=>{
    return UserModel.find({emailId:user.emailId});
}
// UserModel.update=(userToEdit)=>{
//     return UserModel.update(userToEdit.query,userToEdit.set);
// }

export default UserModel;
