import { z } from 'zod';

export const createOrderSchema = z.object({
    email: z.string().email(),
    productId: z.string(), // Assuming this is a string representation of the ObjectId
    price: z.number().positive(),
    quantity: z.number().int().positive(),
});
