import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";
AutoIncrement.initialize(mongoose);

const UserSchema = mongoose.Schema({
    clientId:{ type: Number },
    userId: {type: Number },
    emailId: {type: String },
    password: {type: String },
    name:{type: String },
    userTypeId: {type: Number},
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'user'});

  UserSchema.plugin(AutoIncrement.plugin,{model:'user',field:'userId',startAt:1,incrementBy:1});

let UserModel = mongoose.model('users',UserSchema);

UserModel.getAll = (dataToFind) => {
	console.log(dataToFind,"dataToFind")
    return UserModel.find(dataToFind.query,dataToFind.projection);
}

UserModel.getOne = (userToFind) => {
    console.log(userToFind," = userToFind")
    return UserModel.findOne(userToFind);
}

UserModel.addUser = (userToAdd) => {
    return userToAdd.save();
}

UserModel.editUser = (userToEdit) => {
    return UserModel.update(userToEdit.query,userToEdit.data);
}


UserModel.removeUser = (userId) => {
    return UserModel.remove({userId: userId});
}

/**
 * [Service is responsible for getting selected detail of user or client or admin]
 * @param  {[type]} user [user object contains username and password]
 * @return {[type]}      [object]
 */
UserModel.login = (user) =>{
    return UserModel.findOne({emailId:user.emailId,password:user.password},{clientId:1, userId:1, name:1, userType:1, status:1 });
}

export default UserModel;
