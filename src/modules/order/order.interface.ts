import mongoose from 'mongoose';

export interface IOrder {
    email: string;
    productId: mongoose.Types.ObjectId;
    price: number;
    quantity: number;
    createdAt?: Date;
    updatedAt?: Date;
}
