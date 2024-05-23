"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderControllers = void 0;
const zod_1 = require("zod");
const mongoose_1 = __importDefault(require("mongoose"));
const order_validation_1 = require("./validation/order.validation");
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body against Zod schema
        const validatedData = order_validation_1.createOrderSchema.parse(req.body);
        const orderData = Object.assign(Object.assign({}, validatedData), { productId: new mongoose_1.default.Types.ObjectId(validatedData.productId) });
        const result = yield order_services_1.OrderServices.createOrder(orderData);
        res.status(201).json({
            success: true,
            message: 'Order created successfully!',
            data: result,
        });
    }
    catch (error) {
        if (error instanceof zod_1.z.ZodError) {
            res.status(400).json({
                success: false,
                message: 'Validation error',
                errors: error.errors,
            });
        }
        else {
            res.status(500).json({
                success: false,
                message: 'Internal server error',
            });
        }
    }
});
const getAllOrders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield order_services_1.OrderServices.getAllOrders();
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
const getOrdersByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const email = req.query.email;
        const result = yield order_services_1.OrderServices.getOrdersByEmail(email);
        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully for user email!',
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Internal server error',
        });
    }
});
exports.OrderControllers = {
    createOrder,
    getAllOrders,
    getOrdersByEmail,
};
