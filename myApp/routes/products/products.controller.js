const { default: mongoose } = require("mongoose");
const { ProductModel } = require("./products.model");


//Add products
const createProduct = async (req, res) => {
    try {
        const { name, title, description, quantity, price, expDate } = req.body;
        if (!name || !title || !description || !quantity || !price || !expDate) {
            return res.status(400).json({ message: "fill all fields" });
        }
        const newProduct = new ProductModel({
            name, title, description, quantity, price, expDate
        });
        await newProduct.save();
        return res.status(200).json({ message: "New product added succefully", data: newProduct });
    } catch (error) {
        return res.status(500).json({ message: "server error" });

    }
};

//view all products----------------------------------------------------------------------------------------

const allProducts = async (req, res) => {
    try {
        const products = await ProductModel.find();
        return res.status(200).json({ message: "list of all products fetched successfully", data: products })

    } catch (error) {
        return res.status(500).json({ message: "server error" });

    }
};

//Update info of product--------------------------------------------------------------------------------------------

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("all fileds required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid product id");
        }
        const products = await ProductModel.findById(id);
        if (!products) {
            return res.status(404).send("Product not found");
        }
        const { name, title, description, quantity, price, expDate } = req.body;
        const updatedProductInfo = await ProductModel.findByIdAndUpdate(
            id,
            { name, title, description, quantity, price, expDate },
            { new: true },
        );
        return res.status(200).json({
            message: "Product details updated succesfully",
            data: updatedProductInfo,
        });

    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Server failed" });
    }
};

//Delete Product-----------------------------------------------------------------------------------------

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send("All feilds are required");
        }
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).send("Invalid Product id");
        }
        const products = await ProductModel.findById(id);
        if (!products) {
            return res.status(404).send("product not found");
        }
        await ProductModel.findByIdAndDelete(id);
        return res.status(200).send("Product deleted successfully");
    } catch (error) {
        console.error("error", error);
        return res.status(500).json({ message: "Server failed" });
    }
};

module.exports = { createProduct, allProducts, updateProduct, deleteProduct }