import { Order } from './order.model';
import { IOrder } from './order.interface';

const createOrder = async (payload: IOrder) => {
    const result = await Order.create(payload);
    return result;
};

const getAllOrders = async () => {
    const result = await Order.find();
    return result;
};

const getOrdersByEmail = async (email: string) => {
    const result = await Order.find({ email });
    return result;
};

export const OrderServices = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
