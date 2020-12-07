const request = require("supertest");
const ctx = require("../../app");

// End 2 End Testing
test("GET /api/product", (done) => {
  request(ctx)
    .get("/api/product")
    .set("Content-Type", "application/json")
    .expect(200)
    .end(() => {
      done();
    });
});


test("GET /api/product/01", (done) => {
  request(ctx)
    .get("/api/product/01")
    .set("Content-Type", "application/json")
    .expect(400)
    .end(() => {
      done();
    });
});

test("POST /api/product/", (done) => {
  request(ctx)
    .post("/api/product/01")
    .set("Content-Type", "application/json")
    .set({
      marca: "helly hansen",
      imagen: "asset/t2.jpg",
      nombre: "Water Proof Polera",
      precio: 15000,
      descripcion: "Polera repelente de agua y barro",
    })
    .expect(404)
    .end(() => {
      done();
    });
});


test("DELETE /api/product/01", (done) => {
    request(ctx)
      .del("/api/product/01")
      .set("Content-Type", "application/json")
      .expect(400)
      .end(() => {
        done();
      });
  });
