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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductControllers = void 0;
const zod_1 = require("zod");
const product_validation_1 = require("./validation/product.validation");
const product_service_1 = require("./product.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Validate request body against Zod schema
        const validatedData = product_validation_1.createProductSchema.parse(req.body);
        const result = yield product_service_1.ProductServices.createProduct(validatedData);
        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
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
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const searchTerm = req.query.searchTerm;
        const result = yield product_service_1.ProductServices.getAllProducts(searchTerm);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = 'Unknown error';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        res.status(500).json({
            success: false,
            message: "Could not fetch products!",
            error: errorMessage,
        });
    }
});
const getProductsBySlug = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { slug } = req.params;
    const result = yield product_service_1.ProductServices.getProductsBySlug(slug);
    try {
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!!",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = 'Unknown error';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        res.status(500).json({
            success: false,
            message: "Could not fetch!",
            error: errorMessage,
        });
    }
});
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        // console.log(id);
        const result = yield product_service_1.ProductServices.deleteProduct(id);
        if (!result) {
            res.status(404).json({
                success: false,
                message: "Product not found!",
            });
        }
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!!",
            data: result,
        });
    }
    catch (err) {
        // console.error("Error deleting product:", err);
        res.status(500).json({
            success: false,
            message: "Could not delete product!",
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }
});
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const productData = req.body;
        const result = yield product_service_1.ProductServices.updateProduct(id, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!!",
            data: result,
        });
    }
    catch (err) {
        let errorMessage = 'Unknown error';
        if (err instanceof Error) {
            errorMessage = err.message;
        }
        res.status(500).json({
            success: false,
            message: "Could not update product!",
            error: errorMessage,
        });
    }
});
exports.ProductControllers = {
    createProduct,
    getAllProducts,
    getProductsBySlug,
    deleteProduct,
    updateProduct,
};
