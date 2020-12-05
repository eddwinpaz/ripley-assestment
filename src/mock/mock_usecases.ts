import Product from "../entity/Product";
// import { RepositoryInterface } from "../repository/repository_interface"

class MockRepository {

  constructor() {}
  async createProduct(product: Product): Promise<boolean> {
    return true
  }

  async getProducts(): Promise<Product[]> {
    return [];
  }

  async getProduct(id: string): Promise<Product> {
    if (id === '1') return new Product();

    return new Product(id,
        "Adidas",
        "asset/img.jpg",
        "nombre",
        "descripcion",
        1000
      );
  }

  async updateProduct(id: string, product: Product): Promise<boolean> {
    if (id === '1') return false;
    return true;
  }

  async deleteProduct(id: string): Promise<boolean> {
    if (id === '1') return false;
    return true;
  }
}

export default MockRepository;