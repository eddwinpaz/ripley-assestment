import monk, { IMonkManager } from "monk";
import Product from "../entity/Product";
import { RepositoryInterface } from "./repository_interface";

require("dotenv").config();
// db.products.createIndex( { marca: "text", descripcion: "text", nombre: "text" } )

const mongoUri = process.env.MONGO_URI || "db/store";

class Repository implements RepositoryInterface {
  collection: any;
  db: IMonkManager;

  constructor() {
    this.db = monk(mongoUri);
    this.collection = this.db.get("products");
    console.log(`connected to mongo: ${mongoUri}`);
  }

  async createProduct(product: Product): Promise<boolean> {
    try {
      await this.collection.insert(product);
      await this.db.close();
      return true;
    } catch (err) {
      return false;
    }
  }

  async getProducts(): Promise<Product[]> {
    try {
      const response = await this.collection.find({});
      await this.db.close();
      const products: Array<Product> = [];

      if (response !== {}) {
        response.map((p: any) =>
          products.push(
            new Product(
              p._id,
              p.marca,
              p.imagen,
              p.nombre,
              p.descripcion,
              p.precio,
              p.descuento,
            )
          )
        );
        return products;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }

  async getProduct(id: string): Promise<Product> {
    try {
      const resp = await this.collection.findOne({ _id: id });
      await this.db.close();

      return new Product(
        resp.id,
        resp.marca,
        resp.imagen,
        resp.nombre,
        resp.descripcion,
        resp.precio,
        resp.descuento,
      );
    } catch (err) {
      return new Product();
    }
  }

  async updateProduct(id: string, product: Product): Promise<boolean> {
    try {
      const resp = await this.collection.findOne({ _id: id });
      if (!resp) return false;
      await this.collection.update({ _id: id }, product);
      await this.db.close();
      return true;
    } catch (err) {
      return false;
    }
  }

  async deleteProduct(id: string): Promise<boolean> {
    try {
      await this.collection.remove({ _id: id });
      await this.db.close();
      return true;
    } catch (err) {
      return false;
    }
  }

  async searchProduct(query: string): Promise<Product[]> {
    try {
      const response = await this.collection.find({
        $text: { $search: query },
      });
      await this.db.close();

      const products: Array<Product> = [];

      if (response !== {}) {
        response.map((p: any) =>
          products.push(
            new Product(
              p._id,
              p.marca,
              p.imagen,
              p.nombre,
              p.descripcion,
              p.precio,
              p.descuento,
            )
          )
        );
        return products;
      } else {
        return [];
      }
    } catch (err) {
      return [];
    }
  }
}

export default Repository;
