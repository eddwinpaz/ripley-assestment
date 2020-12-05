"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.invalidCharacterSize = exports.applyDiscount = exports.isIdSize = exports.isPalindrome = void 0;
const Product_1 = __importDefault(require("../entity/Product"));
const isPalindrome = (word) => {
    var re = /[\W_]/g;
    var lowRegStr = word.toLowerCase().replace(re, '');
    var reverseStr = lowRegStr.split('').reverse().join('');
    return reverseStr === lowRegStr;
};
exports.isPalindrome = isPalindrome;
const isIdSize = (id) => id.length === 24;
exports.isIdSize = isIdSize;
const applyDiscount = (discount, products) => {
    let discountProducts = [];
    products.map((product) => {
        const oldPrice = product.precio || 0;
        const newDiscount = (oldPrice * discount) / 100;
        const obj = new Product_1.default(product.id, product.marca, product.imagen, product.nombre, product.descripcion, product.precio, newDiscount);
        discountProducts.push(obj);
    });
    return discountProducts;
};
exports.applyDiscount = applyDiscount;
const invalidCharacterSize = (res, query) => {
    if (query && query.length < 3) {
        return res.status(400).json({
            message: "Please add more than 3 characters to start search",
            products: [],
        });
    }
};
exports.invalidCharacterSize = invalidCharacterSize;
// export const emptySearch = (res: Response, query: string) => {
//   if (query && query.length === 3) {
//     return res.status(400).json({ message: "Empty search", products: [] });
//   }
// };
