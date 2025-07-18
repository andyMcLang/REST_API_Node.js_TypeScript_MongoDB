import supertest from "supertest";
import { MongoMemoryServer } from "mongodb-memory-server";
import createServer from "../utils/server";
import mongoose from "mongoose";
import { createProduct } from "../service/product.service";
import { signJwt } from "../utils/jwt.utils";

const app = createServer();

const userId = new mongoose.Types.ObjectId().toString();

export const productPayload = {
  user: userId,
  title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
  description:
    "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
  price: 879.99,
  image: "https://i.imgur.com/QlRphfQ.jpg",
};

export const userPayload = {
  _id: userId,
  email: "matti.meikalainen@esimerkki.com",
  name: "Matti Meikalainen",
};

describe("product", () => {
  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create();

    await mongoose.connect(mongoServer.getUri());
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoose.connection.close();
  });

  describe("get product route", () => {
    describe("kun tuotetta ei ole olemassa", () => {
      it("palauttaa 404", async () => {
        const productId = "product-123";

        await supertest(app).get(`/api/products/${productId}`).expect(404);
      });
    });

    describe("kun tuote on olemassa", () => {
      it("palauttaa 200 ja tuotteen tiedot", async () => {
        const product = await createProduct(productPayload);

        const { body, statusCode } = await supertest(app).get(
          `/api/products/${product.productId}`
        );

        expect(statusCode).toBe(200);

        expect(body.productId).toBe(product.productId);
      });
    });
  });

  describe("create product route", () => {
    describe("kun käyttäjä ei ole kirjautunut sisään", () => {
      it("palauttaa 403", async () => {
        const { statusCode } = await supertest(app).post("/api/products");

        expect(statusCode).toBe(403);
      });
    });

    describe("kun käyttäjä on kirjautunut sisään", () => {
      it("palauttaa 200 ja luo tuotteen", async () => {
        const jwt = signJwt(userPayload);

        const { statusCode, body } = await supertest(app)
          .post("/api/products")
          .set("Authorization", `Bearer ${jwt}`)
          .send(productPayload);

        expect(statusCode).toBe(200);

        expect(body).toEqual({
          __v: 0,
          _id: expect.any(String),
          createdAt: expect.any(String),
          description:
            "Designed for first-time DSLR owners who want impressive results straight out of the box, capture those magic moments no matter your level with the EOS 1500D. With easy to use automatic shooting modes, large 24.1 MP sensor, Canon Camera Connect app integration and built-in feature guide, EOS 1500D is always ready to go.",
          image: "https://i.imgur.com/QlRphfQ.jpg",
          price: 879.99,
          productId: expect.any(String),
          title: "Canon EOS 1500D DSLR Camera with 18-55mm Lens",
          updatedAt: expect.any(String),
          user: expect.any(String),
        });
      });
    });
  });
});
