const express = require('express');
const mongoose= require('mongoose');
const joi = require('joi');
const {validate,Category} = require("../Model/categories");
const router = express.Router();


router.get("/",async(req,res)=>{
    let result =await Category.find()
    res.send(result);
    
});



router.get("/:id",async(req,res)=>{
    console.log(req.params.id)
    const result =await Category.findById(req.params.id);
    console.log(result)
    if(!result){
         return res.status(404).send("category not found");
    }
    res.send(result);
});



router.post("/", async (req, res) => {
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    let result = new Category({ name: req.body.name });
    console.log( req.body.name)
    result = await result.save();
    res.send(result);
});


router.put("/:id",async(req,res)=>{
    
    const { error } = validate(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    const result = await Category.findByIdAndUpdate(req.params.id,{$set :{name:req.body.name}},{new:true});
    if(!result){
        return res.status(404).send("category not found");
    };

    res.send(result);
   });


router.delete("/:id",async(req,res)=>{
    const result = await Category.findByIdAndDelete(req.params.id);
    if(!result){
        return res.status(404).send("category not found");
    };

    res.send(result);
   });


module.exports= router;