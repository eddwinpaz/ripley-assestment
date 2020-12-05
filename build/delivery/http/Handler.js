"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const repository_1 = __importDefault(require("../../repository/repository"));
const usecases_1 = __importDefault(require("../../usecases/usecases"));
const ProductSchema_1 = require("../../schema/ProductSchema");
const utils_functions_1 = require("../../utils/utils.functions");
class Handler {
    constructor() {
        this.router = express_1.Router();
        this.routes();
    }
    searchProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // query search
            const query = req.query.query;
            // return res.status(200).json({ query })
            let productDiscount = 0;
            if (utils_functions_1.isPalindrome(query)) {
                productDiscount = 20;
            }
            const repository = new repository_1.default();
            const use_case = new usecases_1.default(repository);
            // Check if string isnt empty
            // emptySearch(res, query);
            utils_functions_1.invalidCharacterSize(res, query);
            if (utils_functions_1.isIdSize(query)) {
                // Search by Id if it matches ID Size
                const response = yield use_case.getProduct(query);
                if (Object.keys(response).length === 0)
                    return res.status(404).json({ message: "not found", products: [] });
                return res.status(200).json({ products: [response] });
            }
            else {
                // Search query on all products columns
                const products = yield use_case.searchProducts(query);
                if (products.length === 0)
                    return res.status(404).json({ products: [] });
                return res
                    .status(200)
                    .json({ products: utils_functions_1.applyDiscount(productDiscount, products), message: "results" });
            }
        });
    }
    getProducts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new repository_1.default();
            const use_case = new usecases_1.default(repository);
            const products = yield use_case.getProducts();
            return res.send(products);
        });
    }
    getProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new repository_1.default();
            const use_case = new usecases_1.default(repository);
            const { id } = req.params;
            const product = yield use_case.getProduct(id);
            if (Object.keys(product).length > 0)
                return res.status(200).json({ message: "success" });
            return res.status(400).json({ message: "bad request" });
        });
    }
    createProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new repository_1.default();
                const use_case = new usecases_1.default(repository);
                const value = yield ProductSchema_1.schema.validateAsync(req.body);
                if (!value)
                    return res.status(400).json({ message: "invalid json schema" });
                const created = use_case.createProduct(value);
                if (created)
                    return res.status(200).json({ message: "success" });
                return res.status(400).json({ message: "bad request" });
            }
            catch (err) {
                return res
                    .status(400)
                    .json({ message: "bad request", error: err.message });
            }
        });
    }
    updateProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repository = new repository_1.default();
                const use_case = new usecases_1.default(repository);
                const { id } = req.params;
                const value = yield ProductSchema_1.schema.validateAsync(req.body);
                if (!value)
                    return res.status(400).json({ message: "invalid json schema" });
                const created = use_case.updateProduct(id, value);
                if (created) {
                    return res.status(200).json({ message: "success" });
                }
            }
            catch (err) {
                return res
                    .status(400)
                    .json({ message: "bad request", error: err.message });
            }
        });
    }
    deleteProduct(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const repository = new repository_1.default();
            const use_case = new usecases_1.default(repository);
            const { id } = req.params;
            const deleted = yield use_case.deleteProduct(id);
            if (deleted)
                return res.status(200).json({ message: "success" });
            return res.status(400).json({ message: "bad request" });
        });
    }
    routes() {
        this.router.get("/all/", this.getProducts);
        this.router.get("/view/:id", this.getProduct);
        this.router.post("/create/", this.createProduct);
        this.router.delete("/delete/:id", this.deleteProduct);
        this.router.put("/update/:id", this.updateProduct);
        this.router.get("/search/", this.searchProduct);
    }
}
const handler = new Handler();
exports.default = handler.router;
