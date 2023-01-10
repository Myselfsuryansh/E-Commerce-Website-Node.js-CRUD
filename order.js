const express = require('express');
const { default: mongoose } = require('mongoose');
const models = require('mongoose');
let Order = require("../models/Order")
const router = express.Router();
const bodyparser = require('body-parser');


router.post("/place", async(req, res)=>{
    try{
        let body = req.body;
        let order = new Order();
        order.userid = body.data.userid;
        order.orderdate = new Date();
        order.address = body.data.address;
        order.city = body.data.city;
        order.state = body.data.state;
        order.pincode = body.data.pincode;
        order.totalamount = body.data.totalamount;
        order.shipmentamount = body.data.shipmentamount;
        order.billamount = body.data.billamount;
        order.status = "pending";
        order.products = body.data.products;
        order.save().then(result=>{
            res.end(JSON.stringify({status:"Success", data:"result"}))
        }, err=>{
            res.end(JSON.stringify({status:"Failed", data:err}))

        });


    } catch{
        res.end(JSON.stringify({status:"Failed", data:"Something went wrong"}))
    }
});

router.post("/markpaid", async(req, res)=>{
    try{
        let body = req.body;
        let order = await Order.findByIdAndUpdate(
            body.data.Id, {$set:{status:"paid"}},
            {new:true}
        );
        res.end(JSON.stringify({status:"success", data:"Payment done successfully"}));
    }
    catch{
        res.end(JSON.stringify({status:"Failed", data:"Something went wrong"}))
    }
});



module.exports = router;

