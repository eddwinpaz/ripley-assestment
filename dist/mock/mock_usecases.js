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
const Product_1 = __importDefault(require("../entity/Product"));
// import { RepositoryInterface } from "../repository/repository_interface"
class MockRepository {
    constructor() { }
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return true;
        });
    }
    getProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            return [];
        });
    }
    getProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === '1')
                return new Product_1.default();
            return new Product_1.default(id, "Adidas", "asset/img.jpg", "nombre", "descripcion", 1000);
        });
    }
    updateProduct(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === '1')
                return false;
            return true;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            if (id === '1')
                return false;
            return true;
        });
    }
}
exports.default = MockRepository;
