const express = require("express");
const bodyparser = require("body-parser");
let router = express.Router();
let User = require("../models/User");
const Order = require("../models/Order");


router.post("/login", async(req, res)=>{
    let body = req.body;
    let status = "";
    if(body.data.username == "admin" && body.data.password == "admin")
        status = "success";
    else
        status = "failed";
    
        let data = {data:{status:status}};
        res.end(JSON.stringify(data))

});

router.post("/users", async(req, res)=>{
    try{
        let users = await User.find();
        res.end(JSON.stringify({status:"success", data: users }));
    }
    catch{
        res.end(JSON.stringify({status:"Failed", data:"Something went wrong"}))
    }
});

router.post("/orders", async(req, res)=>{
    try{
        let body = req.body;
        if(body.data.userid == ""){
            let order = await Order.find();
            res.end(JSON.stringify({status:"success", data:order}))
        }
        else{
            let order = await Order.find({userid:body.data.userid});
            res.end(JSON.stringify({status:"Success", data: order}))
        }
        // console.log(data)
    }
    catch{
        res.end(JSON.stringify({status:"Failed", data:"Something went wrong"}))
    }
})

module.exports = router;