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
exports.ProductServices = void 0;
const product_model_1 = require("./product.model");
const slugify_1 = __importDefault(require("slugify"));
const createProduct = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const slug = (0, slugify_1.default)(`${payload.name}-${payload.price}`, { lower: true });
    const result = yield product_model_1.Product.create(Object.assign(Object.assign({}, payload), { slug }));
    return result;
});
const getAllProducts = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        };
    }
    const result = yield product_model_1.Product.find(query);
    return result;
});
const getProductsBySlug = (slug) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findOne({ slug: slug });
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndDelete(id);
    return result;
});
const updateProduct = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.name || payload.price) {
        payload.slug = (0, slugify_1.default)(`${payload.name}-${payload.price}`, {
            lower: true,
            strict: true,
        });
    }
    const result = yield product_model_1.Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
});
exports.ProductServices = {
    createProduct,
    getAllProducts,
    getProductsBySlug,
    deleteProduct,
    updateProduct,
};
