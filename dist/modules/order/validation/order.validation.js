"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrderSchema = void 0;
const zod_1 = require("zod");
exports.createOrderSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(), // Assuming this is a string representation of the ObjectId
    price: zod_1.z.number().positive(),
    quantity: zod_1.z.number().int().positive(),
});
