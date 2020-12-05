"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Product {
    constructor(id, marca, imagen, nombre, descripcion, precio, descuento) {
        this.id = id;
        this.marca = marca;
        this.imagen = imagen;
        this.nombre = nombre;
        this.descripcion = descripcion;
        this.precio = precio;
        this.descuento = descuento;
    }
}
exports.default = Product;
