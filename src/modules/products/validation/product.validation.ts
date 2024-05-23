import { z } from 'zod';

export const createProductSchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.number().positive(),
    slug: z.string(),
    category: z.string(),
    tags: z.array(z.string()),
    variants: z.array(
        z.object({
            type: z.string(),
            value: z.string(),
        })
    ),
    inventory: z.object({
        quantity: z.number().int().min(0),
        inStock: z.boolean(),
    }),
});
