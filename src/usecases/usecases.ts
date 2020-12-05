import Product from "../entity/Product";

class Usecases {
  constructor(private repository: any) {
    this.repository = repository;
  }

  async createProduct(product: Product) {
    const response = await this.repository.createProduct(product);
    return response;
  }

  async getProducts() {
    const response = await this.repository.getProducts();
    return response;
  }

  async getProduct(id: string) {
    const response = await this.repository.getProduct(id);
    return response;
  }

  async updateProduct(id: string, product: Product) {
    const response = await this.repository.updateProduct(id, product);
    return response;
  }

  async deleteProduct(id: string) {
    const response = await this.repository.deleteProduct(id);
    return response;
  }

  async searchProducts(query: string) {
    const response = await this.repository.searchProduct(query);
    return response;
  }
}

export default Usecases;
