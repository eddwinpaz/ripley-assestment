import Product from "../entity/Product";
// import { RepositoryInterface } from "../repository/repository_interface"

class MockRepository {
  constructor() {}
  createProduct(product: Product): boolean {
    return true;
  }

  getProducts(): Product[] {
    return [];
  }

  getProduct(id: string): Product {
    if (id === "1") return new Product();

    return new Product(
      id,
      "Adidas",
      "asset/img.jpg",
      "nombre",
      "descripcion",
      1000
    );
  }

  updateProduct(id: string, product: Product): boolean {
    if (id === "1") return false;
    return true;
  }

  deleteProduct(id: string): boolean {
    if (id === "1") return false;
    return true;
  }
}

export default MockRepository;
