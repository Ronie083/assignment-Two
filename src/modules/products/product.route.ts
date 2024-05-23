import express from 'express';
import { ProductControllers } from './product.controller';

const router = express.Router()

router.post('/', ProductControllers.createProduct);
router.get('/:slug', ProductControllers.getProductsBySlug);
router.get('/', ProductControllers.getAllProducts);
router.delete("/:id", ProductControllers.deleteProduct);
router.put("/:id", ProductControllers.updateProduct);

export const ProductRoutes = router;