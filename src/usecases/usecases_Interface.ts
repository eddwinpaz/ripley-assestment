import Product from "../entity/Product";

export interface UsecasesInterface {
    getProducts(): Promise<Product[]>;
    createProduct(product: Product): Promise<boolean>;
    getProduct(id: string): Promise<Product>;
    deleteProduct(id: string): Promise<boolean>;
    updateProduct(id: string, product: Product): Promise<boolean>;
    searchProduct(query: string): Promise<Product[]>;
}