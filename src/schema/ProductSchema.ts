import Joi from "@hapi/joi";

export const schema = Joi.object({
  marca: Joi.string().trim().required(),
  imagen: Joi.string().trim().required(),
  nombre: Joi.string().trim().required(),
  descripcion: Joi.string().trim().required(),
  precio: Joi.number().required(),
});