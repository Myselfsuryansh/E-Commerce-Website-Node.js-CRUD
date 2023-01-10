const mongoose = require('mongoose');
let Schema = mongoose.Schema;
let schema = new Schema(
    {
        pcid:{type:String, require: true},
        name:{type:String, require: true},
        description:{type:String, require: true},
        specification:{type:String, require: true},
        mrp:{type:Number, require:true},
        price:{type:Number, require:true},
        varieties:[],
        instock:{type:String, require: true},
        isactive:{type:String, require: true},
        imagepath:{type:String}
    }
);
let Product = mongoose.model("products", schema);
module.exports = Product;
