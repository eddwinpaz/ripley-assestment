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
const monk_1 = __importDefault(require("monk"));
const Product_1 = __importDefault(require("../entity/Product"));
require("dotenv").config();
// db.products.createIndex( { marca: "text", descripcion: "text", nombre: "text" } )
const mongoUri = process.env.MONGO_URI || "db/store";
class Repository {
    constructor() {
        const db = monk_1.default(mongoUri);
        this.collection = db.get("products");
        console.log(`connected to mongo: ${mongoUri}`);
    }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.collection.insert(product);
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.collection.find({});
                const products = [];
                if (response !== {}) {
                    response.map((p) => products.push(new Product_1.default(p._id, p.marca, p.imagen, p.nombre, p.descripcion, p.precio, p.descuento)));
                    return products;
                }
                else {
                    return [];
                }
            }
            catch (err) {
                return [];
            }
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.collection.findOne({ _id: id });
                return new Product_1.default(resp.id, resp.marca, resp.imagen, resp.nombre, resp.descripcion, resp.precio, resp.descuento);
            }
            catch (err) {
                return new Product_1.default();
            }
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const resp = yield this.collection.findOne({ _id: id });
                if (!resp)
                    return false;
                yield this.collection.update({ _id: id }, product);
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.collection.remove({ _id: id });
                return true;
            }
            catch (err) {
                return false;
            }
        });
    }
    searchProduct(query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const response = yield this.collection.find({
                    $text: { $search: query },
                });
                const products = [];
                if (response !== {}) {
                    response.map((p) => products.push(new Product_1.default(p._id, p.marca, p.imagen, p.nombre, p.descripcion, p.precio, p.descuento)));
                    return products;
                }
                else {
                    return [];
                }
            }
            catch (err) {
                return [];
            }
        });
    }
}
exports.default = Repository;
