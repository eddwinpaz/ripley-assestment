import Product from "../entity/Product";
import { Response } from "express";

export const isPalindrome = (word: string): boolean => {
  var re = /[\W_]/g;
  var lowRegStr = word.toLowerCase().replace(re, '');
  var reverseStr = lowRegStr.split('').reverse().join(''); 
  return reverseStr === lowRegStr;
};

export const isIdSize = (id: string): boolean => id.length === 24;

export const applyDiscount = (discount: number, products: Product[]) => {
  let discountProducts: Product[] = []
  products.map((product) => {
    const oldPrice = product.precio || 0;
    const newDiscount = (oldPrice * discount)/100;
    const obj = new Product(product.id, product.marca, product.imagen, product.nombre, product.descripcion, product.precio, newDiscount);
    discountProducts.push(obj)
  });
  return discountProducts;
};

export const invalidCharacterSize = (res: Response, query: string) => {
  if (query && query.length < 3) {
    return res.status(400).json({
      message: "Please add more than 3 characters to start search",
      products: [],
    });
  }
};

// export const emptySearch = (res: Response, query: string) => {
//   if (query && query.length === 3) {
//     return res.status(400).json({ message: "Empty search", products: [] });
//   }
// };
