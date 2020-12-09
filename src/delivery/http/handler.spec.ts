const request = require("supertest");
const ctx = require("../../app");

test("GET /api/product", async (done) => {
  request(ctx)
    .get("/api/product")
    .set("Content-Type", "application/json")
    .expect(200)
    .end(() => {
      done();
    });
});

test("GET /api/product/5fcc273a4565220017811b5f", async (done) => {
  request(ctx)
    .get("/api/product/5fcc273a4565220017811b5f")
    .set("Content-Type", "application/json")
    .expect(400)
    .end(() => {
      done();
    });
});

test("POST /api/product/", async (done) => {
  request(ctx)
    .post("/api/product/")
    .set("Content-Type", "application/json")
    .set({
      marca: "helly hansen",
      imagen: "asset/t2.jpg",
      nombre: "Water Proof Polera",
      precio: 15000,
      descripcion: "Polera repelente de agua y barro",
    })
    .expect(200)
    .end(() => {
      done();
    });
});

test("DELETE /api/product/01", async (done) => {
  request(ctx)
    .del("/api/product/01")
    .set("Content-Type", "application/json")
    .expect(400)
    .end(() => {
      done();
    });
});
