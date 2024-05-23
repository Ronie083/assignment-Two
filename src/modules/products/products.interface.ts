export type EVariants = {
    type: string;
    value: string;
};

export type EInventory = {
    quantity: number; // The available quantity of the product in stock.
    inStock: boolean; // Indicates whether the product is currently in stock.
};

export type EProduct = {
    name: string; // The name of the product.
    description: string; // A brief description of the product.
    price: number; // The price of the product.
    slug: string,
    category: string; // The category to which the product belongs.
    tags: string[]; // An array of tags or keywords associated with the product.
    variants: EVariants[]; // An array containing different variants or options of the product, such as size, color, or style.
    inventory: EInventory; // An object representing the product's inventory details.
};
