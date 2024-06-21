const mongoose = require('mongoose');
//Destructure the schema object
const {Schema} =mongoose;               

const productSchema= new Schema({
name: {
    type:String,
    required:"active",
},
title: {
    type:String,
    required:"active",

},
description: {
    type:String,
    required:true,

},
quantity:{
    type:Number,
    required:true,
},
price: {
    type:Number,
    required:true,
},
expDate: {
    type: String, 
    default: Date.now()
    }
})
const ProductModel= mongoose.model("product",productSchema);

module.exports={ProductModel};