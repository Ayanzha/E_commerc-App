const express = require('express');
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const costumer = require("../middeleware/costumer");
const admin = require("../middleware/admin");
const anonymouse = require("../middleware/anonymouse");
const {mongoose,ObjectID, connections}= require('mongoose');
const {validate, Order} = require("../Model/order");
const router = express.Router();



router.get("/",admin, async (req, res) => {
    let result = await Order.find();
        if(!result){
            return res.status(404).send("Order not found");
        };
        res.send(result);
        })




router.post("/pending",[costumer,admin], async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let order = new Order({product:req.body.product,})
        order = await order.save();   
        res.send(totalPrice(order));
    let user = await User.update({ email: req.body.email },
        {$push:
            {orders:order._id}  
        }); 
        user = await user.save()
        })




router.put("/accepted/:id",admin,async(req,res)=>{

    let result = await Order.findById(req.params.id);
    if(!result){
        return res.status(404).send("Order not found");
    };
    if(result.statuses=="pending"){
        console.log(Order.schema.path("statuses").enumValues[1])

        result.statuses=Order.schema.path("statuses").enumValues[1];
        }
        result = await result.save();


    res.send(result);
    });




router.put("/rejected/:id",admin,async(req,res)=>{

    let result = await Order.findById(req.params.id);
    if(!result){
        return res.status(404).send("Order not found");
    };
    if(result.statuses=="pending"){
        console.log(Order.schema.path("statuses").enumValues[1])

        result.statuses=Order.schema.path("statuses").enumValues[2];
        }
        result = await result.save();


    res.send(result);
    });


router.put("/canceled/:id",costumer,async(req,res)=>{

    let result = await Order.findById(req.params.id);
    if(!result){
        return res.status(404).send("Order not found");
    };

    if(result.statuses=="pending"){
        let user = await User.update({ email: req.body.email },
            {$pullAll: {
                orders:req.params.id
            }  
            }); 
            user = await user.save()
        result.statuses=Order.schema.path("statuses").enumValues[2]    
            
    }
    result = await result.save();


    res.send(result);
    });


async function totalPrice(order) {
    let result = await Order.findById(order._id).populate("product","price -_id");
    let  totalprice = 0
    result.product.forEach(element => {
    totalprice=element.price+totalprice
    });
    result.totalprice=totalprice
    result = await result.save()
    return resultt;
    
}
        
    


module.exports= router;
