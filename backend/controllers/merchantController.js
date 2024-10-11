import merchantModel from "../models/merchantModel.js";

// List all merchants
const listMerchants = async (req, res) => {
    try {
        const merchants = await merchantModel.find({});
        res.json({ success: true, data: merchants });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving merchants" });
    }
};

// Create a new merchant
const createMerchant = async (req, res) => {
    try {
        const { name, address, phone } = req.body;
        if (!name || !address || !phone) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }

        const newMerchant = new merchantModel({ name, address, phone });
        await newMerchant.save();

        res.status(201).json({ success: true, data: newMerchant });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error creating merchant" });
    }
};

// Get a single merchant by ID
const getMerchantById = async (req, res) => {
    try {
        const { id } = req.params;
        const merchant = await merchantModel.findById(id);
        if (!merchant) {
            return res.status(404).json({ success: false, message: "Merchant not found" });
        }
        res.json({ success: true, data: merchant });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error retrieving merchant" });
    }
};

// Update a merchant by ID
const updateMerchant = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, address, phone } = req.body;

        const updatedMerchant = await merchantModel.findByIdAndUpdate(id, { name, address, phone }, { new: true });
        if (!updatedMerchant) {
            return res.status(404).json({ success: false, message: "Merchant not found" });
        }
        res.json({ success: true, data: updatedMerchant });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error updating merchant" });
    }
};

// Delete a merchant by ID
const deleteMerchant = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedMerchant = await merchantModel.findByIdAndDelete(id);
        if (!deletedMerchant) {
            return res.status(404).json({ success: false, message: "Merchant not found" });
        }
        res.json({ success: true, message: "Merchant deleted" });
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error deleting merchant" });
    }
};

export { createMerchant, listMerchants, getMerchantById, updateMerchant, deleteMerchant };
