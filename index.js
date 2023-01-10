const express = require("express");
const mongoose = require("mongoose");
// const cors = require('cors');
const bodyparser = require("body-parser");
const app= express();

// const { MongoGridFSChunkError } = require("mongodb");


// let app= express();
app.use(express.static("assets"));
app.use(express.json());
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));
mongoose.set('strictQuery', true);

app.use((req, res, next)=>{
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "*");
        if(req.method=="OPTIONS"){
            res.header("Access-Control-Allow-Methods", "POST", "GET", "PUT", "PATCH", "DELETE");
            return res.status(200, json({}));
        }
        next();

});


app.get("/", function(req, res){
    res.send("Welcome to E-Commerce Website");
    res.end();
});

app.listen(3000, function(){
    console.log("Back end running on http://localhost:3000/");
});

app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));

mongoose.connect('mongodb://localhost:27017/ecommerce',{
    useNewUrlParser: true,
    useUnifiedTopology:true
},(err)=>{
    if(!err){
        console.log("Connected to Database")
    } else{
        console.log("error")
    }
});
app.use(bodyparser.urlencoded({extended:false}))

// const Schema ={
//     ID: Number
// ,
// COUNTRY:{type:String},
// STATE: {type: String}
// }

// const ecommerce = mongoose.model("ECommerce", Schema)