"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const joi_1 = __importDefault(require("joi"));
exports.schema = joi_1.default.object({
    marca: joi_1.default.string().trim().required(),
    imagen: joi_1.default.string().trim().required(),
    nombre: joi_1.default.string().trim().required(),
    descripcion: joi_1.default.string().trim().required(),
    precio: joi_1.default.number().required(),
});
