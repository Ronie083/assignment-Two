import { Request, Response } from 'express';
import { z } from 'zod';
import { createProductSchema } from './validation/product.validation';
import { ProductServices } from './product.service';

const createProduct = async (req: Request, res: Response) => {
    try {
        // Validate request body against Zod schema
        const validatedData = createProductSchema.parse(req.body);

        const result = await ProductServices.createProduct(validatedData);

        res.status(201).json({
            success: true,
            message: 'Product created successfully!',
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

const getAllProducts = async (req: Request, res: Response) => {
    try {
        const searchTerm = req.query.searchTerm as string;
        const result = await ProductServices.getAllProducts(searchTerm);
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    } catch (err: unknown) {
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
};

const getProductsBySlug = async (req: Request, res: Response) => {

    const { slug } = req.params;
    const result = await ProductServices.getProductsBySlug(slug);
    try {
        res.status(200).json({
            success: true,
            message: "Product fetched successfully!!",
            data: result,
        })
    } catch (err: unknown) {
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

};

const deleteProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        // console.log(id);

        const result = await ProductServices.deleteProduct(id);
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
    } catch (err: unknown) {
        // console.error("Error deleting product:", err);
        res.status(500).json({
            success: false,
            message: "Could not delete product!",
            error: err instanceof Error ? err.message : 'Unknown error',
        });
    }

};

const updateProduct = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const productData = req.body;
        const result = await ProductServices.updateProduct(id, productData);
        res.status(200).json({
            success: true,
            message: "Product updated successfully!!",
            data: result,
        });
    } catch (err: unknown) {
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

};

export const ProductControllers = {
    createProduct,
    getAllProducts,
    getProductsBySlug,
    deleteProduct,
    updateProduct,
}