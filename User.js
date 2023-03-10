const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const schema = new Schema(
    {
        name:{type:String, required:true},
        email:{type:String, require:true},
        mobileno:{type:String, required:true},
        password:{type:String, required:true}
    }
);

let User = mongoose.model("users", schema);

module.exports = User;