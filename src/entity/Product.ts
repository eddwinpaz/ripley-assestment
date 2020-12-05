
export default class Product {
  constructor(
    public id?: string,
    public marca?: string,
    public imagen?: string,
    public nombre?: string,
    public descripcion?: string,
    public precio?: number,
    public descuento?: number,
  ) {}
}
