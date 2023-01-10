const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        name:{type:String, require:true},
        srno:{type:Number, require:true},
        imagepath:{type:String}
    }
);
let productcategory = mongoose.model("productcategory", schema);
module.exports = productcategory;