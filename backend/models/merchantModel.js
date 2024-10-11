import mongoose from "mongoose";

const merchantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    address: { type: String, required: true },
    phone: { type: String, required: true }
});

const merchantModel = mongoose.models.merchant || mongoose.model("merchant", merchantSchema);
export default merchantModel;
