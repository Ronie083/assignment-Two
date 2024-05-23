import { Product } from "./product.model";
import { EProduct } from "./products.interface";
import slugify from "slugify";


const createProduct = async (payload: EProduct) => {
    const slug = slugify(`${payload.name}-${payload.price}`, {lower:true})

    const result = await Product.create({...payload, slug});
    return result;
}

const getAllProducts = async (searchTerm?: string) => {
    let query = {};
    if (searchTerm) {
        query = {
            $or: [
                { name: { $regex: searchTerm, $options: 'i' } },
                { description: { $regex: searchTerm, $options: 'i' } }
            ]
        };
    }
    const result = await Product.find(query);
    return result;
}

const getProductsBySlug = async (slug: string) => {
    const result = await Product.findOne({ slug: slug });
    return result;
}

const deleteProduct = async (id: string) => {
    const result = await Product.findByIdAndDelete( id);
        return result;
};

const updateProduct = async (id: string, payload: Partial<EProduct>) => {
    if (payload.name || payload.price) {
        payload.slug = slugify(`${payload.name}-${payload.price}`, {
            lower: true,
            strict: true,
        });
    }
    const result = await Product.findByIdAndUpdate(id, payload, { new: true });
    return result;
};


export const ProductServices = {
    createProduct,
    getAllProducts,
    getProductsBySlug,
    deleteProduct,
    updateProduct,
}