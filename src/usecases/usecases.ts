import Product from "../entity/Product";

class Usecases {
  constructor(private repository: any) {
    this.repository = repository;
  }

  createProduct(product: Product) {
    const response = this.repository.createProduct(product);
    return response;
  }

  getProducts() {
    const response = this.repository.getProducts();
    return response;
  }

  getProduct(id: string) {
    const response =  this.repository.getProduct(id);
    return response;
  }

  updateProduct(id: string, product: Product) {
    const response = this.repository.updateProduct(id, product);
    return response;
  }

  deleteProduct(id: string) {
    const response = this.repository.deleteProduct(id);
    return response;
  }

  searchProducts(query: string) {
    const response = this.repository.searchProduct(query);
    return response;
  }
}

export default Usecases;
