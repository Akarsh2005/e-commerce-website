import express from 'express';
import { createMerchant, listMerchants, getMerchantById, updateMerchant, deleteMerchant } from '../controllers/merchantController.js';

const merchantRouter = express.Router();

// Create a new merchant
merchantRouter.post("/add", createMerchant);

// List all merchants
merchantRouter.get("/list", listMerchants);

// Get a merchant by ID
merchantRouter.get("/:id", getMerchantById);

// Update a merchant by ID
merchantRouter.put("/:id", updateMerchant);

// Delete a merchant by ID
merchantRouter.delete("/:id", deleteMerchant);

export default merchantRouter;
