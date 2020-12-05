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
const mock_usecases_1 = __importDefault(require("../mock/mock_usecases"));
const usecases_1 = __importDefault(require("./usecases"));
test("test usecase > get products [OK]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const data = yield usecase.getProducts();
    expect(data).toEqual([]);
}));
test("test usecase > get product by id [ERROR]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const data = yield usecase.getProduct("1");
    expect(data.id).toEqual(undefined);
}));
test("test usecase > get product by id [OK]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const data = yield usecase.getProduct('2');
    expect(data.id).toEqual('2');
}));
test("test usecase > update product by id [OK]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const p = new Product_1.default(undefined, "Adidas", "asset/img.jpg", "nombre", "descripcion", 1000);
    const data = yield usecase.updateProduct('0001', p);
    expect(data).toEqual(true);
}));
test("test usecase > update product by id [ERROR]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const p = new Product_1.default(undefined, "Adidas", "asset/img.jpg", "nombre", "descripcion", 1000);
    const data = yield usecase.updateProduct('1', p);
    expect(data).toEqual(false);
}));
test("test usecase > delete product by id [OK]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const data = yield usecase.deleteProduct('001');
    expect(data).toEqual(true);
}));
test("test usecase > delete product by id [ERROR]", () => __awaiter(void 0, void 0, void 0, function* () {
    const repository = new mock_usecases_1.default();
    const usecase = new usecases_1.default(repository);
    const data = yield usecase.deleteProduct('1');
    expect(data).toEqual(false);
}));
