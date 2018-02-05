import mongoose from 'mongoose';

const UserSchema = mongoose.Schema({
    clientId:{ type: String },
    userId: {type: String },
    emailId: {type: String },
    password: {type: String },
    name:{type: String },
    userType: {type: String},
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
  }, {collection : 'user'});

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
