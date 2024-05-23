import mongoose, { Schema, Document, Model } from 'mongoose';
import { IOrder } from './order.interface';

interface IOrderDocument extends IOrder, Document {}

const orderSchema = new Schema<IOrderDocument>(
    {
        email: { type: String, required: true },
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
    },
    { timestamps: true }
);

export const Order: Model<IOrderDocument> = mongoose.model<IOrderDocument>('Order', orderSchema);
