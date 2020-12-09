import { Request, Response, Router } from "express";
import Repository from "../../repository/repository";
import Usecases from "../../usecases/usecases";
import { schema } from "../../schema/ProductSchema";
import { RESPONSES } from "../../constants/handler_responses";
import {
  isPalindrome,
  isIdSize,
  applyDiscount,
  invalidCharacterSize,
} from "../../utils/utils.functions";
import Product from "../../entity/Product";

class Handler {
  router: Router;

  constructor() {
    this.router = Router();
    this.routes();
  }

  getProducts(req: Request, res: Response) {
    const query: any = req.query.query;
    if (query) {
      let productDiscount: number = 0;

      if (isPalindrome(query)) {
        productDiscount = 20;
      }

      const repository = new Repository();
      const use_case = new Usecases(repository);

      // Check if string isnt empty
      // emptySearch(res, query);
      invalidCharacterSize(res, query);

      if (isIdSize(query)) {
        // Search by Id if it matches ID Size
        const response = use_case.getProduct(query);
        if (Object.keys(response).length === 0)
          return res.status(404).json({ message: RESPONSES.NOT_FOUND, products: [] });
        return res.status(200).json({ products: [response] });
      } else {
        // Search query on all products columns
        const products = use_case.searchProducts(query);
        if (products.length === 0)
          return res.status(404).json({
            message: RESPONSES.SEARCH_SUCCESS,
            products: [],
          });
        return res.status(200).json({
          products: applyDiscount(productDiscount, products),
          message: RESPONSES.RESULTS,
        });
      }
    }

    const repository = new Repository();
    const use_case = new Usecases(repository);
    const products = use_case.getProducts();
    return res.send(products);
  }

  getProduct(req: Request, res: Response) {
    const repository = new Repository();
    const use_case = new Usecases(repository);
    const { id } = req.params;

    const product = use_case.getProduct(id);
    if (Object.keys(product).length > 0)
      return res.status(200).json({ message: RESPONSES.SEARCH_SUCCESS, product });
    return res.status(400).json({ message: RESPONSES.BAD_REQUEST });
  }

  createProduct(req: Request, res: Response) {
    try {
      const repository = new Repository();
      const use_case = new Usecases(repository);

      const isValid = schema.validate(req.body);
      if (!isValid)
        return res.status(400).json({ message: RESPONSES.INVALID_JSON_SCHEMA });
      const product = new Product(isValid.value);
      const created = use_case.createProduct(product);
      if (created)
        return res
          .status(200)
          .json({ message: RESPONSES.CREATED_PRODUCT_SUCCESS });
      return res.status(400).json({ message: RESPONSES.BAD_REQUEST });
    } catch (err) {
      return res
        .status(400)
        .json({ message: RESPONSES.BAD_REQUEST, error: err.message });
    }
  }

  updateProduct(req: Request, res: Response) {
    try {
      const repository = new Repository();
      const use_case = new Usecases(repository);
      const { id } = req.params;

      const isValid = schema.validate(req.body);
      if (!isValid)
        return res.status(400).json({ message: RESPONSES.INVALID_JSON_SCHEMA });
      const product = new Product(isValid.value);
      const created = use_case.updateProduct(id, product);

      if (created) {
        return res
          .status(200)
          .json({ message: RESPONSES.UPDATED_PRODUCT_SUCCESS });
      }
    } catch (err) {
      return res
        .status(400)
        .json({ message: RESPONSES.BAD_REQUEST, error: err.message });
    }
  }

  deleteProduct(req: Request, res: Response) {
    const repository = new Repository();
    const use_case = new Usecases(repository);
    const { id } = req.params;

    const deleted = use_case.deleteProduct(id);

    if (deleted)
      return res.status(200).json({ message: RESPONSES.DELETED_PRODUCT_SUCCESS });
    return res.status(400).json({ message: RESPONSES.BAD_REQUEST });
  }

  routes() {
    this.router.get("/", this.getProducts);
    this.router.get("/:id", this.getProduct);
    this.router.post("/", this.createProduct);
    this.router.delete("/:id", this.deleteProduct);
    this.router.put("/:id", this.updateProduct);
  }
}

const handler = new Handler();

export default handler.router;
