import Product from "../entity/Product";
import MockRepository from "../mock/mock_usecases";
import UseCases from "./usecases";

describe("UseCases", () => {
  test("test usecase > get products [OK]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);
    const data = usecase.getProducts();
    expect(data).toEqual([]);
  });

  test("test usecase > get product by id [ERROR]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);
    const data = usecase.getProduct("1");
    expect(data.id).toEqual(undefined);
  });

  test("test usecase > get product by id [OK]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);
    const data = usecase.getProduct("2");
    expect(data.id).toEqual("2");
  });

  test("test usecase > update product by id [OK]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);

    const p = new Product(
      undefined,
      "Adidas",
      "asset/img.jpg",
      "nombre",
      "descripcion",
      1000
    );

    const data = usecase.updateProduct("0001", p);
    expect(data).toEqual(true);
  });

  test("test usecase > update product by id [ERROR]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);

    const p = new Product(
      undefined,
      "Adidas",
      "asset/img.jpg",
      "nombre",
      "descripcion",
      1000
    );

    const data = usecase.updateProduct("1", p);
    expect(data).toEqual(false);
  });

  test("test usecase > delete product by id [OK]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);

    const data = usecase.deleteProduct("001");
    expect(data).toEqual(true);
  });

  test("test usecase > delete product by id [ERROR]", () => {
    const repository = new MockRepository();
    const usecase = new UseCases(repository);

    const data = usecase.deleteProduct("1");
    expect(data).toEqual(false);
  });
});
