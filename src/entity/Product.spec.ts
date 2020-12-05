import Product from './Product';

test("test entity > Product [OK]", async () => {
  const p = new Product(
    "01",
    "marca",
    "imagen",
    "nombre",
    "descripcion",
    1000
  );

  expect(p.id).toBe('01')
});
