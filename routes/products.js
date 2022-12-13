const express = require('express');
const mongoose= require('mongoose');
const costumer = require("../middeleware/costumer");
const admin = require("../middleware/admin");
const anonymouse = require("../middleware/anonymouse");
const Joi = require('joi')
Joi.objectId = require('joi-objectid')(Joi)
const {validate, Product} = require("../Model/products");
const router = express.Router();


router.get("/",[anonymouse,costumer,admin],async(req,res)=>{
    let result =await Product.find().populate("categories","name -_id")
    res.send(result);
    
});



router.get("/:id",async(req,res)=>{
    console.log(req.params.id)
    const result =await Product.findById(req.params.id).populate("categories","name -_id");
    console.log(result)
    if(!result){
         return res.status(404).send("Product not found");
    }
    res.send(result);
});



router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    console.log(error)
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let result = new Product({ 
        name:req.body.name,
        categories:req.body.categoryId,
        description:req.body.description,
        price:req.body.price,
        avilableInStock:req.body.avilableInStock,
     });
    
    result = await result.save();
    
    res.send(result);
});


router.put("/:id",async(req,res)=>{
    
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const result = await Product.findByIdAndUpdate(req.params.id,
        {$set :{
            name:req.body.name,
            categories:req.body.categoryId,
            description:req.body.description,
            price:req.body.price,
            avilableInStock:req.body.avilableInStock,
      
            }},
            {new:true});
    if(!result){
        return res.status(404).send("Product not found");
    };

    res.send(result);
   });


router.delete("/:id",async(req,res)=>{
    const result = await Product.findByIdAndDelete(req.params.id);
    if(!result){
        return res.status(404).send("Product not found");
    };

    res.send(result);
   });


module.exports= router;
