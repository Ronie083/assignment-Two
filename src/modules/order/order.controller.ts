import { Request, Response } from 'express';
import { z } from 'zod';
import mongoose from 'mongoose';
import { createOrderSchema } from './validation/order.validation';
import { OrderServices } from './order.services';

const createOrder = async (req: Request, res: Response) => {
    try {
        // Validate request body against Zod schema
        const validatedData = createOrderSchema.parse(req.body);

        const orderData = {
            ...validatedData,
            productId: new mongoose.Types.ObjectId(validatedData.productId),
        };

        const result = await OrderServices.createOrder(orderData);

        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    } catch (error) {
        if (error instanceof z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors,
            });
        } else {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
};

const getAllOrders = async (req: Request, res: Response) => {
    try {
        const result = await OrderServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

const getOrdersByEmail = async (req: Request, res: Response) => {
    try {
        const email = req.query.email as string;
        const result = await OrderServices.getOrdersByEmail(email);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
};

export const OrderControllers = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
