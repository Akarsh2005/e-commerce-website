import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    image: { type: String, required: true },
    category: { type: String, required: true },
    merchantId: {  // Changed from restaurantId to merchantId
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'merchant',  // Changed reference from 'restaurant' to 'merchant'
        required: true 
    } // Reference to the merchant ID
});

const productModel = mongoose.models.product || mongoose.model("product", productSchema);
export default productModel;
