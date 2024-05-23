import { Schema, model } from "mongoose";
import { EInventory, EProduct, EVariants } from "./products.interface";

const variantsSchema = new Schema <EVariants>({
    type: {
        type: String,
        required: true,
    },
    value: {
        type: String,
        required: true,
    },
});

const inventorySchema = new Schema <EInventory> ({
    quantity: {
        type: Number,
        required: true,
    },
    inStock: {
        type: Boolean,
        required: true,
    },
});

const productSchema = new Schema <EProduct>({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    slug: {
        type: String,
        require: true
    },
    category: {
        type: String,
        required: true,
    },
    tags: {
        type: [String],
        required: true,
    },
    variants: {
        type: [variantsSchema],
        required: true,
    },
    inventory: {
        type: inventorySchema,
        required: true,
    },
});

export const Product = model<EProduct>("Product", productSchema);
