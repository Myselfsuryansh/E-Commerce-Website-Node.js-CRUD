const express = require('express');
const bodyparser = require('body-parser');
let user = require('../models/User');
const { model } = require('mongoose');
const User = require('../models/User');
const Order = require("../models/Order")


let router = express.Router();

router.post("/register", async(req, res)=>{
    try{
        let body = req.body;
        let user = new User();

        users = await User.find({email:body.data.email});
        if(users.length !=0)
        {
            res.end(JSON.stringify({status:"Failed", dta:"Email already exist"}));
        }
        users = await User.find({mobileno:body.data.mobileno})
        if(users.length !=0)
        {
            res.end(JSON.stringify({status:"Failed", data:"mobileno already exist"}));
        }


        user.name = body.data.name;
        user.email = body.data.email;
        user.mobileno = body.data.mobileno;
        user.password = body.data.password;
        user.save().then(result=>{
            res.end(JSON.stringify({status:"Success", data:result}));
        }, err=>{
            res.end(JSON.stringify({status:"Failed", data:err}))
        });
    } catch{
        res.end(JSON.stringify({status:"Failed", data:"Something went wrong"}))
    }

});

router.post("/login", async(req, res)=>{
    try{
        let body= req.body;
        let user = await User.findOne({email:body.data.email});
        if(user == null)
        {
            res.end(JSON.stringify({status:"Failed", data:"Email Does not exist"}))
        }
        else{
            if(user.password == body.data.password)
            {
                res.end(JSON.stringify({status:"Success", data:"user"}))
            }else{
                res.end(JSON.stringify({status:"Failed", data:"Invalid Password"}))
            }
        }
    } catch{
        res.end(JSON.stringify({STATUS:"Failed", data:"Something went wrong"}))
    }
    
});
router.post("/orders", async(req, res)=>{
    try{
        let body = req.body;
        if(body.data.userid == ""){
            let orders = await Order.find();
            res.end(JSON.stringify({status:"Success", data:orders}))

        }else{
            let orders = await Order.find({userid:body.data.userid});
            res.end(JSON.stringify({status:"Success", data:orders}))
        }
    } catch{
        res.end(JSON.stringify({status:"failed", data:"Something went wrong"}))
    }
});






module.exports = router;