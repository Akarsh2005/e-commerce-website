import productModel from "../models/productModel.js";
import merchantModel from "../models/merchantModel.js"; // Import merchant model
import fs from 'fs';

// List all products
const listProduct = async (req, res) => {
    try {
        const products = await productModel.find({}).populate('merchantId'); // Changed from restaurantId to merchantId
        res.json({ success: true, data: products });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving products" });
    }
};

// Add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, merchantId } = req.body; // Changed from restaurantId to merchantId

        // Check if merchant exists
        const merchant = await merchantModel.findById(merchantId); // Changed from restaurant to merchant
        if (!merchant) {
            return res.status(404).json({ success: false, message: "Merchant not found" }); // Changed from Restaurant to Merchant
        }

        let image_filename = req.file ? `${req.file.filename}` : null;

        const product = new productModel({
            name,
            description,
            price,
            category,
            image: image_filename,
            merchantId // Changed from restaurantId to merchantId
        });

        await product.save();
        res.json({ success: true, message: "Product Added" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error adding product" });
    }
};

// Delete product
const removeProduct = async (req, res) => {
    try {
        const { id } = req.body;

        const product = await productModel.findById(id);
        if (!product) {
            return res.status(404).json({ success: false, message: "Product not found" });
        }

        if (product.image) {
            fs.unlink(`uploads/${product.image}`, (err) => {
                if (err) console.error('Error removing image file:', err);
            });
        }

        await productModel.findByIdAndDelete(id);
        res.json({ success: true, message: "Product Removed" });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error removing product" });
    }
};

export { listProduct, addProduct, removeProduct };
