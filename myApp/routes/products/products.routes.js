const express=require("express");
const productRoutes=express.Router();
const {createProduct,allProducts, updateProduct,deleteProduct} =require("./products.controller.js");

productRoutes.post("/addProduct",createProduct);
productRoutes.get("/viewProducts",allProducts);
productRoutes.patch("/:id",updateProduct);
productRoutes.delete("/:id",deleteProduct);


module.exports= {productRoutes};