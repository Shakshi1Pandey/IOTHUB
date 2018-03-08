/**
 * @file(account.model.js) With Schema for account model and all the db query function 
 * @author Shakshi Pandey <shakshi.kumari@limitlessmobile.com>
 * @version 1.0.0
 * @lastModifed 8-Feb-2018
 * @lastModifedBy Shakshi
 */

import mongoose from 'mongoose';
import AutoIncrement from "mongoose-auto-increment";

/**
 * [AccountSchema is used for account data validating aginst schema]
 * @type {[type]}
 */ 
const AccountSchema = mongoose.Schema({
    userId:{type:String},
    accountName:{type:String},
    status:{type: String },
    createAt:{type: Date},
    updatedAt:{type: Date}
}, {collection : ' account'});

let AccountModel = mongoose.model(' account', AccountSchema);